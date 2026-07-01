#!/usr/bin/env node
/**
 * Release gate — final hard check before any video is published.
 *
 * Reads:
 *   - freeze-verify-results.json  (from verify-freeze-frames.js)
 *   - qa-result.json              (from qa-submit.js)
 *   - timeline.json               (for the full event list)
 *
 * Blocks release if ANY of the following are true:
 *   1. Any freeze event is not PASS in freeze-verify-results.json
 *   2. Any freeze event is not PASS in Apify QA (freeze_events_failed > 0)
 *   3. Apify QA overall != "PASS"
 *   4. Apify QA has any critical_failures > 0
 *   5. Apify QA has any LYRIC_ACTION_SYNC finding with status != PASS
 *   6. Apify QA has any NO_IDLE_MOTION finding with status != PASS
 *   7. freeze-verify-results.json or qa-result.json are missing
 *   8. Any event with validation_critical=true has no corresponding PASS finding
 *
 * Writes:
 *   - qa_report.json             — machine-readable per-event verdict table
 *   - release_gate_report.md     — human-readable pass/fail table
 *
 * Exit 0 = release approved
 * Exit 1 = release BLOCKED (reasons printed to stderr + written to report)
 *
 * Usage: node scripts/release-gate.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const FREEZE_FILE = path.join(ROOT, "freeze-verify-results.json");
const QA_FILE = path.join(ROOT, "qa-result.json");
const TIMELINE_FILE = path.join(ROOT, "timeline.json");

const blocks = []; // accumulate all blocking reasons

// --- Load files ---

if (!fs.existsSync(FREEZE_FILE)) {
  console.error("BLOCK: freeze-verify-results.json not found. Run verify-freeze-frames.js first.");
  process.exit(1);
}
if (!fs.existsSync(QA_FILE)) {
  console.error("BLOCK: qa-result.json not found. Run qa-submit.js first.");
  process.exit(1);
}

const freezeResults = JSON.parse(fs.readFileSync(FREEZE_FILE, "utf8"));
const qaRaw = JSON.parse(fs.readFileSync(QA_FILE, "utf8"));
const timeline = JSON.parse(fs.readFileSync(TIMELINE_FILE, "utf8"));

// Normalize qa-result (may be the direct QA object or array-wrapped Apify format)
let qa;
if (Array.isArray(qaRaw)) {
  const item = qaRaw[0];
  const raw = item?.output ?? item?.text ?? item;
  try { qa = typeof raw === "string" ? JSON.parse(raw) : raw; }
  catch { console.error("BLOCK: Cannot parse qa-result.json"); process.exit(1); }
} else {
  qa = qaRaw;
}

if (!qa || typeof qa.overall !== "string" || !Array.isArray(qa.findings)) {
  blocks.push("qa-result.json is missing required fields (overall, findings)");
}

// --- Check 1: All freeze events passed pixel-diff verification ---

const freezeByEvent = {};
for (const r of freezeResults) {
  freezeByEvent[r.id] = r;
}

const freezeEventsFailed = freezeResults.filter((r) => r.status !== "PASS");
if (freezeEventsFailed.length > 0) {
  for (const f of freezeEventsFailed) {
    blocks.push(
      `Freeze pixel-diff FAIL: [${f.id}] "${f.lyric}" at t=${f.start_sec}s — ` +
      (f.error || `diffAt1=${f.diffAt1} diffAt3=${f.diffAt3} preMotion=${f.preMotionPresent}`)
    );
  }
}

// --- Check 2: Apify QA freeze counts ---

if (qa && typeof qa.freeze_events_failed === "number" && qa.freeze_events_failed > 0) {
  blocks.push(
    `Apify QA: ${qa.freeze_events_failed} freeze event(s) failed LLM evaluation`
  );
}

// --- Check 3: Apify overall pass ---

if (qa && qa.overall !== "PASS") {
  blocks.push(`Apify QA overall: ${qa.overall}`);
}

// --- Check 4: Critical failures count ---

if (qa && typeof qa.critical_failures === "number" && qa.critical_failures > 0) {
  blocks.push(`Apify QA: ${qa.critical_failures} critical failure(s) reported`);
}

// --- Check 5: LYRIC_ACTION_SYNC and NO_IDLE_MOTION ---

if (qa?.findings) {
  const hardBlocks = qa.findings.filter(
    (f) =>
      f.status !== "PASS" &&
      (f.rule === "LYRIC_ACTION_SYNC" || f.rule === "NO_IDLE_MOTION")
  );
  for (const f of hardBlocks) {
    blocks.push(
      `Apify QA [${f.rule}/${f.severity}]: "${f.lyric_event ?? "?"}" at t=${f.frame_estimate}s — ${f.description}`
    );
  }

  // Check EXAGGERATION at major/critical severity
  const exagFails = qa.findings.filter(
    (f) =>
      f.status !== "PASS" &&
      f.rule === "EXAGGERATION" &&
      (f.severity === "major" || f.severity === "critical")
  );
  for (const f of exagFails) {
    blocks.push(
      `Apify QA [EXAGGERATION/${f.severity}]: "${f.lyric_event ?? "?"}" at t=${f.frame_estimate}s — ${f.description}`
    );
  }
}

// --- Check 6: All validation_critical events have a matching PASS freeze result ---

const criticalEvents = timeline.events.filter((e) => e.validation_critical === true);
for (const ev of criticalEvents) {
  const freezeResult = freezeByEvent[ev.id];
  if (!freezeResult) {
    blocks.push(
      `Critical event ${ev.id} ("${ev.lyric}") has no entry in freeze-verify-results.json`
    );
  } else if (freezeResult.status !== "PASS") {
    // Already caught above, but be explicit
    blocks.push(
      `Critical event ${ev.id} ("${ev.lyric}") verification status: ${freezeResult.status}`
    );
  }
}

// --- Build per-event report table ---

const allEvents = timeline.events.map((ev) => {
  const freezeR = freezeByEvent[ev.id];
  let qaFinding = null;
  if (qa?.findings) {
    const ft = ev.start_sec;
    qaFinding = qa.findings.find(
      (f) => f.frame_estimate != null && Math.abs(f.frame_estimate - ft) < 1.0 && f.status !== "PASS"
    );
  }

  const isFreezeEvent = ev.action === "freeze" || ev.freeze_state === true;
  const freezeStatus = freezeR ? freezeR.status : (isFreezeEvent ? "MISSING" : "N/A");
  const qaStatus = qaFinding ? `${qaFinding.status}(${qaFinding.rule}/${qaFinding.severity})` : "PASS";
  const eventStatus =
    (freezeStatus === "PASS" || freezeStatus === "N/A") && qaStatus === "PASS" ? "PASS" : "FAIL";

  return {
    id: ev.id,
    start_sec: ev.start_sec,
    lyric: ev.lyric,
    action: ev.action,
    is_freeze: isFreezeEvent,
    validation_critical: ev.validation_critical ?? false,
    freeze_pixel_diff_status: freezeStatus,
    apify_qa_status: qaStatus,
    overall_event_status: eventStatus,
    detail: freezeR
      ? { diffAt1: freezeR.diffAt1, diffAt3: freezeR.diffAt3, preMotionPresent: freezeR.preMotionPresent }
      : null,
  };
});

const qaReport = {
  generated_at: new Date().toISOString(),
  overall: blocks.length === 0 ? "PASS" : "FAIL",
  block_count: blocks.length,
  blocks,
  apify_overall: qa?.overall ?? "MISSING",
  apify_critical_failures: qa?.critical_failures ?? "MISSING",
  apify_freeze_passed: qa?.freeze_events_passed ?? "MISSING",
  apify_freeze_failed: qa?.freeze_events_failed ?? "MISSING",
  pixel_diff_freeze_passed: freezeResults.filter((r) => r.status === "PASS").length,
  pixel_diff_freeze_failed: freezeResults.filter((r) => r.status !== "PASS").length,
  events: allEvents,
};

fs.writeFileSync(path.join(ROOT, "qa_report.json"), JSON.stringify(qaReport, null, 2));

// --- Build release_gate_report.md ---

const passEmoji = "✅";
const failEmoji = "❌";
const naEmoji = "—";

const rows = allEvents.map((e) => {
  const freezeCell = e.freeze_pixel_diff_status === "N/A" ? naEmoji :
    e.freeze_pixel_diff_status === "PASS" ? passEmoji :
    `${failEmoji} ${e.freeze_pixel_diff_status}`;
  const qaCell = e.apify_qa_status === "PASS" ? passEmoji : `${failEmoji} ${e.apify_qa_status}`;
  const overall = e.overall_event_status === "PASS" ? passEmoji : failEmoji;
  const crit = e.validation_critical ? "**CRIT**" : "";
  const lyric = (e.lyric ?? "").replace(/\|/g, "\\|").slice(0, 45);
  return `| ${e.start_sec.toFixed(2)} | ${lyric} | ${e.action} | ${crit} | ${freezeCell} | ${qaCell} | ${overall} |`;
}).join("\n");

const gateStatus = blocks.length === 0
  ? "## RELEASE GATE: ✅ APPROVED"
  : `## RELEASE GATE: ❌ BLOCKED (${blocks.length} issue${blocks.length > 1 ? "s" : ""})`;

const blockList = blocks.length > 0
  ? "\n### Blocking Issues\n" + blocks.map((b, i) => `${i + 1}. ${b}`).join("\n")
  : "";

const apifyFindings = (qa?.findings ?? [])
  .filter((f) => f.status !== "PASS")
  .map((f) => `| ${f.rule} | ${f.severity} | ${f.status} | ${(f.lyric_event ?? "").slice(0, 40)} | ${f.frame_estimate ?? "?"} | ${(f.description ?? "").slice(0, 80)} |`)
  .join("\n");

const reportMd = `# QA & Release Gate Report

${gateStatus}
${blockList}

---

## Per-Event Verification Table

| t (s) | Lyric | Action | Critical | Freeze Pixel-Diff | Apify QA | Event Status |
|-------|-------|--------|----------|-------------------|----------|--------------|
${rows}

---

## Apify QA Findings

**Overall:** ${qa?.overall ?? "MISSING"}
**Critical failures:** ${qa?.critical_failures ?? "MISSING"}
**Freeze events passed:** ${qa?.freeze_events_passed ?? "MISSING"} / total ${qa?.freeze_events_total ?? "MISSING"}
**Summary:** ${qa?.summary ?? "MISSING"}

${apifyFindings ? `| Rule | Severity | Status | Lyric Event | Time (s) | Description |\n|------|----------|--------|-------------|----------|-------------|\n${apifyFindings}` : "_No non-PASS findings._"}

---

## Pixel-Diff Freeze Verification

| Event ID | Lyric | t (s) | diffBefore | diffAt1 | diffAt3 | Pre-Motion | Status |
|----------|-------|-------|-----------|---------|---------|------------|--------|
${freezeResults.map((r) => {
  const statusCell = r.status === "PASS" ? passEmoji : failEmoji;
  return `| ${r.id} | ${(r.lyric ?? "").slice(0, 30)} | ${r.start_sec} | ${r.diffBefore ?? "—"} | ${r.diffAt1 ?? "—"} | ${r.diffAt3 ?? "—"} | ${r.preMotionPresent ?? "—"} | ${statusCell} ${r.status} |`;
}).join("\n")}

---
_Generated: ${qaReport.generated_at}_
`;

fs.writeFileSync(path.join(ROOT, "release_gate_report.md"), reportMd);

// --- Final verdict ---

console.log(`\nqa_report.json and release_gate_report.md written.`);
console.log(
  `Pixel-diff freeze: ${qaReport.pixel_diff_freeze_passed} PASS / ${qaReport.pixel_diff_freeze_failed} FAIL`
);
console.log(
  `Apify QA: ${qa?.overall ?? "MISSING"} — ${qa?.critical_failures ?? "?"} critical failures`
);

if (blocks.length > 0) {
  console.error(`\n❌ RELEASE BLOCKED — ${blocks.length} issue(s):`);
  blocks.forEach((b, i) => console.error(`  ${i + 1}. ${b}`));
  process.exit(1);
}

console.log("\n✅ RELEASE GATE: APPROVED — all checks passed.");
process.exit(0);
