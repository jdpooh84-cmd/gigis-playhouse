CREATE TABLE `alerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` varchar(32) NOT NULL,
	`title` varchar(200) NOT NULL,
	`message` text NOT NULL,
	`isRead` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `approvedChannels` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`youtubeChannelId` varchar(64) NOT NULL,
	`nickname` varchar(100) NOT NULL,
	`emoji` varchar(10) NOT NULL DEFAULT '📺',
	`ageTag` varchar(20) NOT NULL DEFAULT 'K-3',
	`addedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `approvedChannels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `children` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uuid` varchar(36) NOT NULL,
	`userId` int NOT NULL,
	`displayName` varchar(100) NOT NULL,
	`avatarEmoji` varchar(10) NOT NULL DEFAULT '🦄',
	`age` int NOT NULL DEFAULT 6,
	`grade` int NOT NULL DEFAULT 1,
	`guideAnimal` enum('cat','dog','bunny','bear') NOT NULL DEFAULT 'cat',
	`profileColor` enum('coral','sky','mint','lavender','sunshine','peach') NOT NULL DEFAULT 'coral',
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `children_id` PRIMARY KEY(`id`),
	CONSTRAINT `children_uuid_unique` UNIQUE(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `complianceLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`date` varchar(10) NOT NULL,
	`minutes` int NOT NULL DEFAULT 0,
	`lessonsCompleted` json DEFAULT ('[]'),
	`domainsCovered` json DEFAULT ('[]'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `complianceLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `enrolledPaths` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`domain` varchar(32) NOT NULL,
	`grade` int NOT NULL DEFAULT 1,
	`enrolledAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `enrolledPaths_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `featureFlags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(64) NOT NULL,
	`enabled` boolean NOT NULL DEFAULT false,
	`description` varchar(300),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `featureFlags_id` PRIMARY KEY(`id`),
	CONSTRAINT `featureFlags_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `flashcardProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`flashcardId` varchar(64) NOT NULL,
	`bucket` int NOT NULL DEFAULT 1,
	`lastReviewed` timestamp NOT NULL DEFAULT (now()),
	`timesCorrect` int NOT NULL DEFAULT 0,
	`timesIncorrect` int NOT NULL DEFAULT 0,
	CONSTRAINT `flashcardProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lessonProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`lessonId` varchar(64) NOT NULL,
	`completionStatus` enum('not_started','in_progress','done') NOT NULL DEFAULT 'not_started',
	`stepsCompleted` json DEFAULT ('[]'),
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `lessonProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quizResults` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`lessonId` varchar(64) NOT NULL,
	`score` int NOT NULL,
	`total` int NOT NULL,
	`passed` boolean NOT NULL DEFAULT false,
	`answers` json DEFAULT ('[]'),
	`takenAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quizResults_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sponsors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyName` varchar(200) NOT NULL,
	`logoUrl` varchar(500),
	`tagline` varchar(300),
	`ctaUrl` varchar(500),
	`ctaLabel` varchar(100),
	`status` enum('active','paused','expired') NOT NULL DEFAULT 'active',
	`impressions` int NOT NULL DEFAULT 0,
	`clicks` int NOT NULL DEFAULT 0,
	`monthlyBudget` float NOT NULL DEFAULT 0,
	`startDate` timestamp,
	`endDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sponsors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `planType` enum('free','gold','family') DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `trialStart` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(128);--> statement-breakpoint
ALTER TABLE `users` ADD `stripeSubscriptionId` varchar(128);--> statement-breakpoint
ALTER TABLE `users` ADD `onboardingComplete` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `coppaConsent` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `affiliateCode` varchar(32);--> statement-breakpoint
ALTER TABLE `users` ADD `referredBy` varchar(32);