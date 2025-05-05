import express from "express";
import multer from "multer";
import { tambahArtikel, getAllArtikel, editArtikel, hapusArtikel} from "../controllers/artikelAdminController.js";

const router = express.Router();

// Konfigurasi multer untuk menyimpan file di folder 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Menyimpan file di folder 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Menyimpan file dengan nama unik
  }
});

// Menggunakan multer dengan konfigurasi di atas
const upload = multer({ storage });

// Rute untuk membuat artikel
router.post('/', upload.single('file'), tambahArtikel);
router.get('/', getAllArtikel);
router.put('/:id', editArtikel);
router.delete('/:id', hapusArtikel);

export default router;
