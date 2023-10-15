-- DropIndex
DROP INDEX `users_password_key` ON `users`;

-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(255) NOT NULL;
