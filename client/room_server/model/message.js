import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  content: String,
  username: String,
  userAvatar: String,
  roomId: String,
});

function mapMessageData(data) {
  return {
    roomId: data.roomId || "",
    username: data.username || "",
    content: data.content || "",
    userAvatar: data.userAvatar || "",
    timestamp: data.timestamp || new Date().toISOString(),
  };
}

export { messageSchema as default, mapMessageData };
