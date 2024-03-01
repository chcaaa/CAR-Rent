/*
  Warnings:

  - The `bookedDate` column on the `tickets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `tickets` DROP COLUMN `bookedDate`,
    ADD COLUMN `bookedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
