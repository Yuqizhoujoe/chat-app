// Env Config
import "./config.js";

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { publishMessage, runKafkaProducer } from "./service/kafkaService.js";

const app = express();
app.use(cors());

const server = http.createServer(app);

// Kafka
runKafkaProducer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("message", async (message) => {
    console.log("CHAT_SERVER_RECEIVE_MESSAGE: ", message);
    // publish message to Kafka topic chat-messages
    await publishMessage(message);
    // broadcast the message to all clients
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("CLIENT_DISCONNECTED");
  });
});

server.listen(8003, () => {
  console.log(`Socket.IO server is running on http://localhost:8003`);
});
