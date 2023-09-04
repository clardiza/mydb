-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `persons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstname` varchar(255) NOT NULL,
	`lastname` varchar(255) NOT NULL,
	`birthday` date NOT NULL,
	CONSTRAINT `persons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`role` enum('buyer','member','club admin','school admin','super admin'),
	`person_id` int NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `person_id_idx` ON `users` (`person_id`);
*/