// env config
import "./config.js";

import express from "express";
import cors from "cors";
import path from "path";

// connect mongodb local server
import "./model/index.js";

// controllers
import roomController from "./controller/roomController.js";

// services
import { runKafka } from "./service/kafkaService.js";

// get __dirname in ES module scope
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// server the static file
app.use("/rooms", express.static(path.join(__dirname, "static/rooms")));

// Run Kafka
runKafka();

// controllers
app.use("/rooms", roomController);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
