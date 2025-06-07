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
router.post('/cek', createOrUpdateCekSadari);

// Update berdasarkan ID (PUT /ceksadari/cek/:id)
router.put('/cek/:id', updateCekSadariById);

// Get riwayat cek SADARI user
router.get('/riwayat', getRiwayatCekSadari);

// Get cek SADARI berdasarkan tanggal
router.get('/cek', getCekSadariByTanggal);

// Delete cek SADARI berdasarkan ID
router.delete('/cek/:id', deleteCekSadariById);

export default router;
