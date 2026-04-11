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
      contactName: z.string().optional(),
      contactEmail: z.string().optional(),
      companyWebsite: z.string().optional(),
      logoUrl: z.string().optional(),
      shortDescription: z.string().max(150).optional(),
      tierId: z.enum(["TIER-FRIEND", "TIER-SUPPORTER", "TIER-CHAMPION"]),
      sponsoredDomain: z.string().optional(),
      billingCycle: z.enum(["monthly", "annually"]).default("monthly"),
      status: z.enum(["pending_review", "active", "paused", "expired", "rejected"]).default("pending_review"),
    }))
    .mutation(async ({ input }) => {
      await db.createSponsor(input);
      return { success: true };
    }),

  updateSponsor: adminProcedure
    .input(z.object({
      id: z.number(),
      companyName: z.string().optional(),
      contactName: z.string().optional(),
      contactEmail: z.string().optional(),
      companyWebsite: z.string().optional(),
      logoUrl: z.string().optional(),
      shortDescription: z.string().max(150).optional(),
      tierId: z.enum(["TIER-FRIEND", "TIER-SUPPORTER", "TIER-CHAMPION"]).optional(),
      sponsoredDomain: z.string().optional(),
      billingCycle: z.enum(["monthly", "annually"]).optional(),
      status: z.enum(["pending_review", "active", "paused", "expired", "rejected"]).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;
      await db.updateSponsor(id, updates);
      return { success: true };
    }),

  approveSponsor: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.updateSponsor(input.id, { status: "active", activatedAt: new Date() });
      return { success: true };
    }),

  rejectSponsor: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.updateSponsor(input.id, { status: "rejected" });
      return { success: true };
    }),

  pauseSponsor: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.updateSponsor(input.id, { status: "paused" });
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
