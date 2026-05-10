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
  locale: varchar("locale", { length: 10 }).default("en").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User roles — separate table for security (never on profiles).
 * Supports parent/admin roles with SECURITY DEFINER pattern.
 */
export const userRoles = mysqlTable("userRoles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  role: mysqlEnum("role", ["parent", "admin", "moderator"]).notNull(),
  grantedAt: timestamp("grantedAt").defaultNow().notNull(),
  grantedBy: int("grantedBy"),
});

export type UserRole = typeof userRoles.$inferSelect;
export type InsertUserRole = typeof userRoles.$inferInsert;

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
  ageBand: varchar("ageBand", { length: 20 }).default("grade-1").notNull(),
  primaryLanguage: varchar("primaryLanguage", { length: 10 }).default("en").notNull(),
  guideAnimal: mysqlEnum("guideAnimal", ["cat", "dog", "bunny", "bear"]).default("cat").notNull(),
  profileColor: mysqlEnum("profileColor", ["coral", "sky", "mint", "lavender", "sunshine", "peach"]).default("coral").notNull(),
  attentionSpan: mysqlEnum("attentionSpan", ["short", "medium", "long"]).default("medium").notNull(),
  learningStyle: mysqlEnum("learningStyle", ["visual", "hands-on", "auditory", "mixed"]).default("mixed").notNull(),
  iepFlag: boolean("iepFlag").default(false).notNull(),
  adhdFlag: boolean("adhdFlag").default(false).notNull(),
  sensoryNotes: text("sensoryNotes"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Child = typeof children.$inferSelect;
export type InsertChild = typeof children.$inferInsert;

/**
 * Child placement assessment results.
 */
export const childPlacement = mysqlTable("childPlacement", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  subject: varchar("subject", { length: 32 }).notNull(),
  placedLevel: varchar("placedLevel", { length: 32 }).notNull(),
  score: int("score"),
  totalQuestions: int("totalQuestions"),
  assessedAt: timestamp("assessedAt").defaultNow().notNull(),
});

export type ChildPlacement = typeof childPlacement.$inferSelect;
export type InsertChildPlacement = typeof childPlacement.$inferInsert;

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
 * Daily learning plan per child — the Explore → Practice → Try It → Share rhythm.
 */
export const dailyPlan = mysqlTable("dailyPlan", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  date: varchar("date", { length: 10 }).notNull(),
  exploreRef: varchar("exploreRef", { length: 64 }),
  practiceRef: varchar("practiceRef", { length: 64 }),
  tryItRef: varchar("tryItRef", { length: 64 }),
  shareRef: varchar("shareRef", { length: 64 }),
  exploreCompleted: boolean("exploreCompleted").default(false).notNull(),
  practiceCompleted: boolean("practiceCompleted").default(false).notNull(),
  tryItCompleted: boolean("tryItCompleted").default(false).notNull(),
  shareCompleted: boolean("shareCompleted").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DailyPlan = typeof dailyPlan.$inferSelect;
export type InsertDailyPlan = typeof dailyPlan.$inferInsert;

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
 * Flashcard progress per child — SM-2 spaced repetition.
 */
export const flashcardProgress = mysqlTable("flashcardProgress", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  flashcardId: varchar("flashcardId", { length: 64 }).notNull(),
  bucket: int("bucket").default(1).notNull(),
  easeFactor: float("easeFactor").default(2.5).notNull(),
  intervalDays: int("intervalDays").default(1).notNull(),
  repetitions: int("repetitions").default(0).notNull(),
  dueAt: timestamp("dueAt").defaultNow().notNull(),
  lastReviewed: timestamp("lastReviewed").defaultNow().notNull(),
  timesCorrect: int("timesCorrect").default(0).notNull(),
  timesIncorrect: int("timesIncorrect").default(0).notNull(),
});

export type FlashcardProgress = typeof flashcardProgress.$inferSelect;
export type InsertFlashcardProgress = typeof flashcardProgress.$inferInsert;

/**
 * Watch history — tracks YouTube video views per child.
 */
export const watchHistory = mysqlTable("watchHistory", {
  id: int("id").autoincrement().primaryKey(),
  childId: int("childId").notNull(),
  youtubeId: varchar("youtubeId", { length: 16 }).notNull(),
  title: varchar("title", { length: 300 }),
  channelId: varchar("channelId", { length: 64 }),
  durationWatched: int("durationWatched").default(0).notNull(),
  totalDuration: int("totalDuration"),
  watchedAt: timestamp("watchedAt").defaultNow().notNull(),
});

export type WatchHistory = typeof watchHistory.$inferSelect;
export type InsertWatchHistory = typeof watchHistory.$inferInsert;

/**
 * Curated videos — server-side YouTube cache with admin moderation.
 * Populated by nightly cron / admin action. Client reads from here instead of YouTube API.
 */
export const curatedVideos = mysqlTable("curatedVideos", {
  id: int("id").autoincrement().primaryKey(),
  youtubeId: varchar("youtubeId", { length: 16 }).notNull().unique(),
  title: varchar("title", { length: 300 }).notNull(),
  channelId: varchar("channelId", { length: 64 }).notNull(),
  channelName: varchar("channelName", { length: 200 }),
  thumbnailUrl: varchar("thumbnailUrl", { length: 500 }),
  duration: int("duration"),
  ageBand: varchar("ageBand", { length: 20 }).notNull(),
  domain: varchar("domain", { length: 32 }),
  approvedByAdmin: boolean("approvedByAdmin").default(false).notNull(),
  rejectedByAdmin: boolean("rejectedByAdmin").default(false).notNull(),
  moderatedAt: timestamp("moderatedAt"),
  moderatedBy: int("moderatedBy"),
  fetchedAt: timestamp("fetchedAt").defaultNow().notNull(),
  publishedAt: timestamp("publishedAt"),
});

export type CuratedVideo = typeof curatedVideos.$inferSelect;
export type InsertCuratedVideo = typeof curatedVideos.$inferInsert;

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
  blocked: boolean("blocked").default(false).notNull(),
  addedAt: timestamp("addedAt").defaultNow().notNull(),
});

export type ApprovedChannel = typeof approvedChannels.$inferSelect;
export type InsertApprovedChannel = typeof approvedChannels.$inferInsert;

/**
 * Compliance logs for record-keeping.
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
