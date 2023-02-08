/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blog_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `creative_works` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `discussion_forums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `discussions_forums_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `educations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `genders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `languages_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ratings_for_creative_works` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags_stats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_ratings_for_creative_works` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_stats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `works` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CreativeWorkToTag" DROP CONSTRAINT "_CreativeWorkToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_CreativeWorkToTag" DROP CONSTRAINT "_CreativeWorkToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "blog_posts" DROP CONSTRAINT "blog_posts_creative_work_id_fkey";

-- DropForeignKey
ALTER TABLE "blog_posts" DROP CONSTRAINT "blog_posts_discussion_forum_id_fkey";

-- DropForeignKey
ALTER TABLE "blog_posts" DROP CONSTRAINT "blog_posts_language_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "creative_works" DROP CONSTRAINT "creative_works_author_id_fkey";

-- DropForeignKey
ALTER TABLE "discussion_forums" DROP CONSTRAINT "discussion_forums_creative_work_id_fkey";

-- DropForeignKey
ALTER TABLE "discussions_forums_posts" DROP CONSTRAINT "discussions_forums_posts_creative_work_id_fkey";

-- DropForeignKey
ALTER TABLE "discussions_forums_posts" DROP CONSTRAINT "discussions_forums_posts_discussion_forum_id_fkey";

-- DropForeignKey
ALTER TABLE "discussions_forums_posts" DROP CONSTRAINT "discussions_forums_posts_reply_to_discussion_forum_post_Id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_creative_work_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_discussion_forum_id_fkey";

-- DropForeignKey
ALTER TABLE "ratings_for_creative_works" DROP CONSTRAINT "ratings_for_creative_works_creative_work_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tags_stats" DROP CONSTRAINT "tags_stats_tag_name_fkey";

-- DropForeignKey
ALTER TABLE "users_profiles" DROP CONSTRAINT "users_profiles_education_fkey";

-- DropForeignKey
ALTER TABLE "users_profiles" DROP CONSTRAINT "users_profiles_gender_fkey";

-- DropForeignKey
ALTER TABLE "users_profiles" DROP CONSTRAINT "users_profiles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users_profiles" DROP CONSTRAINT "users_profiles_work_fkey";

-- DropForeignKey
ALTER TABLE "users_ratings_for_creative_works" DROP CONSTRAINT "users_ratings_for_creative_works_creative_work_rating_id_fkey";

-- DropForeignKey
ALTER TABLE "users_ratings_for_creative_works" DROP CONSTRAINT "users_ratings_for_creative_works_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users_stats" DROP CONSTRAINT "users_stats_user_id_fkey";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "blog_posts";

-- DropTable
DROP TABLE "creative_works";

-- DropTable
DROP TABLE "discussion_forums";

-- DropTable
DROP TABLE "discussions_forums_posts";

-- DropTable
DROP TABLE "educations";

-- DropTable
DROP TABLE "genders";

-- DropTable
DROP TABLE "languages_tags";

-- DropTable
DROP TABLE "posts";

-- DropTable
DROP TABLE "ratings_for_creative_works";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "tags";

-- DropTable
DROP TABLE "tags_stats";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "users_profiles";

-- DropTable
DROP TABLE "users_ratings_for_creative_works";

-- DropTable
DROP TABLE "users_stats";

-- DropTable
DROP TABLE "verification_tokens";

-- DropTable
DROP TABLE "works";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "role" "Role",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "UserGender" NOT NULL DEFAULT 'M',
    "bio" TEXT,
    "work" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "profilePicture" TEXT,
    "coverPhoto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Gender" (
    "name" "UserGender" NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Work" (
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "LanguageTag" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "description" TEXT,
    "type" "LanguageTagType" NOT NULL DEFAULT 'IETF_BCP_47_STANDARD',

    CONSTRAINT "LanguageTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postsCount" INTEGER NOT NULL DEFAULT 0,
    "blogPostsCount" INTEGER NOT NULL DEFAULT 0,
    "discussionForumsCount" INTEGER NOT NULL DEFAULT 0,
    "discussionForumPostsCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "CreativeWork" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "status" "CreativeWorkStatus" NOT NULL DEFAULT 'PUBLIC',
    "type" "CreativeWorkType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creative_works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "TagStats" (
    "id" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,
    "postsCount" INTEGER NOT NULL DEFAULT 0,
    "blogPostsCount" INTEGER NOT NULL DEFAULT 0,
    "discussionForumsCount" INTEGER NOT NULL DEFAULT 0,
    "discussionForumPostsCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tags_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "creativeWorkId" TEXT NOT NULL,
    "discussion_forum_id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "languageTagId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscussionForum" (
    "id" TEXT NOT NULL,
    "creativeWorkId" TEXT NOT NULL,
    "size" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "discussion_forums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscussionForumPost" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "replies_count" INTEGER NOT NULL DEFAULT 0,
    "replyToId" TEXT,
    "creativeWorkId" TEXT NOT NULL,
    "discussionForumId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "discussions_forums_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "creativeWorkId" TEXT NOT NULL,
    "discussionForumId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RatingForCreativeWork" (
    "id" TEXT NOT NULL,
    "totalRating" INTEGER NOT NULL DEFAULT 0,
    "ratingsCount" INTEGER NOT NULL DEFAULT 0,
    "creativeWorkId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ratings_for_creative_works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRatingForCreativeWork" (
    "id" TEXT NOT NULL,
    "creativeWorkRatingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "users_ratings_for_creative_works_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "Account_createdAt_idx" ON "Account"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_createdAt_idx" ON "Session"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE INDEX "UserProfile_createdAt_idx" ON "UserProfile"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "LanguageTag_code_countryCode_key" ON "LanguageTag"("code", "countryCode");

-- CreateIndex
CREATE UNIQUE INDEX "users_stats_user_id_key" ON "UserStats"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "creative_works_created_at_idx" ON "CreativeWork"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_stats_tag_name_key" ON "TagStats"("tagName");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_creative_work_id_key" ON "BlogPost"("creativeWorkId");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_discussion_forum_id_key" ON "BlogPost"("discussion_forum_id");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "discussion_forums_creative_work_id_key" ON "DiscussionForum"("creativeWorkId");

-- CreateIndex
CREATE UNIQUE INDEX "discussions_forums_posts_reply_to_discussion_forum_post_Id_key" ON "DiscussionForumPost"("replyToId");

-- CreateIndex
CREATE UNIQUE INDEX "discussions_forums_posts_creative_work_id_key" ON "DiscussionForumPost"("creativeWorkId");

-- CreateIndex
CREATE UNIQUE INDEX "posts_creative_work_id_key" ON "Post"("creativeWorkId");

-- CreateIndex
CREATE UNIQUE INDEX "posts_discussion_forum_id_key" ON "Post"("discussionForumId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_education_fkey" FOREIGN KEY ("education") REFERENCES "Education"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_gender_fkey" FOREIGN KEY ("gender") REFERENCES "Gender"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_work_fkey" FOREIGN KEY ("work") REFERENCES "Work"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "users_stats_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreativeWork" ADD CONSTRAINT "creative_works_author_id_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagStats" ADD CONSTRAINT "tags_stats_tag_name_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "blog_posts_creative_work_id_fkey" FOREIGN KEY ("creativeWorkId") REFERENCES "CreativeWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "blog_posts_discussion_forum_id_fkey" FOREIGN KEY ("discussion_forum_id") REFERENCES "DiscussionForum"("creativeWorkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "blog_posts_language_tag_id_fkey" FOREIGN KEY ("languageTagId") REFERENCES "LanguageTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionForum" ADD CONSTRAINT "discussion_forums_creative_work_id_fkey" FOREIGN KEY ("creativeWorkId") REFERENCES "CreativeWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionForumPost" ADD CONSTRAINT "discussions_forums_posts_creative_work_id_fkey" FOREIGN KEY ("creativeWorkId") REFERENCES "CreativeWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionForumPost" ADD CONSTRAINT "discussions_forums_posts_discussion_forum_id_fkey" FOREIGN KEY ("discussionForumId") REFERENCES "DiscussionForum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionForumPost" ADD CONSTRAINT "discussions_forums_posts_reply_to_discussion_forum_post_Id_fkey" FOREIGN KEY ("replyToId") REFERENCES "DiscussionForumPost"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "posts_creative_work_id_fkey" FOREIGN KEY ("creativeWorkId") REFERENCES "CreativeWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "posts_discussion_forum_id_fkey" FOREIGN KEY ("discussionForumId") REFERENCES "DiscussionForum"("creativeWorkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingForCreativeWork" ADD CONSTRAINT "ratings_for_creative_works_creative_work_id_fkey" FOREIGN KEY ("creativeWorkId") REFERENCES "CreativeWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRatingForCreativeWork" ADD CONSTRAINT "users_ratings_for_creative_works_creative_work_rating_id_fkey" FOREIGN KEY ("creativeWorkRatingId") REFERENCES "RatingForCreativeWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRatingForCreativeWork" ADD CONSTRAINT "users_ratings_for_creative_works_user_id_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreativeWorkToTag" ADD CONSTRAINT "_CreativeWorkToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "CreativeWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreativeWorkToTag" ADD CONSTRAINT "_CreativeWorkToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("name") ON DELETE CASCADE ON UPDATE CASCADE;
