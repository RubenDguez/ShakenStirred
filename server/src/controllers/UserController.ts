import { Request, Response } from 'express';
import { User } from '../models/index.js';

export const getUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username }, attributes: { exclude: ['password'] }, logging: false });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json({ message: ERROR.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username }, logging: false });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ ...req.body }, {logging: false});

    return res.status(200).json(user);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json({ message: ERROR.message });
  }
};
