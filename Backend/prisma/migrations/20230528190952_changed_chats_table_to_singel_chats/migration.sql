/*
  Warnings:

  - You are about to drop the `chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chatuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `chatuser` DROP FOREIGN KEY `ChatUser_chat_id_fkey`;

-- DropForeignKey
ALTER TABLE `chatuser` DROP FOREIGN KEY `ChatUser_user_id_fkey`;

-- DropTable
DROP TABLE `chat`;

-- DropTable
DROP TABLE `chatuser`;

-- CreateTable
CREATE TABLE `SingleChat` (
    `chat_id` VARCHAR(191) NOT NULL,
    `created_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_1_id` VARCHAR(191) NOT NULL,
    `user_2_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`chat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SingleChat` ADD CONSTRAINT `SingleChat_user_1_id_fkey` FOREIGN KEY (`user_1_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SingleChat` ADD CONSTRAINT `SingleChat_user_2_id_fkey` FOREIGN KEY (`user_2_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
