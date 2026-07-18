#!/usr/bin/env python3
"""Beat grid + structure analysis for Potty Dance (calm mindful-movement song).

No librosa. Decode to mono PCM via ffmpeg, compute an onset/energy envelope, estimate
tempo by autocorrelation, lock a beat phase, derive downbeats (bars), and a coarse
RMS-energy curve so the 10 song sections (intro / cat-dog verse / pre-chorus / chorus /
butterfly-tree verse / pre-chorus / chorus / star bridge / final chorus / outro) can be
read and pinned to real bars. Output -> _staging/potty/beatgrid.json
"""
import json, os, subprocess, sys
import numpy as np

AUDIO = "_staging/audio/the-potty-dance.mp3"
SR = 22050
raw = subprocess.run(["ffmpeg","-v","error","-i",AUDIO,"-ac","1","-ar",str(SR),
                      "-f","f32le","-"], capture_output=True).stdout
x = np.frombuffer(raw, dtype=np.float32)
dur = len(x)/SR
print("samples", len(x), "dur %.2f"%dur)

# --- onset envelope via spectral flux ---
hop = 512; win = 1024
n = 1 + (len(x)-win)//hop
frames = np.lib.stride_tricks.as_strided(x, shape=(n,win),
            strides=(x.strides[0]*hop, x.strides[0])).copy()
frames *= np.hanning(win)
mag = np.abs(np.fft.rfft(frames, axis=1))
flux = np.maximum(0, np.diff(mag, axis=0)).sum(1)
flux = np.concatenate([[0], flux])
env = (flux - flux.mean())/(flux.std()+1e-9)
fps = SR/hop

# --- tempo via autocorrelation over 60-160 bpm (song ~90) ---
ac = np.correlate(env, env, "full")[len(env)-1:]
lo, hi = int(fps*60/160), int(fps*60/60)
lag = lo + int(np.argmax(ac[lo:hi]))
bpm = 60*fps/lag
print("tempo ~ %.1f bpm (lag %d)"%(bpm, lag))

# --- beat phase: best offset maximizing env on the grid ---
period = lag
best_off, best_score = 0, -1e9
for off in range(period):
    idx = np.arange(off, len(env), period)
    s = env[idx].sum()
    if s > best_score: best_score, best_off = s, off
beat_frames = np.arange(best_off, len(env), period)
beats = (beat_frames/fps).tolist()
downbeats = beats[::4]                       # 4/4
print("beats", len(beats), "downbeats(bars)", len(downbeats), "bar len %.2fs"%(4*period/fps))

# --- coarse RMS energy curve at 2 Hz for reading structure ---
step = SR//2
rms = np.sqrt(np.array([ (x[i:i+step]**2).mean() for i in range(0,len(x)-step,step) ]))
rms = rms/(rms.max()+1e-9)
tt = (np.arange(len(rms))*step/SR)
print("energy profile (every ~4s):")
for i in range(0, len(rms), 8):
    bar = "#"*int(rms[i]*40)
    print("  %5.1fs %.2f %s"%(tt[i], rms[i], bar))

json.dump({"bpm":bpm,"bar_len":4*period/fps,"beat_period":period/fps,
           "beats":beats,"downbeats":downbeats,"dur":dur,
           "rms_t":tt.tolist(),"rms":rms.tolist()},
          open("_staging/potty/beatgrid.json","w"))
print("OK -> _staging/potty/beatgrid.json")
