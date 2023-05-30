-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "UserGender" AS ENUM('M', 'F');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "CreativeWorkType" AS ENUM('POST', 'BLOG_POST', 'DISCUSSION_FORUM', 'DISCUSSION_FORUM_POST');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "CreativeWorkStatus" AS ENUM('PUBLIC', 'PRIVATE', 'DELETED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "LanguageTagType" AS ENUM('IETF_BCP_47_STANDARD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "Role" AS ENUM('USER', 'AUTHOR', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "Tag" (
	"name" text PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "VerificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "CreativeWork" (
	"id" text PRIMARY KEY NOT NULL,
	"authorId" text NOT NULL,
	"status" CreativeWorkStatus DEFAULT 'PUBLIC' NOT NULL,
	"type" CreativeWorkType NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "TagStats" (
	"id" text PRIMARY KEY NOT NULL,
	"tagName" text NOT NULL,
	"postsCount" integer DEFAULT 0 NOT NULL,
	"blogPostsCount" integer DEFAULT 0 NOT NULL,
	"discussionForumsCount" integer DEFAULT 0 NOT NULL,
	"discussionForumPostsCount" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "Education" (
	"name" text PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "BlogPost" (
	"id" text PRIMARY KEY NOT NULL,
	"creativeWorkId" text NOT NULL,
	"discussionForumId" text NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"thumbnailUrl" text NOT NULL,
	"description" text NOT NULL,
	"content" text NOT NULL,
	"languageTagId" text NOT NULL,
	"updatedAt" timestamp(3)
);

CREATE TABLE IF NOT EXISTS "User" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text,
	"emailVerified" timestamp(3),
	"image" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"name" text NOT NULL,
	"role" Role
);

CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "DiscussionForum" (
	"id" text PRIMARY KEY NOT NULL,
	"creativeWorkId" text NOT NULL,
	"size" integer DEFAULT 0 NOT NULL,
	"updatedAt" timestamp(3)
);

CREATE TABLE IF NOT EXISTS "_CreativeWorkToTag" (
	"A" text NOT NULL,
	"B" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "Gender" (
	"name" UserGender PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "LanguageTag" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"countryCode" text NOT NULL,
	"region" text NOT NULL,
	"description" text,
	"type" LanguageTagType DEFAULT 'IETF_BCP_47_STANDARD' NOT NULL
);

CREATE TABLE IF NOT EXISTS "UserProfile" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"gender" UserGender DEFAULT 'M' NOT NULL,
	"bio" text,
	"work" text NOT NULL,
	"education" text NOT NULL,
	"profilePicture" text,
	"coverPhoto" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3)
);

CREATE TABLE IF NOT EXISTS "Session" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionToken" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"expires" timestamp(3) NOT NULL,
	"userId" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "Post" (
	"id" text PRIMARY KEY NOT NULL,
	"creativeWorkId" text NOT NULL,
	"discussionForumId" text NOT NULL,
	"content" text NOT NULL,
	"updatedAt" timestamp(3)
);

CREATE TABLE IF NOT EXISTS "RatingForCreativeWork" (
	"id" text PRIMARY KEY NOT NULL,
	"totalRating" integer DEFAULT 0 NOT NULL,
	"ratingsCount" integer DEFAULT 0 NOT NULL,
	"creativeWorkId" text NOT NULL,
	"updatedAt" timestamp(3)
);

CREATE TABLE IF NOT EXISTS "DiscussionForumPost" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"replies_count" integer DEFAULT 0 NOT NULL,
	"replyToId" text,
	"creativeWorkId" text NOT NULL,
	"discussionForumId" text NOT NULL,
	"updatedAt" timestamp(3)
);

CREATE TABLE IF NOT EXISTS "Work" (
	"name" text PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "Account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "UserStats" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"postsCount" integer DEFAULT 0 NOT NULL,
	"blogPostsCount" integer DEFAULT 0 NOT NULL,
	"discussionForumsCount" integer DEFAULT 0 NOT NULL,
	"discussionForumPostsCount" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "UserRatingForCreativeWork" (
	"id" text PRIMARY KEY NOT NULL,
	"creativeWorkRatingId" text NOT NULL,
	"userId" text NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "Tag_name_key" ON "Tag" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "VerificationToken" ("identifier","token");
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken" ("token");
CREATE INDEX IF NOT EXISTS "CreativeWork_createdAt_idx" ON "CreativeWork" ("createdAt");
CREATE UNIQUE INDEX IF NOT EXISTS "TagStats_tagName_key" ON "TagStats" ("tagName");
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_creativeWorkId_key" ON "BlogPost" ("creativeWorkId");
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_discussionForumId_key" ON "BlogPost" ("discussionForumId");
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_slug_key" ON "BlogPost" ("slug");
CREATE INDEX IF NOT EXISTS "User_createdAt_idx" ON "User" ("createdAt");
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");
CREATE UNIQUE INDEX IF NOT EXISTS "User_name_key" ON "User" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "DiscussionForum_creativeWorkId_key" ON "DiscussionForum" ("creativeWorkId");
CREATE UNIQUE INDEX IF NOT EXISTS "_CreativeWorkToTag_AB_unique" ON "_CreativeWorkToTag" ("A","B");
CREATE INDEX IF NOT EXISTS "_CreativeWorkToTag_B_index" ON "_CreativeWorkToTag" ("B");
CREATE UNIQUE INDEX IF NOT EXISTS "LanguageTag_code_countryCode_key" ON "LanguageTag" ("code","countryCode");
CREATE INDEX IF NOT EXISTS "UserProfile_createdAt_idx" ON "UserProfile" ("createdAt");
CREATE UNIQUE INDEX IF NOT EXISTS "UserProfile_userId_key" ON "UserProfile" ("userId");
CREATE INDEX IF NOT EXISTS "Session_createdAt_idx" ON "Session" ("createdAt");
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session" ("sessionToken");
CREATE UNIQUE INDEX IF NOT EXISTS "Post_creativeWorkId_key" ON "Post" ("creativeWorkId");
CREATE UNIQUE INDEX IF NOT EXISTS "Post_discussionForumId_key" ON "Post" ("discussionForumId");
CREATE UNIQUE INDEX IF NOT EXISTS "DiscussionForumPost_creativeWorkId_key" ON "DiscussionForumPost" ("creativeWorkId");
CREATE UNIQUE INDEX IF NOT EXISTS "DiscussionForumPost_replyToId_key" ON "DiscussionForumPost" ("replyToId");
CREATE INDEX IF NOT EXISTS "Account_createdAt_idx" ON "Account" ("createdAt");
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account" ("provider","providerAccountId");
CREATE UNIQUE INDEX IF NOT EXISTS "UserStats_userId_key" ON "UserStats" ("userId");
DO $$ BEGIN
 ALTER TABLE "CreativeWork" ADD CONSTRAINT "CreativeWork_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "TagStats" ADD CONSTRAINT "TagStats_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag"("name") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_creativeWorkId_fkey" FOREIGN KEY ("creativeWorkId") REFERENCES "CreativeWork"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_discussionForumId_fkey" FOREIGN KEY ("discussionForumId") REFERENCES "DiscussionForum"("creativeWorkId") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_languageTagId_fkey" FOREIGN KEY ("languageTagId") REFERENCES "LanguageTag"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "DiscussionForum" ADD CONSTRAINT "DiscussionForum_creativeWorkId_fkey" FOREIGN KEY ("creativeWorkId") REFERENCES "CreativeWork"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_CreativeWorkToTag" ADD CONSTRAINT "_CreativeWorkToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "CreativeWork"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_CreativeWorkToTag" ADD CONSTRAINT "_CreativeWorkToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("name") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_education_fkey" FOREIGN KEY ("education") REFERENCES "Education"("name") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_gender_fkey" FOREIGN KEY ("gender") REFERENCES "Gender"("name") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_work_fkey" FOREIGN KEY ("work") REFERENCES "Work"("name") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_creativeWorkId_fkey" FOREIGN KEY ("creativeWorkId") REFERENCES "CreativeWork"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_discussionForumId_fkey" FOREIGN KEY ("discussionForumId") REFERENCES "DiscussionForum"("creativeWorkId") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "RatingForCreativeWork" ADD CONSTRAINT "RatingForCreativeWork_creativeWorkId_fkey" FOREIGN KEY ("creativeWorkId") REFERENCES "CreativeWork"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "DiscussionForumPost" ADD CONSTRAINT "DiscussionForumPost_creativeWorkId_fkey" FOREIGN KEY ("creativeWorkId") REFERENCES "CreativeWork"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "DiscussionForumPost" ADD CONSTRAINT "DiscussionForumPost_discussionForumId_fkey" FOREIGN KEY ("discussionForumId") REFERENCES "DiscussionForum"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "DiscussionForumPost" ADD CONSTRAINT "DiscussionForumPost_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "DiscussionForumPost"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "UserRatingForCreativeWork" ADD CONSTRAINT "UserRatingForCreativeWork_creativeWorkRatingId_fkey" FOREIGN KEY ("creativeWorkRatingId") REFERENCES "RatingForCreativeWork"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "UserRatingForCreativeWork" ADD CONSTRAINT "UserRatingForCreativeWork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/