#!/usr/bin/env node
/**
 * Parses qa-result.json and applies mechanical fixes to timeline.json.
 * Only fixes issues the script can resolve deterministically:
 *   - FREEZE events where timing is off: nudge start_sec 1 frame earlier
 *   - MOUTH_SYNC drift: adjust syllable count by ±1
 *
 * Unfixable issues (wrong action type, missing art) are reported and exit 1.
 *
 * Usage: node scripts/apply-qa-fixes.js qa-result.json timeline.json
 */

const fs = require("fs");
const path = require("path");

const qaFile = process.argv[2];
const tlFile = process.argv[3];

if (!qaFile || !tlFile) {
  console.error("Usage: node scripts/apply-qa-fixes.js qa-result.json timeline.json");
  process.exit(1);
}

const qaRaw = JSON.parse(fs.readFileSync(qaFile, "utf8"));
const qaItems = Array.isArray(qaRaw) ? qaRaw : [qaRaw];
const qaOutput = qaItems[0]?.output;
let qa;
try {
  qa = typeof qaOutput === "string" ? JSON.parse(qaOutput) : qaOutput;
} catch {
  console.error("Could not parse QA output from qa-result.json");
  process.exit(1);
}

const timeline = JSON.parse(fs.readFileSync(tlFile, "utf8"));
const FPS = timeline._meta.fps;
const frameTime = 1 / FPS;

let fixCount = 0;
let unfixable = 0;

for (const finding of (qa.findings || [])) {
  if (finding.status === "PASS") continue;

  const rule = finding.rule;
  const ft = parseFloat(finding.frame_estimate) || 0;

  if (rule === "FREEZE_IMMEDIACY") {
    // Find freeze event nearest to the reported frame_estimate
    const ev = timeline.events.find(
      (e) => e.action === "freeze" && Math.abs(e.start_sec - ft) < 0.5
    );
    if (ev) {
      const old = ev.start_sec;
      ev.start_sec = Math.max(0, ev.start_sec - frameTime);
      console.log(`Fixed ${ev.id}: start_sec ${old.toFixed(4)} → ${ev.start_sec.toFixed(4)}`);
      fixCount++;
    } else {
      console.warn(`No freeze event found near t=${ft}s for FREEZE_IMMEDIACY finding`);
      unfixable++;
    }
  } else if (rule === "MOUTH_SYNC") {
    // Adjust syllable count of event nearest to the timestamp
    const ev = timeline.events.find(
      (e) => e.mouth_sync && Math.abs(e.start_sec - ft) < 1.0
    );
    if (ev && ev.mouth_sync.syllables != null) {
      const severity = finding.severity;
      const delta = severity === "critical" ? 2 : 1;
      const old = ev.mouth_sync.syllables;
      // If drift is early (opening too soon), reduce syllables; if late, increase
      const desc = (finding.description || "").toLowerCase();
      const newVal = desc.includes("early") || desc.includes("too soon")
        ? Math.max(1, old - delta)
        : old + delta;
      ev.mouth_sync.syllables = newVal;
      console.log(`Fixed mouth sync on ${ev.id}: syllables ${old} → ${newVal}`);
      fixCount++;
    } else {
      console.warn(`No patchable event near t=${ft}s for MOUTH_SYNC finding`);
      unfixable++;
    }
  } else if (finding.severity === "critical") {
    console.error(
      `Unfixable critical finding: [${rule}] at t=${ft}s — ${finding.description}`
    );
    unfixable++;
  } else {
    console.warn(`Minor/major non-critical finding ignored (auto-fix scope): [${rule}]`);
  }
}

if (fixCount > 0) {
  fs.writeFileSync(tlFile, JSON.stringify(timeline, null, 2));
  console.log(`Applied ${fixCount} fix(es) to timeline.json.`);
}

if (unfixable > 0) {
  console.error(`${unfixable} unfixable finding(s). Manual intervention required.`);
  process.exit(1);
}

if (fixCount === 0) {
  console.log("No patchable findings. Nothing changed.");
  process.exit(1);
}

process.exit(0);
