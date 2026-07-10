#!/usr/bin/env python3
"""EP01 'A Is Amazing' — re-sync song section to the ACTUAL Suno audio (104.83s).

Runs in GitHub Actions (unrestricted egress). Downloads the 27 source clips from the
Higgsfield CDN (A26 'Sunny and the Crew' title clip EXCLUDED — reserved for the show
intro), trims each to the real section timeline from song_sections.json, concatenates,
and muxes the original un-padded a-is-amazing.mp3.

Output: sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing/EP01-song-section-SYNCED.mp4
"""
import json, math, subprocess, sys, urllib.request, pathlib

CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/"
CLIPS = {  # shot -> CDN filename
 "A01": "hf_20260708_035635_b326a6a5-072e-432f-b853-cbfb158070a9.mp4",
 "A02": "hf_20260708_035637_2249a67f-7e49-4685-8733-39b04ffdd35c.mp4",
 "A03": "hf_20260708_212741_285637f1-403d-4ab3-af7b-67af020840cd.mp4",
 "A04": "hf_20260708_035643_c16488d2-ce21-4fd9-a8c3-fb839012e0d5.mp4",
 "A05": "hf_20260708_035647_fd05d2f0-3cfc-4597-bb79-27783ebb882e.mp4",
 "A06": "hf_20260708_035649_0eff4549-eefd-4056-a7c6-d5e5d3ab4267.mp4",
 "A07": "hf_20260708_035652_de049e21-5bf5-4bca-be52-bf5bd290fbe2.mp4",
 "A08": "hf_20260708_035655_a341a789-b4a2-4a0f-9ab9-ca635ce23f9f.mp4",
 "A09": "hf_20260708_040206_bcb32a4c-d7c3-4346-995d-0bd6ca175e3a.mp4",
 "A10": "hf_20260708_040207_1e41fc8b-dd9a-4206-b084-8a0d3ad32bf9.mp4",
 "A11": "hf_20260708_040210_32dd9414-de12-4d31-9275-281b0c0aceaa.mp4",
 "A12": "hf_20260708_040213_6c1fa9c9-bea4-4928-af91-c88f942d0d37.mp4",
 "A13": "hf_20260708_040215_c019048e-af56-49b5-8d89-6100227dd52f.mp4",
 "A14": "hf_20260708_040218_d883ef66-5371-4af2-9106-455682cd9488.mp4",
 "A15": "hf_20260708_040221_9c8c42d6-65ae-467b-8762-ee6ed2bdb93e.mp4",
 "A16": "hf_20260708_040354_d699e858-7f0c-45ed-b6b7-c5a479283beb.mp4",
 "A17": "hf_20260708_041045_9189283e-a1e7-4596-9b1e-703a081c9d65.mp4",
 "A18": "hf_20260708_041047_972b1930-9ba7-4ad8-8e5a-92e791e74a83.mp4",
 "A19": "hf_20260708_041057_23eee806-9ec2-4872-8218-0b7d746bcad4.mp4",
 "A20": "hf_20260708_041102_a8423624-5877-4386-b1f9-c46c2231fc05.mp4",
 "A21": "hf_20260708_041113_c5fd3417-7ce3-4051-bc31-7f7b87ceae2f.mp4",
 "A22": "hf_20260708_041118_6f2cfc90-7784-4e9e-8b0a-8526611ea8df.mp4",
 "A23": "hf_20260708_041309_9639ea7c-512b-4afa-b54f-346a5d912816.mp4",
 "A24": "hf_20260708_041206_e52c393f-b175-4c8f-a04f-2dbdbbbb11ad.mp4",
 "A25": "hf_20260708_041211_53bdd18c-0b2d-4d3c-8078-b0626174a51e.mp4",
 # A26 (show-title arrival clip) intentionally excluded — reserved for the show intro
 "A27": "hf_20260708_041326_3197bd75-baee-41be-aacc-deb0567192fd.mp4",
 "A28": "hf_20260708_041336_66298d07-6122-4b6e-a5bb-ec018a815459.mp4",
}

# Real audio section END times (song_sections.json, actual 104.83s Suno render)
SECTIONS = [
 ("intro",         7.00, ["A01"]),
 ("verse_1",      24.60, ["A02","A03","A04","A05","A06"]),
 ("chorus_1",     37.80, ["A07","A08","A09","A10"]),
 ("verse_2",      55.50, ["A11","A12","A13","A14","A15"]),
 ("chorus_2",     68.00, ["A16","A17","A18","A19"]),
 ("bridge",       82.50, ["A20","A21","A22"]),
 ("final_chorus", 95.50, ["A23","A24","A25"]),
 ("outro",       104.83, ["A27","A28"]),
]

AUDIO = "_staging/audio/a-is-amazing.mp3"  # original un-padded 104.83s master
OUT = "sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing/EP01-song-section-SYNCED.mp4"
WORK = pathlib.Path("work"); WORK.mkdir(exist_ok=True)

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr[-3000:]); sys.exit("FAILED: " + " ".join(cmd[:6]))
    return r.stdout

def probe_dur(path):
    out = run(["ffprobe","-v","error","-show_entries","format=duration","-of","json",str(path)])
    return float(json.loads(out)["format"]["duration"])

# 1. download
for shot, fn in CLIPS.items():
    dst = WORK / (shot + ".mp4")
    if not dst.exists():
        print("download", shot)
        urllib.request.urlretrieve(CDN + fn, dst)

caps = {s: probe_dur(WORK / (s + ".mp4")) for s in CLIPS}
print("clip durations:", {k: round(v,2) for k,v in caps.items()})

# 2. allocate trims: fixed section end-times; waterfill within section, clamped to capacity;
#    a short section lets the next section start earlier (next section absorbs the slack).
alloc, t = [], 0.0
for name, end, shots in SECTIONS:
    need = end - t
    c = [caps[s] - 0.05 for s in shots]           # 0.05s safety margin per clip
    if sum(c) <= need:
        shares = c                                 # use everything; shortfall carries
    else:
        shares = [need/len(c)]*len(c)
        for _ in range(6):                         # waterfill clamp
            over = sum(max(0, sh-cap) for sh, cap in zip(shares, c))
            shares = [min(sh, cap) for sh, cap in zip(shares, c)]
            room = [i for i,(sh,cap) in enumerate(zip(shares,c)) if cap - sh > 1e-6]
            if over < 1e-6 or not room: break
            for i in room: shares[i] += over/len(room)
        shares = [min(sh, cap) for sh, cap in zip(shares, c)]
    for s, sh in zip(shots, shares):
        alloc.append((s, round(sh, 3)))
        t += sh
    print("%-13s ends %7.2f (target %7.2f)" % (name, t, end))

V = sum(d for _, d in alloc)
A = probe_dur(AUDIO)
print("video %.2fs, audio %.2fs -> freeze-pad %.2fs" % (V, A, max(0, A-V)))

# 3. trim + normalize each clip (720p30, silent), then concat
seg_files = []
for i, (s, d) in enumerate(alloc):
    seg = WORK / ("seg%02d.ts" % i)
    run(["ffmpeg","-y","-i",str(WORK/(s+".mp4")),"-t","%.3f"%d,
         "-vf","scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=30",
         "-an","-c:v","libx264","-preset","medium","-crf","18","-pix_fmt","yuv420p",
         "-f","mpegts",str(seg)])
    seg_files.append(seg)
concat_list = WORK/"list.txt"
concat_list.write_text("\n".join("file '%s'" % f.name for f in seg_files))
run(["ffmpeg","-y","-f","concat","-safe","0","-i",str(concat_list),"-c","copy",str(WORK/"video.mp4")])

# 4. freeze-pad video to audio length, mux song, faststart
pad = max(0.0, A - V)
run(["ffmpeg","-y","-i",str(WORK/"video.mp4"),"-i",AUDIO,
     "-filter_complex","[0:v]tpad=stop_mode=clone:stop_duration=%.3f[v]" % pad,
     "-map","[v]","-map","1:a","-c:v","libx264","-preset","medium","-crf","18",
     "-pix_fmt","yuv420p","-c:a","aac","-b:a","256k","-movflags","+faststart",
     "-t","%.3f" % A, OUT])
print("final duration: %.2fs -> %s" % (probe_dur(OUT), OUT))
