import { z } from "zod";
import { router, adminProcedure } from "../_core/trpc";
import * as db from "../db";

export const adminRouter = router({
  // ─── Users ────────────────────────────────────────────────────────────────
  listUsers: adminProcedure.query(async () => {
    return db.listAllUsers();
  }),

  updateUserRole: adminProcedure
    .input(z.object({
      userId: z.number(),
      role: z.enum(["user", "admin"]),
    }))
    .mutation(async ({ input }) => {
      await db.updateUserProfile(input.userId, { role: input.role });
      return { success: true };
    }),

  // ─── Sponsors ─────────────────────────────────────────────────────────────
  listSponsors: adminProcedure.query(async () => {
    return db.listSponsors();
  }),

  createSponsor: adminProcedure
    .input(z.object({
      companyName: z.string().min(1),
      logoUrl: z.string().optional(),
      tagline: z.string().optional(),
      ctaUrl: z.string().optional(),
      ctaLabel: z.string().optional(),
      status: z.enum(["active", "paused", "expired"]).default("active"),
      monthlyBudget: z.number().default(0),
    }))
    .mutation(async ({ input }) => {
      await db.createSponsor(input);
      return { success: true };
    }),

  updateSponsor: adminProcedure
    .input(z.object({
      id: z.number(),
      companyName: z.string().optional(),
      logoUrl: z.string().optional(),
      tagline: z.string().optional(),
      ctaUrl: z.string().optional(),
      ctaLabel: z.string().optional(),
      status: z.enum(["active", "paused", "expired"]).optional(),
      monthlyBudget: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;
      await db.updateSponsor(id, updates);
      return { success: true };
    }),

  // ─── Feature Flags ────────────────────────────────────────────────────────
  listFeatureFlags: adminProcedure.query(async () => {
    return db.listFeatureFlags();
  }),

  upsertFeatureFlag: adminProcedure
    .input(z.object({
      key: z.string(),
      enabled: z.boolean(),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      await db.upsertFeatureFlag(input);
      return { success: true };
    }),

  getFeatureFlag: adminProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      return db.getFeatureFlagByKey(input.key);
    }),
});
