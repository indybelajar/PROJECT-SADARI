import express from 'express';
import {
  createOrUpdateCekSadari,
  updateCekSadariById,
  getRiwayatCekSadari,
  getCekSadariByTanggal,
  deleteCekSadariById
} from '../controllers/cekSadariController.js';

import { verifyToken, isAdmin } from '../middlewaree/authMiddleware.js';

const router = express.Router();

// Semua route di bawah ini butuh user sudah login (contoh pakai middleware authenticateUser)
router.use(verifyToken, isAdmin);

// Create or Update berdasarkan tanggal
router.post('/ceksadari/cek', createOrUpdateCekSadari);

// Update berdasarkan ID (PUT /ceksadari/cek/:id)
router.put('/ceksadari/cek/:id', updateCekSadariById);

// Get riwayat cek SADARI user
router.get('/ceksadari/riwayat', getRiwayatCekSadari);

// Get cek SADARI berdasarkan tanggal
router.get('/ceksadari/cek', getCekSadariByTanggal);

// Delete cek SADARI berdasarkan ID
router.delete('/ceksadari/cek/:id', deleteCekSadariById);

export default router;
