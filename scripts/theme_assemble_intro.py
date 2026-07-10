#!/usr/bin/env python3
"""Assemble THEME-INTRO-MASTER.mp4 — the one-time reusable show intro.

Downloads the 19 theme clips (URLs in _staging/theme_clip_urls.json), trims each
to the theme bible cut map scaled to the ACTUAL Suno render (44.784s), concats
at 720p30, and muxes _staging/audio/sunny-and-the-crew-THEME.mp3.
"""
import json, subprocess, sys, urllib.request, pathlib

AUDIO = "_staging/audio/sunny-and-the-crew-THEME.mp3"
URLS = json.load(open("_staging/theme_clip_urls.json"))
OUT = "sunny-and-the-crew/theme-song/THEME-INTRO-MASTER.mp4"
pathlib.Path("sunny-and-the-crew/theme-song").mkdir(parents=True, exist_ok=True)
WORK = pathlib.Path("work"); WORK.mkdir(exist_ok=True)

# Theme bible cut map (planned 45s total), scaled to actual audio length
CUTS = {"T01":4,"T02":2,"T03":2,"T04":2,"T05":2,"T06":3,"T07":3,"T08":3,"T09":4,
        "T10":3,"T11":2,"T12":2,"T13":2,"T14":2,"T15":2,"T16":2,"T17":3,"T18":1,"T19":1}

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr[-3000:]); sys.exit("FAILED: " + " ".join(cmd[:6]))
    return r.stdout

def dur(path):
    return float(json.loads(run(["ffprobe","-v","error","-show_entries","format=duration","-of","json",str(path)]))["format"]["duration"])

A = dur(AUDIO)
scale = A / sum(CUTS.values())
print("audio %.3fs, scale factor %.5f" % (A, scale))

segs = []
for i, shot in enumerate(sorted(CUTS)):
    src = WORK / (shot + ".mp4")
    if not src.exists():
        print("download", shot)
        urllib.request.urlretrieve(URLS[shot], src)
    want = CUTS[shot] * scale
    cap = dur(src) - 0.05
    take = min(want, cap)
    if take < want - 0.01:
        print("WARN %s short: want %.2f cap %.2f" % (shot, want, cap))
    seg = WORK / ("seg%02d.ts" % i)
    run(["ffmpeg","-y","-i",str(src),"-t","%.3f"%take,
         "-vf","scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30",
         "-an","-c:v","libx264","-preset","medium","-crf","18","-pix_fmt","yuv420p","-f","mpegts",str(seg)])
    segs.append((seg, take))

V = sum(t for _, t in segs)
(WORK/"list.txt").write_text("\n".join("file '%s'" % s.name for s,_ in segs))
run(["ffmpeg","-y","-f","concat","-safe","0","-i",str(WORK/"list.txt"),"-c","copy",str(WORK/"video.mp4")])
pad = max(0.0, A - V)
print("video %.3fs, freeze-pad %.3fs" % (V, pad))
run(["ffmpeg","-y","-i",str(WORK/"video.mp4"),"-i",AUDIO,
     "-filter_complex","[0:v]tpad=stop_mode=clone:stop_duration=%.3f[v]" % pad,
     "-map","[v]","-map","1:a","-c:v","libx264","-preset","medium","-crf","18",
     "-pix_fmt","yuv420p","-c:a","aac","-b:a","256k","-movflags","+faststart",
     "-t","%.3f" % A, OUT])
print("final: %.3fs -> %s" % (dur(OUT), OUT))
