import { Router } from 'express';
import { getUser, updateUser } from '../../controllers/UserController.js';

const router = Router();

router.get('/:username', getUser);
router.put('/:username', updateUser);

export { router as UserRouter };
