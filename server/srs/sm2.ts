/**
 * SM-2 Spaced Repetition Algorithm
 * 
 * Implementation of the SuperMemo SM-2 algorithm for Gigi's Playhouse flashcards.
 * Adapted for children: more forgiving ease factor adjustments and shorter initial intervals.
 * 
 * Quality ratings (mapped from child responses):
 *   5 = "knew" instantly (perfect response)
 *   4 = "knew" with slight hesitation
 *   3 = "almost" (correct after thought)
 *   2 = "almost" (incorrect but close)
 *   1 = "learning" (incorrect, remembered after seeing answer)
 *   0 = "learning" (complete blackout)
 */

export interface SM2Card {
  easeFactor: number;    // EF >= 1.3, starts at 2.5
  intervalDays: number;  // Days until next review
  repetitions: number;   // Number of consecutive correct reviews
  dueAt: Date;           // When the card is next due
}

export interface SM2Result extends SM2Card {
  lastReviewed: Date;
}

/**
 * Map child-friendly response to SM-2 quality (0-5).
 * "knew" = 5, "almost" = 3, "learning" = 1
 */
export function mapResponseToQuality(response: 'knew' | 'almost' | 'learning'): number {
  switch (response) {
    case 'knew': return 5;
    case 'almost': return 3;
    case 'learning': return 1;
  }
}

/**
 * Calculate the next review state using SM-2 algorithm.
 * 
 * @param current - Current card state
 * @param quality - Response quality (0-5)
 * @returns Updated card state
 */
export function calculateSM2(
  current: SM2Card,
  quality: number
): SM2Result {
  const now = new Date();
  let { easeFactor, intervalDays, repetitions } = current;

  // Clamp quality to 0-5
  quality = Math.max(0, Math.min(5, Math.round(quality)));

  if (quality >= 3) {
    // Correct response — advance the interval
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 3; // More forgiving for children (standard SM-2 uses 6)
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect response — reset
    repetitions = 0;
    intervalDays = 1;
  }

  // Update ease factor using SM-2 formula
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Minimum ease factor of 1.3 (standard SM-2 constraint)
  easeFactor = Math.max(1.3, easeFactor);

  // Cap maximum interval at 180 days for children (they need more frequent review)
  intervalDays = Math.min(intervalDays, 180);

  // Calculate next due date
  const dueAt = new Date(now);
  dueAt.setDate(dueAt.getDate() + intervalDays);

  return {
    easeFactor: Math.round(easeFactor * 100) / 100,
    intervalDays,
    repetitions,
    dueAt,
    lastReviewed: now,
  };
}

/**
 * Get the initial state for a new flashcard (never reviewed).
 */
export function getInitialSM2State(): SM2Card {
  return {
    easeFactor: 2.5,
    intervalDays: 0,
    repetitions: 0,
    dueAt: new Date(), // Due immediately
  };
}

/**
 * Determine the Leitner-style bucket (1-5) from SM-2 state.
 * Used for visual progress display.
 */
export function getBucketFromSM2(card: SM2Card): number {
  if (card.repetitions === 0) return 1;
  if (card.intervalDays <= 1) return 1;
  if (card.intervalDays <= 3) return 2;
  if (card.intervalDays <= 7) return 3;
  if (card.intervalDays <= 21) return 4;
  return 5; // Mastered
}
