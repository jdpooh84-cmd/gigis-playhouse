#!/usr/bin/env python3
"""Assemble EP01_full_build_audit.md from the REAL repo files.

Embeds actual script/config contents (no paraphrase) and computes the EP01
shot map from the real build specs + locally-probed VO durations, using the
exact slot logic from ep01_build_sec03_pilot.py.
"""
import json, os, subprocess

EP = "sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing"
OUT = f"{EP}/EP01_full_build_audit.md"

# ---- constants copied verbatim from ep01_build_sec03_pilot.py ----
LIPSYNC_OFFSET = 0.40
TAIL_PAUSE     = 0.45
TAIL_SLOW_REGION = 1.2
SEC_OFFSETS = {"SEC-01":0.0, "SEC-02":44.80, "SEC-03":128.83, "SEC-04":191.96, "SEC-05":296.76}
BATCH2_RERENDERS = {"EP01-NP-N01","EP01-NP-N02","EP01-NP-N03","EP01-P3-11","EP01-P3-17","EP01-P3-19"}

def probe(p):
    try:
        return float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration",
            "-of","default=nk=1:nw=1",p],capture_output=True,text=True).stdout.strip())
    except Exception:
        return None

def local_vo(url):
    if not url: return None
    if "/pilot/" in url: return "_staging/vo_el/pilot/"+url.rsplit("/",1)[1]
    return "_staging/vo_el/"+url.rsplit("/",1)[1]

def speakers():
    m={}
    for f in ("_staging/vo_el/manifest.json","_staging/vo_el/pilot/manifest.json"):
        if os.path.exists(f):
            for c in json.load(open(f)).get("clips",[]): m[c["clip_id"]]=c.get("speaker","")
    led=json.load(open("_staging/sec03_pilot/pilot_ledger.json"))
    for r in led["lines"]: m.setdefault(r["clip_id"],r.get("speaker",""))
    # batch2 overrides (speaker of record)
    for r in json.load(open("_staging/vo_el/batch2_ledger.json"))["lines"]:
        m[r["clip_id"]]=r["speaker"]
    return m

SPK = speakers()

def shot_rows(spec_path, section, wordless_srclen_note="src-length"):
    d=json.load(open(spec_path)); rows=[]; t=0.0
    for c in d["clips"]:
        cid=c["clip_id"]; off=float(c.get("offset",LIPSYNC_OFFSET)); wait=float(c.get("audience_wait",0.0))
        vo=local_vo(c.get("vo_url")); volen=probe(vo) if vo else None
        if c.get("vo_url"):
            slot=max(off+(volen or 0)+TAIL_PAUSE+wait, float(c.get("dur",0)))
            slot_src="max(off+vo+0.45+wait, dur)"
        else:
            slot=float(c.get("dur",0)) or None
            slot_src="dur (else source-length, uncertain)"
        start=t; end=(t+slot) if slot else None; t=end if end else t
        vid=(c.get("video_url","") or "").rsplit("/",1)[-1]
        rows.append(dict(cid=cid, section=section, start=start, end=end,
            abs_start=SEC_OFFSETS[section]+start if end is not None else None,
            vid=vid, vo=os.path.basename(vo) if vo else "(wordless)",
            spk=SPK.get(cid,""), tag=c.get("name_tag",""), letter=c.get("letter",""),
            wait=wait, off=off, volen=volen, slot=slot,
            rerender="Batch2" if cid in BATCH2_RERENDERS else "",
            fill="full-motion / slow-tail if slot>clip"))
    return rows, t

def emb(path, lang="python"):
    if not os.path.exists(path): return f"\n> **MISSING FILE:** `{path}` (does not exist)\n"
    body=open(path).read()
    return f"\n### `{path}`\n```{lang}\n{body}\n```\n"

def tree():
    lines=[]
    groups=[
      ("EPISODE OUTPUTS + DOCS + CONFIG", EP, ("mp4","md","json","txt")),
    ]
    out=["```",
"gigis-playhouse/",
"├── scripts/                              # all Python build logic (runs in CI)",
"│   ├── ep01_make_sec03_build_spec.py     # join render_results + ledger -> build_spec.json",
"│   ├── ep01_build_sec03_pilot.py         # CORE builder: VO re-time, overlays, sync-gate, fill/slow-tail",
"│   ├── ep01_build_sec04_v2.py            # SEC-04 song: 21 shots -> 104.83s, mux byte-identical audio",
"│   ├── ep01_stitch_final.py              # concat 5 sections + intro-logo overlay -> FINAL",
"│   ├── ep01_batch2_swap.py               # swap re-rendered Coda/Mimi/Bram/Pippa URLs into specs",
"│   ├── generate_elevenlabs_vo.py         # ElevenLabs TTS (locked voices) -> mp3 + manifest",
"│   └── (older/aux) build_ep01_assets.py, build_ep01_v2_manifest.py, ep01_build_section.py,",
"│        ep01_collect_sections.py, ep01_remap_lipsync_sections.py, ep01_sync_song.py,",
"│        ep01_apply_el_vo.py, elevenlabs_verify.py, collect_demo_assets.py",
"├── .github/workflows/",
"│   ├── ep01-sec03-pilot.yml              # ACTIVE: build SEC-02v3/03/05v3 + stitch (trigger: build.trigger)",
"│   ├── ep01-batch2-vo.yml                # regen Batch-2 VO (trigger: batch2.trigger)",
"│   ├── ep01-pilot-vo.yml                 # regen SEC-03 pilot VO (trigger: vo.trigger)",
"│   └── (older) ep01-sections.yml, ep01-voice.yml, ep01-voice-verify.yml, ep01-sync-song.yml",
"├── _staging/",
"│   ├── sec03_pilot/",
"│   │   ├── build_spec.json               # GENERATED each CI run (pilot, 23 clips)",
"│   │   ├── build_spec_sec02.json         # SEC-02 name-day (18 clips)",
"│   │   ├── build_spec_sec05.json         # SEC-05 reflection (12 clips)",
"│   │   ├── pilot_ledger.json             # SEC-03 lines: speaker/render_text/letter/name_tag/offset",
"│   │   ├── render_spec.json              # SEC-03 start_image (seedance) map",
"│   │   └── build.trigger / vo.trigger    # CI trigger files",
"│   └── vo_el/",
"│       ├── EP01-NP-*.mp3   (51 files)    # SEC-02/05 dialogue VO",
"│       ├── manifest.json                 # SEC-02/05 VO: clip_id/speaker/voice_id/dur/text",
"│       ├── batch2_ledger.json            # Coda/Mimi/Bram/Pippa regen lines",
"│       ├── sec04_video_results.json      # S04-01..21 song clip URLs",
"│       └── pilot/",
"│           ├── EP01-P3-*.mp3  (23 files) # SEC-03 pilot VO",
"│           ├── manifest.json             # pilot VO manifest",
"│           └── render_results.json       # pilot clip_id -> seedance video URL",
"├── sections/                             # per-section rendered masters (git-committed)",
"│   ├── EP01-SEC-02-story1-v3.mp4         # (v1/v2 superseded)",
"│   ├── EP01-SEC-03-pilot.mp4",
"│   └── EP01-SEC-05-reflection-v3.mp4",
"├── sunny-and-the-crew/",
"│   ├── theme-song/THEME-INTRO-MASTER.mp4 # SEC-01 (44.80s, LOCKED master; logo overlaid at stitch)",
"│   ├── production-os/voice_map_elevenlabs.json  # locked character->voice_id",
"│   └── season_01/episodes/EP01_a-is-amazing/",
"│       ├── EP01-A-is-for-amazing-FINAL.mp4       # FINAL (5:52.41)",
"│       ├── EP01-song-section-v2.mp4              # SEC-04 (104.80s, on-model crew)",
"│       ├── EP01-song-section-SYNCED.mp4          # SEC-04 audio source (byte-identical mux)",
"│       ├── song_sections.json / lyrics.txt       # song timing + lyrics",
"│       ├── EP01_repair_contract_plan.md          # running change log / decisions",
"│       └── (other docs/manifests, see full list below)",
"└── _staging/audio/a-is-amazing.mp3        # song master audio",
"```"]
    return "\n".join(out)

# ---------- build shot map ----------
r_pilot,t_pilot = shot_rows("_staging/sec03_pilot/build_spec.json","SEC-03")
r_02,t_02 = shot_rows("_staging/sec03_pilot/build_spec_sec02.json","SEC-02")
r_05,t_05 = shot_rows("_staging/sec03_pilot/build_spec_sec05.json","SEC-05")

def fmt_rows(rows):
    o=["| shot | sec-start | sec-end | abs | video file | audio | speaker | name_tag | letter | vo(s) | off | wait | slot | re-render |",
       "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|"]
    for r in rows:
        o.append("| %s | %s | %s | %s | %s | %s | %s | %s | %s | %s | %.2f | %.1f | %s | %s |"%(
            r["cid"],
            "%.2f"%r["start"], ("%.2f"%r["end"]) if r["end"] is not None else "?",
            ("%.2f"%r["abs_start"]) if r["abs_start"] is not None else "?",
            (r["vid"][:38] or "-"), r["vo"], r["spk"], r["tag"] or "-", r["letter"] or "-",
            ("%.2f"%r["volen"]) if r["volen"] is not None else "-",
            r["off"], r["wait"], ("%.2f"%r["slot"]) if r["slot"] else "src?", r["rerender"] or "-"))
    return "\n".join(o)

doc = []
doc.append("# EP01 — FULL BUILD AUDIT / PIPELINE DUMP\n")
doc.append("_Generated from the real repo files by `scripts/ep01_make_build_audit.py`. "
           "Shot-map timings are computed with the exact slot logic in `ep01_build_sec03_pilot.py`, "
           "using locally-probed VO durations. Source-clip lengths (vlen) live on the firewalled render "
           "CDN and are re-probed in CI at build time — where a slot depends on vlen it is labelled uncertain._\n")

doc.append("## 1) FULL PROJECT FILE TREE\n"+tree()+"\n")

doc.append("""## 2) BUILD PIPELINE OVERVIEW (EP01-specific)

**Inputs:** seedance video clips (URLs in `render_results.json` / `sec04_video_results.json`), ElevenLabs
VO mp3s (`_staging/vo_el/**`), the two LOCKED masters (SEC-01 `THEME-INTRO-MASTER.mp4`, SEC-04
`EP01-song-section-SYNCED.mp4` audio), and the per-section build specs.

**Order of execution (all in GitHub Actions, ffmpeg static build):**

1. **VO generation** (`generate_elevenlabs_vo.py`, workflows `ep01-pilot-vo.yml` / `ep01-batch2-vo.yml`):
   reads a ledger (speaker + render_text), maps speaker→voice_id via `voice_map_elevenlabs.json`,
   POSTs ElevenLabs TTS, writes one mp3 per clip + a manifest. Runs only when a `*.trigger` changes.

2. **Spec assembly** (`ep01_make_sec03_build_spec.py`): joins `render_results.json` (video URL per clip)
   with `pilot_ledger.json` (letter / name_tag / audience_wait / offset) → `build_spec.json` for SEC-03.
   SEC-02 and SEC-05 specs (`build_spec_sec02.json`, `build_spec_sec05.json`) are hand-maintained.
   `VO_PIN_SHA` pins the raw VO URL to a commit so CI never reads a cached old take.

3. **Section build** (`ep01_build_sec03_pilot.py`, run 3× — SEC-03 pilot, then SEC-02, then SEC-05 via
   `SEC03_SPEC=`): per clip it (a) downloads the video + VO, (b) computes the **slot** (timing master),
   (c) re-times the VO onto the mouth wind-up (`adelay` by `offset`, default 0.40s), (d) composites the
   **letter glyph** + **name-tag** overlays, (e) plays **full motion** to fill the slot, slowing only the
   resting tail if the slot is longer than the clip (**no freeze**), (f) runs the **sync-gate** (asserts
   audio onset ∈ band), then concatenates all clips → the section mp4.

4. **SEC-04 song** (`ep01_build_sec04_v2.py`): 21 clips each trimmed to 104.83/21 = 4.992s, concatenated,
   then muxed against the ORIGINAL song audio (`-c:a copy`, byte-identical). Built separately; the
   committed `EP01-song-section-v2.mp4` is consumed as-is by the stitch.

5. **Stitch** (`ep01_stitch_final.py`): normalizes all 5 sections to 1280×720/30, composites the
   **intro-logo** overlay onto SEC-01's first 3.5s, concatenates → `EP01-A-is-for-amazing-FINAL.mp4`,
   and runs duration/size guards.

**Which step handles what:**
- clip selection → `prefer()` in `ep01_stitch_final.py` (v3 > v2 > v1; pilot > story2)
- VO assignment → `vo_url` per clip in the specs; `voice_for()` in `generate_elevenlabs_vo.py`
- lip-sync / mouth → seedance `audio_references` at RENDER time (not in this repo's ffmpeg); assembly only
  RE-TIMES the finished VO onto the mouth via `adelay` (offset). Sync is approximate, not frame-exact.
- ghost-mouth trim → **opt-in only** now: `ghost_trim:true` per clip cuts at speech-end (none set)
- freeze removal → the fill block in `ep01_build_sec03_pilot.py` (full motion instead of clone-freeze)
- slow-tail → same block: `setpts` slow of the resting tail when slot > clip length
- overlays (letter + name tag) → `letter_ov()` drawtext in `ep01_build_sec03_pilot.py`
- logo → `LOGO_VF` drawtext in `ep01_stitch_final.py`, applied to SEC-01 only
- final stitch → `ep01_stitch_final.py`
- QC → sync-gate (build) + duration/size guards (stitch); freezedetect/mpdecimate run manually
""")

doc.append("## 4) EP01 SHOT MAP\n")
doc.append("**SEC-01 (0:00–0:44.80):** LOCKED master `THEME-INTRO-MASTER.mp4`. "
           "Intro-logo overlay composited on 0.0–3.55s (title 'Sunny and the Crew', hold 2.5s + 1s fade). "
           "No per-shot spec (single master).\n")
doc.append("\n### SEC-02 — Name Day (abs offset 44.80s), computed total %.2fs\n"%t_02+fmt_rows(r_02))
doc.append("\n\n### SEC-03 — Games pilot (abs offset 128.83s), computed total %.2fs\n"%t_pilot+fmt_rows(r_pilot))
doc.append("\n\n### SEC-04 — Song (abs offset 191.96s): 21 shots S04-01..21, each 4.992s, audio byte-identical. "
           "Prop/lip-sync fixes proposed but NOT executed (awaiting approval).\n")
doc.append("\n### SEC-05 — Reflection (abs offset 296.76s), computed total %.2fs\n"%t_05+fmt_rows(r_05))
doc.append("\n\n_Video-file column = basename of the seedance CDN URL in each spec. "
           "'Batch2' re-render = clip whose video was re-rendered with new audio (Coda/Mimi/Bram/Pippa)._\n")

doc.append("\n## 3) FULL SOURCE CODE / CONFIG (verbatim)\n")
for p,l in [
  ("scripts/ep01_make_sec03_build_spec.py","python"),
  ("scripts/ep01_build_sec03_pilot.py","python"),
  ("scripts/ep01_build_sec04_v2.py","python"),
  ("scripts/ep01_stitch_final.py","python"),
  ("scripts/ep01_batch2_swap.py","python"),
  ("scripts/generate_elevenlabs_vo.py","python"),
  (".github/workflows/ep01-sec03-pilot.yml","yaml"),
  (".github/workflows/ep01-batch2-vo.yml","yaml"),
  ("_staging/sec03_pilot/pilot_ledger.json","json"),
  ("_staging/sec03_pilot/build_spec_sec02.json","json"),
  ("_staging/sec03_pilot/build_spec_sec05.json","json"),
  ("_staging/vo_el/batch2_ledger.json","json"),
  ("_staging/vo_el/pilot/render_results.json","json"),
  ("sunny-and-the-crew/production-os/voice_map_elevenlabs.json","json"),
]:
    doc.append(emb(p,l))

open(OUT,"w").write("\n".join(doc))
print("wrote",OUT,"(%d bytes)"%os.path.getsize(OUT))
print("SEC-02 total %.2f | SEC-03 total %.2f | SEC-05 total %.2f"%(t_02,t_pilot,t_05))
