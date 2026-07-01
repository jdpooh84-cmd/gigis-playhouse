import timelineData from "../../timeline.json";

export type TimelineEvent = (typeof timelineData.events)[number];

/** Return the active event for a given time in seconds. */
export function getEventAtTime(timeSec: number): TimelineEvent | null {
  for (const ev of timelineData.events) {
    if (timeSec >= ev.start_sec && timeSec < ev.end_sec) return ev as TimelineEvent;
  }
  return timelineData.events[timelineData.events.length - 1] as TimelineEvent;
}

/** Return the current background key for a given time. */
export function getBackground(timeSec: number): "meadow" | "stage" {
  let bg: "meadow" | "stage" = "meadow";
  for (const t of timelineData.background_transitions) {
    if (timeSec >= t.at_sec) bg = t.background as "meadow" | "stage";
  }
  return bg;
}

/**
 * How far into the current event are we, as a 0–1 progress value.
 * Used to drive motion animations within the event window.
 */
export function eventProgress(ev: TimelineEvent, timeSec: number): number {
  const dur = ev.end_sec - ev.start_sec;
  if (dur <= 0) return 0;
  return Math.min(1, Math.max(0, (timeSec - ev.start_sec) / dur));
}

/**
 * Whether the mouth should be open at the current frame.
 * Distributes open/closed pulses evenly across the event's syllable count.
 */
export function isMouthOpen(ev: TimelineEvent, timeSec: number): boolean {
  if (!ev.mouth_sync.open) return false;
  const syllables = ev.mouth_sync.syllables ?? 0;
  if (syllables === 0) return false;

  const dur = ev.end_sec - ev.start_sec;
  const syllableDur = dur / syllables;
  const offsetInEvent = timeSec - ev.start_sec;
  const syllableIndex = Math.floor(offsetInEvent / syllableDur);
  const posInSyllable = (offsetInEvent % syllableDur) / syllableDur;

  // Open for first 60% of each syllable, closed for last 40%
  return syllableIndex < syllables && posInSyllable < 0.6;
}

/** Smoothstep easing. */
export function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}
