import dotenv from 'dotenv';
import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';

dotenv.config({ path: '../../.env' });

const forceDatabaseRefresh = false;

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: forceDatabaseRefresh, logging: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
