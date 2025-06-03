import express from "express";
import { createCekSadari, getRiwayatCekSadari } from "../controllers/cekSadariController.js";
import { verifyToken } from "../middlewaree/authMiddleware.js";

const router = express.Router();

router.post('/cek', verifyToken, createCekSadari);
router.get('/riwayat', verifyToken, getRiwayatCekSadari);

export default router;
