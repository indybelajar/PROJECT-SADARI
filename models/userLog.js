import mongoose from 'mongoose';
import { userDB } from '../database.js'; // penting: ambil koneksi khusus user

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const User = userDB.model('User', userSchema); // pakai koneksi userDB, bukan default mongoose

export default User;
