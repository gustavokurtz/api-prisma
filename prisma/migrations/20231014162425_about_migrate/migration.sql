/*
  Warnings:

  - Added the required column `city` to the `abouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hobby` to the `abouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `abouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `abouts` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `hobby` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;
