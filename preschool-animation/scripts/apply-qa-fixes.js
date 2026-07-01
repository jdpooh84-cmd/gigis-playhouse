#!/usr/bin/env node
/**
 * Strict QA auto-fix: parses qa-result.json and applies the ONLY two
 * mechanical fixes possible without human intervention:
 *   - FREEZE_IMMEDIACY: nudge start_sec 1 frame earlier
 *   - MOUTH_SYNC: adjust syllable count by ±1
 *
 * STRICT POLICY (non-negotiable):
 *   LYRIC_ACTION_SYNC findings at ANY severity → UNFIXABLE → exit 1
 *   EXAGGERATION findings at major/critical → UNFIXABLE → exit 1
 *   NO_IDLE_MOTION findings at ANY severity → UNFIXABLE → exit 1
 *   ACTION_DURATION findings at critical → UNFIXABLE → exit 1
 *   FREEZE_IMMEDIACY with freeze_events_failed > 0 in overall → UNFIXABLE if no event match
 *
 * The rationale: these are visual/structural problems that cannot be fixed by
 * adjusting numbers in timeline.json. They require code or sprite changes.
 * Silently dropping them and iterating would release a broken video.
 *
 * Exit codes:
 *   0 = fixes applied — re-render is warranted
 *   1 = unfixable findings exist — pipeline must halt
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
// qa-result.json may be the raw QA object (written by updated qa-submit.js)
// or the older Apify array-wrapped format
let qa;
if (Array.isArray(qaRaw)) {
  const item = qaRaw[0];
  const rawOutput = item?.output ?? item?.text ?? item;
  try { qa = typeof rawOutput === "string" ? JSON.parse(rawOutput) : rawOutput; }
  catch { console.error("Could not parse qa-result.json"); process.exit(1); }
} else {
  qa = qaRaw;
}

if (!qa || typeof qa.overall !== "string" || !Array.isArray(qa.findings)) {
  console.error("qa-result.json is missing required fields (overall, findings). Cannot proceed.");
  process.exit(1);
}

const timeline = JSON.parse(fs.readFileSync(tlFile, "utf8"));
const FPS = timeline._meta.fps;
const frameTime = 1 / FPS;

// Rules that are NEVER auto-fixable — pipeline halts if any are present
const UNFIXABLE_RULES = new Set(["LYRIC_ACTION_SYNC", "NO_IDLE_MOTION"]);
const UNFIXABLE_SEVERITY = new Map([
  ["EXAGGERATION", new Set(["critical", "major"])],
  ["ACTION_DURATION", new Set(["critical"])],
]);

let fixCount = 0;
let unfixable = 0;
const unfixableFindings = [];

for (const finding of qa.findings) {
  if (finding.status === "PASS") continue;

  const rule = finding.rule;
  const severity = finding.severity;
  const ft = parseFloat(finding.frame_estimate) || 0;

  // --- Check absolute blocks first ---
  if (UNFIXABLE_RULES.has(rule)) {
    unfixable++;
    unfixableFindings.push(finding);
    console.error(
      `UNFIXABLE [${severity?.toUpperCase() ?? "?"}] ${rule}: "${finding.lyric_event ?? "?"}" ` +
      `at t=${ft}s — ${finding.description}`
    );
    continue;
  }

  if (UNFIXABLE_SEVERITY.has(rule) && UNFIXABLE_SEVERITY.get(rule).has(severity)) {
    unfixable++;
    unfixableFindings.push(finding);
    console.error(
      `UNFIXABLE [${severity.toUpperCase()}] ${rule}: "${finding.lyric_event ?? "?"}" ` +
      `at t=${ft}s — ${finding.description}`
    );
    continue;
  }

  // --- Mechanical fixes ---

  if (rule === "FREEZE_IMMEDIACY") {
    const ev = timeline.events.find(
      (e) => (e.action === "freeze" || e.freeze_state === true) &&
              Math.abs(e.start_sec - ft) < 0.5
    );
    if (ev) {
      const old = ev.start_sec;
      ev.start_sec = Math.max(0, ev.start_sec - frameTime);
      ev.start_frame = Math.floor(ev.start_sec * FPS);
      console.log(
        `FIX [FREEZE_IMMEDIACY] ${ev.id}: start_sec ${old.toFixed(4)} → ${ev.start_sec.toFixed(4)}`
      );
      fixCount++;
    } else {
      console.error(
        `UNFIXABLE [FREEZE_IMMEDIACY]: no freeze event found near t=${ft}s ` +
        `(searched within 0.5s). Cannot auto-fix.`
      );
      unfixable++;
    }
    continue;
  }

  if (rule === "MOUTH_SYNC") {
    const ev = timeline.events.find(
      (e) => e.mouth_sync && Math.abs(e.start_sec - ft) < 1.0
    );
    if (ev && typeof ev.mouth_sync.syllables === "number") {
      const delta = severity === "critical" ? 2 : 1;
      const old = ev.mouth_sync.syllables;
      const desc = (finding.description ?? "").toLowerCase();
      const newVal = (desc.includes("early") || desc.includes("too soon"))
        ? Math.max(1, old - delta)
        : Math.min(old + delta, 30); // sanity cap at 30 syllables
      ev.mouth_sync.syllables = newVal;
      console.log(`FIX [MOUTH_SYNC] ${ev.id}: syllables ${old} → ${newVal}`);
      fixCount++;
    } else {
      console.error(
        `UNFIXABLE [MOUTH_SYNC]: no patchable event near t=${ft}s, or event has no syllable count.`
      );
      unfixable++;
    }
    continue;
  }

  // All other rules: if critical → unfixable halt; if major/minor → log but do NOT silently pass
  if (severity === "critical") {
    unfixable++;
    unfixableFindings.push(finding);
    console.error(
      `UNFIXABLE [CRITICAL] ${rule}: "${finding.lyric_event ?? "?"}" ` +
      `at t=${ft}s — ${finding.description}`
    );
  } else {
    // major or minor — not auto-fixable, but also not a hard stop by itself
    // Record it but do not count as unfixable-halt
    console.warn(
      `NOT FIXED [${severity?.toUpperCase() ?? "?"}] ${rule}: "${finding.lyric_event ?? "?"}" ` +
      `at t=${ft}s — ${finding.description}\n` +
      `  → This requires manual fix (motion/sprite/timing change). ` +
      `It will be caught by the release gate.`
    );
  }
}

if (fixCount > 0) {
  fs.writeFileSync(tlFile, JSON.stringify(timeline, null, 2));
  console.log(`\nApplied ${fixCount} mechanical fix(es) to timeline.json.`);
}

if (unfixable > 0) {
  console.error(
    `\n${unfixable} UNFIXABLE finding(s) — pipeline cannot continue without manual intervention.`
  );
  console.error("Unfixable findings:");
  for (const f of unfixableFindings) {
    console.error(`  [${f.rule}/${f.severity}] "${f.lyric_event ?? "?"}" — ${f.description}`);
  }
  process.exit(1);
}

if (fixCount === 0) {
  console.log("No mechanical fixes available.");
  process.exit(1);
}

process.exit(0);
