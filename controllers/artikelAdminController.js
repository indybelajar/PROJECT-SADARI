import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fungsi untuk menambahkan artikel
const tambahArtikel = async (req, res) => {
  try {
    console.log("--- Upload Artikel Request ---");
    console.log("File Path:", req.file ? req.file.path : 'No file path');

    if (!req.file) {
      return res.status(400).json({ message: "File artikel harus di-upload" });
    }

    const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
      folder: 'artikels',
      resource_type: 'auto',
    });

    console.log("Cloudinary Upload Result:", uploadedFile);

    const file = uploadedFile.secure_url;
    const { judul, konten } = req.body;

    if (!judul || !konten) {
      return res.status(400).json({ message: "Judul dan konten artikel harus diisi" });
    }

    // Simpan artikel ke database menggunakan Prisma
    const savedArtikel = await prisma.artikel.create({
      data: {
        judul,
        konten,
        file,
      },
    });

    res.status(201).json(savedArtikel);
  } catch (err) {
    console.error("--- Upload Artikel Error ---");
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Fungsi untuk mendapatkan semua artikel
const getAllArtikel = async (req, res) => {
  try {
    const artikels = await prisma.artikel.findMany();
    res.status(200).json(artikels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk memperbarui artikel
const editArtikel = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, konten } = req.body;

    const updatedArtikel = await prisma.artikel.update({
      where: { id: (id) },
      data: { judul, konten },
    });

    res.status(200).json(updatedArtikel);
  } catch (error) {
    if (error.code === 'P2025') {
      // Prisma error kalau data tidak ditemukan
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menghapus artikel
const hapusArtikel = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.artikel.delete({
      where: { id: (id) },
    });

    res.status(200).json({ message: "Artikel berhasil dihapus" });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }
    res.status(500).json({ message: error.message });
  }
};

export { tambahArtikel, getAllArtikel, editArtikel, hapusArtikel };
