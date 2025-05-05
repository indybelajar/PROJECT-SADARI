import express from "express";
import { createCekSadari } from "../controllers/cekSadariController.js";

const router = express.Router();

// POST /api/v1/cek-sadari
router.post('/cek', createCekSadari);

export default router;
