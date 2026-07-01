/**
 * Validates the final actor output against the required schema.
 *
 * Throws with a descriptive error if anything is missing or malformed.
 * Call this before Actor.pushData() to guarantee the dataset never contains
 * an invalid record that the release gate might silently accept.
 */

const REQUIRED_FINDING_FIELDS = [
  "event_id",
  "timestamp_start",
  "timestamp_end",
  "lyric",
  "category",
  "severity",
  "pass_or_fail",
  "correction_note",
];

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

module.exports = function validateOutput(result, expectedSchemaVersion) {
  const errors = [];

  if (!result || typeof result !== "object") {
    throw new Error("Output is not an object.");
  }

  // schemaVersion
  if (typeof result.schemaVersion !== "string" || result.schemaVersion.trim() === "") {
    errors.push("Missing or empty 'schemaVersion' field.");
  } else if (expectedSchemaVersion && result.schemaVersion !== expectedSchemaVersion) {
    errors.push(
      `Schema version mismatch: output has "${result.schemaVersion}", expected "${expectedSchemaVersion}".`
    );
  }

  // overall
  if (result.overall !== "PASS" && result.overall !== "FAIL") {
    errors.push(`'overall' must be "PASS" or "FAIL", got: ${JSON.stringify(result.overall)}`);
  }

  // summary
  if (typeof result.summary !== "string" || result.summary.trim() === "") {
    errors.push("Missing or empty 'summary' field.");
  }

  // findings
  if (!Array.isArray(result.findings)) {
    errors.push("'findings' must be an array.");
  } else if (result.findings.length === 0) {
    errors.push("'findings' array is empty — the actor must produce at least one finding per evaluation.");
  } else {
    result.findings.forEach((f, i) => {
      const prefix = `findings[${i}]`;

      for (const field of REQUIRED_FINDING_FIELDS) {
        if (f[field] === undefined || f[field] === null || f[field] === "") {
          errors.push(`${prefix}: missing required field '${field}'.`);
        }
      }

      if (f.category !== undefined && !VALID_CATEGORIES.has(f.category)) {
        errors.push(`${prefix}: unknown category "${f.category}".`);
      }
      if (f.severity !== undefined && !VALID_SEVERITIES.has(f.severity)) {
        errors.push(`${prefix}: unknown severity "${f.severity}".`);
      }
      if (f.pass_or_fail !== undefined && !VALID_VERDICTS.has(f.pass_or_fail)) {
        errors.push(`${prefix}: 'pass_or_fail' must be PASS or FAIL, got "${f.pass_or_fail}".`);
      }
      if (typeof f.timestamp_start !== "number" || isNaN(f.timestamp_start)) {
        errors.push(`${prefix}: 'timestamp_start' must be a number.`);
      }
      if (typeof f.timestamp_end !== "number" || isNaN(f.timestamp_end)) {
        errors.push(`${prefix}: 'timestamp_end' must be a number.`);
      }
    });
  }

  if (errors.length > 0) {
    throw new Error(
      `Output schema validation failed (${errors.length} error${errors.length > 1 ? "s" : ""}):\n` +
        errors.map((e, i) => `  ${i + 1}. ${e}`).join("\n")
    );
  }
};
