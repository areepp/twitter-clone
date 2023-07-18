/*
  Warnings:

  - The primary key for the `Follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followerId` on the `Follows` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `Follows` table. All the data in the column will be lost.
  - Added the required column `followerUsername` to the `Follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingUsername` to the `Follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followingId_fkey";

-- AlterTable
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_pkey",
DROP COLUMN "followerId",
DROP COLUMN "followingId",
ADD COLUMN     "followerUsername" TEXT NOT NULL,
ADD COLUMN     "followingUsername" TEXT NOT NULL,
ADD CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerUsername", "followingUsername");

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerUsername_fkey" FOREIGN KEY ("followerUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingUsername_fkey" FOREIGN KEY ("followingUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
