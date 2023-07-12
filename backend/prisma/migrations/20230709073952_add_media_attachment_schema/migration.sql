-- CreateTable
CREATE TABLE "MediaAttachment" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "tweetId" INTEGER,

    CONSTRAINT "MediaAttachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MediaAttachment" ADD CONSTRAINT "MediaAttachment_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
