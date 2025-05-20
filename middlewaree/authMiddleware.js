import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware untuk verifikasi token JWT
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ambil data dari token
    req.user = decoded; // simpan data ke req.user untuk middleware berikutnya
    next(); // lanjut ke route atau middleware berikutnya
  } catch (error) {
    return res.status(403).json({ message: 'Token tidak valid' });
  }
};

// Middleware untuk cek apakah user adalah admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // user adalah admin, lanjut
  } else {
    return res.status(403).json({ message: 'Akses hanya untuk admin' });
  }
};
