import { User } from '../models/index.js';

const { DEV_USERNAME, DEV_PASSWORD } = process.env

export const seedUsers = async () => {
  if (!DEV_USERNAME || !DEV_PASSWORD) return;

  await User.bulkCreate([
    { username: DEV_USERNAME, email: 'current.dev@shakenstirred.com', password: DEV_PASSWORD, role: 'admin' },
  ], { individualHooks: true, logging: false });
};
