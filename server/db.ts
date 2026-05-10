import { and, eq, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  children, InsertChild,
  enrolledPaths, InsertEnrolledPath,
  lessonProgress, InsertLessonProgress,
  quizResults, InsertQuizResult,
  flashcardProgress, InsertFlashcardProgress,
  approvedChannels, InsertApprovedChannel,
  complianceLogs, InsertComplianceLog,
  alerts, InsertAlert,
  sponsors, InsertSponsor,
  featureFlags, InsertFeatureFlag,
  lessonFeedback, InsertLessonFeedback,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }

    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) { console.error("[Database] Failed to upsert user:", error); throw error; }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserProfile(userId: number, updates: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set(updates).where(eq(users.id, userId));
}

export async function listAllUsers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).orderBy(desc(users.createdAt));
}

// ─── Children ─────────────────────────────────────────────────────────────────

export async function getChildrenByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(children).where(eq(children.userId, userId));
}

export async function getChildById(childId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(children).where(eq(children.id, childId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getChildByUuid(uuid: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(children).where(eq(children.uuid, uuid)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createChild(child: InsertChild) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(children).values(child);
  return result[0].insertId;
}

export async function updateChild(childId: number, updates: Partial<InsertChild>) {
  const db = await getDb();
  if (!db) return;
  await db.update(children).set(updates).where(eq(children.id, childId));
}

export async function deleteChild(childId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(children).where(eq(children.id, childId));
}

export async function countChildrenByUser(userId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(children).where(eq(children.userId, userId));
  return result[0]?.count ?? 0;
}

// ─── Enrolled Paths ───────────────────────────────────────────────────────────

export async function getEnrolledPathsByChild(childId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(enrolledPaths).where(eq(enrolledPaths.childId, childId));
}

export async function enrollChildInPath(path: InsertEnrolledPath) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(enrolledPaths).values(path);
}

export async function unenrollChildFromPath(childId: number, domain: string) {
  const db = await getDb();
  if (!db) return;
  await db.delete(enrolledPaths).where(and(eq(enrolledPaths.childId, childId), eq(enrolledPaths.domain, domain)));
}

// ─── Lesson Progress ──────────────────────────────────────────────────────────

export async function getLessonProgressByChild(childId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(lessonProgress).where(eq(lessonProgress.childId, childId));
}

export async function upsertLessonProgress(progress: InsertLessonProgress) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(lessonProgress).values(progress).onDuplicateKeyUpdate({
    set: {
      completionStatus: progress.completionStatus,
      stepsCompleted: progress.stepsCompleted,
      completedAt: progress.completedAt,
    },
  });
}

// ─── Quiz Results ─────────────────────────────────────────────────────────────

export async function getQuizResultsByChild(childId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(quizResults).where(eq(quizResults.childId, childId)).orderBy(desc(quizResults.takenAt));
}

export async function addQuizResult(result: InsertQuizResult) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(quizResults).values(result);
}

// ─── Flashcard Progress ───────────────────────────────────────────────────────

export async function getFlashcardProgressByChild(childId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(flashcardProgress).where(eq(flashcardProgress.childId, childId));
}

export async function upsertFlashcardProgress(progress: InsertFlashcardProgress) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(flashcardProgress).values(progress).onDuplicateKeyUpdate({
    set: {
      bucket: progress.bucket,
      lastReviewed: progress.lastReviewed,
      timesCorrect: progress.timesCorrect,
      timesIncorrect: progress.timesIncorrect,
    },
  });
}

// ─── Approved Channels ────────────────────────────────────────────────────────

export async function getApprovedChannelsByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(approvedChannels).where(eq(approvedChannels.userId, userId));
}

export async function addApprovedChannel(channel: InsertApprovedChannel) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(approvedChannels).values(channel);
}

export async function removeApprovedChannel(channelId: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(approvedChannels).where(and(eq(approvedChannels.id, channelId), eq(approvedChannels.userId, userId)));
}

// ─── Compliance Logs ──────────────────────────────────────────────────────────

export async function getComplianceLogsByChild(childId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(complianceLogs).where(eq(complianceLogs.childId, childId)).orderBy(desc(complianceLogs.createdAt));
}

export async function addComplianceLog(log: InsertComplianceLog) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(complianceLogs).values(log);
}

// ─── Alerts ───────────────────────────────────────────────────────────────────

export async function getAlertsByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(alerts).where(eq(alerts.userId, userId)).orderBy(desc(alerts.createdAt));
}

export async function addAlert(alert: InsertAlert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(alerts).values(alert);
}

export async function markAlertRead(alertId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(alerts).set({ isRead: true }).where(eq(alerts.id, alertId));
}

// ─── Sponsors (Admin) ─────────────────────────────────────────────────────────

export async function listSponsors() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sponsors).orderBy(desc(sponsors.createdAt));
}

export async function createSponsor(sponsor: InsertSponsor) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(sponsors).values(sponsor);
}

export async function updateSponsor(sponsorId: number, updates: Partial<InsertSponsor>) {
  const db = await getDb();
  if (!db) return;
  await db.update(sponsors).set(updates).where(eq(sponsors.id, sponsorId));
}

export async function getActiveSponsors() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sponsors).where(eq(sponsors.status, "active")).orderBy(desc(sponsors.createdAt));
}

export async function getActiveSponsorsByDomain(domain: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sponsors).where(
    and(eq(sponsors.status, "active"), eq(sponsors.sponsoredDomain, domain))
  );
}

export async function incrementSponsorImpressions(sponsorId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(sponsors).set({ impressions: sql`impressions + 1` }).where(eq(sponsors.id, sponsorId));
}

export async function incrementSponsorClicks(sponsorId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(sponsors).set({ clicks: sql`clicks + 1` }).where(eq(sponsors.id, sponsorId));
}

// ─── Feature Flags (Admin) ───────────────────────────────────────────────────

export async function listFeatureFlags() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(featureFlags);
}

export async function upsertFeatureFlag(flag: InsertFeatureFlag) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(featureFlags).values(flag).onDuplicateKeyUpdate({
    set: { enabled: flag.enabled, description: flag.description },
  });
}

export async function getFeatureFlagByKey(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(featureFlags).where(eq(featureFlags.key, key)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Stripe Helpers ─────────────────────────────────────────────────────────

export async function findUserByStripeCustomerId(customerId: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(users).where(eq(users.stripeCustomerId, customerId)).limit(1);
  return rows[0] || null;
}

// ─── Lesson Feedback ────────────────────────────────────────────────────

export async function getLessonFeedbackByChild(childId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(lessonFeedback).where(eq(lessonFeedback.childId, childId)).orderBy(desc(lessonFeedback.createdAt));
}

export async function getLessonFeedbackByLesson(lessonId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(lessonFeedback).where(eq(lessonFeedback.lessonId, lessonId)).orderBy(desc(lessonFeedback.createdAt));
}

export async function addLessonFeedback(feedback: InsertLessonFeedback) {
  const db = await getDb();
  if (!db) return;
  await db.insert(lessonFeedback).values(feedback);
}

export async function getAverageRatingByDomain(domain: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select({ rating: lessonFeedback.rating }).from(lessonFeedback).where(eq(lessonFeedback.domain, domain));
  if (rows.length === 0) return null;
  const avg = rows.reduce((sum, r) => sum + r.rating, 0) / rows.length;
  return { average: Math.round(avg * 10) / 10, count: rows.length };
}

// ─── User Roles ──────────────────────────────────────────────────────────────

import {
  userRoles, InsertUserRole,
  childPlacement, InsertChildPlacement,
  dailyPlan, InsertDailyPlan,
  watchHistory, InsertWatchHistory,
  curatedVideos, InsertCuratedVideo,
} from "../drizzle/schema";

export async function getUserRoles(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(userRoles).where(eq(userRoles.userId, userId));
}

export async function hasRole(userId: number, role: string) {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select().from(userRoles).where(
    and(eq(userRoles.userId, userId), eq(userRoles.role, role as any))
  ).limit(1);
  return result.length > 0;
}

export async function grantRole(data: InsertUserRole) {
  const db = await getDb();
  if (!db) return;
  await db.insert(userRoles).values(data);
}

export async function revokeRole(userId: number, role: string) {
  const db = await getDb();
  if (!db) return;
  await db.delete(userRoles).where(
    and(eq(userRoles.userId, userId), eq(userRoles.role, role as any))
  );
}

// ─── Child Placement ─────────────────────────────────────────────────────────

export async function getPlacementsByChild(childId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(childPlacement).where(eq(childPlacement.childId, childId));
}

export async function upsertPlacement(placement: InsertChildPlacement) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(childPlacement).values(placement).onDuplicateKeyUpdate({
    set: {
      placedLevel: placement.placedLevel,
      score: placement.score,
      totalQuestions: placement.totalQuestions,
      assessedAt: placement.assessedAt,
    },
  });
}

// ─── Daily Plan ──────────────────────────────────────────────────────────────

export async function getDailyPlan(childId: number, date: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(dailyPlan)
    .where(and(eq(dailyPlan.childId, childId), eq(dailyPlan.date, date)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertDailyPlan(plan: InsertDailyPlan) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(dailyPlan).values(plan).onDuplicateKeyUpdate({
    set: {
      exploreRef: plan.exploreRef,
      practiceRef: plan.practiceRef,
      tryItRef: plan.tryItRef,
      shareRef: plan.shareRef,
      exploreCompleted: plan.exploreCompleted,
      practiceCompleted: plan.practiceCompleted,
      tryItCompleted: plan.tryItCompleted,
      shareCompleted: plan.shareCompleted,
      completedAt: plan.completedAt,
    },
  });
}

export async function updateDailyPlanStep(childId: number, date: string, step: string, completed: boolean) {
  const db = await getDb();
  if (!db) return;
  const updates: Record<string, any> = {};
  if (step === 'explore') updates.exploreCompleted = completed;
  if (step === 'practice') updates.practiceCompleted = completed;
  if (step === 'tryIt') updates.tryItCompleted = completed;
  if (step === 'share') updates.shareCompleted = completed;
  await db.update(dailyPlan).set(updates)
    .where(and(eq(dailyPlan.childId, childId), eq(dailyPlan.date, date)));
}

// ─── Watch History ───────────────────────────────────────────────────────────

export async function getWatchHistoryByChild(childId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(watchHistory).where(eq(watchHistory.childId, childId)).orderBy(desc(watchHistory.watchedAt));
}

export async function addWatchHistory(entry: InsertWatchHistory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(watchHistory).values(entry);
}

// ─── Curated Videos ──────────────────────────────────────────────────────────

export async function getCuratedVideos(filters?: { ageBand?: string; domain?: string; approvedOnly?: boolean }) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (filters?.ageBand) conditions.push(eq(curatedVideos.ageBand, filters.ageBand));
  if (filters?.domain) conditions.push(eq(curatedVideos.domain, filters.domain));
  if (filters?.approvedOnly) conditions.push(eq(curatedVideos.approvedByAdmin, true));
  conditions.push(eq(curatedVideos.rejectedByAdmin, false));

  if (conditions.length > 0) {
    return db.select().from(curatedVideos).where(and(...conditions)).orderBy(desc(curatedVideos.fetchedAt));
  }
  return db.select().from(curatedVideos).where(eq(curatedVideos.rejectedByAdmin, false)).orderBy(desc(curatedVideos.fetchedAt));
}

export async function upsertCuratedVideo(video: InsertCuratedVideo) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(curatedVideos).values(video).onDuplicateKeyUpdate({
    set: {
      title: video.title,
      channelName: video.channelName,
      thumbnailUrl: video.thumbnailUrl,
      duration: video.duration,
      ageBand: video.ageBand,
      domain: video.domain,
      fetchedAt: new Date(),
    },
  });
}

export async function moderateVideo(youtubeId: string, approved: boolean, moderatorId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(curatedVideos).set({
    approvedByAdmin: approved,
    rejectedByAdmin: !approved,
    moderatedAt: new Date(),
    moderatedBy: moderatorId,
  }).where(eq(curatedVideos.youtubeId, youtubeId));
}

export async function getPendingModerationVideos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(curatedVideos)
    .where(and(
      eq(curatedVideos.approvedByAdmin, false),
      eq(curatedVideos.rejectedByAdmin, false)
    ))
    .orderBy(desc(curatedVideos.fetchedAt));
}

// ─── Flashcard SRS (SM-2) ────────────────────────────────────────────────────

export async function getFlashcardsDueToday(childId: number) {
  const db = await getDb();
  if (!db) return [];
  const now = new Date();
  return db.select().from(flashcardProgress)
    .where(and(
      eq(flashcardProgress.childId, childId),
      sql`${flashcardProgress.dueAt} <= ${now}`
    ))
    .orderBy(flashcardProgress.dueAt);
}

export async function upsertFlashcardSRS(data: InsertFlashcardProgress) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(flashcardProgress).values(data).onDuplicateKeyUpdate({
    set: {
      bucket: data.bucket,
      easeFactor: data.easeFactor,
      intervalDays: data.intervalDays,
      repetitions: data.repetitions,
      dueAt: data.dueAt,
      lastReviewed: data.lastReviewed,
      timesCorrect: data.timesCorrect,
      timesIncorrect: data.timesIncorrect,
    },
  });
}
