import { Router } from 'express';
import { CloudinaryRouter } from './cloudinary-route.js';
import { DrinkRouter } from './drink-route.js';
import { UserRouter } from './user-route.js';

const router = Router();

router.use('/user', UserRouter);
router.use('/cloudinary', CloudinaryRouter);
router.use('/drink', DrinkRouter);

export default router;
