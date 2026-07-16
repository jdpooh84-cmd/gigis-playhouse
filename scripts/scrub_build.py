#!/usr/bin/env python3
"""Assemble the Scrub Scrub Scrub Wake Up song short (runs in CI).

Inputs:
  _staging/scrub/shot_spec.json      20 equal shots (start/end/slot, overlays, logo flag)
  _staging/scrub/video_results.json  {clip_id: video_url}
  _staging/audio/scrub-scrub-scrub.mp3   the song (muxed in, re-encoded to AAC for universal playback)
  sunny-and-the-crew/brand/logo-sunny-and-the-crew.png   real transparent-PNG intro logo

Per shot: download the seedance clip, play its full motion to fill the equal slot (slow the
RESTING tail if longer — never a corpse freeze), composite clean text overlays. On the intro
shot, composite the REAL logo (held ~2.5s, fade ~1s) instead of a text placeholder. Concat,
then mux the song (AAC). Output = 144.55s / 720p.
"""
import json, os, subprocess, sys

SPEC = json.load(open("_staging/scrub/shot_spec.json"))
RES  = json.load(open("_staging/scrub/video_results.json"))
AUDIO = SPEC["audio"]
LOGO  = SPEC["logo"]
OUT  = SPEC["out"]
WORK = "_staging/scrub_work"; os.makedirs(WORK, exist_ok=True)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
TAIL_SLOW_REGION = 1.2
VF = ("scale=1280:720:force_original_aspect_ratio=decrease,"
      "pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,setsar=1")

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout); print(r.stderr); sys.exit("FAILED: %s" % " ".join(cmd[:6]))
    return r.stdout
def probe(p):
    return float(run(["ffprobe","-v","error","-show_entries","format=duration",
                      "-of","default=nk=1:nw=1",p]).strip())
def find_font():
    for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
              "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"):
        if os.path.exists(p): return p
    out=subprocess.run(["fc-match","-f","%{file}","bold"],capture_output=True,text=True).stdout.strip()
    return out if out and os.path.exists(out) else sys.exit("no font")
FONT = find_font()

# use a real curly apostrophe (font has U+2019) so it never breaks the single-quoted drawtext arg
def esc(t): return t.replace("'", "’").replace(":", "\\:")

def fit_fs(text, base, budget=1160):
    # shrink font so the line fits within `budget` px (bold char ~0.60*fontsize wide)
    n = max(1, len(text))
    return max(30, min(base, int(budget / (0.60 * n))))

def ov_draw(kind, text, t0, t1):
    # bath-time overlays. word = cheerful (verses/hooks); soft = gentle (bridge); end = soft outro.
    en = "between(t\\,%.3f\\,%.3f)" % (t0, t1)
    al = "alpha='clip(min((t-%.3f)/0.6\\,(%.3f-t)/0.6)\\,0\\,1)'" % (t0, t1)
    common = "fontfile='%s':text='%s':enable='%s':%s:x=(w-tw)/2" % (FONT, esc(text), en, al)
    if kind == "end":
        return (",drawtext=%s:y=(h-th)/2:fontsize=%d:fontcolor=0xFFF3D6:borderw=2:"
                "bordercolor=0x1C4A4A:box=1:boxcolor=0x123B3B@0.34:boxborderw=34:"
                "shadowcolor=black@0.4:shadowx=2:shadowy=2" % (common, fit_fs(text,86)))
    if kind == "soft":
        # gentle bridge overlay — teal-tinted pale, calm
        return (",drawtext=%s:y=h-160:fontsize=%d:fontcolor=0xEAFBF7:borderw=2:"
                "bordercolor=0x1C4A4A:box=1:boxcolor=0x123B3B@0.30:boxborderw=28:"
                "shadowcolor=black@0.4:shadowx=2:shadowy=2" % (common, fit_fs(text,70)))
    # word — cheerful bath colors (teal border, warm), lower-third
    return (",drawtext=%s:y=h-150:fontsize=%d:fontcolor=white:borderw=6:"
            "bordercolor=0x2EC4B6:shadowcolor=black@0.5:shadowx=3:shadowy=3" % (common, fit_fs(text,82)))

parts=[]; total=0.0
for i,c in enumerate(SPEC["clips"]):
    cid=c["clip_id"]; slot=c["dur"]
    url=RES.get(cid)
    if not url: sys.exit("missing video url for %s"%cid)
    src=f"{WORK}/src_{i:02d}.mp4"; base=f"{WORK}/base_{i:02d}.mp4"; cut=f"{WORK}/cut_{i:02d}.mp4"
    run(["curl","-sL","-A","Mozilla/5.0","-o",src,url])
    if os.path.getsize(src)<10000: sys.exit("video too small: %s"%cid)
    vlen=probe(src); base_len=min(slot,vlen)
    vf=VF+",trim=end=%.3f,setpts=PTS-STARTPTS"%base_len
    for ov in c["overlays"]:
        text,f0,f1,kind = ov[0],ov[1],ov[2],ov[3]
        vf+=ov_draw(kind,text,f0*slot,f1*slot)
    if c.get("logo"):
        # composite real transparent logo, centered upper-third, held ~2.5s then fade ~1s
        fc=("[0:v]%s[v];"
            "[1:v]scale=620:-1,format=rgba,fade=t=in:st=0.15:d=0.4:alpha=1,"
            "fade=t=out:st=2.5:d=1.0:alpha=1[lg];"
            "[v][lg]overlay=x=(W-w)/2:y=H*0.09:enable='lt(t,3.6)'[o]"%vf)
        run(["ffmpeg","-y","-v","error","-i",src,"-loop","1","-t","%.3f"%base_len,"-i",LOGO,
             "-filter_complex",fc,"-map","[o]",
             "-t","%.3f"%base_len,"-an","-c:v","libx264","-preset","veryfast","-crf","20",
             "-pix_fmt","yuv420p",base])
    else:
        run(["ffmpeg","-y","-v","error","-i",src,"-t","%.3f"%base_len,"-an","-vf",vf,
             "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",base])
    if slot>base_len+0.03:
        tsplit=min(max(base_len-TAIL_SLOW_REGION,0.0),base_len-0.30)
        factor=(slot-tsplit)/(base_len-tsplit)
        fc=("[0:v]trim=0:%.3f,setpts=PTS-STARTPTS[h];[0:v]trim=%.3f:%.3f,setpts=(PTS-STARTPTS)*%.4f[t];"
            "[h][t]concat=n=2:v=1[v]"%(tsplit,tsplit,base_len,factor))
        run(["ffmpeg","-y","-v","error","-i",base,"-filter_complex",fc,"-map","[v]","-t","%.3f"%slot,
             "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",cut])
        parts.append(cut)
    else:
        parts.append(base)
    total+=slot
    print("  %-4s %-11s slot=%.2f base=%.2f ov=%d logo=%s"%(cid,c["section"],slot,base_len,len(c["overlays"]),bool(c.get("logo"))))

with open(f"{WORK}/concat.txt","w") as f:
    for p in parts: f.write("file '%s'\n"%os.path.abspath(p))
vid=f"{WORK}/video.mp4"
run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",f"{WORK}/concat.txt","-c","copy",vid])
vdur=probe(vid); adur=probe(AUDIO)
if adur > vdur + 0.05:
    vpad=f"{WORK}/video_pad.mp4"
    run(["ffmpeg","-y","-v","error","-i",vid,"-vf","tpad=stop_mode=clone:stop_duration=%.3f"%(adur-vdur),
         "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",vpad])
    vid=vpad; vdur=probe(vid)
# mux song, re-encode to AAC + faststart for universal/Drive playback
run(["ffmpeg","-y","-v","error","-i",vid,"-i",AUDIO,"-map","0:v:0","-map","1:a:0",
     "-c:v","copy","-c:a","aac","-b:a","192k","-movflags","+faststart","-shortest",OUT])
fd=probe(OUT); adur=probe(AUDIO)
print("Scrub Scrub Scrub: %d shots, video=%.2fs, audio=%.2fs, final=%.2fs -> %s"%(len(parts),vdur,adur,fd,OUT))
if abs(fd-adur)>1.5: sys.exit("duration off vs audio: %.2f vs %.2f"%(fd,adur))
mb=os.path.getsize(OUT)/1e6; print("final %.1f MB — AAC audio, real logo intro"%mb)
print("Scrub Scrub Scrub OK.")
