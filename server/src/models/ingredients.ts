import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';
import { Drink } from './drink';

export class Ingredient extends Model<InferAttributes<Ingredient>, InferCreationAttributes<Ingredient>> {
  public id!: CreationOptional<number>;
  public amount!: number;
  public unit!: string;
  public name!: string;
  public drinkId!: ForeignKey<Drink['id']>;
}

export function IngredientFactory(sequelize: Sequelize): typeof Ingredient {
  Ingredient.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: false,
      modelName: 'ingredients',
    },
  );

  return Ingredient;
}
