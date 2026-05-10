/**
 * Daily Plan tRPC router.
 * Manages the daily Explore → Practice → Try It → Share rhythm per child.
 */
import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import * as db from "../db";

export const dailyPlanRouter = router({
  /**
   * Get today's plan for a child. Creates one if it doesn't exist.
   */
  getToday: protectedProcedure
    .input(z.object({ childId: z.number() }))
    .query(async ({ input }) => {
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const plan = await db.getDailyPlan(input.childId, today);
      return plan || null;
    }),

  /**
   * Create or update today's daily plan for a child.
   */
  upsert: protectedProcedure
    .input(z.object({
      childId: z.number(),
      date: z.string().optional(),
      exploreRef: z.string().optional(),
      practiceRef: z.string().optional(),
      tryItRef: z.string().optional(),
      shareRef: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const date = input.date || new Date().toISOString().slice(0, 10);
      await db.upsertDailyPlan({
        childId: input.childId,
        date,
        exploreRef: input.exploreRef,
        practiceRef: input.practiceRef,
        tryItRef: input.tryItRef,
        shareRef: input.shareRef,
      });
      return { success: true };
    }),

  /**
   * Mark a step as completed in today's plan.
   */
  completeStep: protectedProcedure
    .input(z.object({
      childId: z.number(),
      step: z.enum(["explore", "practice", "tryIt", "share"]),
      date: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const date = input.date || new Date().toISOString().slice(0, 10);
      await db.updateDailyPlanStep(input.childId, date, input.step, true);

      // Check if all steps are complete
      const plan = await db.getDailyPlan(input.childId, date);
      if (plan && plan.exploreCompleted && plan.practiceCompleted && plan.tryItCompleted && plan.shareCompleted) {
        await db.upsertDailyPlan({
          ...plan,
          completedAt: new Date(),
        });
      }

      return { success: true };
    }),

  /**
   * Get recent daily plans for a child (for progress tracking).
   */
  getRecent: protectedProcedure
    .input(z.object({
      childId: z.number(),
      days: z.number().default(7),
    }))
    .query(async ({ input }) => {
      const plans = [];
      const today = new Date();
      for (let i = 0; i < input.days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().slice(0, 10);
        const plan = await db.getDailyPlan(input.childId, dateStr);
        if (plan) plans.push(plan);
      }
      return plans;
    }),
});
