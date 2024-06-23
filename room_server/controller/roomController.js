import express from "express";
import Room, { mapRoomData } from "../model/room.js";
import { mapMessageData } from "../model/message.js";
import upload from "../middleware/multer.js";

const router = express.Router();

const createRoom = async (req, res) => {
  try {
    const roomData = mapRoomData(req);
    console.log("ROOM_CONTROLLER_ROOM_DATA: ", roomData);
    const room = new Room({
      ...roomData,
      users: [],
      messages: [],
    });
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (error) {
    console.error("ROOM_CONTROLLER_ROOM_CREATE_ERROR: ", error);
    res.status(500).json({ error: error.message });
  }
};

const getRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    res.status(200).json(room);
  } catch (error) {
    console.error("ROOM_CONTROLLER_GET_ROOM_ERROR: ", error);
    res.status(500).json({ error: error.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("ROOM_CONTROLLER_GET_ROOMS_ERROR: ", error);
    res.status(500).json({ error: error.message });
  }
};

const joinRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { userId } = req.body;
    console.log("ROOM_CONTROLLER_JOIN_ROOM_INPUT: ", { roomId, userId });

    if (!userId) {
      return res.status(404).json({ error: "Missing User Id" });
    }

    // get room data
    const room = await Room.findById(roomId);
    console.log("ROOM_CONTROLLER_JOIN_ROOM: ", room);
    if (!room) {
      return res.status(404).json({ error: `Room ${roomId} is not found!` });
    }

    if (!room.users.includes(userId)) room.users.push(userId);

    // if (room.users.includes(userId)) {
    //     return res.status(500).json()
    // }

    const updatedRoom = await room.save();
    return res.status(200).json(updatedRoom);
  } catch (error) {
    console.error("ROOM_CONTROLLER_JOIN_ROOM_ERROR: ", error);
    res.status(500).json({ error: error.message });
  }
};

const saveMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messageData = mapMessageData(req.body);
    console.log("ROOM_CONTROLLER_SAVE_MESSAGE_INPUT: ", {
      roomId,
      messageData,
    });

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found!" });
    }

    room.messages.push(messageData);
    const newRoom = await room.save();
    res.status(200).json(newRoom);
  } catch (error) {
    console.error("ROOM_CONTROLLER_SAVE_MESSAGE_ERROR: ", error);
    res.status(500).json({ error: error.message });
  }
};

router.post("/create-room", upload.single("picture"), createRoom);
router.post("/join-room/:roomId", joinRoom);
router.post("/save-message/:roomId", saveMessage);

router.get("/", getRooms);
router.get("/:roomId", getRoom);

export default router;
