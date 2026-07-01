/**
 * Extracts keyframes from a local MP4 file using ffmpeg.
 *
 * Strategy:
 *   1. For EVERY timeline event: extract frame at event.start_sec + 0.05s
 *      (captures action onset before motion interpolation begins)
 *   2. For FREEZE events: extract 3 additional frames:
 *      - start_sec - 1_frame  (should show motion)
 *      - start_sec + 1_frame  (body must be frozen)
 *      - start_sec + 3_frames (body must remain frozen)
 *   3. Fill remaining capacity with evenly-spaced baseline frames
 *      (catches any action the timeline missed)
 *
 * Returns array of:
 *   { filePath, timeSec, eventId, label, isFreezeFrame }
 */

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

module.exports = function extractKeyframes({
  videoPath,
  tmpDir,
  timeline,
  frameWidth,
  maxKeyframes,
  keyframeIntervalSec,
}) {
  const FPS = timeline?._meta?.fps ?? 30;
  const FRAME = 1 / FPS;
  const DURATION = timeline?._meta?.duration_sec ?? 160;

  // --- Build prioritised timestamp list ---
  const stamps = []; // { timeSec, eventId, label, isFreezeFrame, priority }

  if (timeline?.events) {
    for (const ev of timeline.events) {
      const isFreeze = ev.action === "freeze" || ev.freeze_state === true;

      // Event onset frame — highest priority
      stamps.push({
        timeSec: ev.start_sec + FRAME,
        eventId: ev.id,
        label: `${ev.id}_onset`,
        isFreezeFrame: false,
        priority: isFreeze ? 1 : 2,
      });

      if (isFreeze) {
        // Frame before freeze
        stamps.push({
          timeSec: Math.max(0, ev.start_sec - FRAME),
          eventId: ev.id,
          label: `${ev.id}_pre`,
          isFreezeFrame: true,
          priority: 0,
        });
        // Frame +1 after freeze start
        stamps.push({
          timeSec: ev.start_sec + FRAME,
          eventId: ev.id,
          label: `${ev.id}_at1`,
          isFreezeFrame: true,
          priority: 0,
        });
        // Frame +3 after freeze start (hold check)
        stamps.push({
          timeSec: ev.start_sec + 3 * FRAME,
          eventId: ev.id,
          label: `${ev.id}_at3`,
          isFreezeFrame: true,
          priority: 0,
        });
      }
    }
  }

  // Baseline scan: evenly spaced across full video
  for (let t = 0; t < DURATION; t += keyframeIntervalSec) {
    stamps.push({
      timeSec: t,
      eventId: null,
      label: `baseline_${t.toFixed(1)}`,
      isFreezeFrame: false,
      priority: 3,
    });
  }

  // Deduplicate and sort by priority then time
  const seen = new Set();
  const unique = stamps
    .filter((s) => {
      const key = s.timeSec.toFixed(3);
      if (seen.has(key)) return false;
      seen.add(key);
      return s.timeSec >= 0 && s.timeSec <= DURATION;
    })
    .sort((a, b) => a.priority - b.priority || a.timeSec - b.timeSec)
    .slice(0, maxKeyframes);

  // Sort final list by timestamp for coherent LLM batches
  unique.sort((a, b) => a.timeSec - b.timeSec);

  // --- Extract frames with ffmpeg ---
  const frames = [];

  for (const s of unique) {
    const outFile = path.join(tmpDir, `frame_${s.label.replace(/[^a-z0-9_]/gi, "_")}.jpg`);

    const r = spawnSync("ffmpeg", [
      "-y",
      "-ss", s.timeSec.toFixed(6),
      "-i", videoPath,
      "-vframes", "1",
      "-vf", `scale=${frameWidth}:-1`,
      "-q:v", "3",
      outFile,
    ], { stdio: "pipe" });

    if (r.status !== 0) {
      const err = r.stderr.toString().slice(-200);
      console.warn(`[extractKeyframes] Warning: ffmpeg failed at t=${s.timeSec.toFixed(3)}s — ${err}`);
      continue;
    }

    if (!fs.existsSync(outFile) || fs.statSync(outFile).size === 0) {
      console.warn(`[extractKeyframes] Warning: empty frame at t=${s.timeSec.toFixed(3)}s`);
      continue;
    }

    frames.push({ ...s, filePath: outFile });
  }

  console.log(`[extractKeyframes] Extracted ${frames.length} frames (${unique.length} requested, ${maxKeyframes} max)`);
  return frames;
};
