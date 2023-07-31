/*
  Warnings:

  - You are about to drop the column `replyTweetId` on the `ReplyTweet` table. All the data in the column will be lost.
  - You are about to drop the column `tweetId` on the `ReplyTweet` table. All the data in the column will be lost.
  - Added the required column `parentTweetId` to the `ReplyTweet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReplyTweet" DROP CONSTRAINT "ReplyTweet_replyTweetId_fkey";

-- DropForeignKey
ALTER TABLE "ReplyTweet" DROP CONSTRAINT "ReplyTweet_tweetId_fkey";

-- AlterTable
ALTER TABLE "ReplyTweet" DROP COLUMN "replyTweetId",
DROP COLUMN "tweetId",
ADD COLUMN     "parentReplyId" BIGINT,
ADD COLUMN     "parentTweetId" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "ReplyTweet" ADD CONSTRAINT "ReplyTweet_parentTweetId_fkey" FOREIGN KEY ("parentTweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyTweet" ADD CONSTRAINT "ReplyTweet_parentReplyId_fkey" FOREIGN KEY ("parentReplyId") REFERENCES "ReplyTweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
