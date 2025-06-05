/*
  Warnings:

  - The values [Tidak_ada_benjolan,Terdapat_benjolan] on the enum `BenjolanEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Tidak_ada_cairan,Cairan_ASI,Darah,Cairan_Lainnya] on the enum `CairanEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [Tidak_ada_kemerahan,Terdapat_kemerahan] on the enum `KemerahanEnum` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[userId,tanggal]` on the table `CekSadari` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tanggal` to the `CekSadari` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tingkatKeparahan` to the `CekSadari` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CekSadari` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `CekSadari` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TingkatKeparahanEnum" AS ENUM ('rendah', 'sedang', 'tinggi');

-- AlterEnum
BEGIN;
CREATE TYPE "BenjolanEnum_new" AS ENUM ('ringan', 'sedang', 'parah');
ALTER TABLE "CekSadari" ALTER COLUMN "benjolan" TYPE "BenjolanEnum_new" USING ("benjolan"::text::"BenjolanEnum_new");
ALTER TYPE "BenjolanEnum" RENAME TO "BenjolanEnum_old";
ALTER TYPE "BenjolanEnum_new" RENAME TO "BenjolanEnum";
DROP TYPE "BenjolanEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "CairanEnum_new" AS ENUM ('ringan', 'sedang', 'parah');
ALTER TABLE "CekSadari" ALTER COLUMN "cairan" TYPE "CairanEnum_new" USING ("cairan"::text::"CairanEnum_new");
ALTER TYPE "CairanEnum" RENAME TO "CairanEnum_old";
ALTER TYPE "CairanEnum_new" RENAME TO "CairanEnum";
DROP TYPE "CairanEnum_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "KemerahanEnum_new" AS ENUM ('ringan', 'sedang', 'parah');
ALTER TABLE "CekSadari" ALTER COLUMN "kemerahan" TYPE "KemerahanEnum_new" USING ("kemerahan"::text::"KemerahanEnum_new");
ALTER TYPE "KemerahanEnum" RENAME TO "KemerahanEnum_old";
ALTER TYPE "KemerahanEnum_new" RENAME TO "KemerahanEnum";
DROP TYPE "KemerahanEnum_old";
COMMIT;

-- AlterTable
ALTER TABLE "CekSadari" ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tingkatKeparahan" "TingkatKeparahanEnum" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CekSadari_userId_tanggal_key" ON "CekSadari"("userId", "tanggal");

-- AddForeignKey
ALTER TABLE "CekSadari" ADD CONSTRAINT "CekSadari_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
