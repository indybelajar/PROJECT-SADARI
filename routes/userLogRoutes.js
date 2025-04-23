import express from 'express';
import { registUser, loginUser, getAllUser } from '../controllers/userLogControllers.js'; // Ensure correct imports

const router = express.Router();

router.post('/register', registUser);
router.post('/login', loginUser);
router.get('/', getAllUser);

export default router;
