/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `Nome` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `Sobrenome` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - A unique constraint covering the columns `[rm]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Sobrenome` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rm` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` ADD COLUMN `Sobrenome` VARCHAR(100) NOT NULL,
    ADD COLUMN `rm` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `emailVerified`,
    MODIFY `Nome` VARCHAR(100) NOT NULL,
    MODIFY `Sobrenome` VARCHAR(100) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `resetToken` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_rm_key` ON `Admin`(`rm`);
