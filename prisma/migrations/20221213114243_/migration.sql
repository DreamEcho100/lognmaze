/*
  Warnings:

  - You are about to drop the `education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `work` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users_profiles" DROP CONSTRAINT "users_profiles_education_fkey";

-- DropForeignKey
ALTER TABLE "users_profiles" DROP CONSTRAINT "users_profiles_gender_fkey";

-- DropForeignKey
ALTER TABLE "users_profiles" DROP CONSTRAINT "users_profiles_work_fkey";

-- DropTable
DROP TABLE "education";

-- DropTable
DROP TABLE "gender";

-- DropTable
DROP TABLE "work";

-- CreateTable
CREATE TABLE "works" (
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "works_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "educations" (
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "genders" (
    "name" "UserGender" NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "genders_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "users_profiles" ADD CONSTRAINT "users_profiles_gender_fkey" FOREIGN KEY ("gender") REFERENCES "genders"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_profiles" ADD CONSTRAINT "users_profiles_work_fkey" FOREIGN KEY ("work") REFERENCES "works"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_profiles" ADD CONSTRAINT "users_profiles_education_fkey" FOREIGN KEY ("education") REFERENCES "educations"("name") ON DELETE CASCADE ON UPDATE CASCADE;
