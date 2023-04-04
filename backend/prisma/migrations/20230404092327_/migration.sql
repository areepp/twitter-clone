/*
  Warnings:

  - You are about to drop the column `profilePictureName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePictureName",
ALTER COLUMN "profilePictureUrl" DROP NOT NULL,
ALTER COLUMN "profilePictureUrl" DROP DEFAULT;
