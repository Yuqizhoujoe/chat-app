import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

// models
import messageSchema from "./message"
import userSchema from "./user"

// types
import { RoomModel } from "../types/model";

const roomSchema = new mongoose.Schema<RoomModel>({
    roomId: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    description: String,
    users: {
        type: [userSchema],
        default: []
    },
    messages: {
        type: [messageSchema],
        default: []
    }
})

const Room = mongoose.model("Room", roomSchema);

export default Room;
