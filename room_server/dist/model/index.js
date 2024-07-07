import mongoose from "mongoose";
import { retry } from "../util";
const connectMongoDB = () => {
    const url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
    const connect = () => mongoose.connect(url);
    retry(connect, 3);
};
try {
    connectMongoDB();
    console.log("CONNECT_MONGO_DB_SERVER");
}
catch (error) {
    console.error("CONNECT_MONGO_DB_SERVER_ERROR: ", error);
}
