#!/usr/bin/env node
/**
 * Submits a rendered MP4 to the custom animation-qa-analyzer Apify actor.
 *
 * Uses the `run-sync-get-dataset-items` endpoint — a single HTTP call that starts
 * the run and returns dataset items synchronously (waits up to 5 minutes).
 *
 * Usage:
 *   node scripts/qa-submit.js --url <https://...video.mp4>
 *   node scripts/qa-submit.js --file out/draft.mp4   (uploads to Apify KV store first)
 *
 * Required env vars:
 *   APIFY_TOKEN          — Apify API token
 *   APIFY_QA_ACTOR_ID    — deployed actor ID, e.g. "yourname/animation-qa-analyzer"
 *   ANTHROPIC_API_KEY    — passed through to the actor as anthropicApiKey
 *
 * Outputs: qa-result.json in the project root
 *
 * Exit codes:
 *   0 = QA PASS
 *   1 = error (network, missing token, Apify failure, malformed response, schema mismatch)
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

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error("FATAL: ANTHROPIC_API_KEY environment variable is not set.");
  process.exit(1);
}

const EXPECTED_SCHEMA_VERSION = "1.0";

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

// Load timeline.json to pass as grounding context to the actor
let timelineJson = null;
try {
  const tlPath = path.join(__dirname, "..", "timeline.json");
  if (fs.existsSync(tlPath)) timelineJson = JSON.parse(fs.readFileSync(tlPath, "utf8"));
} catch (e) {
  console.warn("[qa-submit] Could not load timeline.json — actor will run without event context.");
}

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

  const actorId = process.env.APIFY_QA_ACTOR_ID;
  if (!actorId) {
    console.error("FATAL: APIFY_QA_ACTOR_ID environment variable is not set.");
    console.error("Deploy the actor from preschool-animation/apify-actor/ and set APIFY_QA_ACTOR_ID.");
    process.exit(1);
  }

  const inputPayload = JSON.stringify({
    videoUrl,
    anthropicApiKey: ANTHROPIC_API_KEY,
    timelineJson,
    modelName: process.env.QA_MODEL || "claude-haiku-4-5-20251001",
    expectedSchemaVersion: EXPECTED_SCHEMA_VERSION,
  });

  // run-sync-get-dataset-items: one call, waits for completion, returns dataset directly
  console.log(`Submitting to Apify actor ${actorId} (run-sync-get-dataset-items)…`);
  let items;
  try {
    items = await httpsPost({
      hostname: "api.apify.com",
      path: `/v2/acts/${encodeURIComponent(actorId)}/run-sync-get-dataset-items?token=${APIFY_TOKEN}&timeout=300`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(inputPayload),
      },
    }, inputPayload);
  } catch (err) {
    console.error(`Apify run-sync failed: ${err.message}`);
    console.error("Check APIFY_QA_ACTOR_ID, APIFY_TOKEN, and that the actor is deployed.");
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

  // STRICT: validate schemaVersion before trusting any other field
  if (typeof qa.schemaVersion !== "string" || qa.schemaVersion.trim() === "") {
    console.error("FATAL: QA output missing 'schemaVersion'. Actor may be misconfigured or wrong version.");
    console.error("Output:", JSON.stringify(qa).slice(0, 400));
    process.exit(1);
  }
  if (qa.schemaVersion !== EXPECTED_SCHEMA_VERSION) {
    console.error(`FATAL: Schema version mismatch. Got "${qa.schemaVersion}", expected "${EXPECTED_SCHEMA_VERSION}".`);
    console.error("Re-deploy the actor or update EXPECTED_SCHEMA_VERSION in this script.");
    process.exit(1);
  }

  // STRICT: validate remaining required fields
  if (typeof qa.overall !== "string") {
    console.error("FATAL: QA output missing 'overall' field.");
    process.exit(1);
  }
  if (!Array.isArray(qa.findings)) {
    console.error("FATAL: QA output missing 'findings' array.");
    process.exit(1);
  }
  if (qa.findings.length === 0) {
    console.error("FATAL: QA findings array is empty. Actor produced no evaluation.");
    process.exit(1);
  }

  // Compute freeze counts from findings (new schema — no top-level freeze_events_* fields)
  const freezeFindings = qa.findings.filter((f) => f.category === "FREEZE_IMMEDIACY");
  const freezeTotal = freezeFindings.length;
  const freezePassed = freezeFindings.filter((f) => f.pass_or_fail === "PASS").length;
  const freezeFailed = freezeTotal - freezePassed;
  const criticalFails = qa.findings.filter(
    (f) => f.pass_or_fail === "FAIL" && f.severity === "critical"
  ).length;

  // Augment result with computed counts for release-gate.js compatibility
  qa._computed = { freezeTotal, freezePassed, freezeFailed, criticalFails };

  const outputPath = path.join(__dirname, "..", "qa-result.json");
  fs.writeFileSync(outputPath, JSON.stringify(qa, null, 2));
  console.log(`QA result written to qa-result.json`);

  console.log("\n=== QA RESULT ===");
  console.log(`Schema version:    ${qa.schemaVersion}`);
  console.log(`Overall:           ${qa.overall}`);
  console.log(`Critical failures: ${criticalFails}`);
  console.log(`Freeze passed:     ${freezePassed} / total ${freezeTotal}`);
  console.log(`Summary:           ${qa.summary}`);

  const fails = qa.findings.filter((f) => f.pass_or_fail === "FAIL");
  if (fails.length > 0) {
    console.log("\nFailed checks:");
    for (const f of fails) {
      console.log(`  [${f.severity.toUpperCase()}] ${f.category}  event=${f.event_id}  t=${f.timestamp_start}–${f.timestamp_end}s`);
      console.log(`      ${f.correction_note}`);
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
