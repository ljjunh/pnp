/*
  Warnings:

  - The primary key for the `amenities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `amenities` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `room_id` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `room_amenities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `room_amenities` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `room_id` on the `room_amenities` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `amenity_id` on the `room_amenities` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `room_images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `room_images` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `room_id` on the `room_images` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `room_rules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `room_rules` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `room_id` on the `room_rules` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `rule_id` on the `room_rules` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `room_id` on the `room_tags` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `rooms` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `rules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `rules` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `room_amenities` DROP FOREIGN KEY `room_amenities_amenity_id_fkey`;

-- DropForeignKey
ALTER TABLE `room_amenities` DROP FOREIGN KEY `room_amenities_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `room_images` DROP FOREIGN KEY `room_images_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `room_rules` DROP FOREIGN KEY `room_rules_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `room_rules` DROP FOREIGN KEY `room_rules_rule_id_fkey`;

-- DropForeignKey
ALTER TABLE `room_tags` DROP FOREIGN KEY `room_tags_room_id_fkey`;

-- AlterTable
ALTER TABLE `amenities` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `reviews` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `room_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `room_amenities` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `room_id` INTEGER NOT NULL,
    MODIFY `amenity_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `room_images` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `room_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `room_rules` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `room_id` INTEGER NOT NULL,
    MODIFY `rule_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `room_tags` MODIFY `room_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rooms` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `rules` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `room_images` ADD CONSTRAINT `room_images_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_rules` ADD CONSTRAINT `room_rules_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_rules` ADD CONSTRAINT `room_rules_rule_id_fkey` FOREIGN KEY (`rule_id`) REFERENCES `rules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_amenities` ADD CONSTRAINT `room_amenities_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_amenities` ADD CONSTRAINT `room_amenities_amenity_id_fkey` FOREIGN KEY (`amenity_id`) REFERENCES `amenities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_tags` ADD CONSTRAINT `room_tags_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
