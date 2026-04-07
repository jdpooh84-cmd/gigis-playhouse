import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import * as db from "../db";

export const parentRouter = router({
  // ─── Profile ──────────────────────────────────────────────────────────────
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return db.getUserById(ctx.user.id);
  }),

  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      onboardingComplete: z.boolean().optional(),
      coppaConsent: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await db.updateUserProfile(ctx.user.id, input);
      return { success: true };
    }),

  completeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
    await db.updateUserProfile(ctx.user.id, { onboardingComplete: true });
    return { success: true };
  }),

  // ─── Compliance Logs ──────────────────────────────────────────────────────
  listComplianceLogs: protectedProcedure
    .input(z.object({ childId: z.number() }))
    .query(async ({ input }) => {
      return db.getComplianceLogsByChild(input.childId);
    }),

  addComplianceLog: protectedProcedure
    .input(z.object({
      childId: z.number(),
      date: z.string(),
      minutes: z.number().default(0),
      lessonsCompleted: z.array(z.string()).default([]),
      domainsCovered: z.array(z.string()).default([]),
    }))
    .mutation(async ({ input }) => {
      await db.addComplianceLog({
        childId: input.childId,
        date: input.date,
        minutes: input.minutes,
        lessonsCompleted: input.lessonsCompleted,
        domainsCovered: input.domainsCovered,
      });
      return { success: true };
    }),

  // ─── Alerts ───────────────────────────────────────────────────────────────
  listAlerts: protectedProcedure.query(async ({ ctx }) => {
    return db.getAlertsByUser(ctx.user.id);
  }),

  addAlert: protectedProcedure
    .input(z.object({
      type: z.string(),
      title: z.string(),
      message: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      await db.addAlert({
        userId: ctx.user.id,
        type: input.type,
        title: input.title,
        message: input.message,
      });
      return { success: true };
    }),

  markAlertRead: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.markAlertRead(input.id);
      return { success: true };
    }),
});
