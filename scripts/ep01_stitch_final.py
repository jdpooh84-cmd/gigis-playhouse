#!/usr/bin/env python3
"""Stitch the full EP01 from its five sections (runs in CI).

Order (SEC-01 theme + SEC-04 song are the LOCKED masters — content untouched;
they are only re-encoded to a common 720p30 container so the concat is seamless):
  SEC-01  sunny-and-the-crew/theme-song/THEME-INTRO-MASTER.mp4
  SEC-02  sections/EP01-SEC-02-story1-v2.mp4
  SEC-03  sections/EP01-SEC-03-story2-v2.mp4
  SEC-04  sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing/EP01-song-section-SYNCED.mp4
  SEC-05  sections/EP01-SEC-05-reflection-v2.mp4
Output: sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing/EP01-A-is-for-amazing-FINAL.mp4
"""
import json, os, subprocess, sys

EP = "sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing"
SECTIONS = [
    ("SEC-01", "sunny-and-the-crew/theme-song/THEME-INTRO-MASTER.mp4"),
    ("SEC-02", "sections/EP01-SEC-02-story1-v2.mp4"),
    ("SEC-03", "sections/EP01-SEC-03-story2-v2.mp4"),
    ("SEC-04", os.path.join(EP, "EP01-song-section-SYNCED.mp4")),
    ("SEC-05", "sections/EP01-SEC-05-reflection-v2.mp4"),
]
OUT = os.path.join(EP, "EP01-A-is-for-amazing-FINAL.mp4")
VF = ("scale=1280:720:force_original_aspect_ratio=decrease,"
      "pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,setsar=1")

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout); print(r.stderr); sys.exit("FAILED: %s" % " ".join(cmd[:6]))
    return r.stdout

def dur(path):
    return float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                      "-of", "default=noprint_wrappers=1:nokey=1", path]).strip())

os.makedirs("_staging/stitch_work", exist_ok=True)
parts, rows, total = [], [], 0.0
for i, (name, src) in enumerate(SECTIONS):
    if not os.path.exists(src):
        sys.exit("missing section source: %s (%s)" % (name, src))
    norm = "_staging/stitch_work/%s.mp4" % name
    run(["ffmpeg", "-y", "-i", src, "-vf", VF, "-r", "30",
         "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p",
         "-c:a", "aac", "-b:a", "160k", "-ar", "44100", "-ac", "2", norm])
    d = dur(norm)
    parts.append(norm); rows.append((name, src, d)); total += d
    print("normalized %s -> %.2fs (%s)" % (name, d, src))

with open("_staging/stitch_work/concat.txt", "w") as f:
    for p in parts:
        f.write("file '%s'\n" % os.path.abspath(p))
run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", "_staging/stitch_work/concat.txt",
     "-c", "copy", OUT])

fd = dur(OUT)
print("\n=== EP01 FINAL ===")
for name, src, d in rows:
    print("  %s  %6.2fs  %d:%05.2f" % (name, d, int(d)//60, d % 60))
print("  TOTAL %6.2fs = %d:%05.2f -> %s" % (fd, int(fd)//60, fd % 60, OUT))

# SEC-04 content guard: the song master must remain ~104.83s (unchanged editorially)
sec04 = [d for n, s, d in rows if n == "SEC-04"][0]
if abs(sec04 - 104.83) > 1.5:
    sys.exit("SEC-04 duration drift: %.2f (expected ~104.83) — song master may be wrong file" % sec04)
if abs(fd - total) > 1.0:
    sys.exit("final duration mismatch: parts sum %.2f vs actual %.2f" % (total, fd))
print("OK: SEC-04 intact (%.2fs), final assembled." % sec04)
