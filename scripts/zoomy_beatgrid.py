#!/usr/bin/env python3
"""Beat-grid + section-snap analysis for Zoomy Zoom Freeze (numpy + ffmpeg only).

- decode mp3 -> mono 22050 PCM
- spectral-flux onset envelope
- tempo via autocorrelation (search around the stated 110 BPM)
- beat phase by maximizing onset energy on the grid
- bar grid (downbeat = strongest of the 4 beat phases)
- snap the 9 proposed section boundaries to the nearest bar line
- locate the FREEZE stab in each hook (strongest onset in a search window) snapped to a beat
Writes _staging/zoomy/beatgrid.json
"""
import json, os, subprocess, numpy as np

AUDIO = "_staging/audio/zoomy-zoom-freeze.mp3"
SR = 22050
HOP = 512
FRAME = 2048
OUT = "_staging/zoomy/beatgrid.json"
os.makedirs("_staging/zoomy", exist_ok=True)

# proportional section plan (seconds) from the approved plan; boundaries get snapped to bars
SECTIONS = [
    ("Intro",       0.00,  15.0),
    ("Hook 1",      15.0,  31.0),
    ("Verse 1",     31.0,  53.0),
    ("Hook 2",      53.0,  69.0),
    ("Verse 2",     69.0,  91.0),
    ("Hook 3",      91.0, 107.0),
    ("Bridge",     107.0, 125.0),
    ("Final Hook", 125.0, 141.0),
    ("Outro",      141.0, 159.84),
]
# where a FREEZE stab is expected: near the end of the 1st hook line and the tag line.
HOOK_SECTIONS = ["Hook 1","Hook 2","Hook 3","Final Hook","Outro"]

def decode():
    raw = subprocess.run(["ffmpeg","-v","error","-i",AUDIO,"-ac","1","-ar",str(SR),
                          "-f","f32le","-"],capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32)

def onset_env(x):
    win = np.hanning(FRAME).astype(np.float32)
    n = 1 + (len(x)-FRAME)//HOP
    mag = np.empty((n, FRAME//2+1), dtype=np.float32)
    for i in range(n):
        seg = x[i*HOP:i*HOP+FRAME]*win
        mag[i] = np.abs(np.fft.rfft(seg))
    # spectral flux (half-wave rectified positive differences)
    d = np.diff(mag, axis=0)
    flux = np.maximum(d, 0).sum(axis=1)
    flux = np.concatenate([[0.0], flux])
    # normalize
    flux = flux / (flux.max() or 1.0)
    return flux  # one value per hop frame

def hop_t(i): return i*HOP/SR

x = decode()
dur = len(x)/SR
env = onset_env(x)
fps = SR/HOP  # frames per second of the envelope

# --- tempo via autocorrelation of the onset envelope, search 96..126 BPM ---
e = env - env.mean()
ac = np.correlate(e, e, mode="full")[len(e)-1:]
best_bpm, best_val = 110.0, -1e9
for bpm in np.arange(96.0, 126.01, 0.05):
    lag = fps*60.0/bpm
    lo, hi = int(np.floor(lag)), int(np.ceil(lag))
    if hi >= len(ac): continue
    frac = lag-lo
    val = ac[lo]*(1-frac)+ac[hi]*frac
    if val > best_val: best_val, best_bpm = val, bpm
period = 60.0/best_bpm                      # seconds per beat
period_f = fps*period                       # frames per beat

# --- beat phase: choose phase in [0,period) maximizing onset energy on the grid ---
best_phase, best_sum = 0.0, -1e9
for ph in np.arange(0, period_f, 0.5):
    idx = np.round(np.arange(ph, len(env)-1, period_f)).astype(int)
    s = env[idx].sum()
    if s > best_sum: best_sum, best_phase = s, ph
beat_frames = np.arange(best_phase, len(env)-1, period_f)
beat_times = [round(hop_t(int(round(bf))),3) for bf in beat_frames]

# --- downbeat: of the 4 beat-phases mod 4, the one with the highest mean onset ---
sums=[0.0]*4; cnt=[0]*4
for k,bf in enumerate(beat_frames):
    sums[k%4]+=env[int(round(bf))]; cnt[k%4]+=1
means=[sums[i]/max(cnt[i],1) for i in range(4)]
down_off = int(np.argmax(means))
bar_times = [beat_times[i] for i in range(down_off, len(beat_times), 4)]

def snap(t, grid):
    g=min(grid, key=lambda b: abs(b-t)); return round(g,3)

# --- snap section boundaries to nearest bar ---
snapped=[]
prev_end=0.0
for i,(name,s,eend) in enumerate(SECTIONS):
    ss = 0.0 if i==0 else prev_end
    ee = round(dur,3) if i==len(SECTIONS)-1 else snap(eend, bar_times)
    snapped.append({"section":name,"start":ss,"end":ee})
    prev_end=ee

# --- FREEZE stabs: strongest onset within a window near each hook's expected freeze beats ---
def strongest_between(t0,t1):
    i0,i1=int(t0*fps),int(t1*fps)
    i1=min(i1,len(env)-1)
    if i1<=i0: return round((t0+t1)/2,3)
    j=i0+int(np.argmax(env[i0:i1]))
    return round(snap(hop_t(j), beat_times),3)

freezes=[]
for sec in snapped:
    if sec["section"] in HOOK_SECTIONS:
        s,e=sec["start"],sec["end"]
        # primary FREEZE ~ 1/4 into the hook (end of line 1), tag freezes ~ last bar
        f1=strongest_between(s+0.20*(e-s), s+0.45*(e-s))
        f_tag=strongest_between(s+0.80*(e-s), e-0.05)
        freezes.append({"section":sec["section"],"freeze":f1,"tag_freeze":f_tag})

res={"audio":AUDIO,"duration":round(dur,3),"bpm":round(best_bpm,2),
     "beat_period":round(period,4),"n_beats":len(beat_times),
     "downbeat_offset":down_off,"beat_times":beat_times,"bar_times":bar_times,
     "sections_snapped":snapped,"freeze_hits":freezes}
json.dump(res, open(OUT,"w"), indent=1)
print("duration %.2fs  tempo %.2f BPM  period %.4fs  beats=%d  bars=%d"%(dur,best_bpm,period,len(beat_times),len(bar_times)))
print("sections (snapped to bars):")
for s in snapped: print("  %-11s %6.2f -> %6.2f  (%.2fs)"%(s["section"],s["start"],s["end"],s["end"]-s["start"]))
print("freeze stabs:")
for f in freezes: print("  %-11s FREEZE@%.2f  tag@%.2f"%(f["section"],f["freeze"],f["tag_freeze"]))
print("wrote",OUT)
