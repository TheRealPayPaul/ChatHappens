-- CreateTable
CREATE TABLE `friendrequest` (
    `friend_request_id` VARCHAR(191) NOT NULL,
    `from_user_id` VARCHAR(191) NOT NULL,
    `to_user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`friend_request_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `friend` (
    `friend_id` VARCHAR(191) NOT NULL,
    `user_1_id` VARCHAR(191) NOT NULL,
    `user_2_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`friend_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `friendrequest` ADD CONSTRAINT `friendrequest_from_user_id_fkey` FOREIGN KEY (`from_user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friendrequest` ADD CONSTRAINT `friendrequest_to_user_id_fkey` FOREIGN KEY (`to_user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friend` ADD CONSTRAINT `friend_user_1_id_fkey` FOREIGN KEY (`user_1_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friend` ADD CONSTRAINT `friend_user_2_id_fkey` FOREIGN KEY (`user_2_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
