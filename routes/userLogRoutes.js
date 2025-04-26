// routes/userLogRoutes.js
import express from "express";
import { registUser, loginUser } from "../controllers/userLogControllers.js"; // Import controller user log
import { getUserVideosFromCloudinary } from "../controllers/videoUserController.js"; // Import controller video user dari Cloudinary

const router = express.Router();

router.post('/register', registUser); // Route untuk registrasi user
router.post('/login', loginUser);
router.get('/videos', getUserVideosFromCloudinary); // Route untuk mendapatkan video dari Cloudinary

export default router;