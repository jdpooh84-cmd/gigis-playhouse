#!/usr/bin/env python3
"""Assemble one EP01 v2 section master from generated clips (runs in CI).

Reads _staging/ep01_section_urls.json:
  {"section": "SEC-02", "out": "sections/EP01-SEC-02-story1-v1.mp4",
   "clips": [{"clip_id": "...", "url": "https://...mp4", "dur": 4.0}, ...]}

Each clip is downloaded, trimmed to its manifest duration, normalized to
720p30 with a silent stereo track (VO lands later — audio is the timing
master, so the silent track holds each slot to the exact manifest length),
then concatenated in list order. The result must match the manifest sum.
"""
import json, os, subprocess, sys

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout); print(r.stderr); sys.exit("FAILED: %s" % " ".join(cmd[:6]))
    return r.stdout

spec = json.load(open("_staging/ep01_section_urls.json"))
os.makedirs("_staging/section_work", exist_ok=True)
os.makedirs(os.path.dirname(spec["out"]), exist_ok=True)

parts = []
total = 0.0
for i, c in enumerate(spec["clips"]):
    src = "_staging/section_work/src_%02d.mp4" % i
    out = "_staging/section_work/cut_%02d.mp4" % i
    run(["curl", "-sL", "-A", "Mozilla/5.0", "-o", src, c["url"]])
    if os.path.getsize(src) < 10000:
        sys.exit("download too small: %s %s" % (c["clip_id"], c["url"]))
    # trim to manifest duration, normalize fps/size, replace audio with exact-length silence
    run(["ffmpeg", "-y", "-i", src, "-f", "lavfi", "-i",
         "anullsrc=channel_layout=stereo:sample_rate=44100",
         "-t", "%.3f" % c["dur"], "-map", "0:v:0", "-map", "1:a:0",
         "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30",
         "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
         "-c:a", "aac", "-b:a", "128k", "-shortest", out])
    parts.append(out); total += c["dur"]
    print("cut %s -> %.2fs" % (c["clip_id"], c["dur"]))

with open("_staging/section_work/concat.txt", "w") as f:
    for p in parts:
        f.write("file '%s'\n" % os.path.abspath(p))
run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", "_staging/section_work/concat.txt",
     "-c", "copy", spec["out"]])

probe = run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=noprint_wrappers=1:nokey=1", spec["out"]]).strip()
print("SECTION %s: %d clips, target %.2fs, actual %ss -> %s" %
      (spec["section"], len(parts), total, probe, spec["out"]))
if abs(float(probe) - total) > 0.5:
    sys.exit("duration mismatch: target %.2f actual %s" % (total, probe))
