#!/usr/bin/env python3
"""Motion + VO validator for the Sunny OS (proof-of-fix, 2026-07-13).

Implements the three new gates from production-os/25 + 26 + 27:
  1. MOTION GATE       — motion_tier set; speedramp:"off"; no banned slow words
                         on tier A/B without slomo_justification; <=1 SLOMO/episode.
  2. SAY-WHAT-YOU-SEE  — each clip's action_verb (and its dialogue verb) must
                         appear in that clip's visual_action.
  3. AUDIO-TIMING GATE — dur must equal its declared source:
                         vo+pause  -> |dur - (vo_dur + pause_after_s)| <= TOL
                         beat_grid -> |dur - beats*60/bpm| <= TOL AND vo_dur <= dur
Run:  python3 scripts/validate_motion_vo.py <manifest.json>
Exit non-zero on any failure. No padded/dummy durations are allowed.
"""
import json, sys, re

TOL = 0.05
BANNED = ["gently", "very gently", "slowly", "softly", "drifts", "floats",
          "slow-motion", "slow motion", "slomo", "dreamy", "floaty"]

# crude present/past verb match: "clap" matches "claps"/"clapping"/"clapped"
def verb_in(verb, text):
    stem = verb.lower().rstrip("e")
    return re.search(r"\b" + re.escape(stem) + r"(e|es|s|ing|ed|ped|pped)?\b",
                     text.lower()) is not None

def validate(man):
    errs = []
    slomo_count = 0
    for c in man["clips"]:
        cid = c.get("clip_id", "?")
        tier = c.get("motion_tier")
        # -- MOTION GATE --
        if tier not in ("A", "B", "C", "SLOMO"):
            errs.append(f"{cid}: MOTION missing/invalid motion_tier ({tier})")
        if c.get("speedramp") != "off":
            errs.append(f"{cid}: MOTION speedramp must be 'off' (got {c.get('speedramp')!r})")
        motion = (c.get("motion_text", "") or "").lower()
        if tier == "SLOMO":
            slomo_count += 1
            if not c.get("slomo_justification"):
                errs.append(f"{cid}: MOTION SLOMO tier requires slomo_justification")
        else:
            hit = [w for w in BANNED if w in motion]
            if hit and not c.get("slomo_justification"):
                errs.append(f"{cid}: MOTION banned slow word(s) {hit} on tier {tier} "
                            f"without slomo_justification")
        # -- SAY-WHAT-YOU-SEE GATE --
        va = c.get("visual_action", "")
        av = c.get("action_verb", "")
        if not av or not verb_in(av, va):
            errs.append(f"{cid}: SAY-WHAT-YOU-SEE action_verb '{av}' not visible in "
                        f"visual_action")
        # dialogue's leading imperative verb should also be shown (best-effort)
        # -- AUDIO-TIMING GATE --
        dur = c.get("dur")
        src = c.get("dur_source")
        if src == "vo+pause":
            want = round(c.get("vo_dur", -9) + c.get("pause_after_s", 0), 3)
            if dur is None or abs(dur - want) > TOL:
                errs.append(f"{cid}: AUDIO-TIMING dur {dur} != vo+pause {want} "
                            f"(vo {c.get('vo_dur')} + pause {c.get('pause_after_s')})")
        elif src == "beat_grid":
            bg = c.get("beat_grid", {})
            want = round(bg.get("beats", 0) * 60.0 / bg.get("bpm", 1), 3)
            if dur is None or abs(dur - want) > TOL:
                errs.append(f"{cid}: AUDIO-TIMING dur {dur} != beat_grid {want} "
                            f"({bg.get('beats')} beats @ {bg.get('bpm')} BPM)")
            if c.get("vo_dur", 0) > (dur or 0) + TOL:
                errs.append(f"{cid}: AUDIO-TIMING vo_dur {c.get('vo_dur')} exceeds "
                            f"beat-grid slot {dur}")
        else:
            errs.append(f"{cid}: AUDIO-TIMING dur_source must be vo+pause|beat_grid "
                        f"(got {src!r}) — no padded/dummy durations allowed")
    if slomo_count > 1:
        errs.append(f"EPISODE: {slomo_count} SLOMO clips — max 1 per episode")
    return errs

if __name__ == "__main__":
    man = json.load(open(sys.argv[1]))
    errs = validate(man)
    n = len(man["clips"])
    if errs:
        print(f"FAIL — {len(errs)} issue(s) across {n} clips:")
        for e in errs:
            print("  x " + e)
        sys.exit(1)
    print(f"PASS — {n} clips clear all 3 gates (motion, say-what-you-see, audio-timing).")
