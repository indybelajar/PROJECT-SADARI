import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getSeverityScore = (level) => {
  switch (level.toLowerCase()) {
    case 'ringan': return 1;
    case 'sedang': return 2;
    case 'parah': return 3;
    default: return 0;
  }
};

const getOverallSeverity = (scores) => {
  const avg = scores.reduce((sum, val) => sum + val, 0) / scores.length;
  if (avg <= 1.5) return 'rendah';
  if (avg <= 2.5) return 'sedang';
  return 'tinggi';
};

const isValidLevel = (val) => ['ringan', 'sedang', 'parah'].includes(val?.toLowerCase());

export const createCekSadari = async (req, res) => {
  try {
    const { kemerahan, benjolan, cairan } = req.body;
    const userId = req.user.id;

    if (!kemerahan || !benjolan || !cairan) {
      return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    if (!isValidLevel(kemerahan) || !isValidLevel(benjolan) || !isValidLevel(cairan)) {
      return res.status(400).json({
        message: "Input hanya boleh 'ringan', 'sedang', atau 'parah'"
      });
    }

    const scores = [
      getSeverityScore(kemerahan),
      getSeverityScore(benjolan),
      getSeverityScore(cairan)
    ];
    const tingkatKeparahan = getOverallSeverity(scores);

    const newCekSadari = await prisma.cekSadari.create({
      data: {
        kemerahan: kemerahan.toLowerCase(),
        benjolan: benjolan.toLowerCase(),
        cairan: cairan.toLowerCase(),
        tingkatKeparahan: tingkatKeparahan.toLowerCase(),
        userId
      },
    });

    res.status(201).json({
      message: "Data cek SADARI berhasil disimpan!",
      data: newCekSadari,
      hasilAnalisis: {
        tingkatKeparahan,
        detail: { kemerahan, benjolan, cairan }
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

export const getRiwayatCekSadari = async (req, res) => {
  try {
    const userId = req.user.id;

    const riwayat = await prisma.cekSadari.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      message: "Riwayat cek SADARI berhasil diambil",
      data: riwayat
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error: error.message });
  }
};
