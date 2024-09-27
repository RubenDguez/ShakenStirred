import { seedUsers } from './user-seeds.js';
import sequelize from '../config/connection.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true, logging: false });
    console.log('> DATABASE SYNCED');
    
    await seedUsers();
    console.log('> USERS SEEDED');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
