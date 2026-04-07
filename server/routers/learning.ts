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

  // ─── Lesson Feedback / Ratings ─────────────────────────────────────────
  listFeedback: protectedProcedure
    .input(z.object({ childId: z.number() }))
    .query(async ({ input }) => {
      return db.getLessonFeedbackByChild(input.childId);
    }),

  addFeedback: protectedProcedure
    .input(z.object({
      childId: z.number(),
      lessonId: z.string(),
      domain: z.string(),
      rating: z.number().min(1).max(5),
      comment: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await db.addLessonFeedback({
        childId: input.childId,
        userId: ctx.user.id,
        lessonId: input.lessonId,
        domain: input.domain,
        rating: input.rating,
        comment: input.comment ?? null,
      });
      return { success: true };
    }),

  getDomainRating: protectedProcedure
    .input(z.object({ domain: z.string() }))
    .query(async ({ input }) => {
      return db.getAverageRatingByDomain(input.domain);
    }),

  // ─── Progress Summary (learning journey visualization) ────────────────
  getProgressSummary: protectedProcedure
    .input(z.object({ childId: z.number() }))
    .query(async ({ input }) => {
      const [paths, lessons, quizzes, flashcards] = await Promise.all([
        db.getEnrolledPathsByChild(input.childId),
        db.getLessonProgressByChild(input.childId),
        db.getQuizResultsByChild(input.childId),
        db.getFlashcardProgressByChild(input.childId),
      ]);
      const completedLessons = lessons.filter(l => l.completionStatus === "done").length;
      const inProgressLessons = lessons.filter(l => l.completionStatus === "in_progress").length;
      const passedQuizzes = quizzes.filter(q => q.passed).length;
      const avgQuizScore = quizzes.length > 0 ? Math.round(quizzes.reduce((s, q) => s + (q.score / q.total) * 100, 0) / quizzes.length) : 0;
      const masteredFlashcards = flashcards.filter(f => f.bucket >= 4).length;

      // Group by domain from enrolled paths
      const domainProgress = paths.map(p => {
        const domainLessons = lessons.filter(l => l.lessonId.startsWith(p.domain));
        const domainQuizzes = quizzes.filter(q => q.lessonId.startsWith(p.domain));
        return {
          domain: p.domain,
          grade: p.grade,
          lessonsCompleted: domainLessons.filter(l => l.completionStatus === "done").length,
          lessonsTotal: domainLessons.length,
          quizzesPassed: domainQuizzes.filter(q => q.passed).length,
          quizzesTotal: domainQuizzes.length,
        };
      });

      return {
        enrolledPaths: paths.length,
        completedLessons,
        inProgressLessons,
        totalLessons: lessons.length,
        passedQuizzes,
        totalQuizzes: quizzes.length,
        avgQuizScore,
        masteredFlashcards,
        totalFlashcards: flashcards.length,
        domainProgress,
      };
    }),
});
