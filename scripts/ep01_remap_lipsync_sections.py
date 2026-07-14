#!/usr/bin/env python3
"""Point the SEC-02/03/05 section specs at the lip-sync video renders.

The section specs (_staging/ep01_sec0{2,3,5}_urls.json) were built against the
first-pass (no audio-driven mouth) videos. This rewrites each dialogue clip's
`url` to its lip-synced render (seedance start_image + audio_references), so the
mouths move to the ElevenLabs VO and the speaker is unambiguous. `vo_url`
(the ElevenLabs mp3, the timing master) is left unchanged.

Source of truth: _staging/ep01_lipsync_pass.json -> lipsync_video_urls (44)
plus the two late solo reframes N17 (Pipa) + C15 (Mia) passed via EXTRA below.
Group / wordless lines not in the map keep their existing url (multi-speaker
celebration / no-dialogue beats — outside the single-speaker lip-sync gate).
"""
import json, os, sys

TRACKER = "_staging/ep01_lipsync_pass.json"
SPECS = ["_staging/ep01_sec02_urls.json",
         "_staging/ep01_sec03_urls.json",
         "_staging/ep01_sec05_urls.json"]
CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/"

# Late solo-speaker reframes rendered inline (Pipa N17 from QC list; Mia C15
# solo name-callout). Fill C15 once its job completes.
EXTRA = {
    "EP01-NP-N17": CDN + "hf_20260714_055538_ae34bfba-87cc-44e3-90c9-65a33d7f0bdf.mp4",
    "EP01-NP-C15": CDN + "hf_20260714_055553_54c0587f-d32e-44b9-9076-c308ef9f0162.mp4",
}

tr = json.load(open(TRACKER))
lv = dict(tr["lipsync_video_urls"])
lv.update({k: v for k, v in EXTRA.items() if v})

remapped, kept = [], []
for f in SPECS:
    d = json.load(open(f))
    rows = d["clips"] if isinstance(d, dict) and "clips" in d else d
    for r in rows:
        cid = r["clip_id"]
        if cid in lv:
            r["url"] = lv[cid]
            remapped.append(cid)
        else:
            kept.append(cid)
    json.dump(d, open(f, "w"), indent=1, ensure_ascii=False)
    print("wrote", f)

print("\nremapped to lip-sync: %d" % len(remapped))
print("kept existing (group/wordless): %d -> %s" % (len(kept), kept))
