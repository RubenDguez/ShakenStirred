import { Router } from 'express';
import { createDrink, getAllDrinks, getDrink, getDrinkByUser } from '../../controllers/DrinkController.js';

const router = Router();

router.get('/', getAllDrinks);
router.get('/:id', getDrink);
router.get('/user/:id', getDrinkByUser);
router.post('/', createDrink);

export { router as DrinkRouter };
