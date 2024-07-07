import { DataTypes } from "sequelize";
import sequelize from "./postgresql.js";
import bcrypt from "bcrypt";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

const mapUserSignUpData = async (req) => {
  const { username, email, password } = req.body;
  const avatar = req.file ? `/users/${req.file.filename}` : "";
  const hashedPassword = await bcrypt.hash(password, 10);
  return {
    username,
    email,
    password: hashedPassword,
    avatar,
  };
};

const mapUserLoginData = (req) => {
  const { email, password } = req.body;
  if (!email) throw Error(`Missing email`);
  if (!password) throw Error("Missing password");
  return {
    email,
    password,
  };
};

export { User as default, mapUserLoginData, mapUserSignUpData };
