// index.js

import dotenv from "dotenv";
dotenv.config(); // ini tetap di paling atas

import express from "express";
import cors from "cors"; // tambahkan ini
import cekSadariRoutes from '../routes/cekSadariRoutes.js';
import adminLogRoutes from '../routes/adminLogRoutes.js';
import videoAdminRoutes from '../routes/videoAdminRoutes.js';
import artikelAdminRoutes from '../routes/artikelAdminRoutes.js';
import profileRoutes from '../routes/profileRoutes.js';
import searchRoutes from '../routes/searchRoutes.js';
import swaggerUi from 'swagger-ui-express';

const app = express();

// ✅ Middleware CORS untuk development (localhost)
app.use(cors({
  origin: ['http://localhost:5173', 'https://backend-sadari.vercel.app/'], // sesuaikan domain frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use('/admin', adminLogRoutes);
app.use('/ceksadari', cekSadariRoutes);
app.use('/videoAdmin', videoAdminRoutes);
app.use('/artikel', artikelAdminRoutes);
app.use('/profile', profileRoutes);
app.use('/search', searchRoutes);

// ✅ Inisialisasi Swagger
async function initializeApp() {
  try {
    const swaggerModule = await import('../docs/api-docs.json', {
      assert: { type: 'json' }
    });
    const swaggerDocument = swaggerModule.default;

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log("Swagger docs loaded successfully.");
  } catch (error) {
    console.error("Failed to load swagger docs:", error);
  }

  console.log("Cloud Name (Index):", process.env.CLOUDINARY_CLOUD_NAME);
  console.log("API Key (Index):", process.env.CLOUDINARY_API_KEY);
  console.log("API Secret (Index):", process.env.CLOUDINARY_API_SECRET);
}

// ✅ Jalankan inisialisasi secara langsung, TAPI bukan pakai `await` langsung di top level
initializeApp();

// ✅ Jika dijalankan secara lokal, aktifkan server listen
if (process.env.NODE_ENV !== 'production' || process.env.IS_LOCAL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}

// ✅ Export untuk Vercel (harus tetap)
export default app;
