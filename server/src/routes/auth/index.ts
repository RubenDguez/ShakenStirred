import { Router, Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../models/index.js';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({
    where: { username },
    logging: false,
  });

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create({ username, email, password }, {logging: false});

    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username: newUser.username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error: any) {
    const ERROR = error as Error;

    switch(ERROR.name) {
      case 'SequelizeUniqueConstraintError':
        res.status(400).json({ message: error.errors[0].message })
        break;
      default:
        res.status(400).json({ message: error.message });
    }
  }
}

const router = Router();

router.post('/login', login);
router.post('/signup', signUp);

export default router;
