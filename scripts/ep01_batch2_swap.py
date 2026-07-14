#!/usr/bin/env python3
"""Batch-2 URL swap: fold the re-rendered Coda/Mimi/Bram/Pippa videos + pinned
new VO into the SEC-02 spec and the SEC-03 pilot render_results.

Usage: python3 scripts/ep01_batch2_swap.py <urlmap.json>
  urlmap.json = {"EP01-NP-N01": "<video url>", ... "EP01-P3-19": "<video url>"}

Also:
  - SEC-02 N01 -> letter C + name_tag Coda; N02 -> name_tag Mimi; N03 -> name_tag Bram
  - pins the regenerated VO (N01/N02/N03) to a commit sha so CI never reads a
    cached old take from the branch-ref raw URL.
"""
import json, sys

VO_SHA = "3a85a791ce04596b471dfa54b00022e1ab616177"   # commit holding the Batch-2 mp3s
RAWROOT = "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse"

urlmap = json.load(open(sys.argv[1]))

# --- SEC-02 build spec ---
sp = "_staging/sec03_pilot/build_spec_sec02.json"
d = json.load(open(sp))
NAME = {"EP01-NP-N01": ("C", "Coda"), "EP01-NP-N02": ("M", "Mimi"), "EP01-NP-N03": ("B", "Bram")}
for c in d["clips"]:
    cid = c["clip_id"]
    if cid in urlmap:
        c["video_url"] = urlmap[cid]
    if cid in NAME:
        letter, tag = NAME[cid]
        c["letter"] = letter
        c["name_tag"] = tag
        c["vo_url"] = f"{RAWROOT}/{VO_SHA}/_staging/vo_el/{cid}.mp3"   # pin regen VO
json.dump(d, open(sp, "w"), indent=1)
print("patched", sp)

# --- SEC-03 pilot render_results (P3-17 / P3-19 get new videos; P3-11 keeps its clip) ---
rr = "_staging/vo_el/pilot/render_results.json"
r = json.load(open(rr))
for cid in ("EP01-P3-17", "EP01-P3-19"):
    if cid in urlmap:
        r.setdefault(cid, {})["url"] = urlmap[cid]
json.dump(r, open(rr, "w"), indent=1)
print("patched", rr)
print("done — SEC-02 letters/tags/vo pinned; pilot P3-17/P3-19 video urls swapped.")
