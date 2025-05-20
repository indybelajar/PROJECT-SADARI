import express from "express";
import { uploadVideo, getVideos, updateVideo, deleteVideo } from "../controllers/videoAdminController.js";
import upload from "../middlewaree/uploadMiddleware.js";
import { verifyToken, isAdmin } from "../middlewaree/authMiddleware.js";

const router = express.Router();

// Langsung pakai upload dari middleware, gak perlu buat storage lagi
router.post('/', verifyToken, isAdmin, upload.single('video'), uploadVideo);
router.get('/', getVideos);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

export default router;
