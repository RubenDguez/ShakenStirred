import { Router } from 'express';
import { UserRouter } from './user-route.js';

const router = Router();

router.use('/user', UserRouter);

export default router;
