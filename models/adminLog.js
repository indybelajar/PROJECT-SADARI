// models/adminLog.js
import { adminDB } from '../database.js';  // Pastikan ini diimpor setelah adminDB dideklarasikan
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    collection: 'dbAdmin' // Nama koleksi di MongoDB
});

// Pastikan adminDB sudah terinisialisasi sebelum digunakan
const Admin = adminDB.model('Admin', userSchema);
export default Admin;