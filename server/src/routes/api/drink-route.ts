import { Router } from 'express';
import { createDrink, getAllDrinks, getDrink } from '../../controllers/DrinkController.js';

const router = Router();

router.get('/', getAllDrinks);
router.get('/:id', getDrink);
router.post('/', createDrink);

export { router as DrinkRouter };
