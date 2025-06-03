import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const searchAll = async (req, res) => {
  console.log("SearchAll function called with query:", req.query);

  const { q, page = 1, limit = 10 } = req.query;

  // Validasi parameter q
  if (!q) {
    return res.status(400).json({ message: "Parameter 'q' wajib diisi" });
  }

  // Sanitasi input: batasi panjang q
  if (q.length > 100) {
    return res.status(400).json({ message: "Kata kunci terlalu panjang, maksimal 100 karakter" });
  }

  // Konversi page dan limit ke integer
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  try {
    // Cari artikel dengan pagination dan seleksi kolom
    const artikel = await prisma.artikel.findMany({
      where: {
        OR: [
          { judul: { contains: q, mode: "insensitive" } },
          { konten: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        judul: true,
        createdAt: true,
      },
      skip,
      take: limitNum,
    });

    // Cari video dengan pagination dan seleksi kolom
    const video = await prisma.video.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
      skip,
      take: limitNum,
    });

    // Tambahkan metadata untuk frontend
    res.json({
      artikel,
      video,
      metadata: {
        page: pageNum,
        limit: limitNum,
        totalArtikel: artikel.length,
        totalVideo: video.length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan saat pencarian", error: error.message });
  }
};