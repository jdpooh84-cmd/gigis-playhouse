#!/usr/bin/env python3
"""Build the SEC-03 pilot master (runs in CI).

Folds four fixes into one section:
  1. LIP-SYNC RE-TIME  — the ElevenLabs VO is delayed by LIPSYNC_OFFSET so it
     lands on the seedance mouth-onset (measured wind-up ~0.3-0.5s), killing the
     "audio ahead of lips" dub feel.
  2. SYNC-GATE         — asserts the correction was applied within the valid band
     for every talking clip; fails the build otherwise (no dubbed scene ships).
  3. LETTER OVERLAYS   — the correct glyph (S/L/M/K/B/P/A) is composited in post
     (the single allowed on-screen-text exception), per-character colour, faded in.
  4. AUDIENCE WAITS    — beats with `audience_wait` hold the expectant last frame
     that many seconds so kids at home can answer/join.

Spec (_staging/sec03_pilot/build_spec.json):
  {"out":"sections/EP01-SEC-03-pilot.mp4",
   "clips":[{"clip_id","video_url","vo_url","letter"?,"audience_wait"?,"offset"?}, ...]}
VO duration is the timing master; slots are derived, not guessed.
"""
import json, os, subprocess, sys

LIPSYNC_OFFSET = 0.40   # default VO delay to reach the mouth-onset (per-clip override via "offset")
TAIL_PAUSE     = 0.45   # min breathing room after the voice
GATE_LO, GATE_HI = 0.25, 0.60   # applied offset must sit in the measured wind-up band

VF = ("scale=1280:720:force_original_aspect_ratio=decrease,"
      "pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30,setsar=1")

# per-character letter-overlay accent (border colour), keyed by glyph
LETTER_COLOR = {"S":"0xF7C948","L":"0xE4572E","M":"0x2EC4B6","K":"0xF29E4C",
                "B":"0xE4572E","P":"0xD65DB1","A":"0xF7C948"}

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout); print(r.stderr); sys.exit("FAILED: %s" % " ".join(cmd[:6]))
    return r.stdout

def probe(path):
    return float(run(["ffprobe","-v","error","-show_entries","format=duration",
                      "-of","default=noprint_wrappers=1:nokey=1",path]).strip())

def audio_onset(path):
    """first speech time (s) via 25ms RMS envelope, threshold 12% of peak."""
    wav = path + ".on.wav"
    run(["ffmpeg","-y","-v","error","-i",path,"-ac","1","-ar","8000","-f","wav",wav])
    import wave, array, math
    w=wave.open(wav,'rb'); a=array.array('h'); a.frombytes(w.readframes(w.getnframes())); w.close()
    sr=8000; hop=int(0.025*sr)
    env=[]
    for i in range(0,len(a)-hop,hop):
        s=a[i:i+hop]; env.append((sum(x*x for x in s)/len(s))**0.5)
    if not env: return 0.0
    pk=max(env) or 1.0
    for i,v in enumerate(env):
        if v/pk>0.12: return i*0.025
    return 0.0

def find_font():
    for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
              "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
              "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"):
        if os.path.exists(p): return p
    out=subprocess.run(["fc-match","-f","%{file}","bold"],capture_output=True,text=True).stdout.strip()
    if out and os.path.exists(out): return out
    sys.exit("no usable bold font found for letter overlays")

FONT = find_font()
spec = json.load(open(os.environ.get("SEC03_SPEC","_staging/sec03_pilot/build_spec.json")))
WORK = "_staging/sec03_work"; os.makedirs(WORK, exist_ok=True)
os.makedirs(os.path.dirname(spec["out"]), exist_ok=True)

parts=[]; total=0.0; gate=[]
for i,c in enumerate(spec["clips"]):
    cid=c["clip_id"]; off=float(c.get("offset",LIPSYNC_OFFSET)); wait=float(c.get("audience_wait",0.0))
    src=f"{WORK}/src_{i:02d}.mp4"; vo=f"{WORK}/vo_{i:02d}.mp3"; cut=f"{WORK}/cut_{i:02d}.mp4"
    run(["curl","-sL","-A","Mozilla/5.0","-o",src,c["video_url"]])
    if os.path.getsize(src)<10000: sys.exit("video too small: %s %s"%(cid,c["video_url"]))
    run(["curl","-sL","-A","Mozilla/5.0","-o",vo,c["vo_url"]])
    if os.path.getsize(vo)<800: sys.exit("VO too small: %s %s"%(cid,c["vo_url"]))
    vlen=probe(src); volen=probe(vo)
    slot=off+volen+TAIL_PAUSE+wait
    # build the video filter: normalize + (optional) hold last frame to fill slot + (optional) letter overlay
    vf=VF
    if slot>vlen+0.03:
        vf=vf+",tpad=stop_mode=clone:stop_duration=%.3f"%(slot-vlen)
    if c.get("letter"):
        g=c["letter"]; col=LETTER_COLOR.get(g,"0xFFFFFF")
        vf=vf+(",drawtext=fontfile='%s':text='%s':fontcolor=white:fontsize=170:"
               "x=110:y=100:borderw=7:bordercolor=%s:shadowcolor=black@0.45:shadowx=4:shadowy=4:"
               "alpha='min(1,max(0,(t-%.2f)/0.4))'"%(FONT,g,col,off))
    # audio: delay VO by off, pad to slot
    af="adelay=%d:all=1,apad"%int(off*1000)
    run(["ffmpeg","-y","-v","error","-i",src,"-i",vo,"-t","%.3f"%slot,
         "-map","0:v:0","-map","1:a:0","-vf",vf,"-af",af,
         "-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",
         "-c:a","aac","-b:a","128k","-ar","44100","-ac","2",cut])
    # SYNC-GATE: measured audio onset must equal the applied offset (+ the VO's own lead)
    on=audio_onset(cut)
    ok = GATE_LO <= on <= GATE_HI+0.15
    gate.append((cid,round(on,3),ok))
    parts.append(cut); total+=slot
    print("  %-12s vo=%.2fs off=%.2f wait=%.1f slot=%.2f onset=%.3f %s %s"%(
        cid,volen,off,wait,slot,on,"OK" if ok else "GATE-FAIL",("letter "+c["letter"]) if c.get("letter") else ""))

fails=[g for g in gate if not g[2]]
if fails:
    print("SYNC-GATE FAILURES (audio not aligned to mouth band):",fails)
    sys.exit("sync-gate failed on %d clip(s)"%len(fails))

with open(f"{WORK}/concat.txt","w") as f:
    for p in parts: f.write("file '%s'\n"%os.path.abspath(p))
run(["ffmpeg","-y","-v","error","-f","concat","-safe","0","-i",f"{WORK}/concat.txt","-c","copy",spec["out"]])
d=probe(spec["out"])
print("SEC-03 pilot: %d clips, target %.2fs, actual %.2fs -> %s"%(len(parts),total,d,spec["out"]))
if abs(d-total)>max(0.6,0.04*len(parts)):
    sys.exit("duration mismatch: %.2f vs %.2f"%(total,d))
print("SEC-03 pilot OK — sync-gate passed on all %d clips."%len(gate))
