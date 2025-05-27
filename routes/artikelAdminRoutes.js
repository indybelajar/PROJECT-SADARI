import express from "express";
import multer from "multer";
import { tambahArtikel, getAllArtikel, editArtikel, hapusArtikel } from "../controllers/artikelAdminController.js";
import { verifyToken, isAdmin } from "../middlewaree/authMiddleware.js";

const router = express.Router();

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Hanya admin yang boleh menambahkan artikel
router.post(
  '/',
  verifyToken,
  isAdmin,
  upload.single('file'),
  tambahArtikel
);

// Semua orang bisa lihat artikel
router.get('/', getAllArtikel);

// Hanya admin bisa edit dan hapus
router.put('/:id', verifyToken, isAdmin, editArtikel);
router.delete('/:id', verifyToken, isAdmin, hapusArtikel);

export default router;
