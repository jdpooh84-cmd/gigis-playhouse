#!/usr/bin/env python3
"""Join pilot render results + ledger -> SEC-03 pilot build_spec.json.

render_results.json  : {"EP01-P3-01": {"job":..,"url":<video url>}, ...}
pilot_ledger.json    : lines[] with letter / audience_wait per clip
Emits _staging/sec03_pilot/build_spec.json consumed by ep01_build_sec03_pilot.py.
"""
import json, sys

BASE = "_staging/sec03_pilot"
RAW = "https://raw.githubusercontent.com/jdpooh84-cmd/gigis-playhouse/claude/sunny-crew-ep1-assembly-8hg5om/_staging/vo_el/pilot/"
led = {r["clip_id"]: r for r in json.load(open(f"{BASE}/pilot_ledger.json"))["lines"]}
res = json.load(open("_staging/vo_el/pilot/render_results.json"))

order = list(led.keys())
missing = [c for c in order if not (res.get(c) or {}).get("url")]
if missing:
    sys.exit("render_results missing video url for: %s" % missing)

clips = []
for cid in order:
    r = led[cid]
    c = {"clip_id": cid, "video_url": res[cid]["url"], "vo_url": RAW + cid + ".mp3"}
    if r.get("letter"):        c["letter"] = r["letter"]
    if r.get("audience_wait"): c["audience_wait"] = r["audience_wait"]
    clips.append(c)

json.dump({"out": "sections/EP01-SEC-03-pilot.mp4", "clips": clips},
          open(f"{BASE}/build_spec.json", "w"), indent=1)
print("build_spec: %d clips -> %s/build_spec.json" % (len(clips), BASE))
