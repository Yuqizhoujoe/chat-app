import { Sequelize } from "sequelize";
import { retry } from "../util.js";

const sequelize = new Sequelize("chat-node-app", "damnjoejoe", "", {
  host: "localhost",
  dialect: "postgres",
});

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
