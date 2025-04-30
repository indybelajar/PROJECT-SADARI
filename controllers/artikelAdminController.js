import ArtikelAdmin from '../models/artikelAdminModel.js';

// CREATE
export const tambahArtikel = async (req, res) => {
    try {
        const { judul, konten } = req.body;
        const artikel = new ArtikelAdmin({ judul, konten });
        const saved = await artikel.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE
export const editArtikel = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, konten } = req.body;
        const updated = await ArtikelAdmin.findByIdAndUpdate(
            id,
            { judul, konten },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Artikel tidak ditemukan' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE
export const hapusArtikel = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ArtikelAdmin.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Artikel tidak ditemukan' });
        res.status(200).json({ message: 'Artikel berhasil dihapus' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// GET ALL
export const getAllArtikel = async (req, res) => {
    try {
        const artikels = await ArtikelAdmin.find();
        res.status(200).json(artikels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
