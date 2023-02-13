/*
  Warnings:

  - You are about to drop the column `slug` on the `gyms` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "gyms_slug_key";

-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "slug";
