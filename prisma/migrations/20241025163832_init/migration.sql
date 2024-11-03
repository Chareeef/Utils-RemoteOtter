/*
  Warnings:

  - The primary key for the `jobs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[apply_url]` on the table `jobs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "jobs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "jobs_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "jobs_apply_url_key" ON "jobs"("apply_url");
