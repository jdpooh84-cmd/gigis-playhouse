/**
 * Stripe service — checkout sessions, product/price management, customer management
 */
import Stripe from "stripe";
import { PLANS, getCachedPriceId, setCachedPriceId, type PlanConfig } from "./products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil" as any,
});

export { stripe };

/**
 * Ensure a Stripe product + price exists for a given plan key.
 * Creates them if they don't exist, caches the price ID.
 */
async function ensurePriceForPlan(planKey: string): Promise<string> {
  const cached = getCachedPriceId(planKey);
  if (cached) return cached;

  const plan = PLANS[planKey];
  if (!plan) throw new Error(`Unknown plan: ${planKey}`);

  // Search for existing product by metadata
  const existingProducts = await stripe.products.search({
    query: `metadata["plan_key"]:"${planKey}"`,
  });

  let productId: string;
  if (existingProducts.data.length > 0) {
    productId = existingProducts.data[0].id;
  } else {
    const product = await stripe.products.create({
      name: plan.name,
      description: plan.description,
      metadata: { plan_key: planKey, ...plan.metadata },
    });
    productId = product.id;
  }

  // Search for existing price
  const existingPrices = await stripe.prices.list({
    product: productId,
    active: true,
    limit: 1,
  });

  let priceId: string;
  if (existingPrices.data.length > 0) {
    priceId = existingPrices.data[0].id;
  } else {
    const price = await stripe.prices.create({
      product: productId,
      unit_amount: plan.priceAmount,
      currency: "usd",
      recurring: { interval: plan.interval },
      metadata: { plan_key: planKey },
    });
    priceId = price.id;
  }

  setCachedPriceId(planKey, priceId);
  return priceId;
}

/**
 * Create or retrieve a Stripe customer for a user.
 */
export async function getOrCreateCustomer(opts: {
  stripeCustomerId?: string | null;
  email?: string | null;
  name?: string | null;
  userId: number;
}): Promise<string> {
  if (opts.stripeCustomerId) {
    return opts.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: opts.email || undefined,
    name: opts.name || undefined,
    metadata: { user_id: opts.userId.toString() },
  });

  return customer.id;
}

/**
 * Create a Stripe Checkout Session for a subscription plan.
 */
export async function createCheckoutSession(opts: {
  planKey: string;
  customerId: string;
  userId: number;
  userEmail?: string | null;
  userName?: string | null;
  origin: string;
}): Promise<{ url: string }> {
  const plan = PLANS[opts.planKey];
  if (!plan) throw new Error(`Unknown plan: ${opts.planKey}`);

  const priceId = await ensurePriceForPlan(opts.planKey);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: opts.customerId,
    client_reference_id: opts.userId.toString(),
    allow_promotion_codes: true,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${opts.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${opts.origin}/upgrade`,
    metadata: {
      user_id: opts.userId.toString(),
      plan_key: opts.planKey,
      plan_type: plan.planType,
    },
  });

  if (!session.url) throw new Error("Failed to create checkout session");
  return { url: session.url };
}

/**
 * Retrieve a checkout session by ID.
 */
export async function getCheckoutSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["subscription"],
  });
}

/**
 * Cancel a subscription.
 */
export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.cancel(subscriptionId);
}

/**
 * Get subscription details.
 */
export async function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId);
}
