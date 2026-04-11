/**
 * Stripe product & price definitions for Gigi's Playhouse subscription plans.
 * These are created on-demand via ensureProducts() if they don't exist yet.
 *
 * Competitive pricing (2025-2026):
 *   Gold Monthly: $7.99/mo (undercuts ABCmouse $14.99, Kiddopia $12.99)
 *   Gold Annual: $59.99/yr (~$5/mo, beats ABCmouse $45/yr on value)
 *   Family Monthly: $12.99/mo (up to 5 kids)
 *   Family Annual: $99.99/yr (~$8.33/mo, save 36%)
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
    priceAmount: 799, // $7.99/mo
    interval: "month",
    planType: "gold",
    metadata: { plan: "gold", billing: "monthly" },
  },
  gold_annual: {
    name: "Gigi's Playhouse Gold — Annual",
    description: "Full learning access for one child. Billed annually (save 37%).",
    priceAmount: 5999, // $59.99/yr
    interval: "year",
    planType: "gold",
    metadata: { plan: "gold", billing: "annual" },
  },
  family_monthly: {
    name: "Gigi's Playhouse Family — Monthly",
    description: "Full learning access for up to 5 children. Billed monthly.",
    priceAmount: 1299, // $12.99/mo
    interval: "month",
    planType: "family",
    metadata: { plan: "family", billing: "monthly" },
  },
  family_annual: {
    name: "Gigi's Playhouse Family — Annual",
    description: "Full learning access for up to 5 children. Billed annually (save 36%).",
    priceAmount: 9999, // $99.99/yr
    interval: "year",
    planType: "family",
    metadata: { plan: "family", billing: "annual" },
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
