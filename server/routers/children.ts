import { z } from "zod";
import { router } from "../_core/trpc";
import { protectedProcedure } from "../_core/trpc";
import * as db from "../db";
import { randomUUID } from "crypto";

export const childrenRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return db.getChildrenByUser(ctx.user.id);
  }),

  getByUuid: protectedProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ input }) => {
      return db.getChildByUuid(input.uuid);
    }),

  create: protectedProcedure
    .input(z.object({
      displayName: z.string().min(1).max(100),
      age: z.number().min(3).max(12).default(6),
      grade: z.number().min(0).max(3).default(1),
      guideAnimal: z.enum(["cat", "dog", "bunny", "bear"]).default("cat"),
      profileColor: z.enum(["coral", "sky", "mint", "lavender", "sunshine", "peach"]).default("coral"),
      avatarEmoji: z.string().default("🦄"),
    }))
    .mutation(async ({ ctx, input }) => {
      // Enforce child limits based on plan
      const count = await db.countChildrenByUser(ctx.user.id);
      const planType = ctx.user.planType ?? "free";
      const maxChildren = planType === "free" ? 1 : planType === "gold" ? 1 : 4;
      if (count >= maxChildren) {
        throw new Error(`Your ${planType} plan allows up to ${maxChildren} child profile(s). Please upgrade.`);
      }

      const childUuid = randomUUID();
      const insertId = await db.createChild({
        uuid: childUuid,
        userId: ctx.user.id,
        displayName: input.displayName,
        age: input.age,
        grade: input.grade,
        guideAnimal: input.guideAnimal,
        profileColor: input.profileColor,
        avatarEmoji: input.avatarEmoji,
      });
      return { id: insertId, uuid: childUuid };
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      displayName: z.string().min(1).max(100).optional(),
      age: z.number().min(3).max(12).optional(),
      grade: z.number().min(0).max(3).optional(),
      guideAnimal: z.enum(["cat", "dog", "bunny", "bear"]).optional(),
      profileColor: z.enum(["coral", "sky", "mint", "lavender", "sunshine", "peach"]).optional(),
      avatarEmoji: z.string().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;
      // Verify ownership
      const child = await db.getChildById(id);
      if (!child || child.userId !== ctx.user.id) {
        throw new Error("Child not found or access denied");
      }
      await db.updateChild(id, updates);
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const child = await db.getChildById(input.id);
      if (!child || child.userId !== ctx.user.id) {
        throw new Error("Child not found or access denied");
      }
      await db.deleteChild(input.id);
      return { success: true };
    }),
});
