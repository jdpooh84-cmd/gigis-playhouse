#!/usr/bin/env python3
"""Download the demo_jumpclap assets from their Higgsfield URLs into the repo
(runs in CI — the dev container is blocked from the Higgsfield CDN). Writes the
files to out_dir plus a labeled README.md index."""
import json, os, subprocess, sys

spec = json.load(open(os.environ.get("COLLECT_SPEC", "_staging/demo_collect_urls.json")))
out = spec["out_dir"]
os.makedirs(out, exist_ok=True)

rows = []
for f in spec["files"]:
    dst = os.path.join(out, f["name"])
    r = subprocess.run(["curl", "-sL", "-A", "Mozilla/5.0", "-o", dst, f["url"]])
    sz = os.path.getsize(dst) if os.path.exists(dst) else 0
    if r.returncode != 0 or sz < 5000:
        sys.exit("download failed/too small: %s (%d bytes)" % (f["name"], sz))
    print("saved %s (%d bytes)" % (f["name"], sz))
    rows.append((f["name"], f["label"], sz))

lines = ["# " + spec.get("readme_title", "Demo — \"Jump and Clap!\" (motion-pacing + internal-VO proof)"),
         "",
         spec.get("readme_intro",
                  "5-clip proof set for the redesign in commit 360ff2a. VO is internal "
                  "Higgsfield `seed_audio`. Spec: `_staging/demo_jumpclap_manifest.json`."),
         "",
         "## Videos"]
for n, lbl, sz in rows:
    if n.endswith(".mp4"):
        lines.append("- **%s** — %s (%.1f MB)" % (n, lbl, sz / 1e6))
lines += ["", "## Voiceover (seed_audio, Quinn preset)"]
for n, lbl, sz in rows:
    if n.endswith(".mp3"):
        lines.append("- **%s** — %s (%.0f KB)" % (n, lbl, sz / 1e3))
lines += ["", "## How to open",
          "- **Locally:** clone/pull the branch, open `assets/demo_jumpclap/` in Finder/Explorer, "
          "double-click any `.mp4`/`.mp3`, or drag them into Premiere/Canva.",
          "- **On GitHub:** browse to `assets/demo_jumpclap/` on the branch and click a file to preview/download.",
          "- **A/B test:** play `C1_jump_genre-auto_COMPARISON.mp4` then `C1_jump_genre-action.mp4` back to back.",
          ""]
open(os.path.join(out, "README.md"), "w").write("\n".join(lines))
print("wrote %s/README.md" % out)
