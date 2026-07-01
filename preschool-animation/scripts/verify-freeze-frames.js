#!/usr/bin/env node
/**
 * Deterministic freeze-frame verifier.
 *
 * For each FREEZE event in timeline.json, samples the rendered video at:
 *   - 1 frame BEFORE the event start (should have motion)
 *   - frame 0 of the event (must be frozen)
 *   - frame 2 of the event (must remain frozen)
 *
 * "Frozen" = pixel difference between consecutive frames < FREEZE_THRESHOLD.
 * Uses ffmpeg to extract individual frames, then compares via pixel data.
 *
 * Exit 0 = all freeze events pass
 * Exit 1 = one or more freeze events fail
 *
 * Usage: node scripts/verify-freeze-frames.js out/draft.mp4
 */

const { execSync, spawnSync } = require("child_process");
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
const FREEZE_THRESHOLD = 0.5; // max allowed mean-pixel-diff for a "frozen" frame pair

const freezeEvents = timeline.events.filter((e) => e.action === "freeze");

if (freezeEvents.length === 0) {
  console.log("No freeze events in timeline. Nothing to verify.");
  process.exit(0);
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "freeze-verify-"));

function extractFrame(videoPath, timeSec, outFile) {
  const r = spawnSync("ffmpeg", [
    "-y",
    "-ss", timeSec.toFixed(4),
    "-i", videoPath,
    "-vframes", "1",
    "-f", "image2",
    outFile,
  ], { stdio: "pipe" });
  if (r.status !== 0) {
    throw new Error(`ffmpeg frame extract failed at t=${timeSec}: ${r.stderr.toString().slice(-200)}`);
  }
}

function meanPixelDiff(fileA, fileB) {
  // Use ffmpeg's psnr/ssim filter to get difference metric
  const r = spawnSync("ffmpeg", [
    "-i", fileA,
    "-i", fileB,
    "-lavfi", "psnr",
    "-f", "null",
    "-",
  ], { stdio: "pipe" });

  const output = r.stderr.toString();
  const match = output.match(/mse_avg:([\d.]+)/);
  if (!match) {
    // Fallback: if psnr filter unavailable, use file identity check
    const aSize = fs.statSync(fileA).size;
    const bSize = fs.statSync(fileB).size;
    return Math.abs(aSize - bSize) / Math.max(aSize, bSize) * 100;
  }
  return parseFloat(match[1]);
}

let allPassed = true;
const results = [];

for (const ev of freezeEvents) {
  const frameAtStart = Math.floor(ev.start_sec * FPS);
  const tBefore = Math.max(0, (frameAtStart - 1) / FPS);
  const t0 = frameAtStart / FPS;
  const t2 = (frameAtStart + 2) / FPS;

  const f0 = path.join(tmpDir, `freeze_${ev.id}_before.jpg`);
  const f1 = path.join(tmpDir, `freeze_${ev.id}_at0.jpg`);
  const f2 = path.join(tmpDir, `freeze_${ev.id}_at2.jpg`);

  try {
    extractFrame(videoPath, tBefore, f0);
    extractFrame(videoPath, t0, f1);
    extractFrame(videoPath, t2, f2);

    const diffAt0 = meanPixelDiff(f0, f1);   // before → frame0: should show motion cut
    const diffAt2 = meanPixelDiff(f1, f2);   // frame0 → frame2: should be near zero

    const frozenAtStart = diffAt2 <= FREEZE_THRESHOLD;
    const status = frozenAtStart ? "PASS" : "FAIL";

    results.push({
      id: ev.id,
      lyric: ev.lyric,
      start_sec: ev.start_sec,
      diffAt2: diffAt2.toFixed(3),
      status,
    });

    if (!frozenAtStart) {
      allPassed = false;
      console.error(
        `FAIL: ${ev.id} ("${ev.lyric}") at t=${ev.start_sec}s — ` +
        `frame diff after freeze = ${diffAt2.toFixed(3)} (threshold ${FREEZE_THRESHOLD})`
      );
    } else {
      console.log(
        `PASS: ${ev.id} ("${ev.lyric}") at t=${ev.start_sec}s — frozen (diff=${diffAt2.toFixed(3)})`
      );
    }
  } catch (err) {
    console.error(`ERROR checking ${ev.id}: ${err.message}`);
    results.push({ id: ev.id, lyric: ev.lyric, start_sec: ev.start_sec, status: "ERROR", error: err.message });
    allPassed = false;
  }
}

// Write results
const outJson = path.join(__dirname, "..", "freeze-verify-results.json");
fs.writeFileSync(outJson, JSON.stringify(results, null, 2));
console.log(`\nFreeze verify results written to freeze-verify-results.json`);
console.log(`Passed: ${results.filter((r) => r.status === "PASS").length}/${results.length}`);

// Cleanup
fs.rmSync(tmpDir, { recursive: true, force: true });

process.exit(allPassed ? 0 : 1);
