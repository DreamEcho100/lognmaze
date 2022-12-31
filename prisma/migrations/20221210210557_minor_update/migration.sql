/*
  Warnings:

  - You are about to drop the `discussionForumPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "discussionForumPosts" DROP CONSTRAINT "discussionForumPosts_creative_work_id_fkey";

-- DropForeignKey
ALTER TABLE "discussionForumPosts" DROP CONSTRAINT "discussionForumPosts_discussion_forum_id_fkey";

-- DropForeignKey
ALTER TABLE "discussionForumPosts" DROP CONSTRAINT "discussionForumPosts_reply_to_discussion_forum_post_Id_fkey";

-- DropTable
DROP TABLE "discussionForumPosts";

-- CreateTable
CREATE TABLE "discussion_forum_posts" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "replies_count" INTEGER NOT NULL DEFAULT 0,
    "reply_to_discussion_forum_post_Id" TEXT,
    "creative_work_id" TEXT NOT NULL,
    "discussion_forum_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "discussion_forum_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discussion_forum_posts_reply_to_discussion_forum_post_Id_key" ON "discussion_forum_posts"("reply_to_discussion_forum_post_Id");

-- CreateIndex
CREATE UNIQUE INDEX "discussion_forum_posts_creative_work_id_key" ON "discussion_forum_posts"("creative_work_id");

-- AddForeignKey
ALTER TABLE "discussion_forum_posts" ADD CONSTRAINT "discussion_forum_posts_reply_to_discussion_forum_post_Id_fkey" FOREIGN KEY ("reply_to_discussion_forum_post_Id") REFERENCES "discussion_forum_posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "discussion_forum_posts" ADD CONSTRAINT "discussion_forum_posts_creative_work_id_fkey" FOREIGN KEY ("creative_work_id") REFERENCES "creative_works"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_forum_posts" ADD CONSTRAINT "discussion_forum_posts_discussion_forum_id_fkey" FOREIGN KEY ("discussion_forum_id") REFERENCES "discussion_forums"("id") ON DELETE CASCADE ON UPDATE CASCADE;
