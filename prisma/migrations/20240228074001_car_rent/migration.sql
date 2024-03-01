/*
  Warnings:

  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tickets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `seats` DROP FOREIGN KEY `seats_eventID_fkey`;

-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `Tickets_eventID_fkey`;

-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `Tickets_seatID_fkey`;

-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `Tickets_userID_fkey`;

-- DropTable
DROP TABLE `events`;

-- DropTable
DROP TABLE `seats`;

-- DropTable
DROP TABLE `tickets`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `Admin` (
    `adminID` INTEGER NOT NULL AUTO_INCREMENT,
    `namaAdmin` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`adminID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `carID` INTEGER NOT NULL AUTO_INCREMENT,
    `nopol` VARCHAR(191) NOT NULL DEFAULT '',
    `merkMobil` VARCHAR(191) NOT NULL DEFAULT '',
    `hargaPerhari` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`carID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rent` (
    `rentID` INTEGER NOT NULL AUTO_INCREMENT,
    `carID` INTEGER NOT NULL DEFAULT 0,
    `namaPenyewa` VARCHAR(191) NOT NULL DEFAULT '',
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lamaSewa` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `totalBayar` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`rentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_carID_fkey` FOREIGN KEY (`carID`) REFERENCES `Car`(`carID`) ON DELETE RESTRICT ON UPDATE CASCADE;
