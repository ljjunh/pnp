/*
  Warnings:

  - You are about to drop the column `name` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `rating_average` on the `hosts` table. All the data in the column will be lost.
  - You are about to drop the column `rating_count` on the `hosts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `hosts` DROP COLUMN `name`,
    DROP COLUMN `profile_image`,
    DROP COLUMN `rating_average`,
    DROP COLUMN `rating_count`,
    MODIFY `about` TEXT NULL;
