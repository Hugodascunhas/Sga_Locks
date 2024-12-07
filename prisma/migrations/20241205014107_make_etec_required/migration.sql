-- DropIndex
DROP INDEX `User_rm_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `etec` VARCHAR(191) NOT NULL DEFAULT 'default_etec';
