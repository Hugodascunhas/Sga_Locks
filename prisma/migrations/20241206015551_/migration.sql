-- AlterTable
ALTER TABLE `admin` ADD COLUMN `approvalToken` VARCHAR(255) NULL,
    ADD COLUMN `approved` BOOLEAN NOT NULL DEFAULT false;
