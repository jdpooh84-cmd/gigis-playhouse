-- Migration: 0003_enhanced_schema
-- Adds: userRoles, childPlacement, dailyPlan, watchHistory, curatedVideos
-- Modifies: children (new columns), flashcardProgress (SM-2 columns), approvedChannels (blocked column)

-- User roles table (separate from profiles for security)
CREATE TABLE IF NOT EXISTS `userRoles` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `userId` int NOT NULL,
  `role` enum('parent','admin','moderator') NOT NULL,
  `grantedAt` timestamp NOT NULL DEFAULT (now()),
  `grantedBy` int,
  INDEX `idx_userRoles_userId` (`userId`)
);

-- Child placement assessment results
CREATE TABLE IF NOT EXISTS `childPlacement` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `childId` int NOT NULL,
  `subject` varchar(32) NOT NULL,
  `placedLevel` varchar(32) NOT NULL,
  `score` int,
  `totalQuestions` int,
  `assessedAt` timestamp NOT NULL DEFAULT (now()),
  INDEX `idx_childPlacement_childId` (`childId`)
);

-- Daily learning plan per child
CREATE TABLE IF NOT EXISTS `dailyPlan` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `childId` int NOT NULL,
  `date` varchar(10) NOT NULL,
  `exploreRef` varchar(64),
  `practiceRef` varchar(64),
  `tryItRef` varchar(64),
  `shareRef` varchar(64),
  `exploreCompleted` boolean NOT NULL DEFAULT false,
  `practiceCompleted` boolean NOT NULL DEFAULT false,
  `tryItCompleted` boolean NOT NULL DEFAULT false,
  `shareCompleted` boolean NOT NULL DEFAULT false,
  `completedAt` timestamp,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  UNIQUE KEY `uq_dailyPlan_child_date` (`childId`, `date`),
  INDEX `idx_dailyPlan_childId` (`childId`)
);

-- Watch history per child
CREATE TABLE IF NOT EXISTS `watchHistory` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `childId` int NOT NULL,
  `youtubeId` varchar(16) NOT NULL,
  `title` varchar(300),
  `channelId` varchar(64),
  `durationWatched` int NOT NULL DEFAULT 0,
  `totalDuration` int,
  `watchedAt` timestamp NOT NULL DEFAULT (now()),
  INDEX `idx_watchHistory_childId` (`childId`)
);

-- Curated videos — server-side YouTube cache with admin moderation
CREATE TABLE IF NOT EXISTS `curatedVideos` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `youtubeId` varchar(16) NOT NULL UNIQUE,
  `title` varchar(300) NOT NULL,
  `channelId` varchar(64) NOT NULL,
  `channelName` varchar(200),
  `thumbnailUrl` varchar(500),
  `duration` int,
  `ageBand` varchar(20) NOT NULL,
  `domain` varchar(32),
  `approvedByAdmin` boolean NOT NULL DEFAULT false,
  `rejectedByAdmin` boolean NOT NULL DEFAULT false,
  `moderatedAt` timestamp,
  `moderatedBy` int,
  `fetchedAt` timestamp NOT NULL DEFAULT (now()),
  `publishedAt` timestamp,
  INDEX `idx_curatedVideos_ageBand` (`ageBand`),
  INDEX `idx_curatedVideos_domain` (`domain`),
  INDEX `idx_curatedVideos_approved` (`approvedByAdmin`)
);

-- Add new columns to children table
ALTER TABLE `children`
  ADD COLUMN IF NOT EXISTS `ageBand` varchar(20) NOT NULL DEFAULT 'grade-1' AFTER `grade`,
  ADD COLUMN IF NOT EXISTS `primaryLanguage` varchar(10) NOT NULL DEFAULT 'en' AFTER `ageBand`,
  ADD COLUMN IF NOT EXISTS `attentionSpan` enum('short','medium','long') NOT NULL DEFAULT 'medium' AFTER `profileColor`,
  ADD COLUMN IF NOT EXISTS `learningStyle` enum('visual','hands-on','auditory','mixed') NOT NULL DEFAULT 'mixed' AFTER `attentionSpan`,
  ADD COLUMN IF NOT EXISTS `iepFlag` boolean NOT NULL DEFAULT false AFTER `learningStyle`,
  ADD COLUMN IF NOT EXISTS `adhdFlag` boolean NOT NULL DEFAULT false AFTER `iepFlag`,
  ADD COLUMN IF NOT EXISTS `sensoryNotes` text AFTER `adhdFlag`;

-- Add SM-2 columns to flashcardProgress
ALTER TABLE `flashcardProgress`
  ADD COLUMN IF NOT EXISTS `easeFactor` float NOT NULL DEFAULT 2.5 AFTER `bucket`,
  ADD COLUMN IF NOT EXISTS `intervalDays` int NOT NULL DEFAULT 1 AFTER `easeFactor`,
  ADD COLUMN IF NOT EXISTS `repetitions` int NOT NULL DEFAULT 0 AFTER `intervalDays`,
  ADD COLUMN IF NOT EXISTS `dueAt` timestamp NOT NULL DEFAULT (now()) AFTER `repetitions`;

-- Add blocked column to approvedChannels
ALTER TABLE `approvedChannels`
  ADD COLUMN IF NOT EXISTS `blocked` boolean NOT NULL DEFAULT false AFTER `ageTag`;

-- Add locale to users
ALTER TABLE `users`
  ADD COLUMN IF NOT EXISTS `locale` varchar(10) NOT NULL DEFAULT 'en' AFTER `referredBy`;

-- Security helper: has_role function equivalent (MySQL stored function)
-- Note: MySQL doesn't have RLS like Postgres, so we enforce in application layer.
-- This function can be used in queries for role checks.
DROP FUNCTION IF EXISTS `has_role`;
DELIMITER //
CREATE FUNCTION `has_role`(p_user_id INT, p_role VARCHAR(20))
RETURNS BOOLEAN
DETERMINISTIC
READS SQL DATA
BEGIN
  DECLARE role_exists INT DEFAULT 0;
  SELECT COUNT(*) INTO role_exists
  FROM `userRoles`
  WHERE `userId` = p_user_id AND `role` = p_role;
  RETURN role_exists > 0;
END //
DELIMITER ;
