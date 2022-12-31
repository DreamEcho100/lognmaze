/*
  Warnings:

  - You are about to drop the column `profile_id` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'AUTHOR', 'ADMIN');

-- DropIndex
DROP INDEX "users_profile_id_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profile_id",
ADD COLUMN     "role" "Role";
