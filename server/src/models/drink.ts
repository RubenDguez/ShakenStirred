import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';
import { User } from './user';

export class Drink extends Model<InferAttributes<Drink>, InferCreationAttributes<Drink>> {
  public id!: CreationOptional<number>;
  public name!: string;
  public category!: string;
  public instructions!: string;
  public img!: string;
  public userId!: ForeignKey<User['id']>;
}

export function DrinkFactory(sequelize: Sequelize): typeof Drink {
  Drink.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instructions: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
    },
    {
      tableName: 'drinks',
      sequelize,
    },
  );

  return Drink;
}
