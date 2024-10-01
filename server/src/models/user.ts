import bcrypt from 'bcrypt';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

// Define the optional attributes for creating a new User
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role' | 'firstName' | 'lastName' | 'avatar'> {}

// Define the User class extending Sequelize's Model
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public firstName!: string;
  public lastName!: string;
  public avatar!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to hash and set the password for the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

// Define the UserFactory function to initialize the User model
export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      }
    },
    {
      tableName: 'users',
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            await user.setPassword(user.password);
          }
        },
      },
    },
  );

  return User;
}
