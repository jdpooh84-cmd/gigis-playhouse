#!/usr/bin/env python3
"""General Sunny & the Crew song assembler — REUSABLE post-production build (runs in CI).

Usage: python3 scripts/song_build.py <song_dir>      # e.g. animalyoga  (dir under _staging/)

Reads from _staging/<song_dir>/:
  shot_spec.json      timeline: clips[{clip_id,start,end,dur,logo,overlays}], + audio/out/logo paths
  video_results.json  {clip_id: video_url}  (already-rendered clips; reused, NOT re-rendered)
  captions.json       [[t0,t1,text], ...]   transcript-timed caption track (audio-synced)

Per timeline entry: download the rendered clip, play its motion to fill the slot (slow only the
RESTING tail if the slot is longer — never a corpse freeze), keep the real logo on the intro entry.
Concat, then burn the global transcript-timed caption track (so words + moves + audio all line up),
then mux the ORIGINAL audio unchanged. Clips may repeat in the timeline (chorus reuse) — fine.
"""
import json, os, subprocess, sys

SONG = sys.argv[1].strip("/").split("/")[-1]
D = f"_staging/{SONG}"
SPEC = json.load(open(f"{D}/shot_spec.json"))
RES  = json.load(open(f"{D}/video_results.json"))
CAPS_PATH = f"{D}/captions.json"
CAPS = json.load(open(CAPS_PATH)) if os.path.exists(CAPS_PATH) else None
AUDIO = SPEC["audio"]
LOGO  = SPEC.get("logo")
OUT   = SPEC["out"]
WORK  = f"_staging/{SONG}_work"; os.makedirs(WORK, exist_ok=True)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
TAIL_SLOW_REGION = 3.0
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

def esc(t): return t.replace("'", "’").replace(":", "\\:")
def fit_fs(text, base, budget=1160):
    n = max(1, len(text)); return max(30, min(base, int(budget / (0.60 * n))))

def cap_draw(text, t0, t1):
    en = "between(t\\,%.3f\\,%.3f)" % (t0, t1)
    al = "alpha='clip(min((t-%.3f)/0.25\\,(%.3f-t)/0.25)\\,0\\,1)'" % (t0, t1)
    return ("drawtext=fontfile='%s':text='%s':enable='%s':%s:x=(w-tw)/2:y=h-150:"
            "fontsize=%d:fontcolor=white:borderw=6:bordercolor=0x2EC4B6:"
            "shadowcolor=black@0.5:shadowx=3:shadowy=3"
            % (FONT, esc(text), en, al, fit_fs(text, 82)))

parts=[]
for i,c in enumerate(SPEC["clips"]):
    cid=c["clip_id"]; slot=c["dur"]
    url=RES.get(cid)
    if not url: sys.exit("missing video url for %s"%cid)
    src=f"{WORK}/src_{i:02d}.mp4"; base=f"{WORK}/base_{i:02d}.mp4"; cut=f"{WORK}/cut_{i:02d}.mp4"
    run(["curl","-sL","--retry","5","--retry-all-errors","--retry-delay","3",
         "--connect-timeout","30","--max-time","300","-A","Mozilla/5.0","-o",src,url])
    if os.path.getsize(src)<10000: sys.exit("video too small: %s"%cid)
    vlen=probe(src); base_len=min(slot,vlen)
    vf=VF+",trim=end=%.3f,setpts=PTS-STARTPTS"%base_len
    if c.get("logo") and LOGO and os.path.exists(LOGO):
        fc=("[0:v]%s[v];"
            "[1:v]scale=620:-1,format=rgba,fade=t=in:st=0.15:d=0.4:alpha=1,"
            "fade=t=out:st=2.5:d=1.0:alpha=1[lg];"
            "[v][lg]overlay=x=(W-w)/2:y=H*0.09:enable='lt(t,3.6)'[o]"%vf)
        run(["ffmpeg","-y","-v","error","-i",src,"-loop","1","-t","%.3f"%base_len,"-i",LOGO,
             "-filter_complex",fc,"-map","[o]","-t","%.3f"%base_len,"-an","-c:v","libx264",
             "-preset","veryfast","-crf","20","-pix_fmt","yuv420p",base])
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
    print("  %-5s %-14s slot=%.2f base=%.2f logo=%s"%(cid,c.get("section",""),slot,base_len,bool(c.get("logo"))))

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
if CAPS:
    chain=",".join(cap_draw(t[2],float(t[0]),float(t[1])) for t in CAPS if str(t[2]).strip())
    vcap=f"{WORK}/video_cap.mp4"
    run(["ffmpeg","-y","-v","error","-i",vid,"-vf",chain,
         "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",vcap])
    vid=vcap; vdur=probe(vid); print("burned %d transcript-timed captions"%len(CAPS))
run(["ffmpeg","-y","-v","error","-i",vid,"-i",AUDIO,"-map","0:v:0","-map","1:a:0",
     "-c:v","copy","-c:a","aac","-b:a","192k","-movflags","+faststart","-shortest",OUT])
fd=probe(OUT); adur=probe(AUDIO)
print("%s: %d entries, video=%.2fs audio=%.2fs final=%.2fs -> %s"%(SPEC.get("song",SONG),len(parts),vdur,adur,fd,OUT))
if abs(fd-adur)>1.5: sys.exit("duration off vs audio: %.2f vs %.2f"%(fd,adur))
print("%s OK (%.1f MB)"%(SONG, os.path.getsize(OUT)/1e6))
