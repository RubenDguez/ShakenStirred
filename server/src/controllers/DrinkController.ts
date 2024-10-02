import { Request, Response } from 'express';
import { Drink, Ingredient, User } from '../models/index.js';

// * POST /api/drink
export const createDrink = async (req: Request, res: Response) => {
  const { user, name, category, img, instructions } = req.body;

  try {
    const newDrink = await Drink.create({ userId: user, name, category, img, instructions }, { logging: false });
    const drinkIngredients = req.body.ingredients.map((ing: { amount: number; unit: string; name: string }) => ({
      name: ing.name,
      unit: ing.unit,
      amount: ing.amount,
      drinkId: newDrink.id,
    }));

    await Ingredient.bulkCreate(drinkIngredients, { logging: false });

    return res.status(201).json(newDrink);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json({ message: ERROR.message });
  }
};

// * GET /api/drink
export const getAllDrinks = async (_req: Request, res: Response) => {
  try {
    const drinks = await Drink.findAll({ include: [Ingredient] });

    if (!drinks) {
      return res.status(404).json({ message: 'No drinks in database yet' });
    }

    return res.status(200).json(drinks);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json({ message: ERROR.message });
  }
};

// * GET /api/drink/:id
export const getDrink = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const drink = await Drink.findByPk(id, {
      include: [Ingredient, { model: User, attributes: { exclude: ['password'] }, as: 'user' }],
    });

    if (!drink) {
      return res.status(404).json({ message: 'Drink was not found.' });
    }

    console.log(drink)

    return res.status(200).json(drink);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json({ message: ERROR.message });
  }
};

export const getDrinkByUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const drinks = await Drink.findAll({ where: { userId: id }, logging: false });

    if (!drinks) {
      return res.status(404).json({ message: 'No Drink(s) found for this user.' });
    }

    return res.status(200).json(drinks);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json({ message: ERROR.message });
  }
};
