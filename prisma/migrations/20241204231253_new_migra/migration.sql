/*
  Warnings:

  - You are about to drop the column `rm` on the `admin` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Admin_rm_key` ON `admin`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `rm`,
    ADD COLUMN `emailVerified` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `emailVerified` BOOLEAN NOT NULL DEFAULT false;
