#!/usr/bin/env python3
"""After ElevenLabs VO is generated (_staging/vo_el/*.mp3 + manifest.json),
point each section clip at its new committed VO and recompute slot lengths so no
line is truncated. Audio-first: slot = max(current movement-hold, new_vo + pause).
Flags any clip whose new VO needs a longer video than was rendered."""
import json, os

REPO = "jdpooh84-cmd/gigis-playhouse"
BRANCH = "claude/sunny-crew-ep1-assembly-8hg5om"
RAW = f"https://raw.githubusercontent.com/{REPO}/{BRANCH}/_staging/vo_el"
EP = "sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing"
SECT = {"SEC-02": "_staging/ep01_sec02_urls.json",
        "SEC-03": "_staging/ep01_sec03_urls.json",
        "SEC-05": "_staging/ep01_sec05_urls.json"}

man = json.load(open("_staging/vo_el/manifest.json"))
vodur = {c["clip_id"]: c["dur"] for c in man["clips"]}
led = json.load(open(f"{EP}/ep01_vo_ledger.json"))
pause = {r["clip_id"]: r.get("pause_after_s", 0.3) for r in (led["lines"] + led["added_lines"])}

overflow = []
for sec, path in SECT.items():
    doc = json.load(open(path))
    for c in doc["clips"]:
        cid = c["clip_id"]
        if cid not in vodur:            # wordless action holds keep their silent slot
            c["vo_url"] = None
            continue
        need = round(vodur[cid] + pause.get(cid, 0.3), 3)
        c["vo_url"] = f"{RAW}/{cid}.mp3"
        if need > c["dur"] + 0.05:       # new VO longer than the rendered video slot
            overflow.append((cid, c["dur"], need))
            c["dur"] = need              # extend slot; video will hold last frame — flag for reshoot
    json.dump(doc, open(path, "w"), indent=1, ensure_ascii=False)
    tot = sum(x["dur"] for x in doc["clips"])
    print(f"{sec}: {len(doc['clips'])} clips, {tot:.1f}s")

if overflow:
    print("\nOVERFLOW (new VO longer than rendered video — video will freeze-hold the tail):")
    for cid, old, need in overflow:
        print(f"  {cid}: video {old:.2f}s -> needs {need:.2f}s (Δ+{need-old:.2f})")
else:
    print("\nno overflow — every new VO fits its rendered clip.")
