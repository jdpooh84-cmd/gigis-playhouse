#!/usr/bin/env python3
"""Sunny and the Crew — pipeline integrity validator.

Runs every structural check that used to be manual. Exit 0 = pipeline clean,
exit 1 = at least one ERROR (CI fails the push). WARNs never fail the build.

Checks:
  1. characters.json — locked element IDs are valid UUIDs, deprecated IDs never
     collide with locked ones, hard character rules present.
  2. Deprecated element IDs must not be referenced anywhere else in the show tree.
  3. Episode clip manifests — timeline continuity (no overlaps, no gaps),
     no duplicate clip IDs, no reused Higgsfield job IDs (no-loop rule),
     3-5s clip band for non-exempt clips, meta totals match reality.
  4. Prompt packs (new_assets_*.md) — banned terms (age descriptors, 'Pixar',
     cars), no stale pre-v2 design language, Bella+Gabriel never share a
     CHARACTER LOCK block, every needs_new_asset prompt carries an element tag.
  5. production_rules.json — parses, theme master path exists on disk, runtime
     bands sane, delivery rule no longer points at the Kling engine scenario.
  6. Locked masters exist (theme intro, EP01 synced song section) and, when
     ffprobe is available, match their recorded durations.
  7. Folder/file naming — episode dirs match EP##_slug, no spaces in filenames.

Add new checks here whenever a defect ships — one failure = one system change.
"""
import json, os, re, subprocess, sys, uuid

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHOW = os.path.join(ROOT, "sunny-and-the-crew")
ERRORS, WARNS = [], []

def err(msg): ERRORS.append(msg)
def warn(msg): WARNS.append(msg)

def is_uuid(s):
    try: uuid.UUID(s); return True
    except Exception: return False

# ---------- 1. characters.json ----------
chars = json.load(open(os.path.join(SHOW, "characters.json")))
locked, deprecated = {}, {}
def collect(clist):
    for c in clist:
        name = c.get("full_name") or c.get("name") or c.get("id", "?")
        eid = c.get("higgsfield_element_id_LOCKED")
        if eid:
            if not is_uuid(eid): err("characters.json: %s locked element ID is not a UUID: %r" % (name, eid))
            if eid in locked.values(): err("characters.json: duplicate locked element ID %s" % eid)
            locked[name] = eid
        dep = c.get("deprecated_element_id_broken_media")
        if dep: deprecated[name + "/broken"] = dep
        for d in c.get("deprecated_element_ids", []):
            deprecated["%s/%s" % (name, d.get("reason", "?")[:40])] = d["id"]
for key in ("main_crew", "supporting_cast"):
    collect(chars.get(key, []))
for name, dep in deprecated.items():
    if dep in locked.values():
        err("characters.json: %s deprecated ID %s collides with a locked ID" % (name, dep))
if len(locked) < 14:
    warn("characters.json: only %d locked elements found (expected 14)" % len(locked))

# ---------- 2. deprecated IDs referenced nowhere else ----------
show_texts = {}
for dirpath, dirnames, filenames in os.walk(SHOW):
    for fn in filenames:
        if fn.endswith((".md", ".json", ".txt")):
            p = os.path.join(dirpath, fn)
            try: show_texts[p] = open(p, encoding="utf-8", errors="replace").read()
            except OSError as e: warn("unreadable file %s: %s" % (p, e))
for name, dep in deprecated.items():
    for p, text in show_texts.items():
        if dep in text and not p.endswith("characters.json"):
            err("deprecated element %s (%s) still referenced in %s" % (dep, name, os.path.relpath(p, ROOT)))

# ---------- 3. clip manifests ----------
BAND_LO, BAND_HI, GAP_TOL = 2.95, 5.05, 0.30
for p, text in sorted(show_texts.items()):
    if not os.path.basename(p).startswith("clip_manifest"): continue
    rel = os.path.relpath(p, ROOT)
    man = json.loads(text)
    clips = man["clips"]
    ids = [c["clip_id"] for c in clips]
    if len(ids) != len(set(ids)):
        dupes = sorted({i for i in ids if ids.count(i) > 1})
        err("%s: duplicate clip IDs %s" % (rel, dupes))
    jobs = [c["asset_source"].get("higgsfield_job_id") for c in clips if c["asset_source"].get("higgsfield_job_id")]
    if len(jobs) != len(set(jobs)):
        dupes = sorted({j for j in jobs if jobs.count(j) > 1})
        err("%s: NO-LOOP VIOLATION — job IDs reused: %s" % (rel, dupes))
    prev_end, prev_id = None, None
    for c in clips:
        if c["end_sec"] <= c["start_sec"]:
            err("%s: %s has non-positive duration" % (rel, c["clip_id"]))
        if abs((c["end_sec"] - c["start_sec"]) - c["duration_seconds"]) > 0.02:
            err("%s: %s duration field disagrees with timecodes" % (rel, c["clip_id"]))
        if prev_end is not None:
            if c["start_sec"] < prev_end - 0.01:
                err("%s: %s overlaps %s" % (rel, c["clip_id"], prev_id))
            elif c["start_sec"] - prev_end > GAP_TOL:
                err("%s: %.2fs timeline gap before %s" % (rel, c["start_sec"] - prev_end, c["clip_id"]))
            elif c["start_sec"] - prev_end > 0.01:
                warn("%s: %.2fs micro-gap before %s (allowed, verify intentional)" % (rel, c["start_sec"] - prev_end, c["clip_id"]))
        prev_end, prev_id = c["end_sec"], c["clip_id"]
        if not c.get("clip_length_exempt") and c["section_type"] != "theme":
            d = c["duration_seconds"]
            if not (BAND_LO <= d <= BAND_HI):
                err("%s: %s duration %.2fs outside 3-5s band and not exempt" % (rel, c["clip_id"], d))
    meta = man.get("_meta", {})
    if meta.get("total_clips") not in (None, len(clips)):
        err("%s: _meta.total_clips=%s but %d clips present" % (rel, meta.get("total_clips"), len(clips)))
    # Adult-mentor rule (creator-locked 2026-07-11): crew comes across Ava (learning) or Anne (song) every episode
    if not any(re.search(r"\bAva\b|\bAnne\b", c.get("characters","")) for c in clips
               if c.get("section_type") != "theme"):
        warn("%s: no Ava/Anne appearance in this episode's manifest — adult-mentor rule requires at least one (amend the manifest)" % rel)
    if meta.get("total_runtime_seconds") and abs(meta["total_runtime_seconds"] - prev_end) > 0.05:
        err("%s: _meta runtime %.2f != final clip end %.2f" % (rel, meta["total_runtime_seconds"], prev_end))

# ---------- 4. prompt packs ----------
AGE_RE = re.compile(r"\b\d+[- ]year[- ]old|\btoddler\b|\byoung child\b", re.I)
CAR_RE = re.compile(r"\bcars?\b", re.I)
# Real-world trademarks must never appear in a prompt, even negated (Koda v2 recall, 2026-07-11)
BRAND_RE = re.compile(r"\bnike\b|\badidas\b|\bpuma\b|\breebok\b|\bjordan\b|\bair max\b|\bconverse\b|\bvans\b|\bnew balance\b", re.I)
STALE = ["always barefoot", "ALWAYS BAREFOOT", "mint green onesie", "pose job d21cc872", "pose job eb81f712"]
for p, text in sorted(show_texts.items()):
    if not os.path.basename(p).startswith("new_assets"): continue
    rel = os.path.relpath(p, ROOT)
    for s in STALE:
        if s in text: err("%s: stale pre-v2 design language: %r" % (rel, s))
    # Banned-content checks run only INSIDE prompt blocks — doc prose legitimately
    # quotes the banned words when stating the rules that ban them.
    for block in re.findall(r"```(.*?)```", text, re.S):
        first = block.strip().splitlines()[0][:48] if block.strip() else "?"
        head = block.split("SCENE PROMPT:")[0]
        # skip the "SAFETY CHECK: ... CONFIRMED" attestation line the generator writes
        # into every block — it names the banned words in order to attest their absence
        scan = "\n".join(ln for ln in block.splitlines() if not ln.startswith("SAFETY CHECK"))
        if "Pixar" in scan: err("%s: 'Pixar' in prompt block (%s)" % (rel, first))
        for m in AGE_RE.finditer(scan):
            err("%s: age descriptor %r in prompt block (%s)" % (rel, m.group(0), first))
        # co-presence = both appear as character ENTRIES ("[Name ..." lines); notes may
        # legitimately mention the other dog's name in the exclusion rule text
        entries = {m.group(1) for m in re.finditer(r"^\[([A-Za-z ]+?)[\s\]<]", head, re.M)}
        entries |= {m.group(1) for m in re.finditer(r"^- ([A-Za-z ]+?):", head, re.M)}
        if "Bella" in entries and "Gabriel" in entries:
            err("%s: Bella and Gabriel share a CHARACTER LOCK block (%s)" % (rel, first))
        for m in CAR_RE.finditer(scan):
            err("%s: 'car' appears in a prompt block (%s)" % (rel, first))
        for m in BRAND_RE.finditer(scan):
            err("%s: trademark %r in a prompt block (%s)" % (rel, m.group(0), first))
        # Anatomy hard-set (creator-locked 2026-07-11)
        if "SAFETY CHECK" in block and "anatomy" not in block.lower():
            err("%s: SAFETY CHECK missing anatomy attestation (%s)" % (rel, first))
        if re.search(r"\[Mia\b", head) and "two low pigtails" not in block.lower():
            err("%s: Mia in shot without 'EXACTLY TWO low pigtails' language (%s)" % (rel, first))
        # NEEDS_DESIGN characters must never appear in prompts until their element is locked
        for nd in ("Randy", "Anne"):
            if re.search(r"\b%s\b" % nd, scan):
                err("%s: %s is NEEDS_DESIGN (no locked element) and must not be depicted (%s)" % (rel, nd, first))
        # Burned-in caption defect (2026-07-12): dialogue text in an image prompt gets
        # rendered as a caption. Prompts must not quote lines and must carry the no-text rule.
        if "Timed line:" in block:
            err("%s: 'Timed line:' dialogue text in an image prompt block — renders as burned-in caption (%s)" % (rel, first))
        if "SCENE PROMPT" in block and "NO on-screen text" not in block:
            err("%s: prompt block missing the no-on-screen-text rule (%s)" % (rel, first))
        # Hard rename 2026-07-11: the dog is GABRIEL — old name must not appear in new prompts
        if re.search(r"\bCommander\b", scan):
            err("%s: legacy name 'Commander' in a prompt block — the dog is GABRIEL (%s)" % (rel, first))
        if "CHARACTER LOCK" in block and "<<<" not in block and "[—]" not in head and "[Full crew" not in head:
            first = block.strip().splitlines()[0]
            names = re.findall(r"\[([A-Za-z ]+)\]", head)
            if any(n.strip() in locked for n in names):
                err("%s: prompt block %r names a locked character without an element tag" % (rel, first))

# ---------- 5. production_rules.json ----------
rules = json.load(open(os.path.join(SHOW, "production_rules.json")))
tm = rules["theme_intro_rule"].get("theme_master_repo_path")
if not tm or not os.path.exists(os.path.join(ROOT, tm)):
    err("production_rules.json: theme_master_repo_path missing on disk: %r" % tm)
fmts = rules["timing_rules"].get("episode_formats", {})
if not fmts: err("production_rules.json: episode_formats bands missing")
for label, band in fmts.items():
    if band["minimum_seconds"] >= band["maximum_seconds"]:
        err("production_rules.json: %s band min >= max" % label)
if "5575994" in rules["delivery_rules"]["make_delivery"] and "NOT delivery" not in rules["delivery_rules"]["make_delivery"]:
    err("production_rules.json: delivery still routed to Kling engine scenario 5575994")

# ---------- 6. locked masters ----------
def probe(path):
    try:
        out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                              "-of", "json", path], capture_output=True, text=True, timeout=30)
        if out.returncode == 0:
            return float(json.loads(out.stdout)["format"]["duration"])
    except (OSError, subprocess.TimeoutExpired, ValueError, KeyError):
        pass
    return None

MASTERS = [
    (os.path.join(SHOW, "theme-song/THEME-INTRO-MASTER.mp4"), 44.78, 0.15),
    (os.path.join(SHOW, "season_01/episodes/EP01_a-is-amazing/EP01-song-section-SYNCED.mp4"), 104.83, 0.20),
]
for path, want, tol in MASTERS:
    rel = os.path.relpath(path, ROOT)
    if not os.path.exists(path):
        err("locked master missing: %s" % rel); continue
    got = probe(path)
    if got is None:
        warn("%s: ffprobe unavailable — duration unverified (CI verifies)" % rel)
    elif abs(got - want) > tol:
        err("%s: duration %.2fs, expected %.2fs — master may have been regenerated/corrupted" % (rel, got, want))

# ---------- 7. naming ----------
ep_dir = os.path.join(SHOW, "season_01", "episodes")
EP_RE = re.compile(r"^EP\d{2}_[a-z0-9-]+$")
if os.path.isdir(ep_dir):
    for d in sorted(os.listdir(ep_dir)):
        if not EP_RE.match(d):
            err("episode folder violates EP##_slug naming: %s" % d)
for dirpath, dirnames, filenames in os.walk(SHOW):
    for fn in filenames:
        if " " in fn:
            err("filename contains spaces: %s" % os.path.relpath(os.path.join(dirpath, fn), ROOT))

# ---------- report ----------
for w in WARNS: print("WARN  %s" % w)
for e in ERRORS: print("ERROR %s" % e)
print("\npipeline_validate: %d error(s), %d warning(s)" % (len(ERRORS), len(WARNS)))
sys.exit(1 if ERRORS else 0)
