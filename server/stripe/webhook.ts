/**
 * Stripe webhook handler — processes subscription events
 */
import type { Request, Response } from "express";
import { stripe } from "./stripe";
import { PLANS } from "./products";
import * as db from "../db";

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error("[Webhook] Missing signature or webhook secret");
    return res.status(400).json({ error: "Missing signature" });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig as string, webhookSecret);
  } catch (err: any) {
    console.error("[Webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: "Webhook signature verification failed" });
  }

  console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

  // Handle test events
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({ verified: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        const userId = parseInt(session.metadata?.user_id || session.client_reference_id || "0");
        const planKey = session.metadata?.plan_key;
        const planType = session.metadata?.plan_type;
        const subscriptionId = session.subscription;
        const customerId = session.customer;

        if (userId && planType) {
          await db.updateUserProfile(userId, {
            planType: planType as "gold" | "family",
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
          });
          console.log(`[Webhook] User ${userId} upgraded to ${planType} (sub: ${subscriptionId})`);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as any;
        const customerId = subscription.customer;

        // Find user by Stripe customer ID
        const user = await db.findUserByStripeCustomerId(customerId);
        if (user) {
          if (subscription.status === "active") {
            // Subscription renewed or updated
            console.log(`[Webhook] Subscription ${subscription.id} active for user ${user.id}`);
          } else if (subscription.status === "past_due") {
            console.log(`[Webhook] Subscription ${subscription.id} past_due for user ${user.id}`);
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as any;
        const customerId = subscription.customer;

        const user = await db.findUserByStripeCustomerId(customerId);
        if (user) {
          await db.updateUserProfile(user.id, {
            planType: "free",
            stripeSubscriptionId: null,
          });
          console.log(`[Webhook] User ${user.id} downgraded to free (sub cancelled)`);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        const customerId = invoice.customer;
        const user = await db.findUserByStripeCustomerId(customerId);
        if (user) {
          console.log(`[Webhook] Payment failed for user ${user.id}`);
        }
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    return res.json({ received: true });
  } catch (err: any) {
    console.error(`[Webhook] Error processing ${event.type}:`, err.message);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
}
