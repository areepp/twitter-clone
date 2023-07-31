-- AlterTable
ALTER TABLE "ReplyTweet" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "ReplyTweet_id_seq";

-- AlterTable
ALTER TABLE "Tweet" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Tweet_id_seq";
