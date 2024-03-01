/*
  Warnings:

  - The `lamaSewa` column on the `rent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `rent` DROP COLUMN `lamaSewa`,
    ADD COLUMN `lamaSewa` INTEGER NOT NULL DEFAULT 0;
