#!/usr/bin/env node
/**
 * Submits a rendered MP4 to the Apify Video LLM Analyzer for QA.
 * Usage: node scripts/qa-submit.js <path/to/video.mp4>
 *
 * Requires env var: APIFY_TOKEN
 * Outputs: qa-result.json in the project root
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const videoPath = process.argv[2];
if (!videoPath || !fs.existsSync(videoPath)) {
  console.error("Usage: node scripts/qa-submit.js <path/to/video.mp4>");
  process.exit(1);
}

const APIFY_TOKEN = process.env.APIFY_TOKEN;
if (!APIFY_TOKEN) {
  console.error("ERROR: APIFY_TOKEN environment variable is not set.");
  process.exit(1);
}

// QA prompt — evaluates every animation requirement exactly as specified
const QA_PROMPT = `You are evaluating a children's preschool animation video.

RULES THAT MUST ALL PASS:
1. FREEZE_IMMEDIACY: On every "FREEZE!" lyric, ALL body motion (not mouth) must stop within 1 video frame. Rate each freeze occurrence.
2. LYRIC_ACTION_SYNC: For every lyric phrase that is a command (Zoom, Wiggle, Spin, Jump, Arm pump, Shake), the matching body action must start on the same beat. Rate each command.
3. MOUTH_SYNC: Mouth must be open when words are sung. Mouth must close during rests/pauses. Acceptable drift: ≤ 2 frames.
4. ACTION_DURATION: Actions must continue for exactly the lyric phrase duration — no early stops, no overrun into the next phrase.
5. NO_IDLE_MOTION: During freeze events, characters must not drift, sway, or show any passive motion.
6. EXAGGERATION: All actions (zoom run, wiggle, jump, spin) must be visually large and child-readable. Small subtle movements are a FAIL.

For each rule, output:
- rule: <rule name>
- status: PASS | FAIL | PARTIAL
- severity: critical | major | minor (only if FAIL/PARTIAL)
- description: specific timestamp and what you observed
- frame_estimate: approximate time (seconds) where the issue occurs

Output a JSON object with:
{
  "overall": "PASS" | "FAIL",
  "critical_failures": <count of critical failures>,
  "findings": [ { rule, status, severity, description, frame_estimate } ],
  "freeze_events_passed": <count>,
  "freeze_events_failed": <count>,
  "summary": "<1 sentence overall verdict>"
}`;

// Upload video file to Apify key-value store, then run the analyzer
async function run() {
  const videoBytes = fs.readFileSync(videoPath);
  const videoBase64 = videoBytes.toString("base64");
  const videoMime = "video/mp4";

  console.log(`Submitting ${path.basename(videoPath)} (${(videoBytes.length / 1024 / 1024).toFixed(1)} MB) to Apify…`);

  // Actor: apify/video-text-extraction or apify/llm-video-analysis
  // Using the generic LLM analyzer Actor
  const actorId = "apify~llm-video-analysis";

  const inputPayload = JSON.stringify({
    videoUrl: null,
    videoBase64: videoBase64,
    videoMimeType: videoMime,
    prompt: QA_PROMPT,
    modelName: "claude-haiku-4-5-20251001",
    maxTokens: 2000,
  });

  const options = {
    hostname: "api.apify.com",
    path: `/v2/acts/${encodeURIComponent(actorId)}/runs?token=${APIFY_TOKEN}&waitForFinish=300`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(inputPayload),
    },
  };

  const result = await new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error(`Non-JSON response: ${data.slice(0, 400)}`)); }
      });
    });
    req.on("error", reject);
    req.write(inputPayload);
    req.end();
  });

  if (!result.data) {
    console.error("Apify error:", JSON.stringify(result, null, 2));
    process.exit(1);
  }

  const runId = result.data.id;
  const status = result.data.status;
  console.log(`Run ${runId} status: ${status}`);

  if (status !== "SUCCEEDED") {
    console.error("Run did not succeed:", status);
    process.exit(1);
  }

  // Fetch dataset output
  const datasetId = result.data.defaultDatasetId;
  const datasetUrl = `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}`;

  const items = await new Promise((resolve, reject) => {
    https.get(datasetUrl, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error(`Non-JSON dataset: ${data.slice(0, 200)}`)); }
      });
    }).on("error", reject);
  });

  const outputPath = path.join(__dirname, "..", "qa-result.json");
  fs.writeFileSync(outputPath, JSON.stringify(items, null, 2));
  console.log(`QA result written to ${outputPath}`);

  // Print summary
  const first = Array.isArray(items) && items[0];
  if (first && first.output) {
    try {
      const parsed = typeof first.output === "string" ? JSON.parse(first.output) : first.output;
      console.log("\n=== QA RESULT ===");
      console.log("Overall:", parsed.overall);
      console.log("Critical failures:", parsed.critical_failures);
      console.log("Summary:", parsed.summary);
      console.log("Freeze passed:", parsed.freeze_events_passed, "/ failed:", parsed.freeze_events_failed);
      if (parsed.overall !== "PASS") process.exit(2);
    } catch {
      console.log("Raw output:", JSON.stringify(first.output, null, 2));
      process.exit(2);
    }
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
