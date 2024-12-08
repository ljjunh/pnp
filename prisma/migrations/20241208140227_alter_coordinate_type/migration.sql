/*
  Warnings:

  - You are about to alter the column `latitude` on the `rooms` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,6)`.
  - You are about to alter the column `longitude` on the `rooms` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,6)`.

*/
-- AlterTable
ALTER TABLE `rooms` MODIFY `latitude` DECIMAL(10, 6) NOT NULL,
    MODIFY `longitude` DECIMAL(10, 6) NOT NULL;
