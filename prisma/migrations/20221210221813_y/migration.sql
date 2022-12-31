/*
  Warnings:

  - The `type` column on the `languages_tags` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "LanguageTagType" AS ENUM ('IETF_BCP_47_STANDARD');

-- AlterTable
ALTER TABLE "languages_tags" DROP COLUMN "type",
ADD COLUMN     "type" "LanguageTagType" NOT NULL DEFAULT 'IETF_BCP_47_STANDARD';

-- DropEnum
DROP TYPE "LanguagesTagType";
