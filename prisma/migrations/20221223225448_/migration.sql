/*
  Warnings:

  - You are about to drop the column `created_at` on the `blog_posts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `discussion_forums` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `discussions_forums_posts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `ratings_for_creative_works` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blog_posts" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "discussion_forums" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "discussions_forums_posts" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "ratings_for_creative_works" DROP COLUMN "created_at";

-- CreateIndex
CREATE INDEX "accounts_created_at_idx" ON "accounts"("created_at" DESC);

-- CreateIndex
CREATE INDEX "creative_works_created_at_idx" ON "creative_works"("created_at" DESC);

-- CreateIndex
CREATE INDEX "sessions_created_at_idx" ON "sessions"("created_at" DESC);

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at" DESC);

-- CreateIndex
CREATE INDEX "users_profiles_created_at_idx" ON "users_profiles"("created_at" DESC);
