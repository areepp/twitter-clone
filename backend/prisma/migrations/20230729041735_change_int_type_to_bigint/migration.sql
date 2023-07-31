/*
  Warnings:

  - The primary key for the `ReplyTweet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tweet` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "LikedTweet" DROP CONSTRAINT "LikedTweet_replyTweetId_fkey";

-- DropForeignKey
ALTER TABLE "LikedTweet" DROP CONSTRAINT "LikedTweet_tweetId_fkey";

-- DropForeignKey
ALTER TABLE "MediaAttachment" DROP CONSTRAINT "MediaAttachment_replyTweetId_fkey";

-- DropForeignKey
ALTER TABLE "MediaAttachment" DROP CONSTRAINT "MediaAttachment_tweetId_fkey";

-- DropForeignKey
ALTER TABLE "ReplyTweet" DROP CONSTRAINT "ReplyTweet_replyTweetId_fkey";

-- DropForeignKey
ALTER TABLE "ReplyTweet" DROP CONSTRAINT "ReplyTweet_tweetId_fkey";

-- AlterTable
ALTER TABLE "LikedTweet" ALTER COLUMN "tweetId" SET DATA TYPE BIGINT,
ALTER COLUMN "replyTweetId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "MediaAttachment" ALTER COLUMN "tweetId" SET DATA TYPE BIGINT,
ALTER COLUMN "replyTweetId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "ReplyTweet" DROP CONSTRAINT "ReplyTweet_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "tweetId" SET DATA TYPE BIGINT,
ALTER COLUMN "replyTweetId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "ReplyTweet_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ReplyTweet" ADD CONSTRAINT "ReplyTweet_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyTweet" ADD CONSTRAINT "ReplyTweet_replyTweetId_fkey" FOREIGN KEY ("replyTweetId") REFERENCES "ReplyTweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedTweet" ADD CONSTRAINT "LikedTweet_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedTweet" ADD CONSTRAINT "LikedTweet_replyTweetId_fkey" FOREIGN KEY ("replyTweetId") REFERENCES "ReplyTweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAttachment" ADD CONSTRAINT "MediaAttachment_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAttachment" ADD CONSTRAINT "MediaAttachment_replyTweetId_fkey" FOREIGN KEY ("replyTweetId") REFERENCES "ReplyTweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
