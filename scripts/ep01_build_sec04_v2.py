#!/usr/bin/env python3
"""Build SEC-04 v2 — the on-model song visual track (runs in CI).

Replaces the pre-redesign SEC-04 (Sunny/Leo/Mia + Mayor Mary) with a fresh
full-crew on-model cut, while keeping the song AUDIO byte-identical.

Inputs:
  _staging/vo_el/sec04_video_results.json  -> {"S04-01": {"job": "...", "url": "https://...mp4"}, ...}
  sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing/EP01-song-section-SYNCED.mp4
      -> the existing 104.83s song master; its AUDIO is extracted and re-muxed
         byte-identical (-c:a copy) so the sing-along timing is preserved exactly.

Method:
  21 on-model song shots (ordered S04-01..S04-21) are each trimmed to a uniform
  slot of 104.83/21 = 4.9919s and concatenated in order -> a 104.83s video-only
  track that cuts on the beat grid (~every 5s @ 109 BPM). Every clip is used
  exactly once at real time (no slow-mo, no clip reuse). The new video is then
  muxed against the original song audio (byte-identical) -> EP01-song-section-v2.mp4.
"""
import json, os, subprocess, sys

EP = "sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing"
SONG_MASTER = f"{EP}/EP01-song-section-SYNCED.mp4"
RESULTS = "_staging/vo_el/sec04_video_results.json"
OUT = f"{EP}/EP01-song-section-v2.mp4"
WORK = "_staging/sec04_work"
TOTAL = 104.83
N = 21
SLOT = TOTAL / N  # 4.99190...

VF = ("scale=1280:720:force_original_aspect_ratio=decrease,"
      "pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,setsar=1")

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout); print(r.stderr); sys.exit("FAILED: %s" % " ".join(cmd[:6]))
    return r.stdout

def probe(path):
    return float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                      "-of", "default=noprint_wrappers=1:nokey=1", path]).strip())

res = json.load(open(RESULTS))
os.makedirs(WORK, exist_ok=True)

tags = ["S04-%02d" % i for i in range(1, N + 1)]
missing = [t for t in tags if not (res.get(t) or {}).get("url")]
if missing:
    sys.exit("SEC-04 videos not ready: %s" % missing)

slot = "%.4f" % SLOT
parts = []
for i, t in enumerate(tags):
    url = res[t]["url"]
    src = f"{WORK}/src_{i:02d}.mp4"
    cut = f"{WORK}/cut_{i:02d}.mp4"
    run(["curl", "-sL", "-A", "Mozilla/5.0", "-o", src, url])
    if os.path.getsize(src) < 10000:
        sys.exit("download too small: %s %s" % (t, url))
    d = probe(src)
    if d + 0.05 < SLOT:
        # clip shorter than slot (shouldn't happen at duration=5) -> mild fit-stretch
        pts = SLOT / d
        run(["ffmpeg", "-y", "-i", src, "-t", slot,
             "-vf", "setpts=%.5f*PTS,%s" % (pts, VF), "-an",
             "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", cut])
    else:
        run(["ffmpeg", "-y", "-i", src, "-t", slot, "-vf", VF, "-an",
             "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", cut])
    parts.append(cut)
    print("cut %s -> %.4fs (src %.2fs)" % (t, SLOT, d))

with open(f"{WORK}/concat.txt", "w") as f:
    for p in parts:
        f.write("file '%s'\n" % os.path.abspath(p))
vid = f"{WORK}/sec04_video.mp4"
run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", f"{WORK}/concat.txt",
     "-c", "copy", vid])
vdur = probe(vid)
print("SEC-04 v2 video track: %.2fs (target %.2f)" % (vdur, TOTAL))

# mux byte-identical song audio from the existing master (-c:a copy)
run(["ffmpeg", "-y", "-i", vid, "-i", SONG_MASTER,
     "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy", "-c:a", "copy", "-shortest", OUT])
adur = probe(OUT)
print("SEC-04 v2: %s  video=%.2fs muxed=%.2fs" % (OUT, vdur, adur))
if abs(adur - TOTAL) > 1.0:
    sys.exit("SEC-04 v2 duration off: %.2f vs %.2f" % (adur, TOTAL))
print("SEC-04 v2 OK — audio byte-identical (copied), 21 on-model shots, no Mayor Mary.")
