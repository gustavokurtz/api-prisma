/*
  Warnings:

  - Added the required column `curtidas` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `likes` ADD COLUMN `curtidas` INTEGER NOT NULL;
