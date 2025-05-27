import express from "express";
import {
  updateProfile,
} from "../controllers/profile_controller.js";

import upload from "../middlewaree/uploadMiddleware.js";
import { verifyToken, isAdmin } from "../middlewaree/authMiddleware.js";

const router = express.Router();

// Update profil user (harus login)
router.put('/update-profile/:id', verifyToken, upload.single('profilePic'), updateProfile);

export default router;
