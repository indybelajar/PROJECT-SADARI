import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import cekSadariRoutes from '../routes/cekSadariRoutes.js';
import adminLogRoutes from '../routes/adminLogRoutes.js';
import videoAdminRoutes from '../routes/videoAdminRoutes.js';
import artikelAdminRoutes from '../routes/artikelAdminRoutes.js';
import profileRoutes from '../routes/profileRoutes.js';
import searchRoutes from '../routes/searchRoutes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json()); // <--- INI WAJIB buat POST/PUT JSON

app.use('/admin', adminLogRoutes);
app.use('/ceksadari', cekSadariRoutes);
app.use('/videoAdmin', videoAdminRoutes);
app.use('/artikel', artikelAdminRoutes);
app.use('/profile', profileRoutes);
app.use('/search', searchRoutes);

// Start server jika dijalankan secara lokal
if (process.env.NODE_ENV !== 'production' || process.env.IS_LOCAL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}

export default app;
