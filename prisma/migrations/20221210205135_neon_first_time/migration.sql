-- CreateEnum

CREATE TYPE "UserGender" AS ENUM ('M', 'F');

-- CreateEnum

CREATE TYPE "CreativeWorkType" AS ENUM ('POST', 'BLOG_POST', 'DISCUSSION_FORUM', 'DISCUSSION_FORUM_POST');

-- CreateEnum

CREATE TYPE "CreativeWorkStatus" AS ENUM ('PUBLIC', 'PRIVATE', 'DELETED');

-- CreateEnum

CREATE TYPE "LanguageTagType" AS ENUM ('IETF_BCP_47_STANDARD');

-- CreateTable

CREATE TABLE "accounts" ( "id" TEXT NOT NULL,
																										"user_id" TEXT NOT NULL,
																										"type" TEXT NOT NULL,
																										"provider" TEXT NOT NULL,
																										"provider_account_id" TEXT NOT NULL,
																										"refresh_token" TEXT, "access_token" TEXT, "expires_at" INTEGER, "token_type" TEXT, "scope" TEXT, "id_token" TEXT, "session_state" TEXT, "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
																										CONSTRAINT "accounts_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "sessions" ( "id" TEXT NOT NULL,
																										"session_token" TEXT NOT NULL,
																										"user_id" TEXT NOT NULL,
																										"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
																										"expires" TIMESTAMP(3) NOT NULL,
																										CONSTRAINT "sessions_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "users" ( "id" TEXT NOT NULL,
																							"name" TEXT, "email" TEXT, "email_verified" TIMESTAMP(3),
																							"image" TEXT, "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
																							CONSTRAINT "users_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "users_profiles" ( "id" TEXT NOT NULL,
																																"user_id" TEXT NOT NULL,
																																"first_name" TEXT NOT NULL,
																																"last_name" TEXT NOT NULL,
																																"gender" "UserGender" NOT NULL DEFAULT 'M',
																																"bio" TEXT, "work" TEXT NOT NULL,
																																"education" TEXT NOT NULL,
																																"profile_picture" TEXT, "cover_photo" TEXT, "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
																																"updated_at" TIMESTAMP(3),
																																CONSTRAINT "users_profiles_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "users_basic_statistics" ( "id" TEXT NOT NULL,
																																								"user_id" TEXT NOT NULL,
																																								"posts_count" INTEGER NOT NULL DEFAULT 0,
																																								"blog_posts_count" INTEGER NOT NULL DEFAULT 0,
																																								"discussion_forums_count" INTEGER NOT NULL DEFAULT 0,
																																								"discussion_forum_posts_count" INTEGER NOT NULL DEFAULT 0,
																																								CONSTRAINT "users_basic_statistics_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "verification_tokens" ( "identifier" TEXT NOT NULL,
																																					"token" TEXT NOT NULL,
																																					"expires" TIMESTAMP(3) NOT NULL);

-- CreateTable

CREATE TABLE "language_tags" ( "id" TEXT NOT NULL,
																															"code" TEXT NOT NULL,
																															"name" TEXT NOT NULL,
																															"country_code" TEXT NOT NULL,
																															"region" TEXT NOT NULL,
																															"description" TEXT, "type" "LanguageTagType" NOT NULL DEFAULT 'IETF_BCP_47_STANDARD',
																															CONSTRAINT "language_tags_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "Tags" ( "name" TEXT NOT NULL,
																						CONSTRAINT "tags_pkey" PRIMARY KEY ("name"));

-- CreateTable

CREATE TABLE "tags_basic_statistics" ( "id" TEXT NOT NULL,
																																							"tag_name" TEXT NOT NULL,
																																							"posts_count" INTEGER NOT NULL DEFAULT 0,
																																							"blog_posts_count" INTEGER NOT NULL DEFAULT 0,
																																							"discussion_forums_count" INTEGER NOT NULL DEFAULT 0,
																																							"discussion_forum_posts_count" INTEGER NOT NULL DEFAULT 0,
																																							CONSTRAINT "tags_basic_statistics_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "creative_works" ( "id" TEXT NOT NULL,
																																"author_id" TEXT NOT NULL,
																																"status" "CreativeWorkStatus" NOT NULL DEFAULT 'PUBLIC',
																																"type" "CreativeWorkType" NOT NULL,
																																"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
																																CONSTRAINT "creative_works_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "posts" ( "id" TEXT NOT NULL,
																							"creative_work_id" TEXT NOT NULL,
																							"discussion_forum_id" TEXT NOT NULL,
																							"content" TEXT NOT NULL,
																							"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
																							"updated_at" TIMESTAMP(3),
																							CONSTRAINT "posts_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "blog_posts" ( "id" TEXT NOT NULL,
																												"creative_work_id" TEXT NOT NULL,
																												"discussion_forum_id" TEXT NOT NULL,
																												"slug" TEXT NOT NULL,
																												"title" TEXT NOT NULL,
																												"thumbnail_url" TEXT NOT NULL,
																												"description" TEXT NOT NULL,
																												"content" TEXT NOT NULL,
																												"language_tag_id" TEXT NOT NULL,
																												"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
																												"updated_at" TIMESTAMP(3),
																												CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "discussion_forums" ( "id" TEXT NOT NULL,
																																			"creative_work_id" TEXT NOT NULL,
																																			"size" INTEGER NOT NULL DEFAULT 0,
																																			"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
																																			"updated_at" TIMESTAMP(3),
																																			CONSTRAINT "discussion_forums_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "discussionForumPosts" ( "id" TEXT NOT NULL,
																																						"content" TEXT NOT NULL,
																																						"replies_count" INTEGER NOT NULL DEFAULT 0,
																																						"reply_to_discussion_forum_post_Id" TEXT, "creative_work_id" TEXT NOT NULL,
																																						"discussion_forum_id" TEXT NOT NULL,
																																						"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
																																						"updated_at" TIMESTAMP(3),
																																						CONSTRAINT "discussionForumPosts_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "ratings_for_creative_works" ( "id" TEXT NOT NULL,
																																												"total_rating" INTEGER NOT NULL DEFAULT 0,
																																												"ratings_count" INTEGER NOT NULL DEFAULT 0,
																																												"creative_work_id" TEXT NOT NULL,
																																												"created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
																																												"updated_at" TIMESTAMP(3),
																																												CONSTRAINT "ratings_for_creative_works_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "users_ratings_for_creative_works" ( "id" TEXT NOT NULL,
																																																		"creative_work_rating_id" TEXT NOT NULL,
																																																		"user_id" TEXT NOT NULL,
																																																		CONSTRAINT "users_ratings_for_creative_works_pkey" PRIMARY KEY ("id"));

-- CreateTable

CREATE TABLE "_CreativeWorkToTag" ( "A" TEXT NOT NULL,
																																				"B" TEXT NOT NULL);

-- CreateIndex

CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider",
																																																																															"provider_account_id");

-- CreateIndex

CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex

CREATE UNIQUE INDEX "users_profiles_user_id_key" ON "users_profiles"("user_id");

-- CreateIndex

CREATE UNIQUE INDEX "users_basic_statistics_user_id_key" ON "users_basic_statistics"("user_id");

-- CreateIndex

CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex

CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier",
																																																																																									"token");

-- CreateIndex

CREATE UNIQUE INDEX "language_tags_code_key" ON "language_tags"("code");

-- CreateIndex

CREATE UNIQUE INDEX "language_tags_code_country_code_key" ON "language_tags"("code",
																																																																														"country_code");

-- CreateIndex

CREATE UNIQUE INDEX "tags_name_key" ON "Tags"("name");

-- CreateIndex

CREATE UNIQUE INDEX "tags_basic_statistics_tag_name_key" ON "tags_basic_statistics"("tag_name");

-- CreateIndex

CREATE UNIQUE INDEX "posts_creative_work_id_key" ON "posts"("creative_work_id");

-- CreateIndex

CREATE UNIQUE INDEX "posts_discussion_forum_id_key" ON "posts"("discussion_forum_id");

-- CreateIndex

CREATE UNIQUE INDEX "blog_posts_creative_work_id_key" ON "blog_posts"("creative_work_id");

-- CreateIndex

CREATE UNIQUE INDEX "blog_posts_discussion_forum_id_key" ON "blog_posts"("discussion_forum_id");

-- CreateIndex

CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex

CREATE UNIQUE INDEX "discussion_forums_creative_work_id_key" ON "discussion_forums"("creative_work_id");

-- CreateIndex

CREATE UNIQUE INDEX "discussionForumPosts_reply_to_discussion_forum_post_Id_key" ON "discussionForumPosts"("reply_to_discussion_forum_post_Id");

-- CreateIndex

CREATE UNIQUE INDEX "discussionForumPosts_creative_work_id_key" ON "discussionForumPosts"("creative_work_id");

-- CreateIndex

CREATE UNIQUE INDEX "_CreativeWorkToTag_AB_unique" ON "_CreativeWorkToTag"("A",
																																																																												"B");

-- CreateIndex

CREATE INDEX "_CreativeWorkToTag_B_index" ON "_CreativeWorkToTag"("B");

-- AddForeignKey

ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "users_profiles" ADD CONSTRAINT "users_profiles_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "users_basic_statistics" ADD CONSTRAINT "users_basic_statistics_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "tags_basic_statistics" ADD CONSTRAINT "tags_basic_statistics_tag_name_fkey"
FOREIGN KEY ("tag_name") REFERENCES "Tags"("name") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "creative_works" ADD CONSTRAINT "creative_works_author_id_fkey"
FOREIGN KEY ("author_id") REFERENCES "users"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "posts" ADD CONSTRAINT "posts_creative_work_id_fkey"
FOREIGN KEY ("creative_work_id") REFERENCES "creative_works"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "posts" ADD CONSTRAINT "posts_discussion_forum_id_fkey"
FOREIGN KEY ("discussion_forum_id") REFERENCES "discussion_forums"("creative_work_id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_creative_work_id_fkey"
FOREIGN KEY ("creative_work_id") REFERENCES "creative_works"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_discussion_forum_id_fkey"
FOREIGN KEY ("discussion_forum_id") REFERENCES "discussion_forums"("creative_work_id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_language_tag_id_fkey"
FOREIGN KEY ("language_tag_id") REFERENCES "language_tags"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "discussion_forums" ADD CONSTRAINT "discussion_forums_creative_work_id_fkey"
FOREIGN KEY ("creative_work_id") REFERENCES "creative_works"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "discussionForumPosts" ADD CONSTRAINT "discussionForumPosts_reply_to_discussion_forum_post_Id_fkey"
FOREIGN KEY ("reply_to_discussion_forum_post_Id") REFERENCES "discussionForumPosts"("id") ON
DELETE NO ACTION ON
UPDATE NO ACTION;

-- AddForeignKey

ALTER TABLE "discussionForumPosts" ADD CONSTRAINT "discussionForumPosts_creative_work_id_fkey"
FOREIGN KEY ("creative_work_id") REFERENCES "creative_works"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "discussionForumPosts" ADD CONSTRAINT "discussionForumPosts_discussion_forum_id_fkey"
FOREIGN KEY ("discussion_forum_id") REFERENCES "discussion_forums"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "ratings_for_creative_works" ADD CONSTRAINT "ratings_for_creative_works_creative_work_id_fkey"
FOREIGN KEY ("creative_work_id") REFERENCES "creative_works"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "users_ratings_for_creative_works" ADD CONSTRAINT "users_ratings_for_creative_works_creative_work_rating_id_fkey"
FOREIGN KEY ("creative_work_rating_id") REFERENCES "ratings_for_creative_works"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "users_ratings_for_creative_works" ADD CONSTRAINT "users_ratings_for_creative_works_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "_CreativeWorkToTag" ADD CONSTRAINT "_CreativeWorkToTag_A_fkey"
FOREIGN KEY ("A") REFERENCES "creative_works"("id") ON
DELETE CASCADE ON
UPDATE CASCADE;

-- AddForeignKey

ALTER TABLE "_CreativeWorkToTag" ADD CONSTRAINT "_CreativeWorkToTag_B_fkey"
FOREIGN KEY ("B") REFERENCES "Tags"("name") ON
DELETE CASCADE ON
UPDATE CASCADE;

