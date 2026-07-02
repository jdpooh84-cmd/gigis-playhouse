#!/usr/bin/env node
/**
 * Generates 12 HeyGen avatar video clips for Zoomy Zoom Freeze!
 *
 * Run this locally from the repo root:
 *   node preschool-video/generate-heygen-clips.js
 *
 * Requires:
 *   - Node.js 18+
 *   - ffmpeg in PATH (for audio segmentation)
 *   - HEYGEN_API_KEY, HEYGEN_LEO_AVATAR_ID, HEYGEN_ZOE_AVATAR_ID in .env
 *
 * What it does:
 *   1. Splits Zoomy_Zoom_Freeze.mp3 into 12 audio segments via ffmpeg
 *   2. Uploads each segment to HeyGen assets (POST upload.heygen.com/v1/asset)
 *   3. Creates 12 video jobs via POST /v3/videos
 *   4. Polls all jobs until done (up to 30 min each)
 *   5. Writes preschool-video/heygen-clips-manifest.json with all video URLs
 *
 * Resume support: already-completed clips are skipped on re-run.
 * Run again to retry any failed clips.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const { spawnSync } = require("child_process");
const os = require("os");

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

const API_KEY       = process.env.HEYGEN_API_KEY;
const LEO_AVATAR_ID = process.env.HEYGEN_LEO_AVATAR_ID;   // item ID
const ZOE_AVATAR_ID = process.env.HEYGEN_ZOE_AVATAR_ID;   // item ID

if (!API_KEY)       { console.error("FATAL: HEYGEN_API_KEY not found in .env"); process.exit(1); }
if (!LEO_AVATAR_ID) { console.error("FATAL: HEYGEN_LEO_AVATAR_ID not found in .env"); process.exit(1); }
if (!ZOE_AVATAR_ID) { console.error("FATAL: HEYGEN_ZOE_AVATAR_ID not found in .env"); process.exit(1); }

const AUDIO_SOURCE = path.join(__dirname, "audio", "episode1", "Zoomy_Zoom_Freeze.mp3");
if (!fs.existsSync(AUDIO_SOURCE)) {
  console.error(`FATAL: Audio not found at ${AUDIO_SOURCE}`);
  process.exit(1);
}

const TEMP_DIR     = path.join(os.tmpdir(), "zzf-clips");
const MANIFEST_PATH = path.join(__dirname, "heygen-clips-manifest.json");

if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

// ----------------------------------------------------------------
// CLIP DEFINITIONS — 12 clips covering the full Zoomy Zoom Freeze song
// Audio times match the CDN video clip boundaries in 13-asset-manifest.md.
// Avatars alternate Leo/Zoe for visual variety; Leo leads verse 1A.
// ----------------------------------------------------------------
const CLIPS = [
  {
    id: "VID-01",
    label: "Intro bounce/point",
    section: "intro",
    start_sec: 0,
    end_sec: 15,
    avatar: "leo",
    motion_prompt:
      "Preschool cartoon child bouncing gently in place during the instrumental. When the singing starts: wave both arms enthusiastically overhead with a huge smile, bounce higher with the beat, then point directly at the camera with both index fingers shouting excitement. Energy builds progressively from gentle to maximum.",
  },
  {
    id: "VID-02",
    label: "Hook 1 zoom+freeze",
    section: "hook1",
    start_sec: 15,
    end_sec: 27,
    avatar: "zoe",
    motion_prompt:
      "Run vigorously in place with arms pumping and knees high — maximum ZOOM energy. On the word FREEZE: instantly stop ALL movement, zero motion, complete body stillness like a statue for one beat. Then immediately resume running at full energy. Repeat this zoom-then-instant-freeze pattern 3 times. In the middle, wiggle the whole body side to side. Each FREEZE must be instantaneous and completely still.",
  },
  {
    id: "VID-03",
    label: "Verse 1A run/arm pump",
    section: "verse1a",
    start_sec: 27,
    end_sec: 39,
    avatar: "leo",
    motion_prompt:
      "Run in place with maximum energy, knees pumping high. Then transition to pumping arms alternately — right arm punches UP while left goes DOWN, then switch — a marching pump. Mouth syncs to lyrics about running and pumping arms. Sustained high energy throughout with big smile.",
  },
  {
    id: "VID-04",
    label: "Verse 1B wiggle/shake",
    section: "verse1b",
    start_sec: 39,
    end_sec: 51,
    avatar: "zoe",
    motion_prompt:
      "Wiggle fingers up in the air and lift a foot to wiggle toes playfully. Then shake the ENTIRE body side to side all at once — head, shoulders, hips, everything shaking together from top to bottom. Big goofy delighted smile. Mouth syncs to lyrics about wiggling fingers, toes, and shaking from head to nose.",
  },
  {
    id: "VID-05",
    label: "Hook 2 zoom+freeze",
    section: "hook2",
    start_sec: 51,
    end_sec: 63,
    avatar: "leo",
    motion_prompt:
      "Run vigorously in place with arms pumping. On FREEZE: instantly stop ALL motion, complete body stillness. Immediately resume running at full energy. In the middle section wiggle whole body. Repeat the zoom-run then instant-freeze pattern 3 times. Every freeze is completely motionless, every resume is immediate.",
  },
  {
    id: "VID-06",
    label: "Verse 2A slow motion",
    section: "verse2a",
    start_sec: 63,
    end_sec: 78,
    avatar: "zoe",
    motion_prompt:
      "Move in dramatically exaggerated SLOW MOTION — every single movement at one-quarter normal speed. Lift each foot slowly, swing arms through molasses, turn head slowly. Mouth moves very slowly syncing to lyrics about going slow like a sleepy snail and turtle. The slow motion must be extremely obvious and comedic.",
  },
  {
    id: "VID-07",
    label: "Verse 2B spin/jump",
    section: "verse2b",
    start_sec: 78,
    end_sec: 90,
    avatar: "leo",
    motion_prompt:
      "Spin around in a full 360-degree circle with arms stretched out wide. Then jump up as HIGH as possible and land solidly with both feet. After landing, briefly hold still for one beat to show the landing impact. Then freeze the whole body still in a landing pose.",
  },
  {
    id: "VID-08",
    label: "Hook 3 biggest freeze",
    section: "hook3",
    start_sec: 90,
    end_sec: 102,
    avatar: "zoe",
    motion_prompt:
      "Run in place with MAXIMUM energy — bigger than ever before, arms wildly pumping. On FREEZE: instantly stop in the most dramatically exaggerated funny pose — legs apart, arms mid-pump — zero motion, completely frozen. Resume with even BIGGER energy than before. The final freeze is the most dramatic: hold the funniest most exaggerated frozen pose.",
  },
  {
    id: "VID-09",
    label: "Bridge count+freeze",
    section: "bridge",
    start_sec: 102,
    end_sec: 120,
    avatar: "leo",
    motion_prompt:
      "Wave enthusiastically to cue counting. On ONE: jump in place. On TWO: spin around quickly. On THREE: fast wiggle of the whole body. Then FREEZE completely still for 4+ seconds — total stillness. Repeat the exact same sequence: jump on ONE, quick spin on TWO, fast wiggle on THREE, then FREEZE again for another long hold.",
  },
  {
    id: "VID-10",
    label: "Final Hook confetti",
    section: "final_hook",
    start_sec: 120,
    end_sec: 135,
    avatar: "zoe",
    motion_prompt:
      "Run in place with confetti-level maximum excitement and the biggest grin. Freeze dramatically on each FREEZE command. After the third freeze breaks: explode into full celebration — arms raised overhead, jumping for joy — when singing about YOU DID IT YOU ARE AMAZING. End on maximum party energy.",
  },
  {
    id: "VID-11",
    label: "Outro celebration/wave",
    section: "outro",
    start_sec: 135,
    end_sec: 150,
    avatar: "leo",
    motion_prompt:
      "Warm wind-down energy with big friendly smile. Bounce and wave happily. Soft full-body wiggles side to side. Wave directly at camera with warmth and love. At the very end for BYE: the biggest most enthusiastic goodbye wave possible, maximum arm movement overhead.",
  },
  {
    id: "VID-12",
    label: "End card final freeze",
    section: "outro_freeze",
    start_sec: 150,
    end_sec: 159,
    avatar: "zoe",
    motion_prompt:
      "Strike a fun silly freeze pose — arms stretched wide, one leg lifted, huge open-mouthed grin. Hold this pose COMPLETELY STILL like a statue for the entire 9 seconds. Zero movement at all. Funny, expressive, completely frozen to the end.",
  },
];

// ----------------------------------------------------------------
// HTTP helpers
// ----------------------------------------------------------------

function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.request(url, options, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString();
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 600)}`));
          return;
        }
        try { resolve(JSON.parse(body)); }
        catch { reject(new Error(`Non-JSON (${res.statusCode}): ${body.slice(0, 400)}`)); }
      });
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// ----------------------------------------------------------------
// ffmpeg audio segment extraction
// ----------------------------------------------------------------

function extractAudioSegment(inputPath, outputPath, startSec, endSec) {
  const duration = endSec - startSec;
  const result = spawnSync("ffmpeg", [
    "-y",
    "-i", inputPath,
    "-ss", String(startSec),
    "-t", String(duration),
    "-c:a", "libmp3lame",
    "-q:a", "2",
    outputPath,
  ], { stdio: "pipe" });

  if (result.status !== 0) {
    const stderr = result.stderr ? result.stderr.toString() : "no stderr";
    throw new Error(`ffmpeg failed for ${path.basename(outputPath)}: ${stderr.slice(-400)}`);
  }
  return fs.statSync(outputPath).size;
}

// ----------------------------------------------------------------
// HeyGen API calls
// ----------------------------------------------------------------

async function uploadAudioAsset(audioBuffer) {
  const res = await fetchJson("https://upload.heygen.com/v1/asset", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.length,
    },
    body: audioBuffer,
  });
  const assetId = res.data?.asset_id ?? res.data?.id ?? res.asset_id;
  if (!assetId) throw new Error(`No asset_id in upload response: ${JSON.stringify(res).slice(0, 300)}`);
  return assetId;
}

async function createVideo(clip, audioAssetId, avatarId) {
  const body = {
    type: "avatar",
    avatar_id: avatarId,
    audio_asset_id: audioAssetId,
    motion_prompt: clip.motion_prompt,
    aspect_ratio: "16:9",
    resolution: "1080p",
  };

  const res = await fetchJson("https://api.heygen.com/v3/videos", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const videoId =
    res.data?.video_id ??
    res.data?.id ??
    res.video_id ??
    res.id;
  if (!videoId) throw new Error(`No video_id in create response: ${JSON.stringify(res).slice(0, 500)}`);
  return videoId;
}

async function pollVideoStatus(videoId, maxWaitMs = 1_800_000) {
  const start = Date.now();
  let attempt = 0;
  while (Date.now() - start < maxWaitMs) {
    attempt++;
    const res = await fetchJson(
      `https://api.heygen.com/v3/videos/${videoId}`,
      { method: "GET", headers: { "x-api-key": API_KEY } }
    );

    const status = res.data?.status ?? res.status ?? "unknown";
    const elapsed = ((Date.now() - start) / 1000).toFixed(0);

    if (attempt % 4 === 1) {
      process.stdout.write(`    [${elapsed}s] status=${status}\n`);
    }

    if (status === "completed" || status === "success" || status === "done") {
      const url =
        res.data?.video_url ??
        res.data?.download_url ??
        res.data?.cdn_url ??
        res.data?.output_url ??
        res.video_url;
      return { status: "completed", videoUrl: url ?? null, rawData: res.data };
    }
    if (status === "failed" || status === "error") {
      const reason = res.data?.error ?? res.data?.reason ?? res.data?.message ?? "unknown";
      return { status: "failed", error: String(reason), rawData: res.data };
    }

    const delay = attempt < 8 ? 15_000 : 30_000;
    await sleep(delay);
  }
  return { status: "timeout", error: `Exceeded ${maxWaitMs / 60000} min` };
}

// ----------------------------------------------------------------
// Main
// ----------------------------------------------------------------

(async () => {
  try {
    // Verify ffmpeg
    const ffCheck = spawnSync("ffmpeg", ["-version"], { stdio: "pipe" });
    if (ffCheck.status !== 0) {
      console.error("FATAL: ffmpeg not found in PATH. Install: https://ffmpeg.org/download.html");
      process.exit(1);
    }
    console.log(`ffmpeg: OK`);
    console.log(`Leo avatar ID:  ${LEO_AVATAR_ID}`);
    console.log(`Zoe avatar ID:  ${ZOE_AVATAR_ID}`);
    console.log(`Audio source:   ${AUDIO_SOURCE}`);
    console.log(`Temp segments:  ${TEMP_DIR}`);
    console.log(`Manifest:       ${MANIFEST_PATH}\n`);

    // Load existing manifest (supports resume)
    let manifest = {};
    if (fs.existsSync(MANIFEST_PATH)) {
      try {
        manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
        const done = Object.values(manifest).filter((r) => r.status === "completed").length;
        console.log(`Loaded existing manifest — ${done}/${CLIPS.length} completed\n`);
      } catch {
        console.warn("Could not parse existing manifest — starting fresh\n");
      }
    }

    const avatarMap = { leo: LEO_AVATAR_ID, zoe: ZOE_AVATAR_ID };
    const pendingPolls = [];

    // ---- Phase 1: Submit all clips ----
    console.log("=== Phase 1: Extract audio → Upload → Submit video jobs ===\n");

    for (const clip of CLIPS) {
      const existing = manifest[clip.id];

      // Skip if already completed
      if (existing?.status === "completed" && existing.video_url) {
        console.log(`[${clip.id}] Already completed — ${existing.video_url.slice(0, 60)}…`);
        continue;
      }
      // Re-queue polling if submitted but not yet complete
      if (existing?.video_id && existing?.status === "pending") {
        console.log(`[${clip.id}] Re-queuing pending job ${existing.video_id}`);
        pendingPolls.push({ clip, videoId: existing.video_id });
        continue;
      }

      console.log(`[${clip.id}] ${clip.label}  (${clip.start_sec}s–${clip.end_sec}s, ${clip.avatar})`);

      // Extract audio segment
      const segPath = path.join(TEMP_DIR, `${clip.id}.mp3`);
      process.stdout.write(`  Extracting audio…`);
      const segSize = extractAudioSegment(AUDIO_SOURCE, segPath, clip.start_sec, clip.end_sec);
      console.log(` ${(segSize / 1024).toFixed(0)} KB`);

      // Upload to HeyGen
      process.stdout.write(`  Uploading audio segment…`);
      const audioBuffer = fs.readFileSync(segPath);
      const audioAssetId = await uploadAudioAsset(audioBuffer);
      console.log(` asset_id=${audioAssetId}`);

      // Create video job
      const avatarId = avatarMap[clip.avatar];
      process.stdout.write(`  Creating video (${clip.avatar})…`);
      let videoId;
      try {
        videoId = await createVideo(clip, audioAssetId, avatarId);
        console.log(` video_id=${videoId}`);
      } catch (err) {
        console.error(`\n  ERROR: ${err.message}`);
        manifest[clip.id] = {
          id: clip.id, label: clip.label, section: clip.section,
          start_sec: clip.start_sec, end_sec: clip.end_sec,
          avatar: clip.avatar, avatar_id: avatarId,
          audio_asset_id: audioAssetId,
          status: "failed", error: err.message,
        };
        fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
        continue;
      }

      manifest[clip.id] = {
        id: clip.id, label: clip.label, section: clip.section,
        start_sec: clip.start_sec, end_sec: clip.end_sec,
        avatar: clip.avatar, avatar_id: avatarId,
        audio_asset_id: audioAssetId,
        video_id: videoId,
        status: "pending",
        video_url: null,
      };
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
      pendingPolls.push({ clip, videoId });

      await sleep(2_000); // brief pause between submissions
    }

    // ---- Phase 2: Poll all pending jobs ----
    if (pendingPolls.length === 0) {
      console.log("\nAll clips already completed — nothing to poll.");
    } else {
      console.log(`\n=== Phase 2: Polling ${pendingPolls.length} video job(s) ===`);
      console.log("(HeyGen videos typically take 2–10 minutes each)\n");

      for (const { clip, videoId } of pendingPolls) {
        console.log(`Polling [${clip.id}] ${videoId}…`);
        const result = await pollVideoStatus(videoId);

        manifest[clip.id] = {
          ...manifest[clip.id],
          status: result.status,
          video_url: result.videoUrl ?? null,
          error: result.error ?? null,
        };
        fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

        if (result.status === "completed") {
          console.log(`  ✓ [${clip.id}] ${result.videoUrl ?? "(URL missing — check rawData)"}`);
        } else {
          console.error(`  ✗ [${clip.id}] ${result.status}: ${result.error}`);
        }
        console.log();
      }
    }

    // ---- Summary ----
    const all = Object.values(manifest);
    const done   = all.filter((r) => r.status === "completed");
    const failed = all.filter((r) => r.status === "failed" || r.status === "timeout");
    const pending = all.filter((r) => r.status === "pending");

    console.log("=== SUMMARY ===");
    console.log(`Completed: ${done.length} / ${CLIPS.length}`);
    if (failed.length > 0) {
      console.error(`Failed:    ${failed.length}`);
      failed.forEach((r) => console.error(`  ${r.id}: ${r.error}`));
    }
    if (pending.length > 0) {
      console.log(`Pending:   ${pending.length} (re-run script to poll)`);
    }
    console.log(`\nManifest: ${MANIFEST_PATH}`);
    console.log("Dashboard: https://app.heygen.com/videos\n");

    if (done.length === CLIPS.length) {
      console.log("=== ALL 12 CLIPS COMPLETE ===");
      done.forEach((r) => console.log(`  ${r.id}  ${r.video_url}`));
    } else {
      console.log("Re-run this script to retry any failed/pending clips.");
      process.exit(1);
    }

  } catch (err) {
    console.error(`\nFATAL: ${err.message}`);
    process.exit(1);
  }
})();
