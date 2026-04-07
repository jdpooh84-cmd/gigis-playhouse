CREATE TABLE `lessonFeedback` (
	`id` int AUTO_INCREMENT NOT NULL,
	`childId` int NOT NULL,
	`userId` int NOT NULL,
	`lessonId` varchar(64) NOT NULL,
	`domain` varchar(64) NOT NULL,
	`rating` int NOT NULL,
	`comment` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lessonFeedback_id` PRIMARY KEY(`id`)
);
