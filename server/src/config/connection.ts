import dotenv from 'dotenv';
import path from 'path'

dotenv.config({path: path.join(process.cwd(), '../.env')});

import { Sequelize } from 'sequelize';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

export default sequelize;
