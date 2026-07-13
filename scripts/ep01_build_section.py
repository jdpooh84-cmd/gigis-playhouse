#!/usr/bin/env python3
"""Assemble one EP01 v2 section master from generated clips (runs in CI).

Reads a spec file (path via SECTION_SPEC env, default _staging/ep01_section_urls.json):
  {"section": "SEC-02", "out": "sections/EP01-SEC-02-story1-v2.mp4",
   "clips": [{"clip_id": "...", "url": "https://...mp4", "dur": 4.5,
              "vo_url": "https://...mp3"}, ...]}

Each clip is downloaded, trimmed to its slot duration `dur`, normalized to
720p30. Audio is the timing master: if the clip carries `vo_url`, that VO is
laid under the video and padded with trailing silence to exactly `dur` (so the
on-screen action holds the slot at real-time and the dialogue lands at the
top). Wordless beats (no vo_url) get exact-length silence. Clips are then
concatenated in list order; the result must match the slot sum.
"""
import json, os, subprocess, sys

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout); print(r.stderr); sys.exit("FAILED: %s" % " ".join(cmd[:6]))
    return r.stdout

spec = json.load(open(os.environ.get("SECTION_SPEC", "_staging/ep01_section_urls.json")))
os.makedirs("_staging/section_work", exist_ok=True)
os.makedirs(os.path.dirname(spec["out"]), exist_ok=True)

VF = ("scale=1280:720:force_original_aspect_ratio=decrease,"
      "pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30")

parts = []
total = 0.0
for i, c in enumerate(spec["clips"]):
    src = "_staging/section_work/src_%02d.mp4" % i
    out = "_staging/section_work/cut_%02d.mp4" % i
    run(["curl", "-sL", "-A", "Mozilla/5.0", "-o", src, c["url"]])
    if os.path.getsize(src) < 10000:
        sys.exit("download too small: %s %s" % (c["clip_id"], c["url"]))
    dur = "%.3f" % c["dur"]
    if c.get("vo_url"):
        # lay the VO under the clip; apad fills the rest of the slot with silence,
        # -t caps both streams at the slot length (VO always <= slot by construction)
        vo = "_staging/section_work/vo_%02d.mp3" % i
        run(["curl", "-sL", "-A", "Mozilla/5.0", "-o", vo, c["vo_url"]])
        if os.path.getsize(vo) < 1000:
            sys.exit("VO download too small: %s %s" % (c["clip_id"], c["vo_url"]))
        run(["ffmpeg", "-y", "-i", src, "-i", vo, "-t", dur,
             "-map", "0:v:0", "-map", "1:a:0", "-vf", VF, "-af", "apad",
             "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p",
             "-c:a", "aac", "-b:a", "128k", "-ar", "44100", out])
    else:
        # wordless action hold: exact-length silence
        run(["ffmpeg", "-y", "-i", src, "-f", "lavfi", "-i",
             "anullsrc=channel_layout=stereo:sample_rate=44100",
             "-t", dur, "-map", "0:v:0", "-map", "1:a:0", "-vf", VF,
             "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p",
             "-c:a", "aac", "-b:a", "128k", out])
    parts.append(out); total += c["dur"]
    print("cut %s -> %.2fs%s" % (c["clip_id"], c["dur"], " +VO" if c.get("vo_url") else ""))

with open("_staging/section_work/concat.txt", "w") as f:
    for p in parts:
        f.write("file '%s'\n" % os.path.abspath(p))
run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", "_staging/section_work/concat.txt",
     "-c", "copy", spec["out"]])

probe = run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=noprint_wrappers=1:nokey=1", spec["out"]]).strip()
print("SECTION %s: %d clips, target %.2fs, actual %ss -> %s" %
      (spec["section"], len(parts), total, probe, spec["out"]))
# frame/AAC-boundary rounding costs up to ~40ms per clip across the concat;
# sub-second drift is fine here (final timing locks at the episode audio mix)
tol = max(0.5, 0.04 * len(parts))
if abs(float(probe) - total) > tol:
    sys.exit("duration mismatch: target %.2f actual %s (tol %.2f)" % (total, probe, tol))
