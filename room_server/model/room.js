import mongoose from "mongoose";

// models
import messageSchema from "./message.js";

const roomSchema = new mongoose.Schema({
  name: String,
  picture: String,
  description: String,
  users: [String],
  messages: [messageSchema],
});

const Room = mongoose.model("Room", roomSchema);

function mapRoomData(req) {
  const { name, description } = req.body;
  const picture = req.file ? `/rooms/${req.file.filename}` : "";
  return {
    name,
    description,
    picture,
  };
}

export { Room as default, mapRoomData };
