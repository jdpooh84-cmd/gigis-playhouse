#!/usr/bin/env python3
"""Re-time the Jump With Me timeline so each dance action lands on its REAL sung lyric.

The original shots sat on an even ~9s grid that drifted from the audio (by up to ~12s in the
back half), so the moves ran ahead of / behind the words. Using the transcript's actual lyric
times, this rebuilds shot_spec.json as a sequence of (clip, window) entries placed on the real
lyric boundaries. Windows never exceed the clip's rendered length (J01-J14 = 10s, J15-J17 = 5s),
so there is no heavy slow-tail; a few 10s chorus/up-down clips are REUSED to cover the long final
sections rather than over-stretching the 5s clips. Captions come from captions.json (audio-synced),
so words + moves + audio all line up.
"""
import json

RES = json.load(open("_staging/jump/video_results.json"))
OLD = json.load(open("_staging/jump/shot_spec.json"))

# (clip_id, end_time, section, action-note) — start = previous end; times from the transcript.
TL = [
 ("J01",  10.14, "Intro",        "intro chant 'jump jump with me, happy and free'"),
 ("J02",  13.84, "Verse 1",      "stretch your arms up to the sky"),
 ("J03",  18.44, "Verse 1",      "feet on the floor, jump so high"),
 ("J04",  27.62, "Verse 1",      "1-2-3-4 touch the door / 5-6-7-8 feeling great"),
 ("J05",  37.02, "Pre-Chorus 1", "ready ready, can you jump, clap your hands"),
 ("J06",  43.78, "Chorus 1",     "jump with me, jump so high touch the sky"),
 ("J07",  53.92, "Chorus 1",     "up and down, round and round"),
 ("J08",  63.82, "Verse 2",      "now we wiggle, shake left and right"),
 ("J09",  72.90, "Verse 2",      "jump and spin like a twister, toes up toes down"),
 ("J06",  77.58, "Verse 2",      "jump and laugh and jump some more (reuse chorus jumps)"),
 ("J10",  86.68, "Pre-Chorus 2", "ready ready, can you jump, clap your hands"),
 ("J11",  93.36, "Chorus 2",     "everybody jump with me, touch the sky"),
 ("J12", 100.22, "Chorus 2",     "up and down, round and round"),
 ("J13", 110.20, "Bridge",       "come jump with me, quiet like a mouse"),
 ("J14", 118.28, "Bridge",       "now jump LOUD, make us proud"),
 ("J11", 127.46, "Final Chorus", "jump with me, touch the sky (reuse chorus)"),
 ("J12", 132.64, "Final Chorus", "up and down, round and round (reuse up-down)"),
 ("J15", 137.90, "Outro",        "jump jump one more time"),
 ("J16", 143.20, "Outro",        "jump jump feeling fine"),
 ("J17", 148.52, "Outro",        "feeling fine / we don't stop"),
]

for cid, *_ in TL:
    if cid not in RES:
        raise SystemExit("missing clip in video_results: %s" % cid)

clips = []
start = 0.0
for i, (cid, end, sec, note) in enumerate(TL):
    dur = round(end - start, 3)
    if dur <= 0:
        raise SystemExit("non-increasing timeline at %s" % cid)
    clips.append({
        "clip_id": cid,
        "section": sec,
        "start": round(start, 3),
        "end": round(end, 3),
        "dur": dur,
        "kind": "end" if i == len(TL) - 1 else ("title" if i == 0 else "word"),
        "logo": (i == 0),
        "note": note,
        "overlays": [],   # captions are burned globally from captions.json (audio-synced)
    })
    start = end

spec = {
    "song": OLD["song"], "audio": OLD["audio"], "duration": OLD["duration"],
    "n": len(clips), "out": OLD["out"], "logo": OLD["logo"], "style": OLD.get("style", ""),
    "clips": clips,
}
json.dump(spec, open("_staging/jump/shot_spec.json", "w"), indent=2)
print("re-timed %d timeline entries (audio dur %.2f, last end %.2f)" % (len(clips), OLD["duration"], start))
for c in clips:
    print("  %-4s %-13s %7.2f-%7.2f (%4.1fs) logo=%s  %s"
          % (c["clip_id"], c["section"], c["start"], c["end"], c["dur"], c["logo"], c["note"]))
