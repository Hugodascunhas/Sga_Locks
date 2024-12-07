-- AlterTable
ALTER TABLE `admin` ADD COLUMN `etec` VARCHAR(191) NOT NULL DEFAULT 'default_etec';

-- AlterTable
ALTER TABLE `user` MODIFY `etec` VARCHAR(191) NOT NULL DEFAULT 'default_etec',
    MODIFY `curso` VARCHAR(191) NOT NULL DEFAULT 'default_curso';
