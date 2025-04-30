import mongoose from 'mongoose';
import { adminDB } from '../database.js'; // koneksi DB admin

const artikelSchema = new mongoose.Schema({
    judul: { type: String, required: true },
    konten: { type: String, required: true },
    tanggal: { type: Date, default: Date.now }
});

const ArtikelAdmin = adminDB.model('ArtikelAdmin', artikelSchema); // Gunakan koneksi adminDB

export default ArtikelAdmin;
