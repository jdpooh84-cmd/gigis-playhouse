/**
 * Stripe tRPC router — checkout sessions, subscription management
 */
import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { createCheckoutSession, getOrCreateCustomer, getCheckoutSession, cancelSubscription, getSubscription } from "../stripe/stripe";
import * as db from "../db";

export const stripeRouter = router({
  /**
   * Create a checkout session for a subscription plan.
   * Returns the Stripe checkout URL.
   */
  createCheckout: protectedProcedure
    .input(z.object({
      planKey: z.enum(["gold_monthly", "gold_annual", "family_monthly", "family_annual"]),
      origin: z.string().url(),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;

      // Get or create Stripe customer
      const customerId = await getOrCreateCustomer({
        stripeCustomerId: user.stripeCustomerId,
        email: user.email,
        name: user.name,
        userId: user.id,
      });

      // Save customer ID if new
      if (!user.stripeCustomerId) {
        await db.updateUserProfile(user.id, { stripeCustomerId: customerId });
      }

      // Create checkout session
      const { url } = await createCheckoutSession({
        planKey: input.planKey,
        customerId,
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        origin: input.origin,
      });

      return { url };
    }),

  /**
   * Get checkout session details (for payment success page).
   */
  getSession: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const session = await getCheckoutSession(input.sessionId);
      return {
        status: session.status,
        planKey: session.metadata?.plan_key || null,
        planType: session.metadata?.plan_type || null,
      };
    }),

  /**
   * Get current subscription status.
   */
  getSubscriptionStatus: protectedProcedure
    .query(async ({ ctx }) => {
      const user = ctx.user;
      if (!user.stripeSubscriptionId) {
        return { active: false, plan: user.planType, cancelAtPeriodEnd: false };
      }

      try {
        const sub = await getSubscription(user.stripeSubscriptionId) as any;
        return {
          active: sub.status === "active",
          plan: user.planType,
          status: sub.status as string,
          currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
          cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
        };
      } catch {
        return { active: false, plan: user.planType, cancelAtPeriodEnd: false };
      }
    }),

  /**
   * Cancel subscription.
   */
  cancelSubscription: protectedProcedure
    .mutation(async ({ ctx }) => {
      const user = ctx.user;
      if (!user.stripeSubscriptionId) {
        throw new Error("No active subscription to cancel");
      }

      await cancelSubscription(user.stripeSubscriptionId);
      await db.updateUserProfile(user.id, {
        planType: "free",
        stripeSubscriptionId: null,
      });

      return { success: true };
    }),
});
