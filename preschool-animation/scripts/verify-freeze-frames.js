#!/usr/bin/env node
/**
 * Strict deterministic freeze-frame verifier.
 *
 * For each FREEZE event in timeline.json:
 *   1. Confirm motion WAS happening in the frame BEFORE the freeze
 *      (diffBefore > PRE_MOTION_THRESHOLD). A dead render has no motion
 *      and would otherwise pass every freeze check trivially.
 *   2. Confirm motion STOPS by frame 1 of the freeze
 *      (diffAt1 <= FREEZE_THRESHOLD).
 *   3. Confirm the frozen pose HOLDS through frame 3
 *      (diffAt3 <= FREEZE_THRESHOLD).
 *
 * Comparison uses body-region crop only (center 70% width × top 80% height),
 * intentionally excluding the mouth area so allowed mouth-open/close animation
 * during a freeze (freeze_mouth_continues=true) does not cause false failures.
 *
 * Exit 0 = all freeze events pass
 * Exit 1 = one or more freeze events fail (including ERROR status)
 *
 * Writes freeze-verify-results.json for the release gate.
 *
 * Usage: node scripts/verify-freeze-frames.js out/draft.mp4
 */

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const videoPath = process.argv[2];
if (!videoPath || !fs.existsSync(videoPath)) {
  console.error("Usage: node scripts/verify-freeze-frames.js <video.mp4>");
  process.exit(1);
}

const timeline = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "timeline.json"), "utf8")
);
const FPS = timeline._meta.fps;
const WIDTH = 1920;
const HEIGHT = 1080;

// Body crop: exclude bottom 20% (feet/shadow) and outer 15% sides (reduces
// background noise) and top 20% (head/mouth area for freeze_mouth_continues)
const CROP_X = Math.round(WIDTH * 0.15);
const CROP_Y = Math.round(HEIGHT * 0.20);
const CROP_W = Math.round(WIDTH * 0.70);
const CROP_H = Math.round(HEIGHT * 0.60);
const CROP_FILTER = `crop=${CROP_W}:${CROP_H}:${CROP_X}:${CROP_Y}`;

// Thresholds (mse_avg units from PSNR filter on the cropped region)
const FREEZE_THRESHOLD = 0.3;       // frame-to-frame diff considered "frozen"
const PRE_MOTION_THRESHOLD = 0.15;  // minimum diff confirming motion existed before freeze

const freezeEvents = timeline.events.filter(
  (e) => e.action === "freeze" || e.freeze_state === true
);

if (freezeEvents.length === 0) {
  console.log("No freeze events in timeline. Nothing to verify.");
  process.exit(0);
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "freeze-verify-"));

function extractFrame(timeSec, outFile) {
  const r = spawnSync("ffmpeg", [
    "-y",
    "-ss", timeSec.toFixed(6),
    "-i", videoPath,
    "-vframes", "1",
    // Apply body crop during extraction
    "-vf", CROP_FILTER,
    "-q:v", "2",   // high-quality JPEG to reduce compression artifacts in the diff
    outFile,
  ], { stdio: "pipe" });
  if (r.status !== 0) {
    throw new Error(
      `ffmpeg extract failed at t=${timeSec.toFixed(4)}: ${r.stderr.toString().slice(-300)}`
    );
  }
}

function mseAvg(fileA, fileB) {
  const r = spawnSync("ffmpeg", [
    "-i", fileA,
    "-i", fileB,
    "-lavfi", "[0:v][1:v]psnr",
    "-f", "null",
    "-",
  ], { stdio: "pipe" });

  const output = r.stderr.toString();
  const match = output.match(/mse_avg:([\d.]+(?:e[+-]?\d+)?)/i);
  if (!match) {
    // psnr filter failed or produced unexpected output — treat as uncertain
    // Caller will mark this as ERROR rather than silently pass
    throw new Error(`psnr filter produced no mse_avg. ffmpeg output: ${output.slice(-300)}`);
  }
  const val = parseFloat(match[1]);
  if (isNaN(val)) throw new Error(`mse_avg parsed as NaN from: ${match[0]}`);
  return val;
}

let allPassed = true;
const results = [];

for (const ev of freezeEvents) {
  const frameAtStart = Math.floor(ev.start_sec * FPS);
  const tBefore = Math.max(0, (frameAtStart - 1) / FPS);
  const t0     = frameAtStart / FPS;
  const t1     = (frameAtStart + 1) / FPS;
  const t3     = (frameAtStart + 3) / FPS;

  const fBefore = path.join(tmpDir, `${ev.id}_before.jpg`);
  const f0      = path.join(tmpDir, `${ev.id}_at0.jpg`);
  const f1      = path.join(tmpDir, `${ev.id}_at1.jpg`);
  const f3      = path.join(tmpDir, `${ev.id}_at3.jpg`);

  try {
    extractFrame(tBefore, fBefore);
    extractFrame(t0, f0);
    extractFrame(t1, f1);
    extractFrame(t3, f3);

    const diffBefore = mseAvg(fBefore, f0);   // motion before freeze
    const diffAt1    = mseAvg(f0, f1);         // must be frozen by frame 1
    const diffAt3    = mseAvg(f1, f3);         // must remain frozen

    const preMotionPresent = diffBefore > PRE_MOTION_THRESHOLD;
    const frozenAt1        = diffAt1 <= FREEZE_THRESHOLD;
    const holdsAt3         = diffAt3 <= FREEZE_THRESHOLD;

    const pass = preMotionPresent && frozenAt1 && holdsAt3;

    const detail = {
      id: ev.id,
      lyric: ev.lyric,
      start_sec: ev.start_sec,
      diffBefore: diffBefore.toFixed(4),
      diffAt1: diffAt1.toFixed(4),
      diffAt3: diffAt3.toFixed(4),
      preMotionPresent,
      frozenAt1,
      holdsAt3,
      status: pass ? "PASS" : "FAIL",
    };

    results.push(detail);

    if (!pass) {
      allPassed = false;
      const reasons = [];
      if (!preMotionPresent)
        reasons.push(`no pre-freeze motion (diffBefore=${diffBefore.toFixed(4)} ≤ ${PRE_MOTION_THRESHOLD}) — animation may be dead`);
      if (!frozenAt1)
        reasons.push(`body still moving at frame+1 (diffAt1=${diffAt1.toFixed(4)} > ${FREEZE_THRESHOLD})`);
      if (!holdsAt3)
        reasons.push(`freeze not held at frame+3 (diffAt3=${diffAt3.toFixed(4)} > ${FREEZE_THRESHOLD})`);
      console.error(`FAIL [${ev.id}] "${ev.lyric}" t=${ev.start_sec}s — ${reasons.join("; ")}`);
    } else {
      console.log(
        `PASS [${ev.id}] "${ev.lyric}" t=${ev.start_sec}s — ` +
        `pre=${diffBefore.toFixed(3)} freeze1=${diffAt1.toFixed(3)} hold3=${diffAt3.toFixed(3)}`
      );
    }
  } catch (err) {
    console.error(`ERROR [${ev.id}]: ${err.message}`);
    results.push({
      id: ev.id,
      lyric: ev.lyric,
      start_sec: ev.start_sec,
      status: "ERROR",
      error: err.message,
    });
    allPassed = false;
  }
}

fs.rmSync(tmpDir, { recursive: true, force: true });

const outJson = path.join(__dirname, "..", "freeze-verify-results.json");
fs.writeFileSync(outJson, JSON.stringify(results, null, 2));

const passed = results.filter((r) => r.status === "PASS").length;
const failed = results.filter((r) => r.status !== "PASS").length;
console.log(`\nFreeze verify: ${passed} PASS / ${failed} FAIL — results → freeze-verify-results.json`);

process.exit(allPassed ? 0 : 1);
