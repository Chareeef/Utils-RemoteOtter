/*
  Warnings:

  - You are about to drop the column `isOpen` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "isOpen",
ADD COLUMN     "is_open" BOOLEAN NOT NULL DEFAULT true;
