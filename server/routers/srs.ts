/**
 * SRS (Spaced Repetition System) tRPC router.
 * Handles flashcard review sessions using SM-2 algorithm.
 */
import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import * as db from "../db";
import { calculateSM2, mapResponseToQuality, getInitialSM2State, getBucketFromSM2 } from "../srs/sm2";

export const srsRouter = router({
  /**
   * Get all flashcards due today for a child.
   * Returns cards where dueAt <= now, ordered by most overdue first.
   */
  getDueToday: protectedProcedure
    .input(z.object({ childId: z.number() }))
    .query(async ({ input }) => {
      return db.getFlashcardsDueToday(input.childId);
    }),

  /**
   * Get SRS stats for a child — total cards, due today, mastered, etc.
   */
  getStats: protectedProcedure
    .input(z.object({ childId: z.number() }))
    .query(async ({ input }) => {
      const allProgress = await db.getFlashcardProgressByChild(input.childId);
      const now = new Date();

      const dueToday = allProgress.filter(p => new Date(p.dueAt) <= now).length;
      const mastered = allProgress.filter(p => p.bucket >= 4).length;
      const learning = allProgress.filter(p => p.bucket < 4).length;

      return {
        totalCards: allProgress.length,
        dueToday,
        mastered,
        learning,
        averageEase: allProgress.length > 0
          ? Math.round((allProgress.reduce((s, p) => s + (p.easeFactor ?? 2.5), 0) / allProgress.length) * 100) / 100
          : 2.5,
      };
    }),

  /**
   * Submit a review response for a flashcard.
   * Applies SM-2 algorithm and updates the card's schedule.
   */
  submitReview: protectedProcedure
    .input(z.object({
      childId: z.number(),
      flashcardId: z.string(),
      response: z.enum(["knew", "almost", "learning"]),
    }))
    .mutation(async ({ input }) => {
      // Get current card state
      const allProgress = await db.getFlashcardProgressByChild(input.childId);
      const existing = allProgress.find(p => p.flashcardId === input.flashcardId);

      const quality = mapResponseToQuality(input.response);

      // Get current SM-2 state or initialize
      const currentState = existing ? {
        easeFactor: existing.easeFactor ?? 2.5,
        intervalDays: existing.intervalDays ?? 0,
        repetitions: existing.repetitions ?? 0,
        dueAt: existing.dueAt ? new Date(existing.dueAt) : new Date(),
      } : getInitialSM2State();

      // Calculate new state
      const newState = calculateSM2(currentState, quality);
      const bucket = getBucketFromSM2(newState);

      // Upsert to database
      await db.upsertFlashcardSRS({
        childId: input.childId,
        flashcardId: input.flashcardId,
        bucket,
        easeFactor: newState.easeFactor,
        intervalDays: newState.intervalDays,
        repetitions: newState.repetitions,
        dueAt: newState.dueAt,
        lastReviewed: newState.lastReviewed,
        timesCorrect: (existing?.timesCorrect ?? 0) + (quality >= 3 ? 1 : 0),
        timesIncorrect: (existing?.timesIncorrect ?? 0) + (quality < 3 ? 1 : 0),
      });

      return {
        success: true,
        nextDue: newState.dueAt,
        intervalDays: newState.intervalDays,
        bucket,
        easeFactor: newState.easeFactor,
      };
    }),

  /**
   * Initialize SRS tracking for a batch of flashcards (e.g., when enrolling in a new path).
   * Cards that already have progress are skipped.
   */
  initializeCards: protectedProcedure
    .input(z.object({
      childId: z.number(),
      flashcardIds: z.array(z.string()),
    }))
    .mutation(async ({ input }) => {
      const existing = await db.getFlashcardProgressByChild(input.childId);
      const existingIds = new Set(existing.map(p => p.flashcardId));

      const newCards = input.flashcardIds.filter(id => !existingIds.has(id));
      let initialized = 0;

      for (const flashcardId of newCards) {
        const initial = getInitialSM2State();
        await db.upsertFlashcardSRS({
          childId: input.childId,
          flashcardId,
          bucket: 1,
          easeFactor: initial.easeFactor,
          intervalDays: initial.intervalDays,
          repetitions: initial.repetitions,
          dueAt: initial.dueAt,
          lastReviewed: new Date(),
          timesCorrect: 0,
          timesIncorrect: 0,
        });
        initialized++;
      }

      return { initialized, skipped: input.flashcardIds.length - initialized };
    }),
});
