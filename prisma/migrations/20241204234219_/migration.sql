/*
  Warnings:

  - A unique constraint covering the columns `[rm]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_rm_key` ON `User`(`rm`);
