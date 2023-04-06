/*
  Warnings:

  - You are about to drop the `user-tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user-tokens" DROP CONSTRAINT "user-tokens_user_id_fkey";

-- DropTable
DROP TABLE "user-tokens";

-- CreateTable
CREATE TABLE "users-tokens" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "users-tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "proficiency" INTEGER NOT NULL DEFAULT 0,
    "skill_icon_url" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "users_skills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users-tokens_refresh_token_key" ON "users-tokens"("refresh_token");

-- AddForeignKey
ALTER TABLE "users-tokens" ADD CONSTRAINT "users-tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_skills" ADD CONSTRAINT "users_skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
