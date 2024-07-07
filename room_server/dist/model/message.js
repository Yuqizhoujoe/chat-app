import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    timestamp: {
        type: String,
        default: new Date().toISOString()
    },
    content: String,
    username: String,
    avatar: String,
    roomId: String
});
export default messageSchema;
