/**
 * Admin Store — Zustand store for admin panel state
 * Uses localStorage for demo; in production would use Supabase
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// --- Types ---
export type SponsorStatus = "pending" | "approved" | "paused" | "rejected";
export type BillingModel = "monthly_flat" | "per_impression";
export type AffiliateStatus = "active" | "paused" | "pending";
export type CommissionType = "cpa" | "revenue_share" | "flat";
export type AlertType =
  | "payment_failed"
  | "trial_expired_no_upgrade"
  | "sponsor_cap_reached"
  | "sponsor_invoice_overdue"
  | "new_sponsor_application"
  | "coppa_deletion_request"
  | "high_quiz_fail_rate"
  | "new_affiliate_click_milestone";

export interface Sponsor {
  id: string;
  brand_name: string;
  contact_name: string;
  contact_email: string;
  logo_url?: string;
  message_headline: string;
  message_body: string;
  cta_text?: string;
  cta_url?: string;
  cta_label?: string;
  status: SponsorStatus;
  billing_model: BillingModel;
  monthly_fee_usd: number;
  per_impression_fee_usd: number;
  impression_cap_monthly: number;
  impressions_this_month: number;
  active_from?: string;
  active_until?: string;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
  notes?: string;
}

export interface SponsorImpression {
  id: string;
  sponsor_id: string;
  shown_at: string;
  session_region: string;
  was_skipped: boolean;
  seconds_viewed: number;
}

export interface AffiliatePartner {
  id: string;
  partner_name: string;
  partner_url: string;
  affiliate_link: string;
  commission_type: CommissionType;
  commission_value: number;
  category: string;
  status: AffiliateStatus;
  placement_location: string[];
  display_text: string;
  description: string;
  logo_url?: string;
  clicks_total: number;
  conversions_total: number;
  revenue_earned_usd: number;
  created_at: string;
  notes?: string;
}

export interface AdminAlert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  related_entity_id?: string;
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
}

export interface AppSetting {
  key: string;
  value: string;
  description: string;
  updated_at: string;
  updated_by?: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  admin_user_id: string;
  timestamp: string;
  details: string;
}

// --- Mock seed data ---
const SEED_SPONSORS: Sponsor[] = [
  {
    id: "sp-1",
    brand_name: "ABC Learning Co.",
    contact_name: "Sarah Johnson",
    contact_email: "sarah@abclearning.com",
    message_headline: "Learn ABCs the Fun Way!",
    message_body: "ABC Learning Co. makes phonics fun with interactive letter games for Pre-K through Grade 2. Trusted by 50,000+ families.",
    cta_text: "Visit abclearning.com",
    status: "approved",
    billing_model: "monthly_flat",
    monthly_fee_usd: 299,
    per_impression_fee_usd: 0,
    impression_cap_monthly: 10000,
    impressions_this_month: 3247,
    active_from: "2026-03-01",
    active_until: "2026-06-30",
    approved_by: "Justin Poole",
    approved_at: "2026-02-28T10:00:00Z",
    created_at: "2026-02-15T08:00:00Z",
    notes: "Great fit for our literacy audience",
  },
  {
    id: "sp-2",
    brand_name: "MathBuddies",
    contact_name: "Tom Chen",
    contact_email: "tom@mathbuddies.com",
    message_headline: "Math Made Magical!",
    message_body: "MathBuddies turns math practice into an adventure with story-based problems and rewards. Ages 4-8.",
    status: "pending",
    billing_model: "per_impression",
    monthly_fee_usd: 0,
    per_impression_fee_usd: 0.04,
    impression_cap_monthly: 5000,
    impressions_this_month: 0,
    created_at: "2026-04-01T12:00:00Z",
  },
];

const SEED_AFFILIATES: AffiliatePartner[] = [
  {
    id: "af-1",
    partner_name: "Homeschool Books Direct",
    partner_url: "https://homeschoolbooksdirect.com",
    affiliate_link: "https://homeschoolbooksdirect.com?ref=gigisplayhouse",
    commission_type: "revenue_share",
    commission_value: 8,
    category: "books",
    status: "active",
    placement_location: ["parent_dashboard", "about_page"],
    display_text: "Recommended Resource: Homeschool Books Direct",
    description: "Curated book collections for homeschool families, organized by grade and subject.",
    clicks_total: 342,
    conversions_total: 28,
    revenue_earned_usd: 156.80,
    created_at: "2026-02-01T10:00:00Z",
  },
  {
    id: "af-2",
    partner_name: "KidSafe Tablets",
    partner_url: "https://kidsafetablets.com",
    affiliate_link: "https://kidsafetablets.com?ref=gigisplayhouse",
    commission_type: "cpa",
    commission_value: 15,
    category: "education",
    status: "active",
    placement_location: ["upgrade_page"],
    display_text: "Recommended: KidSafe Learning Tablets",
    description: "Purpose-built tablets for kids with parental controls and educational apps pre-loaded.",
    clicks_total: 189,
    conversions_total: 12,
    revenue_earned_usd: 180.00,
    created_at: "2026-03-01T10:00:00Z",
  },
];

const SEED_ALERTS: AdminAlert[] = [
  { id: "al-1", type: "new_sponsor_application", title: "New Sponsor Application", description: "MathBuddies submitted a sponsor application. Review in /admin/sponsors.", is_read: false, is_archived: false, created_at: "2026-04-01T12:00:00Z" },
  { id: "al-2", type: "trial_expired_no_upgrade", title: "Trial Expired", description: "15 users' trials expired this week without upgrading.", is_read: false, is_archived: false, created_at: "2026-04-05T08:00:00Z" },
  { id: "al-3", type: "sponsor_cap_reached", title: "Sponsor Cap Alert", description: "ABC Learning Co. has reached 32% of their monthly impression cap.", is_read: true, is_archived: false, created_at: "2026-04-03T14:00:00Z" },
  { id: "al-4", type: "payment_failed", title: "Payment Failed", description: "Stripe payment failed for user jane@example.com (Gold plan).", is_read: false, is_archived: false, created_at: "2026-04-06T09:00:00Z" },
  { id: "al-5", type: "high_quiz_fail_rate", title: "High Quiz Fail Rate", description: "Lesson 'literacy-g1-int-d1' has a 45% fail rate. Review learning content quality.", is_read: false, is_archived: false, created_at: "2026-04-04T11:00:00Z" },
];

const SEED_SETTINGS: AppSetting[] = [
  { key: "sponsor_system_enabled", value: "true", description: "Master switch for all sponsor cards", updated_at: "2026-03-01T10:00:00Z" },
  { key: "max_sponsors_per_30min", value: "2", description: "Max sponsor cards shown per 30-min YouTube session", updated_at: "2026-03-01T10:00:00Z" },
  { key: "sponsor_min_interval_minutes", value: "15", description: "Minimum minutes between sponsor shows", updated_at: "2026-03-01T10:00:00Z" },
  { key: "sponsor_skip_delay_seconds", value: "5", description: "Seconds before skip button activates", updated_at: "2026-03-01T10:00:00Z" },
  { key: "affiliate_links_enabled", value: "true", description: "Master switch for affiliate link placements", updated_at: "2026-03-01T10:00:00Z" },
  { key: "theme_song_enabled", value: "true", description: "Play Gigi theme on app open", updated_at: "2026-03-01T10:00:00Z" },
  { key: "trial_duration_days", value: "7", description: "Free trial length in days", updated_at: "2026-03-01T10:00:00Z" },
  { key: "maintenance_mode", value: "false", description: "Shows maintenance page to all non-admin users", updated_at: "2026-03-01T10:00:00Z" },
  { key: "new_signups_enabled", value: "true", description: "Allows new account creation", updated_at: "2026-03-01T10:00:00Z" },
  { key: "max_children_free", value: "1", description: "Max child profiles on free tier", updated_at: "2026-03-01T10:00:00Z" },
  { key: "max_channels_free", value: "5", description: "Max YouTube channels on free tier", updated_at: "2026-03-01T10:00:00Z" },
  { key: "max_lessons_free", value: "3", description: "Max lessons per path on free tier", updated_at: "2026-03-01T10:00:00Z" },
  { key: "coppa_contact_email", value: "privacy@gigisplayhouse.com", description: "COPPA contact email in privacy policy", updated_at: "2026-03-01T10:00:00Z" },
  { key: "support_email", value: "hello@gigisplayhouse.com", description: "Support contact email", updated_at: "2026-03-01T10:00:00Z" },
];

// --- Store ---
interface AdminState {
  isAdmin: boolean;
  sponsors: Sponsor[];
  sponsorImpressions: SponsorImpression[];
  affiliates: AffiliatePartner[];
  alerts: AdminAlert[];
  settings: AppSetting[];
  auditLog: AuditLogEntry[];

  // Actions
  setAdmin: (val: boolean) => void;
  updateSponsor: (id: string, updates: Partial<Sponsor>) => void;
  addSponsor: (sponsor: Omit<Sponsor, "id" | "created_at" | "impressions_this_month">) => void;
  updateAffiliate: (id: string, updates: Partial<AffiliatePartner>) => void;
  addAffiliate: (affiliate: Omit<AffiliatePartner, "id" | "created_at" | "clicks_total" | "conversions_total" | "revenue_earned_usd">) => void;
  markAlertRead: (id: string) => void;
  archiveAlert: (id: string) => void;
  updateSetting: (key: string, value: string) => void;
  addAuditLog: (action: string, details: string) => void;
  incrementAffiliateClicks: (id: string) => void;
  incrementImpressions: (id: string) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAdmin: false,
      sponsors: SEED_SPONSORS,
      sponsorImpressions: [],
      affiliates: SEED_AFFILIATES,
      alerts: SEED_ALERTS,
      settings: SEED_SETTINGS,
      auditLog: [],

      setAdmin: (val) => set({ isAdmin: val }),

      updateSponsor: (id, updates) =>
        set((s) => ({
          sponsors: s.sponsors.map((sp) => (sp.id === id ? { ...sp, ...updates } : sp)),
        })),

      addSponsor: (sponsor) =>
        set((s) => ({
          sponsors: [
            ...s.sponsors,
            { ...sponsor, id: `sp-${Date.now()}`, created_at: new Date().toISOString(), impressions_this_month: 0 },
          ],
        })),

      updateAffiliate: (id, updates) =>
        set((s) => ({
          affiliates: s.affiliates.map((af) => (af.id === id ? { ...af, ...updates } : af)),
        })),

      addAffiliate: (affiliate) =>
        set((s) => ({
          affiliates: [
            ...s.affiliates,
            { ...affiliate, id: `af-${Date.now()}`, created_at: new Date().toISOString(), clicks_total: 0, conversions_total: 0, revenue_earned_usd: 0 },
          ],
        })),

      markAlertRead: (id) =>
        set((s) => ({
          alerts: s.alerts.map((a) => (a.id === id ? { ...a, is_read: true } : a)),
        })),

      archiveAlert: (id) =>
        set((s) => ({
          alerts: s.alerts.map((a) => (a.id === id ? { ...a, is_archived: true } : a)),
        })),

      updateSetting: (key, value) =>
        set((s) => ({
          settings: s.settings.map((st) =>
            st.key === key ? { ...st, value, updated_at: new Date().toISOString(), updated_by: "admin" } : st
          ),
        })),

      addAuditLog: (action, details) =>
        set((s) => ({
          auditLog: [
            { id: `log-${Date.now()}`, action, admin_user_id: "admin", timestamp: new Date().toISOString(), details },
            ...s.auditLog,
          ],
        })),

      incrementAffiliateClicks: (id) =>
        set((s) => ({
          affiliates: s.affiliates.map((af) =>
            af.id === id ? { ...af, clicks_total: af.clicks_total + 1 } : af
          ),
        })),

      incrementImpressions: (id) =>
        set((s) => ({
          sponsors: s.sponsors.map((sp) =>
            sp.id === id ? { ...sp, impressions_this_month: sp.impressions_this_month + 1 } : sp
          ),
        })),
    }),
    {
      name: "gigi-admin-store",
      storage: createJSONStorage(() => localStorage),
      merge: (persisted, current) => ({ ...current, ...(persisted as object) }),
    }
  )
);
