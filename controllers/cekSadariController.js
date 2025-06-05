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

// CREATE or UPDATE berdasarkan tanggal (existing function)
export const createOrUpdateCekSadari = async (req, res) => {
  try {
    const { kemerahan, benjolan, cairan, tanggal } = req.body;
    const userId = req.user.id;

    if (!kemerahan || !benjolan || !cairan || !tanggal) {
      return res.status(400).json({ message: "Semua field harus diisi termasuk tanggal!" });
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

    const tanggalObj = new Date(tanggal);
    tanggalObj.setHours(0, 0, 0, 0); // Normalisasi tanggal

    const existing = await prisma.cekSadari.findFirst({
      where: {
        userId,
        tanggal: tanggalObj
      }
    });

    let result;
    if (existing) {
      result = await prisma.cekSadari.update({
        where: { id: existing.id },
        data: {
          kemerahan: kemerahan.toLowerCase(),
          benjolan: benjolan.toLowerCase(),
          cairan: cairan.toLowerCase(),
          tingkatKeparahan: tingkatKeparahan.toLowerCase()
        }
      });
    } else {
      result = await prisma.cekSadari.create({
        data: {
          kemerahan: kemerahan.toLowerCase(),
          benjolan: benjolan.toLowerCase(),
          cairan: cairan.toLowerCase(),
          tingkatKeparahan: tingkatKeparahan.toLowerCase(),
          tanggal: tanggalObj,
          userId
        }
      });
    }

    res.status(201).json({
      message: existing ? "Data cek SADARI berhasil diupdate!" : "Data cek SADARI berhasil disimpan!",
      data: result,
      hasilAnalisis: {
        tingkatKeparahan,
        detail: { kemerahan, benjolan, cairan }
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// UPDATE berdasarkan ID dan mengganti tanggal (fungsi baru untuk PUT /ceksadari/cek/{id})
export const updateCekSadariById = async (req, res) => {
  try {
    const { id } = req.params;
    const { kemerahan, benjolan, cairan, tanggal } = req.body;
    const userId = req.user.id;

    if (!kemerahan || !benjolan || !cairan || !tanggal) {
      return res.status(400).json({ message: "Semua field harus diisi termasuk tanggal!" });
    }

    if (!isValidLevel(kemerahan) || !isValidLevel(benjolan) || !isValidLevel(cairan)) {
      return res.status(400).json({
        message: "Input hanya boleh 'ringan', 'sedang', atau 'parah'"
      });
    }

    const tanggalObj = new Date(tanggal);
    tanggalObj.setHours(0, 0, 0, 0);

    // Cek apakah data dengan id dan userId ada
    const existing = await prisma.cekSadari.findFirst({
      where: { id, userId }
    });

    if (!existing) {
      return res.status(404).json({ message: "Data tidak ditemukan atau bukan milik user" });
    }

    const scores = [
      getSeverityScore(kemerahan),
      getSeverityScore(benjolan),
      getSeverityScore(cairan)
    ];
    const tingkatKeparahan = getOverallSeverity(scores);

    const updated = await prisma.cekSadari.update({
      where: { id },
      data: {
        kemerahan: kemerahan.toLowerCase(),
        benjolan: benjolan.toLowerCase(),
        cairan: cairan.toLowerCase(),
        tingkatKeparahan: tingkatKeparahan.toLowerCase(),
        tanggal: tanggalObj
      }
    });

    res.status(200).json({
      message: "Data cek SADARI berhasil diupdate!",
      data: updated,
      hasilAnalisis: {
        tingkatKeparahan,
        detail: { kemerahan, benjolan, cairan }
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// GET riwayat
export const getRiwayatCekSadari = async (req, res) => {
  try {
    const userId = req.user.id;

    const riwayat = await prisma.cekSadari.findMany({
      where: { userId },
      orderBy: { tanggal: 'desc' }
    });

    res.status(200).json({
      message: "Riwayat cek SADARI berhasil diambil",
      data: riwayat
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error: error.message });
  }
};

// GET berdasarkan tanggal
export const getCekSadariByTanggal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tanggal } = req.query;

    if (!tanggal) {
      return res.status(400).json({ message: "Parameter tanggal wajib diisi!" });
    }

    const tanggalObj = new Date(tanggal);
    tanggalObj.setHours(0, 0, 0, 0);

    const cekSadari = await prisma.cekSadari.findFirst({
      where: {
        userId,
        tanggal: tanggalObj
      }
    });

    if (!cekSadari) {
      return res.status(404).json({ message: "Data tidak ditemukan untuk tanggal tersebut" });
    }

    res.status(200).json({
      message: "Data cek SADARI ditemukan",
      data: cekSadari
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error: error.message });
  }
};

// DELETE berdasarkan ID
export const deleteCekSadariById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const existing = await prisma.cekSadari.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existing) {
      return res.status(404).json({ message: "Data tidak ditemukan atau bukan milik user" });
    }

    await prisma.cekSadari.delete({
      where: { id }
    });

    res.status(200).json({ message: "Data cek SADARI berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus data", error: error.message });
  }
};
