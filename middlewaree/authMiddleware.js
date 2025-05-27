import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware untuk verifikasi token JWT
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('TOKEN YANG DITERIMA:', token);

  if (!token) {
    console.log('Token tidak ditemukan di header Authorization');
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('HASIL DECODE TOKEN:', decoded); // tampilkan isi token
    req.user = decoded;
    next();
  } catch (error) {
    console.error('TOKEN INVALID:', error.message);
    return res.status(403).json({ message: 'Token tidak valid' });
  }
};


// Middleware untuk cek apakah user adalah admin
export const isAdmin = (req, res, next) => {
  console.log('MEMERIKSA ROLE ADMIN PADA USER:', req.user);

  if (req.user && (req.user.role === 'ADMIN' || req.user.isAdmin === true)) {
    console.log('AKSES DIBERIKAN - USER ADALAH ADMIN');
    next();
  } else {
    console.log('AKSES DITOLAK - BUKAN ADMIN');
    return res.status(403).json({ message: 'Akses hanya untuk admin' });
  }
};


  // Atau jika kamu pakai flag `isAdmin: true` di token:
  // if (req.user && req.user.isAdmin === true) {
  //   console.log('AKSES DIBERIKAN - FLAG isAdmin TRUE');
  //   next();
  // } else {
  //   console.log('AKSES DITOLAK - FLAG isAdmin FALSE');
  //   return res.status(403).json({ message: 'Akses hanya untuk admin' });
  // }
;

