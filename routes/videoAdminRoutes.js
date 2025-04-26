import express from "express";
import multer from "multer";
import { uploadVideo, getVideos, updateVideo, deleteVideo } from "../controllers/videoAdminController.js";

const router = express.Router();

// Konfigurasi multer untuk menyimpan video di folder 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Menyimpan video di folder 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Menyimpan file dengan nama unik
  }
});

// Menggunakan multer dengan konfigurasi di atas
const upload = multer({ storage });

// Rute untuk upload video
router.post('/upload', upload.single('video'), uploadVideo);
router.get('/videos', getVideos);
router.put('/videos/:id', updateVideo);
router.delete('/videos/:id', deleteVideo);

export default router;
