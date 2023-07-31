-- AlterTable
ALTER TABLE "LikedTweet" ADD COLUMN     "replyTweetId" INTEGER;

-- AlterTable
ALTER TABLE "MediaAttachment" ADD COLUMN     "replyTweetId" INTEGER;

-- CreateTable
CREATE TABLE "ReplyTweet" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tweetId" INTEGER NOT NULL,
    "replyTweetId" INTEGER,

    CONSTRAINT "ReplyTweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReplyTweet" ADD CONSTRAINT "ReplyTweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyTweet" ADD CONSTRAINT "ReplyTweet_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyTweet" ADD CONSTRAINT "ReplyTweet_replyTweetId_fkey" FOREIGN KEY ("replyTweetId") REFERENCES "ReplyTweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedTweet" ADD CONSTRAINT "LikedTweet_replyTweetId_fkey" FOREIGN KEY ("replyTweetId") REFERENCES "ReplyTweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAttachment" ADD CONSTRAINT "MediaAttachment_replyTweetId_fkey" FOREIGN KEY ("replyTweetId") REFERENCES "ReplyTweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
