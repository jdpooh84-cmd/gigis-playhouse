/**
 * Apify actor entry point — Animation QA Analyzer.
 *
 * Flow:
 *   1. Read input (videoUrl, timelineJson, modelName, ...)
 *   2. Download video to local tmp file
 *   3. Extract prioritised keyframes with ffmpeg
 *   4. Analyze in batches via Claude vision API
 *   5. Aggregate findings — deduplicate, compute overall
 *   6. Validate output schema
 *   7. Push to dataset (exactly one record)
 *   8. Exit
 */

const { Actor } = require("apify");
const { createWriteStream, mkdirSync, existsSync } = require("fs");
const https = require("https");
const http = require("http");
const path = require("path");
const os = require("os");

const extractKeyframes = require("./extractKeyframes");
const analyzeWithClaude = require("./analyzeWithClaude");
const validateOutput = require("./outputValidator");

const SCHEMA_VERSION = "1.0";

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const file = createWriteStream(destPath);
    lib.get(url, (res) => {
      if (res.statusCode >= 400) {
        reject(new Error(`Download failed: HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
      file.on("error", reject);
    }).on("error", reject);
  });
}

Actor.main(async () => {
  const input = await Actor.getInput();

  if (!input?.videoUrl) throw new Error("Input 'videoUrl' is required.");
  if (!input?.anthropicApiKey) throw new Error("Input 'anthropicApiKey' is required.");

  const {
    videoUrl,
    timelineJson = null,
    anthropicApiKey,
    modelName = "claude-haiku-4-5-20251001",
    expectedSchemaVersion = "1.0",
    keyframeIntervalSec = 2.0,
    maxKeyframes = 80,
    frameWidth = 640,
    batchSize = 10,
  } = input;

  console.log(`[main] Model: ${modelName}`);
  console.log(`[main] Video: ${videoUrl}`);
  console.log(`[main] Timeline events: ${timelineJson?.events?.length ?? 0}`);
  console.log(`[main] maxKeyframes=${maxKeyframes}, batchSize=${batchSize}`);

  // --- Step 1: Download video ---
  const tmpDir = path.join(os.tmpdir(), `qa-actor-${Date.now()}`);
  mkdirSync(tmpDir, { recursive: true });
  const videoPath = path.join(tmpDir, "video.mp4");

  console.log("[main] Downloading video...");
  await downloadFile(videoUrl, videoPath);
  console.log("[main] Download complete.");

  // --- Step 2: Extract keyframes ---
  const frames = extractKeyframes({
    videoPath,
    tmpDir,
    timeline: timelineJson,
    frameWidth,
    maxKeyframes,
    keyframeIntervalSec,
  });

  if (frames.length === 0) {
    throw new Error("FATAL: No keyframes extracted. Cannot evaluate video. Check ffmpeg and video URL.");
  }

  // --- Step 3: Batch analyze ---
  const allFindings = [];
  // Deduplicate: track (event_id, category) pairs that have already been evaluated
  const evaluated = new Set();

  for (let i = 0; i < frames.length; i += batchSize) {
    const batch = frames.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(frames.length / batchSize);
    console.log(`[main] Batch ${batchNum}/${totalBatches} — frames ${i + 1}–${Math.min(i + batchSize, frames.length)}`);

    let batchFindings;
    try {
      batchFindings = await analyzeWithClaude({
        frames: batch,
        timeline: timelineJson,
        modelName,
        anthropicApiKey,
      });
    } catch (err) {
      // A single batch failure does not abort the run — log and skip.
      // The overall will be FAIL if critical events are never evaluated.
      console.error(`[main] Batch ${batchNum} failed: ${err.message}`);
      continue;
    }

    for (const finding of batchFindings) {
      const dedupKey = `${finding.event_id}::${finding.category}`;
      if (finding.pass_or_fail === "PASS") {
        // Only record PASS once per (event, category) — don't overwrite with a later batch's FAIL
        if (!evaluated.has(dedupKey)) {
          evaluated.add(dedupKey);
          allFindings.push(finding);
        }
      } else {
        // FAIL always wins: add and mark as evaluated so duplicates in later batches are skipped
        if (!evaluated.has(dedupKey)) {
          evaluated.add(dedupKey);
          allFindings.push(finding);
        } else {
          // Replace an existing PASS with this FAIL
          const existing = allFindings.findIndex(
            (f) => f.event_id === finding.event_id && f.category === finding.category
          );
          if (existing !== -1 && allFindings[existing].pass_or_fail === "PASS") {
            allFindings[existing] = finding;
          }
        }
      }
    }
  }

  if (allFindings.length === 0) {
    throw new Error("FATAL: All analysis batches returned empty findings. Cannot determine pass/fail.");
  }

  // --- Step 4: Compute overall ---
  const hasFail = allFindings.some((f) => f.pass_or_fail === "FAIL");
  const overall = hasFail ? "FAIL" : "PASS";

  const failCount = allFindings.filter((f) => f.pass_or_fail === "FAIL").length;
  const criticalFails = allFindings.filter(
    (f) => f.pass_or_fail === "FAIL" && f.severity === "critical"
  ).length;
  const freezeFails = allFindings.filter(
    (f) => f.pass_or_fail === "FAIL" && f.category === "FREEZE_IMMEDIACY"
  ).length;
  const freezeTotal = allFindings.filter((f) => f.category === "FREEZE_IMMEDIACY").length;
  const freezePassed = freezeTotal - freezeFails;

  const summary = overall === "PASS"
    ? `All ${allFindings.length} checks passed across ${frames.length} keyframes.`
    : `${failCount} check(s) failed (${criticalFails} critical). Freeze: ${freezePassed}/${freezeTotal} passed.`;

  const result = {
    schemaVersion: SCHEMA_VERSION,
    overall,
    summary,
    findings: allFindings,
  };

  // --- Step 5: Validate output schema ---
  validateOutput(result, expectedSchemaVersion);

  // --- Step 6: Push to dataset ---
  await Actor.pushData(result);
  console.log(`[main] Done. Overall: ${overall}. Findings: ${allFindings.length}. Pushed to dataset.`);
});
