import express from "express";
import {
  uploadVideo,
  getVideos,
  updateVideo,
  deleteVideo
} from "../controllers/videoAdminController.js";

import upload from "../middlewaree/uploadMiddleware.js";
import { verifyToken, isAdmin } from "../middlewaree/authMiddleware.js";

const router = express.Router();

// Upload video - hanya admin
router.post(
  '/',
  verifyToken,
  isAdmin,
  upload.single('video'),
  (req, res, next) => {
    console.log('---- ROUTE DIJALANKAN OLEH USER ----');
    console.log('User:', req.user);
    next();
  },
  uploadVideo
);


// Lihat semua video - public
router.get('/', getVideos);

// Update video - hanya admin
router.put('/:id', verifyToken, isAdmin, updateVideo);

// Hapus video - hanya admin
router.delete('/:id', verifyToken, isAdmin, deleteVideo);

export default router;
