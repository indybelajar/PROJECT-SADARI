import dotenv from "dotenv";
dotenv.config(); // Pastikan ini di baris paling atas

import express from "express";
import cekSadariRoutes from '../routes/cekSadariRoutes.js';
import adminLogRoutes from '../routes/adminLogRoutes.js';
import videoAdminRoutes from '../routes/videoAdminRoutes.js';
import artikelAdminRoutes from '../routes/artikelAdminRoutes.js';
import profileRoutes from '../routes/profileRoutes.js';
import searchRoutes from '../routes/searchRoutes.js';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.json());

app.use('/admin', adminLogRoutes);
app.use('/ceksadari', cekSadariRoutes);
app.use('/videoAdmin', videoAdminRoutes);
app.use('/artikel', artikelAdminRoutes);
app.use('/profile', profileRoutes);
app.use('/search', searchRoutes);
// Fungsi untuk menyiapkan Swagger, panggil saat inisialisasi aplikasi
async function initializeApp() {
    // Memuat swaggerDocument dengan dynamic import dan assert type json
    try {
        const swaggerModule = await import('../docs/api-docs.json', {
            assert: { type: 'json' }
        });
        const swaggerDocument = swaggerModule.default;

        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        console.log("Swagger docs loaded successfully.");
    } catch (error) {
        // Jangan lupa ERR_IMPORT_ATTRIBUTE_MISSING ini sudah kita tangani
        // Namun, jika masih ada masalah dengan path atau file, error ini akan muncul.
        console.error("Failed to load swagger docs:", error);
    }

    console.log("Cloud Name (Index):", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API Key (Index):", process.env.CLOUDINARY_API_KEY);
    console.log("API Secret (Index):", process.env.CLOUDINARY_API_SECRET);

    // Pastikan semua inisialisasi async lainnya (jika ada) berada di sini juga.
    // Contoh: koneksi DB yang perlu await, dll.

// Panggil fungsi inisialisasi secara asinkron di awal modul
// Kita tidak bisa pakai await di top level karena export app akan menunggu
// Serverless-http akan menunggu export default app;

   console.log("Aplikasi siap dan berjalan.");
}
await initializeApp();

if (process.env.NODE_ENV !== 'production' || process.env.IS_LOCAL) { // Tambahkan IS_LOCAL jika ingin lebih spesifik
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running locally on port ${PORT}`);
    });
}
// --------------------------------------------------------

export default app;// Export app segera setelah didefinisikann