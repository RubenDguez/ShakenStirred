import sequelize from '../config/connection.js';
import { DrinkFactory } from './drink.js';
import { IngredientFactory } from './ingredients.js';
import { UserFactory } from './user.js';

const User = UserFactory(sequelize);

const Drink = DrinkFactory(sequelize);
const Ingredient = IngredientFactory(sequelize);

Drink.hasMany(Ingredient, { foreignKey: 'drinkId' });
Ingredient.belongsTo(Drink, { foreignKey: 'drinkId', as: 'drink' });

User.hasMany(Drink, { foreignKey: 'userId' });
Drink.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { Drink, Ingredient, User };
