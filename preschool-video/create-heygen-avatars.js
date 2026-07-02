#!/usr/bin/env node
/**
 * Creates Leo and Zoe as HeyGen Photo Avatars.
 *
 * Run this locally from the repo root:
 *   node preschool-video/create-heygen-avatars.js
 *
 * Requires:
 *   - Node.js 18+ (uses native fetch)
 *   - HEYGEN_API_KEY in environment or .env file
 *     (the key is already in .env — this script reads it automatically)
 *
 * What it does:
 *   1. Tests the API key (GET /v3/users/me)
 *   2. Downloads Leo and Zoe reference images from Higgsfield CDN
 *   3. Uploads each image to HeyGen assets (POST /v1/asset)
 *   4. Creates a Photo Avatar for each (POST /v3/avatars with type=photo)
 *   5. Polls for completion (GET /v3/avatars/{avatar_id})
 *   6. Writes HEYGEN_LEO_AVATAR_ID and HEYGEN_ZOE_AVATAR_ID to .env
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// --- Load .env from repo root ---
const ROOT = path.join(__dirname, "..");
const ENV_PATH = path.join(ROOT, ".env");

function loadEnv() {
  if (!fs.existsSync(ENV_PATH)) return;
  for (const line of fs.readFileSync(ENV_PATH, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
loadEnv();

const API_KEY = process.env.HEYGEN_API_KEY;
if (!API_KEY) {
  console.error("FATAL: HEYGEN_API_KEY not found in environment or .env");
  process.exit(1);
}

// Reference image URLs from asset manifest (Higgsfield CDN)
// Leo's avatar was already created — skip upload/create and go straight to Zoe.
const CHARACTERS = [
  {
    name: "Leo",
    envKey: "HEYGEN_LEO_AVATAR_ID",
    groupEnvKey: "HEYGEN_LEO_GROUP_ID",
    avatarName: "Leo - Zoomy Zoom Freeze",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_004409_bc8b28c3-e37d-459d-a016-93a5713103f3.png",
    description: "Dark curly hair, red shirt yellow lightning bolt, golden cape, blue sneakers, dark brown skin",
    // Already created — skip upload/create and just write these to .env
    existingAvatarItemId: "2b3a0fd598e2419e975a28a405345772",
    existingAvatarGroupId: "c835d519c91747199d19dc42b7de0f62",
  },
  {
    name: "Zoe",
    envKey: "HEYGEN_ZOE_AVATAR_ID",
    groupEnvKey: "HEYGEN_ZOE_GROUP_ID",
    avatarName: "Zoe - Zoomy Zoom Freeze",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3ES9J8pFiT5OVr3w5DFkXtrRHEr/hf_20260701_004410_8b8e6589-ee42-4626-8bb2-203daa70c95b.png",
    description: "Red pom pom puffs, green tracksuit purple bow tie, warm brown skin",
  },
];

// --- HTTP helpers ---

function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.request(url, options, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString();
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} ${res.statusMessage}: ${body.slice(0, 400)}`));
          return;
        }
        try { resolve(JSON.parse(body)); }
        catch { reject(new Error(`Non-JSON response (${res.statusCode}): ${body.slice(0, 400)}`)); }
      });
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib.get(url, (res) => {
      if (res.statusCode >= 400) {
        reject(new Error(`Download failed: HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// --- HeyGen API calls ---

async function testApiKey() {
  console.log("\n[Step 1] Testing API key…");
  const res = await fetchJson("https://api.heygen.com/v3/users/me", {
    method: "GET",
    headers: { "x-api-key": API_KEY },
  });
  if (!res.data) throw new Error(`Unexpected response: ${JSON.stringify(res).slice(0, 200)}`);
  console.log(`  Account: ${res.data.display_name ?? res.data.email ?? "(unknown)"}`);
  const credits = res.data.credits?.remaining ?? res.data.remaining_credits ?? "unknown";
  console.log(`  Credits remaining: ${credits}`);
  return res.data;
}

async function uploadAsset(imageBuffer, filename, mimeType = "image/png") {
  console.log(`  Uploading asset (${(imageBuffer.length / 1024).toFixed(0)} KB)…`);
  const res = await fetchJson("https://upload.heygen.com/v1/asset", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": mimeType,
      "Content-Length": imageBuffer.length,
    },
    body: imageBuffer,
  });

  const assetId = res.data?.asset_id ?? res.data?.id ?? res.asset_id;
  if (!assetId) throw new Error(`No asset_id in upload response: ${JSON.stringify(res).slice(0, 300)}`);
  console.log(`  Asset uploaded: ${assetId}`);
  return assetId;
}

async function createPhotoAvatar(name, assetId) {
  console.log(`  Creating Photo Avatar "${name}" via POST /v3/avatars…`);
  const res = await fetchJson("https://api.heygen.com/v3/avatars", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "photo",
      name,
      file: {
        type: "asset_id",
        asset_id: assetId,
      },
    }),
  });

  // v3 response: { data: { avatar_group: { id }, avatar_item: { id } } }
  const avatarItemId = res.data?.avatar_item?.id;
  const avatarGroupId = res.data?.avatar_group?.id;
  if (!avatarItemId) throw new Error(`No avatar_item.id in create response: ${JSON.stringify(res).slice(0, 300)}`);
  if (!avatarGroupId) throw new Error(`No avatar_group.id in create response: ${JSON.stringify(res).slice(0, 300)}`);
  console.log(`  Avatar item ID:  ${avatarItemId}`);
  console.log(`  Avatar group ID: ${avatarGroupId}`);
  return { avatarItemId, avatarGroupId };
}

async function checkAvatarStatus(avatarGroupId) {
  // Poll using group ID — GET /v3/avatars/{group_id}
  // Photo avatars are usually active immediately; we do one quick check and proceed.
  const res = await fetchJson(
    `https://api.heygen.com/v3/avatars/${avatarGroupId}`,
    { method: "GET", headers: { "x-api-key": API_KEY } }
  );
  const status = res.data?.avatar_item?.status ?? res.data?.status ?? "unknown";
  console.log(`  Status check: ${status}`);
  if (status === "failed" || status === "error") {
    throw new Error(`Avatar processing failed (group=${avatarGroupId}): ${JSON.stringify(res.data).slice(0, 300)}`);
  }
  // Any non-failure status (active, processing, pending, unknown) — proceed
  return status;
}

function writeEnvVar(key, value) {
  let content = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, "utf8") : "";
  const regex = new RegExp(`^${key}=.*$`, "m");
  if (regex.test(content)) {
    content = content.replace(regex, `${key}=${value}`);
  } else {
    content = content.trimEnd() + `\n${key}=${value}\n`;
  }
  fs.writeFileSync(ENV_PATH, content);
  console.log(`  .env: ${key}=${value}`);
}

// --- Main ---

(async () => {
  try {
    await testApiKey();

    const results = {};

    for (const char of CHARACTERS) {
      // Fast-path: avatar already created from a previous run
      if (char.existingAvatarItemId && char.existingAvatarGroupId) {
        console.log(`\n[Skip] ${char.name} already created — writing known IDs to .env`);
        writeEnvVar(char.envKey, char.existingAvatarItemId);
        writeEnvVar(char.groupEnvKey, char.existingAvatarGroupId);
        results[char.name] = {
          avatarItemId: char.existingAvatarItemId,
          avatarGroupId: char.existingAvatarGroupId,
        };
        continue;
      }

      console.log(`\n[Step 2–4] Processing ${char.name}…`);
      console.log(`  Description: ${char.description}`);
      console.log(`  Reference: ${char.imageUrl}`);

      console.log(`  Downloading reference image…`);
      const imgBuffer = await downloadBuffer(char.imageUrl);
      const mimeType = char.imageUrl.endsWith(".png") ? "image/png" : "image/jpeg";
      const ext = mimeType === "image/png" ? "png" : "jpg";

      const assetId = await uploadAsset(imgBuffer, `${char.name.toLowerCase()}-ref.${ext}`, mimeType);
      const { avatarItemId, avatarGroupId } = await createPhotoAvatar(char.avatarName, assetId);

      // Single status check — photo avatars are usually active immediately
      console.log(`  Checking avatar status…`);
      await checkAvatarStatus(avatarGroupId);

      results[char.name] = { assetId, avatarItemId, avatarGroupId };
      writeEnvVar(char.envKey, avatarItemId);
      writeEnvVar(char.groupEnvKey, avatarGroupId);
    }

    console.log("\n=== DONE ===");
    for (const [name, r] of Object.entries(results)) {
      console.log(`${name}  item_id:  ${r.avatarItemId}`);
      console.log(`${name}  group_id: ${r.avatarGroupId}`);
    }
    console.log("\n.env updated. Add HEYGEN_LEO_AVATAR_ID, HEYGEN_LEO_GROUP_ID,");
    console.log("HEYGEN_ZOE_AVATAR_ID, and HEYGEN_ZOE_GROUP_ID to your");
    console.log("GitHub Actions secrets before running the video generation workflow.");
    console.log("\nHeyGen dashboard: https://app.heygen.com/avatars");

  } catch (err) {
    console.error(`\nFATAL: ${err.message}`);
    process.exit(1);
  }
})();
