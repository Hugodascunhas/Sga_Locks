/*
  Warnings:

  - You are about to drop the column `Nome` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `Sobrenome` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[admin]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `admin` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `Nome`,
    DROP COLUMN `Sobrenome`,
    DROP COLUMN `emailVerified`,
    ADD COLUMN `admin` VARCHAR(100) NOT NULL,
    MODIFY `email` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_admin_key` ON `Admin`(`admin`);
