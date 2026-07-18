#!/usr/bin/env python3
"""Re-time a song's timeline to the REAL sung-lyric windows (transcript-driven).

Usage: python3 scripts/song_retime.py <song_dir>

Reads _staging/<song_dir>/retime.json — a hand-authored timeline built from the transcript:
  [ ["CLIP_ID", end_seconds, "section", "lyric note"], ... ]   # start = previous end; from 0
Clips may repeat (reuse strong chorus/up-down clips instead of over-stretching short clips).
Writes _staging/<song_dir>/shot_spec.json with the re-timed clips, preserving the song's
audio/out/logo/style fields. Captions are burned separately from captions.json, so overlays=[].
"""
import json, sys

SONG = sys.argv[1].strip("/").split("/")[-1]
D = f"_staging/{SONG}"
RES = json.load(open(f"{D}/video_results.json"))
OLD = json.load(open(f"{D}/shot_spec.json"))
TL  = json.load(open(f"{D}/retime.json"))

for e in TL:
    if e[0] not in RES:
        raise SystemExit("retime references missing clip: %s (have %s)" % (e[0], sorted(RES)))

clips=[]; start=0.0
for i,e in enumerate(TL):
    cid=e[0]; end=float(e[1])
    sec=e[2] if len(e)>2 else ""
    note=e[3] if len(e)>3 else ""
    dur=round(end-start,3)
    if dur<=0: raise SystemExit("non-increasing timeline at index %d (%s end=%.2f)"%(i,cid,end))
    clips.append({"clip_id":cid,"section":sec,"start":round(start,3),"end":round(end,3),
                  "dur":dur,"kind":"end" if i==len(TL)-1 else ("title" if i==0 else "word"),
                  "logo":(i==0),"note":note,"overlays":[]})
    start=end

spec={"song":OLD["song"],"audio":OLD["audio"],"duration":OLD["duration"],"n":len(clips),
      "out":OLD["out"],"logo":OLD.get("logo"),"style":OLD.get("style",""),"clips":clips}
json.dump(spec,open(f"{D}/shot_spec.json","w"),indent=2)
print("re-timed %s: %d entries, last end %.2f (audio dur %.2f)"%(SONG,len(clips),start,OLD["duration"]))
for c in clips:
    print("  %-5s %-14s %7.2f-%7.2f (%4.1fs) logo=%s  %s"%(c["clip_id"],c["section"],c["start"],c["end"],c["dur"],c["logo"],c["note"]))
