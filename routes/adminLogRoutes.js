import express from 'express';
import { registAdmin, loginAdmin, getAllAdmin } from '../controllers/adminLogControllers.js'; // Ensure correct imports
const router = express.Router();

// Register a new admin
router.post('/register', registAdmin); 
// Login an admin
router.post('/login', loginAdmin); 
// Get all admin
router.get('/', getAllAdmin);

export default router;