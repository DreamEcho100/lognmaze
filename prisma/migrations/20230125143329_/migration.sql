-- CreateTable
CREATE TABLE "users_stats" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "posts_count" INTEGER NOT NULL DEFAULT 0,
    "blog_posts_count" INTEGER NOT NULL DEFAULT 0,
    "discussion_forums_count" INTEGER NOT NULL DEFAULT 0,
    "discussion_forum_posts_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags_stats" (
    "id" TEXT NOT NULL,
    "tag_name" TEXT NOT NULL,
    "posts_count" INTEGER NOT NULL DEFAULT 0,
    "blog_posts_count" INTEGER NOT NULL DEFAULT 0,
    "discussion_forums_count" INTEGER NOT NULL DEFAULT 0,
    "discussion_forum_posts_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tags_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_stats_user_id_key" ON "users_stats"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_stats_tag_name_key" ON "tags_stats"("tag_name");

-- AddForeignKey
ALTER TABLE "users_stats" ADD CONSTRAINT "users_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_stats" ADD CONSTRAINT "tags_stats_tag_name_fkey" FOREIGN KEY ("tag_name") REFERENCES "tags"("name") ON DELETE CASCADE ON UPDATE CASCADE;
