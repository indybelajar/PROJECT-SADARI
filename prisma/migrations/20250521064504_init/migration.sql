-- CreateEnum
CREATE TYPE "KemerahanEnum" AS ENUM ('Tidak_ada_kemerahan', 'Terdapat_kemerahan');

-- CreateEnum
CREATE TYPE "BenjolanEnum" AS ENUM ('Tidak_ada_benjolan', 'Terdapat_benjolan');

-- CreateEnum
CREATE TYPE "CairanEnum" AS ENUM ('Tidak_ada_cairan', 'Cairan_ASI', 'Darah', 'Cairan_Lainnya');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artikel" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT,
    "file" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artikel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CekSadari" (
    "id" TEXT NOT NULL,
    "kemerahan" "KemerahanEnum" NOT NULL,
    "benjolan" "BenjolanEnum" NOT NULL,
    "cairan" "CairanEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CekSadari_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
