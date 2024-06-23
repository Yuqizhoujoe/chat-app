import mongoose from "mongoose";
import { retry } from "../util.js";

const connectMongoDB = () => {
  const connect = () =>
    mongoose.connect("mongodb://localhost:27017/rooms", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  retry(connect, 3);
};

try {
  connectMongoDB();
  console.log("CONNECT_MONGO_DB_SERVER");
} catch (error) {
  console.error("CONNECT_MONGO_DB_SERVER_ERROR: ", error);
}
