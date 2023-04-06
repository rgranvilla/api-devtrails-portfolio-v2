-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'creator', 'subscriber');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'subscriber';
