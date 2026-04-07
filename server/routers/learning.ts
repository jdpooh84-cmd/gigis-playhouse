import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import * as db from "../db";

export const learningRouter = router({
  // ─── Enrolled Paths ───────────────────────────────────────────────────────
  listPaths: protectedProcedure
    .input(z.object({ childId: z.number() }))
    .query(async ({ input }) => {
      return db.getEnrolledPathsByChild(input.childId);
    }),

  enrollPath: protectedProcedure
    .input(z.object({
      childId: z.number(),
      domain: z.string(),
      grade: z.number().default(1),
    }))
    .mutation(async ({ input }) => {
      await db.enrollChildInPath({
        childId: input.childId,
        domain: input.domain,
        grade: input.grade,
      });
      return { success: true };
    }),

  unenrollPath: protectedProcedure
    .input(z.object({ childId: z.number(), domain: z.string() }))
    .mutation(async ({ input }) => {
      await db.unenrollChildFromPath(input.childId, input.domain);
      return { success: true };
    }),

  // ─── Lesson Progress ──────────────────────────────────────────────────────
  listLessonProgress: protectedProcedure
    .input(z.object({ childId: z.number() }))
    .query(async ({ input }) => {
      return db.getLessonProgressByChild(input.childId);
    }),

  updateLessonProgress: protectedProcedure
    .input(z.object({
      childId: z.number(),
      lessonId: z.string(),
      completionStatus: z.enum(["not_started", "in_progress", "done"]).default("in_progress"),
      stepsCompleted: z.array(z.string()).default([]),
      completedAt: z.date().nullable().optional(),
    }))
    .mutation(async ({ input }) => {
      await db.upsertLessonProgress({
        childId: input.childId,
        lessonId: input.lessonId,
        completionStatus: input.completionStatus,
        stepsCompleted: input.stepsCompleted,
        completedAt: input.completedAt ?? undefined,
      });
      return { success: true };
    }),

  // ─── Quiz Results ─────────────────────────────────────────────────────────
  listQuizResults: protectedProcedure
    .input(z.object({ childId: z.number() }))
    .query(async ({ input }) => {
      return db.getQuizResultsByChild(input.childId);
    }),

  addQuizResult: protectedProcedure
    .input(z.object({
      childId: z.number(),
      lessonId: z.string(),
      score: z.number(),
      total: z.number(),
      passed: z.boolean(),
      answers: z.array(z.object({
        question_id: z.string(),
        selected: z.number(),
        correct: z.boolean(),
      })).default([]),
    }))
    .mutation(async ({ input }) => {
      await db.addQuizResult({
        childId: input.childId,
        lessonId: input.lessonId,
        score: input.score,
        total: input.total,
        passed: input.passed,
        answers: input.answers,
      });
      return { success: true };
    }),

  // ─── Flashcard Progress ───────────────────────────────────────────────────
  listFlashcardProgress: protectedProcedure
    .input(z.object({ childId: z.number() }))
    .query(async ({ input }) => {
      return db.getFlashcardProgressByChild(input.childId);
    }),

  updateFlashcardProgress: protectedProcedure
    .input(z.object({
      childId: z.number(),
      flashcardId: z.string(),
      bucket: z.number().default(1),
      timesCorrect: z.number().default(0),
      timesIncorrect: z.number().default(0),
    }))
    .mutation(async ({ input }) => {
      await db.upsertFlashcardProgress({
        childId: input.childId,
        flashcardId: input.flashcardId,
        bucket: input.bucket,
        timesCorrect: input.timesCorrect,
        timesIncorrect: input.timesIncorrect,
      });
      return { success: true };
    }),
});
