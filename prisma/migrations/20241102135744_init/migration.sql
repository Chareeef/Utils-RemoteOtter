/*
  Warnings:

  - A unique constraint covering the columns `[remotive_url]` on the table `jobs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "remotive_url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "jobs_remotive_url_key" ON "jobs"("remotive_url");
