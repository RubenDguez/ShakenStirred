import { Router } from 'express';
import { UserRouter } from './user-route.js';
import { CloudinaryRouter } from './cloudinary-route.js';

const router = Router();

router.use('/user', UserRouter);
router.use('/cloudinary', CloudinaryRouter)

export default router;
