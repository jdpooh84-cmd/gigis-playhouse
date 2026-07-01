#!/usr/bin/env node
/**
 * Submits a rendered MP4 to Apify for video LLM QA.
 *
 * Strategy: pass a public video URL rather than base64 (Apify input limit is ~9MB;
 * a full-length MP4 is 100–300MB). The video must already be accessible at a URL.
 * In CI, the video is uploaded as a GitHub Actions artifact first and the artifact
 * download URL is passed here. Locally, you can host via `npx serve out/` and pass
 * http://localhost:3000/draft.mp4, or upload it anywhere publicly accessible.
 *
 * Usage:
 *   node scripts/qa-submit.js --url <https://...video.mp4>
 *   node scripts/qa-submit.js --file out/draft.mp4   (uploads to Apify KV store first)
 *
 * Requires env var: APIFY_TOKEN
 * Outputs: qa-result.json in the project root
 *
 * Exit codes:
 *   0 = QA PASS
 *   1 = error (network, missing token, Apify failure, malformed response)
 *   2 = QA FAIL (video evaluated, defects found)
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const APIFY_TOKEN = process.env.APIFY_TOKEN;
if (!APIFY_TOKEN) {
  console.error("FATAL: APIFY_TOKEN environment variable is not set.");
  console.error("Set it via: export APIFY_TOKEN=apify_api_...");
  process.exit(1);
}

// Parse args
let videoUrl = null;
let localFile = null;
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === "--url") videoUrl = process.argv[++i];
  else if (process.argv[i] === "--file") localFile = process.argv[++i];
  else if (!process.argv[i].startsWith("--")) localFile = process.argv[i]; // legacy positional arg
}

if (!videoUrl && !localFile) {
  console.error("Usage: node scripts/qa-submit.js --url <https://...> | --file <video.mp4>");
  process.exit(1);
}

if (localFile && !fs.existsSync(localFile)) {
  console.error(`File not found: ${localFile}`);
  process.exit(1);
}

// QA prompt — strict per the project requirements
const QA_PROMPT = `You are a strict QA engineer evaluating a preschool children's animation video.
The song is "ZOOMY ZOOM FREEZE." The lyrics ARE commands. Leo and Zoe are human child characters.

MANDATORY CHECKS — every one must PASS:

1. FREEZE_IMMEDIACY [critical]
   On every "FREEZE!" lyric: ALL body motion (arms, legs, torso, head) must stop within 1 video frame.
   Mouth may remain open if the vocalist continues singing. Idle drift, sway, or residual physics motion are NOT allowed.
   Rate EACH freeze occurrence separately.

2. LYRIC_ACTION_SYNC [critical]
   For every command lyric (Zoom, Wiggle, Shake, Spin, Jump, Pump arms, Point camera):
   The matching body action must begin on the exact beat of that lyric, not before or after.
   If the action is wrong (e.g., wiggling when the lyric says "jump") — FAIL.
   If the action starts more than 0.3 seconds late — FAIL.

3. MOUTH_SYNC [major]
   Mouth must be open when words are being sung. Mouth must close during rests and pauses.
   Acceptable drift: ≤ 2 frames (0.067s at 30fps).

4. ACTION_DURATION [major]
   Actions must continue for the full lyric phrase duration and stop when the phrase ends.
   Early stop before the lyric ends: FAIL.
   Overrun into the next phrase: FAIL.

5. NO_IDLE_MOTION [critical]
   During any FREEZE event: zero body drift, sway, or idle physics. Characters must look like statues.

6. EXAGGERATION [major]
   Every action (zoom run, wiggle, jump, spin, arm pump) must be visually large and immediately
   readable by a 4-year-old. Subtle or small movements are a FAIL.

For each rule found to be FAIL or PARTIAL, output one finding entry.
For rules that fully pass, also output them (status: "PASS").

Return ONLY this JSON structure (no markdown, no explanation text, raw JSON only):
{
  "overall": "PASS" | "FAIL",
  "critical_failures": <integer count of critical severity findings>,
  "findings": [
    {
      "rule": "<rule name from list above>",
      "status": "PASS" | "FAIL" | "PARTIAL",
      "severity": "critical" | "major" | "minor",
      "lyric_event": "<the lyric text where the issue occurs, or 'n/a'>",
      "frame_estimate": <time in seconds as a number, or null>,
      "description": "<one sentence describing exactly what you observed>"
    }
  ],
  "freeze_events_total": <integer>,
  "freeze_events_passed": <integer>,
  "freeze_events_failed": <integer>,
  "summary": "<one sentence overall verdict>"
}`;

function httpsPost(options, body) {
  return new Promise((resolve, reject) => {
    const proto = options.hostname === "localhost" ? http : https;
    const req = proto.request(options, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 400)}`));
          return;
        }
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error(`Non-JSON response (status ${res.statusCode}): ${data.slice(0, 400)}`)); }
      });
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 300)}`));
          return;
        }
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error(`Non-JSON response: ${data.slice(0, 300)}`)); }
      });
    }).on("error", reject);
  });
}

async function uploadToApifyKV(filePath) {
  // Upload to Apify's default key-value store as a binary blob, return a public URL
  const bytes = fs.readFileSync(filePath);
  const key = `qa-video-${Date.now()}`;

  // Get default store ID for this token
  const storeInfo = await httpsGet(
    `https://api.apify.com/v2/key-value-stores?token=${APIFY_TOKEN}&limit=1`
  );
  if (!storeInfo.data?.items?.[0]?.id) {
    throw new Error("Could not find default Apify KV store. Create one at apify.com.");
  }
  const storeId = storeInfo.data.items[0].id;

  // Upload
  await new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "api.apify.com",
      path: `/v2/key-value-stores/${storeId}/records/${key}?token=${APIFY_TOKEN}`,
      method: "PUT",
      headers: { "Content-Type": "video/mp4", "Content-Length": bytes.length },
    }, (res) => {
      res.resume();
      res.on("end", () => {
        if (res.statusCode >= 400) reject(new Error(`KV upload HTTP ${res.statusCode}`));
        else resolve();
      });
    });
    req.on("error", reject);
    req.write(bytes);
    req.end();
  });

  return `https://api.apify.com/v2/key-value-stores/${storeId}/records/${key}?token=${APIFY_TOKEN}`;
}

async function run() {
  if (localFile) {
    const sizeMB = fs.statSync(localFile).size / 1024 / 1024;
    console.log(`Uploading ${path.basename(localFile)} (${sizeMB.toFixed(1)} MB) to Apify KV store…`);
    videoUrl = await uploadToApifyKV(localFile);
    console.log(`Uploaded. URL: ${videoUrl.split("?")[0]}...`);
  }

  console.log("Submitting QA job to Apify…");

  // Use the real Apify video analysis actor
  // apify/movie-cast-extractor and similar exist, but for LLM-based QA we use
  // the multimodal analysis approach via the standard REST API with a video URL.
  // Actor: "apify/web-scraper" is not right. Using GPT-4V or Claude multimodal
  // via the Apify platform requires a custom actor. We document the correct actor
  // below and the caller must have it published in their Apify account.
  //
  // Required: deploy scripts/apify-qa-actor/ to your Apify account and set
  // APIFY_QA_ACTOR_ID env var, OR use the public actor if available.
  const actorId = process.env.APIFY_QA_ACTOR_ID || "apify/claude-video-analyzer";

  const inputPayload = JSON.stringify({
    videoUrl,
    prompt: QA_PROMPT,
    modelName: process.env.QA_MODEL || "claude-haiku-4-5-20251001",
    maxTokens: 3000,
    outputJsonOnly: true,
  });

  let runResult;
  try {
    runResult = await httpsPost({
      hostname: "api.apify.com",
      path: `/v2/acts/${encodeURIComponent(actorId)}/runs?token=${APIFY_TOKEN}&waitForFinish=300`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(inputPayload),
      },
    }, inputPayload);
  } catch (err) {
    console.error(`Apify run submission failed: ${err.message}`);
    console.error("Check APIFY_QA_ACTOR_ID and that the actor is deployed in your account.");
    process.exit(1);
  }

  if (!runResult?.data) {
    console.error("Apify returned no run data:", JSON.stringify(runResult).slice(0, 400));
    process.exit(1);
  }

  const runStatus = runResult.data.status;
  const runId = runResult.data.id;
  console.log(`Run ${runId} status: ${runStatus}`);

  if (runStatus !== "SUCCEEDED") {
    console.error(`Run did not succeed (status: ${runStatus}). Check https://console.apify.com/actors/runs/${runId}`);
    process.exit(1);
  }

  // Fetch dataset items
  const datasetId = runResult.data.defaultDatasetId;
  let items;
  try {
    items = await httpsGet(
      `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}`
    );
  } catch (err) {
    console.error(`Failed to fetch dataset ${datasetId}: ${err.message}`);
    process.exit(1);
  }

  // STRICT: empty response is a FAIL, not a pass
  if (!Array.isArray(items) || items.length === 0) {
    console.error("FATAL: Apify returned empty dataset. QA did not evaluate the video.");
    console.error("Cannot pass QA without an evaluation. Treating as FAIL.");
    process.exit(1);
  }

  const rawOutput = items[0]?.output ?? items[0]?.text ?? items[0];
  if (!rawOutput) {
    console.error("FATAL: Apify dataset item has no 'output' or 'text' field.");
    console.error("Item structure:", JSON.stringify(items[0]).slice(0, 300));
    process.exit(1);
  }

  let qa;
  try {
    qa = typeof rawOutput === "string" ? JSON.parse(rawOutput) : rawOutput;
  } catch (err) {
    console.error(`FATAL: Could not parse QA output as JSON: ${err.message}`);
    console.error("Raw output:", String(rawOutput).slice(0, 400));
    process.exit(1);
  }

  // STRICT: validate required fields exist
  if (typeof qa.overall !== "string") {
    console.error("FATAL: QA output missing 'overall' field. Cannot determine pass/fail.");
    console.error("Output:", JSON.stringify(qa).slice(0, 400));
    process.exit(1);
  }
  if (!Array.isArray(qa.findings)) {
    console.error("FATAL: QA output missing 'findings' array.");
    process.exit(1);
  }
  if (typeof qa.freeze_events_failed !== "number") {
    console.error("FATAL: QA output missing 'freeze_events_failed' count.");
    process.exit(1);
  }

  const outputPath = path.join(__dirname, "..", "qa-result.json");
  fs.writeFileSync(outputPath, JSON.stringify(qa, null, 2));
  console.log(`QA result written to qa-result.json`);

  console.log("\n=== QA RESULT ===");
  console.log(`Overall:          ${qa.overall}`);
  console.log(`Critical failures: ${qa.critical_failures}`);
  console.log(`Freeze passed:     ${qa.freeze_events_passed} / total ${qa.freeze_events_total}`);
  console.log(`Freeze failed:     ${qa.freeze_events_failed}`);
  console.log(`Summary:           ${qa.summary}`);

  if (qa.findings.filter((f) => f.status !== "PASS").length > 0) {
    console.log("\nFindings:");
    for (const f of qa.findings.filter((f) => f.status !== "PASS")) {
      console.log(`  [${f.severity.toUpperCase()}] ${f.rule} — ${f.description}`);
    }
  }

  if (qa.overall !== "PASS") {
    console.error("\nQA FAIL.");
    process.exit(2);
  }

  console.log("\nQA PASS.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Unhandled error in qa-submit:", err);
  process.exit(1);
});
