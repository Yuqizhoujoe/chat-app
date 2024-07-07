import express from "express";
import upload from "../middleware/multer";
// Services 
import { createRoom, getRoom, getRooms, joinRoom } from "../service/roomService";
const router = express.Router();
const createRoomController = async (req, res) => {
    try {
        const { description, name } = req.body;
        const picture = req.file ? req.file.fieldname : "";
        const createdRoom = await createRoom({ name, description, picture });
        return res.status(200).json(createdRoom);
    }
    catch (error) {
        console.error("CREATE_ROOM_CONTROLLER_ERROR: ", error);
        return res.status(500).json({ error: error.message });
    }
};
const getRoomController = async (req, res) => {
    try {
        const { roomId } = req.params;
        console.log(roomId);
        const room = await getRoom(roomId);
        if (!room) {
            return res.status(404).json({ error: `ROOM_${roomId}_NOT_FOUND!` });
        }
        return res.status(200).json(room);
    }
    catch (error) {
        console.error(`GET_ROOM_CONTROLLER_ERROR: `, error);
        return res.status(500).json({ error: error.message });
    }
};
const getAllRoomController = async (req, res) => {
    try {
        const rooms = await getRooms();
        return res.status(200).json(rooms);
    }
    catch (error) {
        console.error("GET_ALL_ROOM_CONTROLLER_ERROR: ", error);
        return res.status(500).json({ error: error.message });
    }
};
const joinRoomController = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { username } = req.body;
        console.log(roomId, username);
        const updatedRoom = await joinRoom(roomId, username);
        return res.status(200).json(updatedRoom);
    }
    catch (error) {
        console.error("JOIN_ROOM_CONTROLLER_ERROR: ", error);
        return res.status(500).json({ error: error.message });
    }
};
router.get("/", getAllRoomController);
router.get("/:roomId", getRoomController);
router.put("/:roomId", joinRoomController);
router.post("/create-room", upload.single("picture"), createRoomController);
export default router;
