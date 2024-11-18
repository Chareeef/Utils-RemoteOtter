/*
  Warnings:

  - Made the column `email_hash` on table `subscriptions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "email_hash" SET NOT NULL;
