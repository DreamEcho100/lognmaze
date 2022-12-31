-- CreateTable
CREATE TABLE "work" (
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "work_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "education" (
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "education_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "gender" (
    "name" "UserGender" NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "gender_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "users_profiles" ADD CONSTRAINT "users_profiles_gender_fkey" FOREIGN KEY ("gender") REFERENCES "gender"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_profiles" ADD CONSTRAINT "users_profiles_work_fkey" FOREIGN KEY ("work") REFERENCES "work"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_profiles" ADD CONSTRAINT "users_profiles_education_fkey" FOREIGN KEY ("education") REFERENCES "education"("name") ON DELETE CASCADE ON UPDATE CASCADE;
