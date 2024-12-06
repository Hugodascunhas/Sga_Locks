-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(100) NOT NULL,
    `Sobrenome` VARCHAR(100) NOT NULL,
    `rm` INTEGER NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `resetToken` VARCHAR(255) NULL,

    UNIQUE INDEX `users_rm_key`(`rm`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
