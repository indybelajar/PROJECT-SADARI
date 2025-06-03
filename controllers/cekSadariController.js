import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper: konversi level ke angka
const getSeverityScore = (level) => {
  switch (level.toLowerCase()) {
    case 'ringan': return 1;
    case 'sedang': return 2;
    case 'parah': return 3;
    default: return 0;
  }
};

// Helper: hitung tingkat keparahan akhir
const getOverallSeverity = (scores) => {
  const avg = scores.reduce((sum, val) => sum + val, 0) / scores.length;
  if (avg <= 1.5) return 'rendah';
  if (avg <= 2.5) return 'sedang';
  return 'tinggi';
};

// Helper: validasi input hanya "ringan", "sedang", "parah"
const isValidLevel = (val) => ['ringan', 'sedang', 'parah'].includes(val?.toLowerCase());

export const createCekSadari = async (req, res) => {
  try {
    const { kemerahan, benjolan, cairan } = req.body;

    // Validasi field tidak kosong
    if (!kemerahan || !benjolan || !cairan) {
      return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    // Validasi nilai harus "ringan", "sedang", "parah"
    if (!isValidLevel(kemerahan) || !isValidLevel(benjolan) || !isValidLevel(cairan)) {
      return res.status(400).json({
        message: "Input hanya boleh 'ringan', 'sedang', atau 'parah'"
      });
    }

    // Hitung skor dan tingkat keparahan
    const scores = [
      getSeverityScore(kemerahan),
      getSeverityScore(benjolan),
      getSeverityScore(cairan)
    ];
    const tingkatKeparahan = getOverallSeverity(scores);

    console.log('Data to save:', {
      kemerahan: kemerahan.toLowerCase(),
      benjolan: benjolan.toLowerCase(),
      cairan: cairan.toLowerCase(),
      tingkatKeparahan: tingkatKeparahan.toLowerCase()
    });

    // Simpan data ke database - langsung pakai string lowercase
    const newCekSadari = await prisma.cekSadari.create({
      data: {
        kemerahan: kemerahan.toLowerCase(),      // "ringan", "sedang", atau "parah"
        benjolan: benjolan.toLowerCase(),        // "ringan", "sedang", atau "parah"
        cairan: cairan.toLowerCase(),            // "ringan", "sedang", atau "parah"
        tingkatKeparahan: tingkatKeparahan.toLowerCase() // "rendah", "sedang", atau "tinggi"
      },
    });

    // Kirim response ke client
    res.status(201).json({
      message: "Data cek SADARI berhasil disimpan!",
      data: newCekSadari,
      hasilAnalisis: {
        tingkatKeparahan,
        detail: { kemerahan, benjolan, cairan }
      }
    });
  } catch (error) {
    console.error("Error saat menyimpan data SADARI:", error);
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};