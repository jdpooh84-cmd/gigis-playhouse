import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import type { User } from "../drizzle/schema";

// ── Mock the db module so tests don't hit a real database ──────────────
vi.mock("./db", () => {
  const children: any[] = [];
  const channels: any[] = [];
  const alerts: any[] = [];
  const sponsors: any[] = [];
  const featureFlags: any[] = [];
  let childIdCounter = 1;

  return {
    getDb: vi.fn().mockResolvedValue(null),
    upsertUser: vi.fn(),
    getUserByOpenId: vi.fn().mockResolvedValue(null),
    getUserById: vi.fn().mockResolvedValue(null),
    updateUserProfile: vi.fn(),
    listAllUsers: vi.fn().mockResolvedValue([]),
    getChildrenByUser: vi.fn().mockImplementation(() => Promise.resolve([...children])),
    getChildById: vi.fn().mockImplementation((id: number) => Promise.resolve(children.find((c) => c.id === id) || null)),
    getChildByUuid: vi.fn().mockImplementation((uuid: string) => Promise.resolve(children.find((c) => c.uuid === uuid) || null)),
    createChild: vi.fn().mockImplementation((child: any) => {
      const newChild = { ...child, id: childIdCounter++, createdAt: new Date(), updatedAt: new Date() };
      children.push(newChild);
      return Promise.resolve();
    }),
    updateChild: vi.fn(),
    deleteChild: vi.fn(),
    countChildrenByUser: vi.fn().mockResolvedValue(0),
    getEnrolledPathsByChild: vi.fn().mockResolvedValue([]),
    enrollChildInPath: vi.fn(),
    unenrollChildFromPath: vi.fn(),
    getLessonProgressByChild: vi.fn().mockResolvedValue([]),
    upsertLessonProgress: vi.fn(),
    getQuizResultsByChild: vi.fn().mockResolvedValue([]),
    addQuizResult: vi.fn(),
    getFlashcardProgressByChild: vi.fn().mockResolvedValue([]),
    upsertFlashcardProgress: vi.fn(),
    getApprovedChannelsByUser: vi.fn().mockImplementation(() => Promise.resolve([...channels])),
    addApprovedChannel: vi.fn(),
    removeApprovedChannel: vi.fn(),
    getComplianceLogsByChild: vi.fn().mockResolvedValue([]),
    addComplianceLog: vi.fn(),
    getAlertsByUser: vi.fn().mockImplementation(() => Promise.resolve([...alerts])),
    addAlert: vi.fn(),
    markAlertRead: vi.fn(),
    markAllAlertsRead: vi.fn(),
    listSponsors: vi.fn().mockImplementation(() => Promise.resolve([...sponsors])),
    createSponsor: vi.fn(),
    updateSponsor: vi.fn(),
    deleteSponsor: vi.fn(),
    listFeatureFlags: vi.fn().mockImplementation(() => Promise.resolve([...featureFlags])),
    upsertFeatureFlag: vi.fn(),
    findUserByStripeCustomerId: vi.fn().mockResolvedValue(null),
    getLessonFeedbackByChild: vi.fn().mockResolvedValue([]),
    getLessonFeedbackByLesson: vi.fn().mockResolvedValue([]),
    addLessonFeedback: vi.fn(),
    getAverageRatingByDomain: vi.fn().mockResolvedValue(null),
  };
});

// ── Mock Stripe module ─────────────────────────────────────────────────
vi.mock("./stripe/stripe", () => ({
  stripe: {},
  getOrCreateCustomer: vi.fn().mockResolvedValue("cus_test123"),
  createCheckoutSession: vi.fn().mockResolvedValue({ url: "https://checkout.stripe.com/test" }),
  getCheckoutSession: vi.fn().mockResolvedValue({ status: "complete", metadata: { plan_key: "gold_monthly", plan_type: "gold" } }),
  cancelSubscription: vi.fn(),
  getSubscription: vi.fn().mockResolvedValue({ status: "active", current_period_end: 1700000000, cancel_at_period_end: false }),
}));

// ── Helper to create mock contexts ─────────────────────────────────────
function makeUser(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    openId: "test-open-id",
    name: "Test Parent",
    email: "test@example.com",
    loginMethod: "manus",
    role: "user",
    planType: "free",
    trialStart: null,
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    onboardingComplete: false,
    coppaConsent: true,
    affiliateCode: null,
    referredBy: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    ...overrides,
  };
}

function makeCtx(user: User | null = makeUser()): TrpcContext {
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// ── Tests ──────────────────────────────────────────────────────────────

describe("auth.me", () => {
  it("returns null for unauthenticated users", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("returns user for authenticated users", async () => {
    const user = makeUser();
    const caller = appRouter.createCaller(makeCtx(user));
    const result = await caller.auth.me();
    expect(result).toBeDefined();
    expect(result?.openId).toBe("test-open-id");
  });
});

describe("children router", () => {
  it("lists children (empty initially)", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.children.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("creates a child", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.children.create({
      name: "Luna",
      displayName: "Luna Star",
      age: 5,
      gradeLevel: "K",
    });
    expect(result).toBeDefined();
    expect(typeof result.uuid).toBe("string");
    expect(result.uuid.length).toBeGreaterThan(0);
  });

  it("rejects unauthenticated child creation", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(caller.children.create({ name: "Test", age: 5, gradeLevel: "K" }))
      .rejects.toThrow();
  });
});

describe("channels router", () => {
  it("lists channels for authenticated user", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.channels.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("rejects unauthenticated channel access", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(caller.channels.list()).rejects.toThrow();
  });
});

describe("parent router", () => {
  it("lists alerts for authenticated user", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.parent.listAlerts();
    expect(Array.isArray(result)).toBe(true);
  });

  it("lists compliance logs for a child", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.parent.listComplianceLogs({ childId: 1 });
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("learning router", () => {
  it("gets enrolled paths for a child", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.learning.listPaths({ childId: 1 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("gets lesson progress for a child", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.learning.listLessonProgress({ childId: 1 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("gets quiz results for a child", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.learning.listQuizResults({ childId: 1 });
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("admin router", () => {
  const adminUser = makeUser({ role: "admin" });

  it("lists sponsors for admin", async () => {
    const caller = appRouter.createCaller(makeCtx(adminUser));
    const result = await caller.admin.listSponsors();
    expect(Array.isArray(result)).toBe(true);
  });

  it("lists feature flags for admin", async () => {
    const caller = appRouter.createCaller(makeCtx(adminUser));
    const result = await caller.admin.listFeatureFlags();
    expect(Array.isArray(result)).toBe(true);
  });

  it("lists users for admin", async () => {
    const caller = appRouter.createCaller(makeCtx(adminUser));
    const result = await caller.admin.listUsers();
    expect(Array.isArray(result)).toBe(true);
  });

  it("rejects non-admin from listing sponsors", async () => {
    const caller = appRouter.createCaller(makeCtx(makeUser({ role: "user" })));
    await expect(caller.admin.listSponsors()).rejects.toThrow();
  });
});

describe("stripe router", () => {
  it("creates a checkout session", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.stripe.createCheckout({
      planKey: "gold_monthly",
      origin: "https://example.com",
    });
    expect(result.url).toBe("https://checkout.stripe.com/test");
  });

  it("gets subscription status", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.stripe.getSubscriptionStatus();
    expect(result).toBeDefined();
    expect(result.plan).toBe("free");
  });

  it("rejects unauthenticated checkout", async () => {
    const caller = appRouter.createCaller(makeCtx(null));
    await expect(
      caller.stripe.createCheckout({ planKey: "gold_monthly", origin: "https://example.com" })
    ).rejects.toThrow();
  });
});

describe("learning router - new features", () => {
  it("gets progress summary for a child", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.learning.getProgressSummary({ childId: 1 });
    expect(result).toBeDefined();
    expect(typeof result.completedLessons).toBe("number");
    expect(typeof result.avgQuizScore).toBe("number");
    expect(Array.isArray(result.domainProgress)).toBe(true);
  });

  it("adds lesson feedback", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.learning.addFeedback({
      childId: 1,
      lessonId: "math-101",
      domain: "math",
      rating: 5,
      comment: "Great lesson!",
    });
    expect(result.success).toBe(true);
  });

  it("lists feedback for a child", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.learning.listFeedback({ childId: 1 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("gets domain rating", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.learning.getDomainRating({ domain: "math" });
    // null or object with average/count
    expect(result === null || typeof result === "object").toBe(true);
  });
});
