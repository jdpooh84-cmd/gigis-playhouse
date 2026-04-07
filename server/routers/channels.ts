import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import * as db from "../db";

export const channelsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return db.getApprovedChannelsByUser(ctx.user.id);
  }),

  add: protectedProcedure
    .input(z.object({
      youtubeChannelId: z.string(),
      nickname: z.string().min(1).max(100),
      emoji: z.string().default("📺"),
      ageTag: z.string().default("K-3"),
    }))
    .mutation(async ({ ctx, input }) => {
      await db.addApprovedChannel({
        userId: ctx.user.id,
        youtubeChannelId: input.youtubeChannelId,
        nickname: input.nickname,
        emoji: input.emoji,
        ageTag: input.ageTag,
      });
      return { success: true };
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await db.removeApprovedChannel(input.id, ctx.user.id);
      return { success: true };
    }),
});
