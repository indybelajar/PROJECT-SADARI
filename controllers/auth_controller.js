import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_indy_super_aman';

// REGISTER
export const registAdmin = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Semua field wajib diisi!" });
  }

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({ message: "Username hanya boleh berisi huruf dan angka, tanpa spasi dan simbol." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Konfirmasi password tidak cocok!" });
  }

  try {
   const existingUser = await prisma.user.findUnique({ where: { username } });


    if (existingUser) {
      return res.status(409).json({ message: "Username sudah terdaftar!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    
  const savedRegist = await prisma.user.create({
  data: {
    username,
    email,
    password: hashedPassword,
    role: 'ADMIN' // <- ini penting
  }
});

    const { password: _, ...adminWithoutPassword } = savedRegist;
    res.status(201).json({ message: "Registrasi berhasil!", admin: adminWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan saat registrasi.", error: err.message });
  }
};

// LOGIN
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.user.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: "Admin tidak ditemukan" });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password salah" });
    }

    // Tambahkan role/isAdmin saat membuat token
   const token = jwt.sign({
  id: admin.id,
  email: admin.email,
  isAdmin: admin.role === 'ADMIN', //Mengambil dari database
}, process.env.JWT_SECRET, { expiresIn: '1h' });

    const { password: _, ...adminWithoutPassword } = admin;

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: adminWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ message: "Login gagal", error: error.message });
  }
};
// GET ALL ADMINS
export const getAllAdmin = async (req, res) => {
  try {
    const admins = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true
      }
    });
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data admin.", error: err.message });
  }
};
