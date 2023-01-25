/*
  Warnings:

  - You are about to drop the `tags_basic_statistics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_basic_statistics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tags_basic_statistics" DROP CONSTRAINT "tags_basic_statistics_tag_name_fkey";

-- DropForeignKey
ALTER TABLE "users_basic_statistics" DROP CONSTRAINT "users_basic_statistics_user_id_fkey";

-- DropTable
DROP TABLE "tags_basic_statistics";

-- DropTable
DROP TABLE "users_basic_statistics";
