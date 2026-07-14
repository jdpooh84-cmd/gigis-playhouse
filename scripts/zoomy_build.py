#!/usr/bin/env python3
"""Assemble the Zoomy Zoom Freeze song short (runs in CI).

Inputs:
  _staging/zoomy/shot_spec.json      beat-snapped shots (start/end/slot, overlays)
  _staging/zoomy/video_results.json  {clip_id: video_url}
  _staging/zoomy/beatgrid.json       tempo/beats/freeze stabs (FREEZE snapped to stabs)
  _staging/audio/zoomy-zoom-freeze.mp3  the song (muxed byte-identical)

Per shot: download the seedance clip, play its full motion to fill the beat-snapped
slot (slow the RESTING tail if the slot is longer — never a corpse freeze), composite
the overlay events (ZOOM / FREEZE / movement words / numbers 1-10) timed to the beat
grid, concat, then mux the original song audio (-c:a copy). Output = 159.8s song short.
"""
import json, os, subprocess, sys

SPEC = json.load(open("_staging/zoomy/shot_spec.json"))
RES  = json.load(open("_staging/zoomy/video_results.json"))
BG   = json.load(open("_staging/zoomy/beatgrid.json"))
AUDIO = "_staging/audio/zoomy-zoom-freeze.mp3"
OUT  = SPEC["out"]
WORK = "_staging/zoomy_work"; os.makedirs(WORK, exist_ok=True)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
TAIL_SLOW_REGION = 1.2
VF = ("scale=1280:720:force_original_aspect_ratio=decrease,"
      "pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,setsar=1")
FREEZE = {f["section"]: f for f in BG["freeze_hits"]}

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

def esc(t): return t.replace("'", "\\u2019").replace(":", "\\:")

def ov_draw(kind, text, t0, t1):
    """drawtext for one overlay event, styled by kind, shown between t0..t1 (shot-local)."""
    en = "between(t\\,%.3f\\,%.3f)" % (t0, t1)
    common = "fontfile='%s':text='%s':enable='%s':x=(w-tw)/2" % (FONT, esc(text), en)
    if kind == "freeze":   # huge impact, snapped to the stab
        return (",drawtext=%s:y=(h-th)/2:fontsize=210:fontcolor=white:borderw=10:"
                "bordercolor=0xE4572E:shadowcolor=black@0.6:shadowx=5:shadowy=5" % common)
    if kind == "pulse":    # ZOOM — big yellow, upper-centre
        return (",drawtext=%s:y=h*0.16:fontsize=150:fontcolor=0xF7C948:borderw=8:"
                "bordercolor=black:shadowcolor=black@0.5:shadowx=4:shadowy=4" % common)
    if kind == "num":      # counting — huge white, centre
        return (",drawtext=%s:y=(h-th)/2:fontsize=300:fontcolor=white:borderw=10:"
                "bordercolor=0x2EC4B6:shadowcolor=black@0.6:shadowx=5:shadowy=5" % common)
    if kind == "title":    # title / THE END
        return (",drawtext=%s:y=(h-th)/2:fontsize=100:fontcolor=0xFFF3C4:borderw=5:"
                "bordercolor=0x7A3FB0:box=1:boxcolor=0x1A1030@0.55:boxborderw=40:"
                "shadowcolor=black@0.5:shadowx=3:shadowy=3" % common)
    # word (movement verb) — lower third
    return (",drawtext=%s:y=h-150:fontsize=86:fontcolor=white:borderw=6:"
            "bordercolor=0xD65DB1:shadowcolor=black@0.5:shadowx=3:shadowy=3" % common)

parts=[]; total=0.0
for i,c in enumerate(SPEC["clips"]):
    cid=c["clip_id"]; slot=c["dur"]
    url=RES.get(cid)
    if not url: sys.exit("missing video url for %s"%cid)
    src=f"{WORK}/src_{i:02d}.mp4"; base=f"{WORK}/base_{i:02d}.mp4"; cut=f"{WORK}/cut_{i:02d}.mp4"
    run(["curl","-sL","-A","Mozilla/5.0","-o",src,url])
    if os.path.getsize(src)<10000: sys.exit("video too small: %s"%cid)
    vlen=probe(src); base_len=min(slot,vlen)
    # overlays: convert (text,frac0,frac1,kind) -> shot-local times; snap primary FREEZE to the stab
    vf=VF+",trim=end=%.3f,setpts=PTS-STARTPTS"%base_len
    frz=FREEZE.get(c["section"]); used_stab=False
    for ov in c["overlays"]:
        text,f0,f1,kind = ov[0],ov[1],ov[2],ov[3]
        t0=f0*slot; t1=f1*slot
        if kind=="freeze" and frz and not used_stab:
            stab_local=frz["freeze"]-c["start"]           # exact detected stab in shot-local time
            if 0.0 <= stab_local <= slot:
                t0=max(0.0,stab_local); t1=min(slot,stab_local+1.4); used_stab=True
        vf+=ov_draw(kind,text,t0,t1)
    run(["ffmpeg","-y","-v","error","-i",src,"-t","%.3f"%base_len,"-an","-vf",vf,
         "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",base])
    if slot>base_len+0.03:   # fill surplus by slowing the resting tail (no freeze)
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
    print("  %-4s %-11s slot=%.2f base=%.2f ov=%d"%(cid,c["section"],slot,base_len,len(c["overlays"])))

with open(f"{WORK}/concat.txt","w") as f:
    for p in parts: f.write("file '%s'\n"%os.path.abspath(p))
vid=f"{WORK}/video.mp4"
run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",f"{WORK}/concat.txt","-c","copy",vid])
vdur=probe(vid); adur=probe(AUDIO)
# match the song length exactly (global rule): if the video track is short, hold the final
# "THE END" pose to the song's end (a natural outro hold, not a mid-song corpse freeze).
if adur > vdur + 0.05:
    vpad=f"{WORK}/video_pad.mp4"
    run(["ffmpeg","-y","-v","error","-i",vid,"-vf","tpad=stop_mode=clone:stop_duration=%.3f"%(adur-vdur),
         "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",vpad])
    vid=vpad; vdur=probe(vid)
# mux original song audio byte-identical
run(["ffmpeg","-y","-v","error","-i",vid,"-i",AUDIO,"-map","0:v:0","-map","1:a:0",
     "-c:v","copy","-c:a","copy","-shortest",OUT])
fd=probe(OUT); adur=probe(AUDIO)
print("Zoomy: %d shots, video=%.2fs, audio=%.2fs, final=%.2fs -> %s"%(len(parts),vdur,adur,fd,OUT))
if abs(fd-adur)>1.5: sys.exit("duration off vs audio: %.2f vs %.2f"%(fd,adur))
mb=os.path.getsize(OUT)/1e6; print("final %.1f MB"%mb)
print("Zoomy OK — beat-snapped shots + overlays, song audio byte-identical.")
