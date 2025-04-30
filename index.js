import dotenv from "dotenv";
dotenv.config(); // Pastikan ini di baris paling atas

import express from "express";
import { adminDB, userDB } from './database.js';
import cekSadariRoutes from './routes/cekSadariRoutes.js';
import adminLogRoutes from './routes/adminLogRoutes.js';
import userLogRoutes from './routes/userLogRoutes.js';
import videoAdminRoutes from './routes/videoAdminRoutes.js';
import artikelAdminRoutes from './routes/artikelAdminRoutes.js';


const app = express();
app.use(express.json());

app.use('/admin', adminLogRoutes);
app.use('/api/v1/cek-sadari', cekSadariRoutes);
app.use('/user', userLogRoutes);
app.use('/videoAdmin', videoAdminRoutes);
app.use('/artikel', artikelAdminRoutes);


console.log("Cloud Name (Index):", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key (Index):", process.env.CLOUDINARY_API_KEY);
console.log("API Secret (Index):", process.env.CLOUDINARY_API_SECRET);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});