import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import * as db from "../db";

export const sponsorRouter = router({
  /** Public: list active sponsors (shown on sponsor page, sponsor cards, etc.) */
  listActive: publicProcedure.query(async () => {
    return db.getActiveSponsors();
  }),

  /** Public: get active sponsors for a specific learning domain (Champion tier) */
  getByDomain: publicProcedure
    .input(z.object({ domain: z.string() }))
    .query(async ({ input }) => {
      return db.getActiveSponsorsByDomain(input.domain);
    }),

  /** Authenticated: record an impression for a sponsor */
  recordImpression: publicProcedure
    .input(z.object({ sponsorId: z.number() }))
    .mutation(async ({ input }) => {
      await db.incrementSponsorImpressions(input.sponsorId);
      return { success: true };
    }),

  /** Authenticated: record a click for a sponsor */
  recordClick: publicProcedure
    .input(z.object({ sponsorId: z.number() }))
    .mutation(async ({ input }) => {
      await db.incrementSponsorClicks(input.sponsorId);
      return { success: true };
    }),
});
