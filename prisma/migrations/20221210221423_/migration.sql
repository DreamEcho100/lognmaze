/*
  Warnings:

  - You are about to drop the `language_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LanguagesTagType" AS ENUM ('IETF_BCP_47_STANDARD');

-- DropForeignKey
ALTER TABLE "blog_posts" DROP CONSTRAINT "blog_posts_language_tag_id_fkey";

-- DropTable
DROP TABLE "language_tags";

-- DropEnum
DROP TYPE "LanguageTagType";

-- CreateTable
CREATE TABLE "languages_tags" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "description" TEXT,
    "type" "LanguagesTagType" NOT NULL DEFAULT 'IETF_BCP_47_STANDARD',

    CONSTRAINT "languages_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "languages_tags_code_country_code_key" ON "languages_tags"("code", "country_code");

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_language_tag_id_fkey" FOREIGN KEY ("language_tag_id") REFERENCES "languages_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
