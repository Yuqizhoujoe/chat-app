import { Sequelize } from "sequelize";
import { retry } from "../util.js";

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USERNAME,
  "",
  {
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT,
  }
);

const connectPostgre = async () => {
  const connect = () => sequelize.sync();
  await retry(connect, 3);
};

const startService = async () => {
  try {
    await connectPostgre();
    console.log("Connect with PostgreSQL!");
  } catch (error) {
    console.error("Connection error with PostgreSQL: ", error);
  }
};

export { sequelize as default, startService };
