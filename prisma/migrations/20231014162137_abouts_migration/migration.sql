/*
  Warnings:

  - You are about to drop the `about` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `about` DROP FOREIGN KEY `about_userId_fkey`;

-- DropTable
DROP TABLE `about`;

-- CreateTable
CREATE TABLE `abouts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `abouts` ADD CONSTRAINT `abouts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
