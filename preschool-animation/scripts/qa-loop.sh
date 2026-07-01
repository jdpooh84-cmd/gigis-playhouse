#!/usr/bin/env bash
# QA-gated render loop.
# Renders a draft, submits to Apify video analyzer, parses findings,
# patches timeline.json if fixable defects exist, re-renders, repeats.
# Exits 0 on PASS. Exits 1 if max iterations reached without passing.
#
# Usage: bash scripts/qa-loop.sh
# Requires: APIFY_TOKEN env var

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT="$SCRIPT_DIR/.."
MAX_ITER=5
iter=0

echo "=== QA RENDER LOOP START ==="

while [ $iter -lt $MAX_ITER ]; do
  iter=$((iter + 1))
  echo ""
  echo "--- Iteration $iter of $MAX_ITER ---"

  # 1. Render draft
  echo "[render] Running Remotion render..."
  cd "$PROJECT"
  npx remotion render ZoomyZoomFreeze out/draft.mp4 --overwrite 2>&1 | tail -20

  if [ ! -f "out/draft.mp4" ]; then
    echo "ERROR: Render produced no output file."
    exit 1
  fi

  echo "[render] Draft rendered: $(du -sh out/draft.mp4 | cut -f1)"

  # 2. Verify freeze frames deterministically (fast, no API call)
  echo "[verify] Checking freeze frames..."
  node scripts/verify-freeze-frames.js out/draft.mp4
  FREEZE_RESULT=$?

  # 3. Submit to Apify QA
  echo "[qa] Submitting to Apify video LLM analyzer..."
  set +e
  node scripts/qa-submit.js out/draft.mp4
  QA_EXIT=$?
  set -e

  if [ $QA_EXIT -eq 0 ]; then
    echo ""
    echo "=== QA PASSED on iteration $iter ==="
    echo "Final video: out/draft.mp4"
    cp out/draft.mp4 "out/FINAL_Zoomy_Zoom_Freeze_Animation.mp4"
    echo "Copied to: out/FINAL_Zoomy_Zoom_Freeze_Animation.mp4"
    exit 0
  fi

  # 4. Parse qa-result.json and attempt auto-fix
  if [ ! -f "qa-result.json" ]; then
    echo "ERROR: No qa-result.json produced. Cannot auto-fix."
    exit 1
  fi

  echo "[fix] Parsing QA findings and attempting auto-fix..."
  node scripts/apply-qa-fixes.js qa-result.json timeline.json

  FIX_EXIT=$?
  if [ $FIX_EXIT -ne 0 ]; then
    echo "ERROR: Auto-fix script failed or declared no fixable issues."
    echo "Manual intervention required. Check qa-result.json."
    exit 1
  fi

  echo "[fix] timeline.json patched. Re-rendering..."
done

echo ""
echo "=== QA FAILED: reached $MAX_ITER iterations without PASS ==="
echo "Final qa-result.json:"
cat qa-result.json | node -e "
  const d=require('fs').readFileSync('/dev/stdin','utf8');
  const r=JSON.parse(d);
  const items=Array.isArray(r)?r:[r];
  const o=items[0]?.output;
  if(o){const p=typeof o==='string'?JSON.parse(o):o;console.log(JSON.stringify(p,null,2));}
  else{console.log(d);}
"
exit 1
