import dotenv from "dotenv";
dotenv.config(); // Pastikan ini di baris paling atas

import express from "express";
import cekSadariRoutes from './routes/cekSadariRoutes.js';
import adminLogRoutes from './routes/adminLogRoutes.js';
import videoAdminRoutes from './routes/videoAdminRoutes.js';
import artikelAdminRoutes from './routes/artikelAdminRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

const app = express();
app.use(express.json());

app.use('/admin', adminLogRoutes);
app.use('/ceksadari', cekSadariRoutes);
app.use('/videoAdmin', videoAdminRoutes);
app.use('/artikel', artikelAdminRoutes);
app.use('/profile', profileRoutes); // ✅ tambahkan ini agar route update profil aktif

console.log("Cloud Name (Index):", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key (Index):", process.env.CLOUDINARY_API_KEY);
console.log("API Secret (Index):", process.env.CLOUDINARY_API_SECRET);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
