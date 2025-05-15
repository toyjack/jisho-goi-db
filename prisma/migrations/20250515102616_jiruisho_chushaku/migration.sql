/*
  Warnings:

  - A unique constraint covering the columns `[jiruisho_id]` on the table `JiruishoChushaku` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jiruisho_id` to the `JiruishoChushaku` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `JiruishoChushaku` ADD COLUMN `jiruisho_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `JiruishoChushaku_jiruisho_id_key` ON `JiruishoChushaku`(`jiruisho_id`);
