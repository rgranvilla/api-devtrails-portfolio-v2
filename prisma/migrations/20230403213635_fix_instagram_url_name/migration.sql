/*
  Warnings:

  - You are about to drop the column `instagran_url` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "instagran_url",
ADD COLUMN     "instagram_url" TEXT;
