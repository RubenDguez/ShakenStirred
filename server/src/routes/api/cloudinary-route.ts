import { Router } from 'express';
import { getCloudinaryInfo } from '../../controllers/CloudinaryInfo.js';

const router = Router();

router.get('/', getCloudinaryInfo);

export { router as CloudinaryRouter };
