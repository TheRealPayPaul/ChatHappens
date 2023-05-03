/*
  Warnings:

  - You are about to drop the column `createdOn` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `createdOn` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `chat` DROP COLUMN `createdOn`,
    ADD COLUMN `created_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdOn`,
    ADD COLUMN `created_on` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
