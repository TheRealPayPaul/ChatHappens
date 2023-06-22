-- CreateTable
CREATE TABLE `chat` (
    `chat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`chat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(128) NOT NULL,
    `display_name` VARCHAR(45) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `profile_picture` VARCHAR(40) NOT NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chatuser` (
    `chat_user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `chat_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`chat_user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chatuser` ADD CONSTRAINT `chatuser_chat_id_fkey` FOREIGN KEY (`chat_id`) REFERENCES `chat`(`chat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chatuser` ADD CONSTRAINT `chatuser_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
