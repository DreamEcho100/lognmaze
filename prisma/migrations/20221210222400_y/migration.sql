/*
  Warnings:

  - You are about to drop the `discussion_forum_posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "discussion_forum_posts" DROP CONSTRAINT "discussion_forum_posts_creative_work_id_fkey";

-- DropForeignKey
ALTER TABLE "discussion_forum_posts" DROP CONSTRAINT "discussion_forum_posts_discussion_forum_id_fkey";

-- DropForeignKey
ALTER TABLE "discussion_forum_posts" DROP CONSTRAINT "discussion_forum_posts_reply_to_discussion_forum_post_Id_fkey";

-- DropTable
DROP TABLE "discussion_forum_posts";

-- CreateTable
CREATE TABLE "discussions_forums_posts" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "replies_count" INTEGER NOT NULL DEFAULT 0,
    "reply_to_discussion_forum_post_Id" TEXT,
    "creative_work_id" TEXT NOT NULL,
    "discussion_forum_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "discussions_forums_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discussions_forums_posts_reply_to_discussion_forum_post_Id_key" ON "discussions_forums_posts"("reply_to_discussion_forum_post_Id");

-- CreateIndex
CREATE UNIQUE INDEX "discussions_forums_posts_creative_work_id_key" ON "discussions_forums_posts"("creative_work_id");

-- AddForeignKey
ALTER TABLE "discussions_forums_posts" ADD CONSTRAINT "discussions_forums_posts_reply_to_discussion_forum_post_Id_fkey" FOREIGN KEY ("reply_to_discussion_forum_post_Id") REFERENCES "discussions_forums_posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discussions_forums_posts" ADD CONSTRAINT "discussions_forums_posts_creative_work_id_fkey" FOREIGN KEY ("creative_work_id") REFERENCES "creative_works"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussions_forums_posts" ADD CONSTRAINT "discussions_forums_posts_discussion_forum_id_fkey" FOREIGN KEY ("discussion_forum_id") REFERENCES "discussion_forums"("id") ON DELETE CASCADE ON UPDATE CASCADE;
