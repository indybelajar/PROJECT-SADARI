import CekSadari from '../models/CekSadari.js';

export const createCekSadari = async (req, res) => {
    try {
        const { kemerahan, benjolan, cairan } = req.body;

        // Validasi manual
        if (!kemerahan || !benjolan || !cairan) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        const newCekSadari = new CekSadari({
            kemerahan,
            benjolan,
            cairan
        });

        await newCekSadari.save();

        res.status(201).json({ 
            message: "Data cek SADARI berhasil disimpan!",
            data: newCekSadari
        });
    } catch (error) {
        console.error("Error saat menyimpan data SADARI:", error);
        res.status(500).json({ message: "Server error!" });
    }
};