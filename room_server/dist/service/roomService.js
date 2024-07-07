import axios from "../axios";
import Room from "../model/room";
const mapRoomDataToDB = (roomData) => {
    return {
        ...roomData,
        picture: roomData.picture ? `/rooms/${roomData.picture}` : ""
    };
};
export const createRoom = async (roomData) => {
    const room = mapRoomDataToDB(roomData);
    const createdRoom = await Room.create(room);
    return createdRoom;
};
export const getRoom = async (roomId) => {
    const room = await Room.findById(roomId);
    return room;
};
export const getRooms = async () => {
    const rooms = await Room.find();
    return rooms;
};
export const joinRoom = async (roomId, username) => {
    const userResponse = await axios.get(`/users/${username}`);
    const user = userResponse.data;
    if (!user) {
        throw Error(`USER_NOT_FOUND_${username}`);
    }
    const room = await Room.findById(roomId);
    if (!room) {
        throw Error(`ROOM_NOT_FOUND_${roomId}`);
    }
    const roomUsers = room.users || [];
    const existedUser = roomUsers.find(u => u.username === user.username);
    if (!existedUser) {
        roomUsers.push({ username: user.username, avatar: user.avatar });
    }
    room.users = roomUsers;
    const updatedRoom = await room.save();
    return updatedRoom;
};
export const saveMessage = async (message) => {
    const { roomId } = message;
    if (!roomId)
        throw Error(`MISSING_ROOM_ID`);
    const room = await Room.findById(roomId);
    if (!room)
        throw Error(`ROOM_${roomId}_NOT_AVAILABLE`);
    room.messages.push(message);
    const updatedRoom = await room.save();
    return updatedRoom;
};
