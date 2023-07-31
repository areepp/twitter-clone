/*
  Warnings:

  - You are about to drop the column `parentReplyId` on the `ReplyTweet` table. All the data in the column will be lost.
  - You are about to drop the column `parentTweetId` on the `ReplyTweet` table. All the data in the column will be lost.
  - Added the required column `tweetId` to the `ReplyTweet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReplyTweet" DROP CONSTRAINT "ReplyTweet_parentReplyId_fkey";

-- DropForeignKey
ALTER TABLE "ReplyTweet" DROP CONSTRAINT "ReplyTweet_parentTweetId_fkey";

-- AlterTable
ALTER TABLE "ReplyTweet" DROP COLUMN "parentReplyId",
DROP COLUMN "parentTweetId",
ADD COLUMN     "replyTweetId" BIGINT,
ADD COLUMN     "tweetId" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "ReplyTweet" ADD CONSTRAINT "ReplyTweet_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyTweet" ADD CONSTRAINT "ReplyTweet_replyTweetId_fkey" FOREIGN KEY ("replyTweetId") REFERENCES "ReplyTweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
