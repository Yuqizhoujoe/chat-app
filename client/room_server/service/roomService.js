import { mapMessageData } from "../model/message.js";
import Room from "../model/room.js";

export const saveMessageToRoom = async (messageData) => {
  try {
    const { roomId } = messageData || {};

    const room = await Room.findById(roomId);
    if (!room) throw Error(`Room ${roomId} not found!`);

    const message = mapMessageData(messageData);
    console.log("ROOM_SERVICE_MESSAGE_DATA: ", message);
    room.messages.push(message);
    await room.save();
    console.log("MESSAGE_SAVE_TO_ROOM");
  } catch (error) {
    console.error("ROOM_SERVICE_SAVE_MESSAGE_ERROR: ", error);
  }
};
