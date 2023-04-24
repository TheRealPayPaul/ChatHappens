/*
  Warnings:

  - The primary key for the `chat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `chatuser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `chatuser` DROP FOREIGN KEY `ChatUser_chat_id_fkey`;

-- DropForeignKey
ALTER TABLE `chatuser` DROP FOREIGN KEY `ChatUser_user_id_fkey`;

-- AlterTable
ALTER TABLE `chat` DROP PRIMARY KEY,
    MODIFY `chat_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`chat_id`);

-- AlterTable
ALTER TABLE `chatuser` DROP PRIMARY KEY,
    MODIFY `chat_user_id` VARCHAR(191) NOT NULL,
    MODIFY `chat_id` VARCHAR(191) NOT NULL,
    MODIFY `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`chat_user_id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- AddForeignKey
ALTER TABLE `ChatUser` ADD CONSTRAINT `ChatUser_chat_id_fkey` FOREIGN KEY (`chat_id`) REFERENCES `Chat`(`chat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatUser` ADD CONSTRAINT `ChatUser_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
