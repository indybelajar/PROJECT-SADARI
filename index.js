import express from "express";
import { adminDB, userDB } from './database.js'; // Import dari file baru
import adminLogRoutes from './routes/adminLogRoutes.js';
import userLogRoutes from './routes/userLogRoutes.js';

const app = express();
app.use(express.json());

app.use('/admin', adminLogRoutes);
app.use('/user', userLogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
