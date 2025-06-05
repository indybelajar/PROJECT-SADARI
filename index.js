import dotenv from "dotenv";
dotenv.config(); // Pastikan ini di baris paling atas

import express from "express";
import cekSadariRoutes from './routes/cekSadariRoutes.js';
import adminLogRoutes from './routes/adminLogRoutes.js';
import videoAdminRoutes from './routes/videoAdminRoutes.js';
import artikelAdminRoutes from './routes/artikelAdminRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.json());

app.use('/admin', adminLogRoutes);
app.use('/ceksadari', cekSadariRoutes);
app.use('/videoAdmin', videoAdminRoutes);
app.use('/artikel', artikelAdminRoutes);
app.use('/profile', profileRoutes);
app.use('/search', searchRoutes);

// Buat fungsi async untuk load swaggerDocument dengan dynamic import
async function setupSwagger() {
  try {
    const swaggerModule = await import('./docs/api-docs.json', {
      assert: { type: 'json' }
    });
    const swaggerDocument = swaggerModule.default;

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
    console.log("Swagger docs loaded");
  } catch (error) {
    console.error("Failed to load swagger docs:", error);
  }
}

await setupSwagger();

console.log("Cloud Name (Index):", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key (Index):", process.env.CLOUDINARY_API_KEY);
console.log("API Secret (Index):", process.env.CLOUDINARY_API_SECRET);

export default app;
