import { Router } from 'express';
import authRoutes from './auth/index.js';
import apiRoutes from './api/index.js';
// import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

export default router;
