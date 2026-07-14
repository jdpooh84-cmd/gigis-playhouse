#!/usr/bin/env python3
"""Resolve every EP01 clip to a final video URL and write the 3 section URL
files the assembly workflow consumes. Deterministic + reset-proof:
  url = pinned_urls[clip]  (already-resolved)  OR
        vidscan[collect_jobs[clip]]  (by job id)  OR
        reuse_urls[clip]
Usage: python3 scripts/ep01_collect_sections.py _staging/vidscan.json
vidscan.json = [{"id","status","url",...}] extracted from show_generations.
Exits non-zero (and writes nothing) if any clip is unresolved."""
import json, sys
EP = "sunny-and-the-crew/season_01/episodes/EP01_a-is-amazing"
plan = json.load(open(EP + "/ep01_video_plan.json"))
spec = json.load(open(EP + "/ep01_medium_build_spec.json"))
scan = json.load(open(sys.argv[1] if len(sys.argv) > 1 else "_staging/vidscan.json"))

url_by_job = {v["id"]: v.get("url") for v in scan if v.get("status") == "completed"}
pinned = plan.get("pinned_urls", {})
jobs = plan.get("collect_jobs", {})
reuse = plan.get("reuse_urls", {})

def resolve(cid):
    if pinned.get(cid, "").startswith("http"): return pinned[cid]
    j = jobs.get(cid)
    if j and url_by_job.get(j, "" or "").startswith("http"): return url_by_job[j]
    if reuse.get(cid, "").startswith("http"): return reuse[cid]
    return None

OUT = {
 "SEC-02": ("_staging/ep01_sec02_urls.json", "sections/EP01-SEC-02-story1-v2.mp4"),
 "SEC-03": ("_staging/ep01_sec03_urls.json", "sections/EP01-SEC-03-story2-v2.mp4"),
 "SEC-05": ("_staging/ep01_sec05_urls.json", "sections/EP01-SEC-05-reflection-v2.mp4"),
}
docs, missing = {}, []
for sec in spec["sections"]:
    name = sec["section"]; path, out = OUT[name]
    clips = []
    for c in sec["clips"]:
        u = resolve(c["clip_id"])
        if not u: missing.append(c["clip_id"])
        row = {"clip_id": c["clip_id"], "url": u, "dur": c["dur"]}
        if c.get("vo_url"): row["vo_url"] = c["vo_url"]
        clips.append(row)
    docs[name] = ({"section": name, "out": out, "rev": 2, "clips": clips}, path)

if missing:
    sys.exit("UNRESOLVED clips (%d): %s" % (len(missing), ", ".join(missing)))
tot = 0.0
for name, (doc, path) in docs.items():
    json.dump(doc, open(path, "w"), indent=1, ensure_ascii=False)
    d = sum(c["dur"] for c in doc["clips"])
    tot += d
    print("%s: %d clips, %.1fs (%d:%05.2f) -> %s" % (name, len(doc["clips"]), d, int(d)//60, d % 60, path))
locked = 44.78 + 104.83
print("new content %.1fs + locked %.1fs = %d:%05.2f total (est)" % (tot, locked, int(tot+locked)//60, (tot+locked) % 60))
print("ALL 53 CLIPS RESOLVED — section files written.")
