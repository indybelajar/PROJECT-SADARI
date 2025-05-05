import ArtikelAdmin from "../models/artikelAdminModel.js";
import { v2 as cloudinary } from "cloudinary";

// Fungsi untuk menambahkan artikel
const tambahArtikel = async (req, res) => {
  try {
    // Log untuk memastikan file diterima dengan benar
    console.log("--- Upload Artikel Request ---");
    console.log("Cloud Name (Function):", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API Key (Function):", process.env.CLOUDINARY_API_KEY);
    console.log("API Secret (Function):", process.env.CLOUDINARY_API_SECRET);
    console.log("File Path:", req.file ? req.file.path : 'No file path');

    // Pastikan file di-upload
    if (!req.file) {
      return res.status(400).json({ message: "File artikel harus di-upload" });
    }

    // Konfigurasi Cloudinary di dalam fungsi
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("Cloudinary Config:", cloudinary.config());  // Log konfigurasi setelah diatur

    // Upload file ke Cloudinary
    const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
      folder: 'artikels',  // Folder di Cloudinary
      resource_type: 'auto',  // Cloudinary mendeteksi tipe file otomatis
    });

    console.log("Cloudinary Upload Result:", uploadedFile); // Log hasil upload dari Cloudinary

    const file = uploadedFile.secure_url;

    const { judul, konten } = req.body;

    // Pastikan judul dan konten ada
    if (!judul || !konten) {
      return res.status(400).json({ message: "Judul dan konten artikel harus diisi" });
    }

    // Buat artikel baru dengan data yang diterima
    const artikel = new ArtikelAdmin({
      judul,
      konten,
      file,
    });

    // Simpan artikel ke database
    const savedArtikel = await artikel.save();

    res.status(201).json(savedArtikel);
  } catch (err) {
    console.error("--- Upload Artikel Error ---");
    console.error("Error saat upload:", err);
    res.status(500).json({ message: err.message });
  }
};

// Fungsi untuk mendapatkan semua artikel
const getAllArtikel = async (req, res) => {
  try {
    const artikels = await ArtikelAdmin.find();
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

    const updatedArtikel = await ArtikelAdmin.findByIdAndUpdate(
      id,
      { judul, konten },
      { new: true }
    );

    if (!updatedArtikel) return res.status(404).json({ message: "Artikel tidak ditemukan" });

    res.status(200).json(updatedArtikel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menghapus artikel
const hapusArtikel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArtikel = await ArtikelAdmin.findByIdAndDelete(id);

    if (!deletedArtikel) return res.status(404).json({ message: "Artikel tidak ditemukan" });

    res.status(200).json({ message: "Artikel berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { tambahArtikel, getAllArtikel, editArtikel, hapusArtikel };
