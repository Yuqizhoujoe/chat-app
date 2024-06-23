// configuration
import "./config.js";

import express from "express";
import cors from "cors";
import path from "path";

// get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// controllers
import userController from "./controller/userController.js";

// db
import { startService } from "./models/postgresql.js";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

// const pool = new Pool({
//   user: "damnjoejoe",
//   host: "localhost",
//   database: "chat-node-app",
//   port: 5432,
// });

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", express.static(path.join(__dirname, "static/users")));

// connect and sync with database
startService();

// routes
app.use("/users", userController);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`User server running on port ${PORT}`);
});
