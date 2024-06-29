-- CreateEnum
CREATE TYPE "UserAccountStatus" AS ENUM ('Activate', 'deactivate');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "UserAccountStatus" DEFAULT 'Activate';
