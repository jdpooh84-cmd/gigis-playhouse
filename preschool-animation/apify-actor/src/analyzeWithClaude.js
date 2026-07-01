/**
 * Analyzes a batch of keyframes using the Claude vision API.
 *
 * Each batch covers a contiguous time window. The prompt includes:
 *   - Timeline events active in that window (for grounding the LLM)
 *   - Frame timestamps and labels so the model can correlate images to events
 *
 * Returns an array of findings, each matching the required output schema:
 *   { event_id, timestamp_start, timestamp_end, lyric, category, severity, pass_or_fail, correction_note }
 */

const fs = require("fs");
const Anthropic = require("@anthropic-ai/sdk");

const VALID_CATEGORIES = new Set([
  "FREEZE_IMMEDIACY",
  "LYRIC_ACTION_SYNC",
  "MOUTH_SYNC",
  "NO_IDLE_MOTION",
  "EXAGGERATION",
  "ACTION_DURATION",
]);
const VALID_SEVERITIES = new Set(["minor", "major", "critical"]);
const VALID_VERDICTS = new Set(["PASS", "FAIL"]);

module.exports = async function analyzeWithClaude({
  frames,       // [{filePath, timeSec, eventId, label, isFreezeFrame}]
  timeline,     // full timeline object
  modelName,    // e.g. "claude-haiku-4-5-20251001"
  anthropicApiKey,
}) {
  const client = new Anthropic({ apiKey: anthropicApiKey });

  if (!frames || frames.length === 0) return [];

  const windowStart = frames[0].timeSec;
  const windowEnd = frames[frames.length - 1].timeSec;

  // Find timeline events that overlap this window (+/- 2s margin)
  const relevantEvents = (timeline?.events ?? []).filter(
    (ev) => ev.end_sec >= windowStart - 2 && ev.start_sec <= windowEnd + 2
  );

  const eventContext = relevantEvents.length > 0
    ? relevantEvents.map((ev) => {
        const isFreeze = ev.action === "freeze" || ev.freeze_state === true;
        return (
          `  - id="${ev.id}" t=${ev.start_sec.toFixed(2)}–${ev.end_sec.toFixed(2)}s` +
          ` lyric="${ev.lyric}" action=${ev.action}` +
          (isFreeze ? " [FREEZE: body must stop within 1 frame, mouth may continue]" : "") +
          (ev.mouth_sync?.syllables ? ` mouth_syllables=${ev.mouth_sync.syllables}` : "")
        );
      }).join("\n")
    : "  (no timeline events in this window)";

  const frameIndex = frames.map((f, i) =>
    `  Frame ${i + 1}: t=${f.timeSec.toFixed(3)}s  label=${f.label}` +
    (f.isFreezeFrame ? " [freeze-check frame]" : "")
  ).join("\n");

  const systemPrompt = `You are a strict QA engineer for a preschool children's animation video.
The song is "ZOOMY ZOOM FREEZE." Leo and Zoe are human child characters.
You receive keyframes from the video and must evaluate them against 6 mandatory rules.
Return ONLY valid JSON — no markdown, no prose, no explanation text.`;

  const userPrompt = `
TIMELINE EVENTS FOR THIS WINDOW (t=${windowStart.toFixed(2)}s – ${windowEnd.toFixed(2)}s):
${eventContext}

FRAMES IN THIS BATCH (in order):
${frameIndex}

Evaluate EVERY applicable rule against EVERY frame. For each rule evaluated, produce one finding.
If a rule has no applicable event in this window, skip it.
If an event fully passes a rule, still produce a PASS finding for it.

RULES:
1. FREEZE_IMMEDIACY [critical]: On "FREEZE!" lyric, ALL body motion stops within 1 frame. Mouth may stay open.
2. LYRIC_ACTION_SYNC [critical]: Matching body action starts on the exact beat of the command lyric (≤0.3s drift allowed).
3. MOUTH_SYNC [major]: Mouth open while singing, closed during rests. ≤2 frames drift allowed.
4. ACTION_DURATION [major]: Actions continue for the full lyric phrase, stop when phrase ends.
5. NO_IDLE_MOTION [critical]: During FREEZE events, zero body drift, sway, or idle physics.
6. EXAGGERATION [major]: Every action (zoom, wiggle, jump, spin, arm pump) must be visually large and readable by a 4-year-old.

Return ONLY this JSON (no markdown):
{
  "findings": [
    {
      "event_id": "<id from timeline, or 'general' if no specific event>",
      "timestamp_start": <number: start time in seconds>,
      "timestamp_end": <number: end time in seconds>,
      "lyric": "<lyric text or 'n/a'>",
      "category": "<one of: FREEZE_IMMEDIACY | LYRIC_ACTION_SYNC | MOUTH_SYNC | NO_IDLE_MOTION | EXAGGERATION | ACTION_DURATION>",
      "severity": "<one of: minor | major | critical>",
      "pass_or_fail": "<PASS | FAIL>",
      "correction_note": "<one sentence: what was observed, and what must change if FAIL, or 'OK' if PASS>"
    }
  ]
}`;

  // Build image content blocks
  const imageBlocks = frames.map((f) => {
    const data = fs.readFileSync(f.filePath).toString("base64");
    return {
      type: "image",
      source: { type: "base64", media_type: "image/jpeg", data },
    };
  });

  const response = await client.messages.create({
    model: modelName,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          ...imageBlocks,
          { type: "text", text: userPrompt },
        ],
      },
    ],
  });

  const rawText = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();

  // Extract JSON even if model accidentally wrapped in markdown
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error(`Claude returned non-JSON output for batch t=${windowStart.toFixed(2)}–${windowEnd.toFixed(2)}s:\n${rawText.slice(0, 400)}`);
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch (e) {
    throw new Error(`Failed to parse Claude JSON for batch t=${windowStart.toFixed(2)}–${windowEnd.toFixed(2)}s: ${e.message}\nRaw: ${rawText.slice(0, 400)}`);
  }

  if (!Array.isArray(parsed.findings)) {
    throw new Error(`Claude response missing 'findings' array for batch t=${windowStart.toFixed(2)}–${windowEnd.toFixed(2)}s`);
  }

  // Normalize and validate each finding
  const findings = [];
  for (const f of parsed.findings) {
    if (!VALID_CATEGORIES.has(f.category)) {
      console.warn(`[analyzeWithClaude] Unknown category "${f.category}" — skipping`);
      continue;
    }
    if (!VALID_SEVERITIES.has(f.severity)) {
      console.warn(`[analyzeWithClaude] Unknown severity "${f.severity}" — skipping`);
      continue;
    }
    if (!VALID_VERDICTS.has(f.pass_or_fail)) {
      console.warn(`[analyzeWithClaude] Unknown verdict "${f.pass_or_fail}" — skipping`);
      continue;
    }
    findings.push({
      event_id: String(f.event_id ?? "general"),
      timestamp_start: Number(f.timestamp_start ?? windowStart),
      timestamp_end: Number(f.timestamp_end ?? windowEnd),
      lyric: String(f.lyric ?? "n/a"),
      category: f.category,
      severity: f.severity,
      pass_or_fail: f.pass_or_fail,
      correction_note: String(f.correction_note ?? ""),
    });
  }

  console.log(`[analyzeWithClaude] Batch t=${windowStart.toFixed(2)}–${windowEnd.toFixed(2)}s: ${findings.length} findings (${frames.length} frames)`);
  return findings;
};
