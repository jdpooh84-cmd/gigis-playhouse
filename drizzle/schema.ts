import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json, float } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow (parent accounts).
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  planType: mysqlEnum("planType", ["free", "gold", "family"]).default("free").notNull(),
  trialStart: timestamp("trialStart"),
  stripeCustomerId: varchar("stripeCustomerId", { length: 128 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 128 }),
  onboardingComplete: boolean("onboardingComplete").default(false).notNull(),
  coppaConsent: boolean("coppaConsent").default(false).notNull(),
  affiliateCode: varchar("affiliateCode", { length: 32 }),
  referredBy: varchar("referredBy", { length: 32 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Children profiles — managed by parent.
 */
export const children = mysqlTable("children", {
  id: int("id").autoincrement().primaryKey(),
  uuid: varchar("uuid", { length: 36 }).notNull().unique(),
  userId: int("userId").notNull(),
  displayName: varchar("displayName", { length: 100 }).notNull(),
  avatarEmoji: varchar("avatarEmoji", { length: 10 }).default("🦄").notNull(),
  age: int("age").default(6).notNull(),
  grade: int("grade").default(1).notNull(),
  guideAnimal: mysqlEnum("guideAnimal", ["cat", "dog", "bunny", "bear"]).default("cat").notNull(),
  profileColor: mysqlEnum("profileColor", ["coral", "sky", "mint", "lavender", "sunshine", "peach"]).default("coral").notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Child = typeof children.$inferSelect;
export type InsertChild = typeof children.$inferInsert;

/**
 * Enrolled learning paths per child.
 */
export const enrolledPaths = mysqlTable("enrolledPaths", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  domain: varchar("domain", { length: 32 }).notNull(),
  grade: int("grade").default(1).notNull(),
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
});

export type EnrolledPath = typeof enrolledPaths.$inferSelect;
export type InsertEnrolledPath = typeof enrolledPaths.$inferInsert;

/**
 * Lesson progress tracking per child.
 */
export const lessonProgress = mysqlTable("lessonProgress", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  lessonId: varchar("lessonId", { length: 64 }).notNull(),
  completionStatus: mysqlEnum("completionStatus", ["not_started", "in_progress", "done"]).default("not_started").notNull(),
  stepsCompleted: json("stepsCompleted").$type<string[]>().default([]),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type LessonProgress = typeof lessonProgress.$inferSelect;
export type InsertLessonProgress = typeof lessonProgress.$inferInsert;

/**
 * Quiz results per child per lesson.
 */
export const quizResults = mysqlTable("quizResults", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  lessonId: varchar("lessonId", { length: 64 }).notNull(),
  score: int("score").notNull(),
  total: int("total").notNull(),
  passed: boolean("passed").default(false).notNull(),
  answers: json("answers").$type<{ question_id: string; selected: number; correct: boolean }[]>().default([]),
  takenAt: timestamp("takenAt").defaultNow().notNull(),
});

export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = typeof quizResults.$inferInsert;

/**
 * Flashcard progress per child.
 */
export const flashcardProgress = mysqlTable("flashcardProgress", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  flashcardId: varchar("flashcardId", { length: 64 }).notNull(),
  bucket: int("bucket").default(1).notNull(),
  lastReviewed: timestamp("lastReviewed").defaultNow().notNull(),
  timesCorrect: int("timesCorrect").default(0).notNull(),
  timesIncorrect: int("timesIncorrect").default(0).notNull(),
});

export type FlashcardProgress = typeof flashcardProgress.$inferSelect;
export type InsertFlashcardProgress = typeof flashcardProgress.$inferInsert;

/**
 * Parent-approved YouTube channels.
 */
export const approvedChannels = mysqlTable("approvedChannels", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  youtubeChannelId: varchar("youtubeChannelId", { length: 64 }).notNull(),
  nickname: varchar("nickname", { length: 100 }).notNull(),
  emoji: varchar("emoji", { length: 10 }).default("📺").notNull(),
  ageTag: varchar("ageTag", { length: 20 }).default("K-3").notNull(),
  addedAt: timestamp("addedAt").defaultNow().notNull(),
});

export type ApprovedChannel = typeof approvedChannels.$inferSelect;
export type InsertApprovedChannel = typeof approvedChannels.$inferInsert;

/**
 * Compliance logs for homeschool record-keeping.
 */
export const complianceLogs = mysqlTable("complianceLogs", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  date: varchar("date", { length: 10 }).notNull(),
  minutes: int("minutes").default(0).notNull(),
  lessonsCompleted: json("lessonsCompleted").$type<string[]>().default([]),
  domainsCovered: json("domainsCovered").$type<string[]>().default([]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ComplianceLog = typeof complianceLogs.$inferSelect;
export type InsertComplianceLog = typeof complianceLogs.$inferInsert;

/**
 * Alerts for parents.
 */
export const alerts = mysqlTable("alerts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: varchar("type", { length: 32 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = typeof alerts.$inferInsert;

/**
 * Sponsors for the YouTube Hub.
 */
export const sponsors = mysqlTable("sponsors", {
  id: int("id").autoincrement().primaryKey(),
  companyName: varchar("companyName", { length: 200 }).notNull(),
  contactName: varchar("contactName", { length: 100 }),
  contactEmail: varchar("contactEmail", { length: 150 }),
  companyWebsite: varchar("companyWebsite", { length: 250 }),
  logoUrl: varchar("logoUrl", { length: 500 }),
  shortDescription: varchar("shortDescription", { length: 150 }),
  tierId: mysqlEnum("tierId", ["TIER-FRIEND", "TIER-SUPPORTER", "TIER-CHAMPION"]).notNull(),
  sponsoredDomain: varchar("sponsoredDomain", { length: 50 }),
  billingCycle: mysqlEnum("billingCycle", ["monthly", "annually"]).default("monthly").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 128 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 128 }),
  status: mysqlEnum("status", ["pending_review", "active", "paused", "expired", "rejected"]).default("pending_review").notNull(),
  impressions: int("impressions").default(0).notNull(),
  clicks: int("clicks").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  activatedAt: timestamp("activatedAt"),
  expiresAt: timestamp("expiresAt"),
});

export type Sponsor = typeof sponsors.$inferSelect;
export type InsertSponsor = typeof sponsors.$inferInsert;

/**
 * Feature flags for admin control.
 */
export const featureFlags = mysqlTable("featureFlags", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 64 }).notNull().unique(),
  enabled: boolean("enabled").default(false).notNull(),
  description: varchar("description", { length: 300 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FeatureFlag = typeof featureFlags.$inferSelect;
export type InsertFeatureFlag = typeof featureFlags.$inferInsert;

/**
 * Lesson feedback/ratings from parents or children.
 */
export const lessonFeedback = mysqlTable("lessonFeedback", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  userId: int("userId").notNull(),
  lessonId: varchar("lessonId", { length: 64 }).notNull(),
  domain: varchar("domain", { length: 64 }).notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type LessonFeedback = typeof lessonFeedback.$inferSelect;
export type InsertLessonFeedback = typeof lessonFeedback.$inferInsert;
