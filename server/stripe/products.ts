/**
 * Stripe product & price definitions for Gigi's Playhouse subscription plans.
 * These are created on-demand via ensureProducts() if they don't exist yet.
 */

export interface PlanConfig {
  name: string;
  description: string;
  priceAmount: number; // in cents
  interval: "month" | "year";
  planType: "gold" | "family";
  metadata: Record<string, string>;
}

export const PLANS: Record<string, PlanConfig> = {
  gold_monthly: {
    name: "Gigi's Playhouse Gold — Monthly",
    description: "Full learning access for one child. Billed monthly.",
    priceAmount: 999, // $9.99/mo
    interval: "month",
    planType: "gold",
    metadata: { plan: "gold", billing: "monthly" },
  },
  gold_annual: {
    name: "Gigi's Playhouse Gold — Annual",
    description: "Full learning access for one child. Billed annually (save 33%).",
    priceAmount: 7999, // $79.99/yr
    interval: "year",
    planType: "gold",
    metadata: { plan: "gold", billing: "annual" },
  },
  family: {
    name: "Gigi's Playhouse Family",
    description: "Full learning access for up to 4 children. Billed monthly.",
    priceAmount: 1499, // $14.99/mo
    interval: "month",
    planType: "family",
    metadata: { plan: "family", billing: "monthly" },
  },
};

/**
 * Cache for Stripe price IDs after creation.
 * Key: plan key (e.g., "gold_monthly"), Value: Stripe price ID
 */
const priceIdCache: Record<string, string> = {};

export function getCachedPriceId(planKey: string): string | undefined {
  return priceIdCache[planKey];
}

export function setCachedPriceId(planKey: string, priceId: string): void {
  priceIdCache[planKey] = priceId;
}
