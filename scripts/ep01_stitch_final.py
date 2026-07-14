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
# SEC-04: prefer the on-model full-crew revisual (v2); the pre-redesign SYNCED
# master (Sunny/Leo/Mia + Mayor Mary) is only a last-resort fallback.
SEC04_V2 = os.path.join(EP, "EP01-song-section-v2.mp4")
SEC04_OLD = os.path.join(EP, "EP01-song-section-SYNCED.mp4")
SEC04 = SEC04_V2 if os.path.exists(SEC04_V2) else SEC04_OLD
if SEC04 == SEC04_OLD:
    print("WARNING: SEC-04 v2 (on-model) not found — falling back to pre-redesign SYNCED master")
# SEC-03: prefer the remapped play/games pilot (lip-sync re-timed, letter overlays,
# audience-wait beats) over the original v2 story cut.
def prefer(*paths):
    for p in paths:
        if os.path.exists(p): return p
    return paths[-1]
# prefer the re-timed (lip-sync aligned + letter-overlay) v3 sections + the 3D games pilot
SEC02 = prefer("sections/EP01-SEC-02-story1-v3.mp4", "sections/EP01-SEC-02-story1-v2.mp4")
SEC03 = prefer("sections/EP01-SEC-03-pilot.mp4", "sections/EP01-SEC-03-story2-v2.mp4")
SEC05 = prefer("sections/EP01-SEC-05-reflection-v3.mp4", "sections/EP01-SEC-05-reflection-v2.mp4")
SECTIONS = [
    ("SEC-01", "sunny-and-the-crew/theme-song/THEME-INTRO-MASTER.mp4"),
    ("SEC-02", SEC02),
    ("SEC-03", SEC03),
    ("SEC-04", SEC04),
    ("SEC-05", SEC05),
]
OUT = os.path.join(EP, "EP01-A-is-for-amazing-FINAL.mp4")
VF = ("scale=1280:720:force_original_aspect_ratio=decrease,"
      "pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,setsar=1")

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout); print(r.stderr); sys.exit("FAILED: %s" % " ".join(cmd[:6]))
    return r.stdout

def find_font():
    for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
              "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
              "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"):
        if os.path.exists(p): return p
    out = subprocess.run(["fc-match", "-f", "%{file}", "bold"], capture_output=True, text=True).stdout.strip()
    if out and os.path.exists(out): return out
    sys.exit("no usable bold font for the intro logo")

# INTRO LOGO (placeholder title card, composited over SEC-01's existing opening motion).
#   0.0-2.5s: held full-opacity, centred, kid-readable, high contrast panel behind.
#   2.5-3.5s: fades out over 1s; the existing intro motion keeps playing underneath.
#   Overlay only — SEC-01 duration (and the 5:52 total) is unchanged.
#   Marked "Placeholder logo pending final asset" in EP01_repair_contract_plan.md.
FONT = find_font()
_A = "if(lt(t,2.5),1,max(0,1-(t-2.5)/1.0))"   # hold 2.5s then 1s fade
_EN = "lt(t,3.55)"
LOGO_VF = (
    ",drawtext=fontfile='%s':text='Sunny and the Crew':fontcolor=0xFFF3C4:fontsize=104:"
    "x=(w-tw)/2:y=(h-th)/2:box=1:boxcolor=0x1A1030@0.62:boxborderw=52:"
    "borderw=4:bordercolor=0x7A3FB0:shadowcolor=black@0.55:shadowx=3:shadowy=3:"
    "alpha='%s':enable='%s'"
) % (FONT, _A, _EN)

def dur(path):
    return float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                      "-of", "default=noprint_wrappers=1:nokey=1", path]).strip())

os.makedirs("_staging/stitch_work", exist_ok=True)
parts, rows, total = [], [], 0.0
for i, (name, src) in enumerate(SECTIONS):
    if not os.path.exists(src):
        sys.exit("missing section source: %s (%s)" % (name, src))
    norm = "_staging/stitch_work/%s.mp4" % name
    vf_sec = VF + (LOGO_VF if name == "SEC-01" else "")   # logo composited onto SEC-01 opening
    # CRF 26 + capped rate keeps the ~6:43 final comfortably under GitHub's 100 MB
    # limit (flat cartoon compresses well; CRF 20 produced 107 MB and was rejected)
    run(["ffmpeg", "-y", "-i", src, "-vf", vf_sec, "-r", "30",
         "-c:v", "libx264", "-preset", "veryfast", "-crf", "26",
         "-maxrate", "2M", "-bufsize", "4M", "-pix_fmt", "yuv420p",
         "-c:a", "aac", "-b:a", "128k", "-ar", "44100", "-ac", "2", norm])
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
mb = os.path.getsize(OUT) / 1e6
print("final size: %.1f MB" % mb)
if mb > 99.0:
    sys.exit("final %.1f MB exceeds GitHub 100 MB limit — raise CRF / lower maxrate and rebuild" % mb)
print("OK: SEC-04 intact (%.2fs), final assembled, %.1f MB (pushable)." % (sec04, mb))
