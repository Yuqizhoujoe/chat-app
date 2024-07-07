import mongoose from "mongoose";

import { MessgaeModel } from "../types/model";

const messageSchema = new mongoose.Schema<MessgaeModel>({
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

