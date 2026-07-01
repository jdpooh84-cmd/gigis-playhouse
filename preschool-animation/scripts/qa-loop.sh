#!/usr/bin/env bash
# Strict QA-gated render loop.
# Renders a draft, runs freeze pixel-diff verification, submits to Apify QA,
# runs the release gate check, attempts auto-fix if fixable, re-renders.
#
# LOOP STOPS (exit 0) when: release-gate.js exits 0 (all checks pass)
# LOOP STOPS (exit 1) when:
#   - render fails
#   - freeze verify fails AND apply-qa-fixes cannot patch timing
#   - Apify QA finds LYRIC_ACTION_SYNC, NO_IDLE_MOTION, or EXAGGERATION/critical
#   - apply-qa-fixes.js exits 1 (unfixable issues)
#   - max iterations reached
#
# Usage: bash scripts/qa-loop.sh [--video-url <url>]
# Requires: APIFY_TOKEN env var
# Optional: APIFY_QA_ACTOR_ID env var

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT="$SCRIPT_DIR/.."
MAX_ITER=5
iter=0

# Optional: pass a public URL so qa-submit skips the KV upload
VIDEO_URL="${1:-}"
if [ "$VIDEO_URL" = "--video-url" ]; then
  VIDEO_URL="${2:-}"
fi

echo "=== QA RENDER LOOP START (max $MAX_ITER iterations) ==="
echo "APIFY_QA_ACTOR_ID: ${APIFY_QA_ACTOR_ID:-not set — using default}"

while [ $iter -lt $MAX_ITER ]; do
  iter=$((iter + 1))
  echo ""
  echo "--- Iteration $iter of $MAX_ITER ---"

  # --- Step 1: Render ---
  echo "[render] Running Remotion render..."
  mkdir -p "$PROJECT/out"
  cd "$PROJECT"
  npx remotion render ZoomyZoomFreeze out/draft.mp4 --overwrite 2>&1 | tail -20

  if [ ! -f "out/draft.mp4" ]; then
    echo "ERROR: Render produced no output file."
    exit 1
  fi
  echo "[render] Draft: $(du -sh out/draft.mp4 | cut -f1)"

  # --- Step 2: Freeze pixel-diff verification ---
  # set -e is active: exits immediately if this fails
  echo "[freeze-verify] Checking freeze frames (pixel-diff)..."
  node scripts/verify-freeze-frames.js out/draft.mp4
  echo "[freeze-verify] All freeze pixel-diff checks passed."

  # --- Step 3: Apify QA ---
  echo "[qa] Submitting to Apify video LLM analyzer..."
  set +e
  if [ -n "$VIDEO_URL" ]; then
    node scripts/qa-submit.js --url "$VIDEO_URL"
  else
    node scripts/qa-submit.js --file out/draft.mp4
  fi
  QA_EXIT=$?
  set -e

  if [ $QA_EXIT -ne 0 ] && [ ! -f "qa-result.json" ]; then
    echo "ERROR: Apify QA failed with no qa-result.json produced."
    echo "Check APIFY_TOKEN and APIFY_QA_ACTOR_ID."
    exit 1
  fi

  # --- Step 4: Release gate ---
  # Even if QA returned an error exit, run the gate to get the full report
  echo "[release-gate] Running release gate check..."
  set +e
  node scripts/release-gate.js
  GATE_EXIT=$?
  set -e

  if [ $GATE_EXIT -eq 0 ]; then
    echo ""
    echo "=== ✅ RELEASE GATE PASSED on iteration $iter ==="
    echo "Final video: out/draft.mp4"
    cp out/draft.mp4 "out/FINAL_Zoomy_Zoom_Freeze_Animation.mp4"
    echo "Copied to: out/FINAL_Zoomy_Zoom_Freeze_Animation.mp4"
    echo ""
    echo "Release gate report:"
    cat release_gate_report.md
    exit 0
  fi

  # --- Step 5: Attempt auto-fix ---
  echo ""
  echo "[fix] Release gate failed. Attempting mechanical fixes..."

  if [ ! -f "qa-result.json" ]; then
    echo "ERROR: No qa-result.json — cannot attempt fixes."
    cat release_gate_report.md 2>/dev/null || true
    exit 1
  fi

  set +e
  node scripts/apply-qa-fixes.js qa-result.json timeline.json
  FIX_EXIT=$?
  set -e

  if [ $FIX_EXIT -ne 0 ]; then
    echo ""
    echo "=== ❌ QA FAIL: unfixable issues found — pipeline halted ==="
    echo ""
    echo "Release gate report:"
    cat release_gate_report.md
    exit 1
  fi

  echo "[fix] Mechanical fixes applied to timeline.json. Re-rendering..."
done

echo ""
echo "=== ❌ QA FAIL: reached $MAX_ITER iterations without PASS ==="
echo ""
echo "Release gate report:"
cat release_gate_report.md 2>/dev/null || cat qa-result.json 2>/dev/null || echo "No report available."
exit 1
