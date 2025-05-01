import express from "express";
import {
    tambahArtikel,
    editArtikel,
    hapusArtikel,
    getAllArtikel
} from "../controllers/artikelAdminController.js";

const router = express.Router();

router.post('/', tambahArtikel);       // Tambah artikel
router.get('/', getAllArtikel);        // Lihat semua artikel
router.put('/:id', editArtikel);       // Edit artikel
router.delete('/:id', hapusArtikel);   // Hapus artikel

export default router;
