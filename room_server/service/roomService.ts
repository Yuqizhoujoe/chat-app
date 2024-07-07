import axios from "../axios";
import Room from "../model/room";

// types
import { MessageData, RoomModel, UserModel, RoomData } from "../types/model"
import { AxiosResponse } from "axios";

const mapRoomDataToDB = (roomData: RoomData) => {
    return {
        ...roomData,
        picture: roomData.picture ? `/rooms/${roomData.picture}` : ""
    }
}

export const createRoom = async (roomData: RoomData): Promise<RoomModel> => {
    const room = mapRoomDataToDB(roomData);
    const createdRoom = await Room.create(room);
    return createdRoom;
}

export const getRoom = async (roomId: string): Promise<RoomModel | null> => {
    const room = await Room.findOne({ roomId: roomId });
    return room;
}

export const getRooms = async (): Promise<RoomModel[]> => {
    const rooms = await Room.find();
    return rooms;
}

export const joinRoom = async (roomId: string, username: string): Promise<RoomModel> => {
    const userResponse: AxiosResponse<UserModel> = await axios.get<UserModel>(`/users/${username}`);
    const user = userResponse.data;

    if (!user) {
        throw Error(`USER_NOT_FOUND_${username}`);
    }

    const room = await Room.findOne({ roomId });
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
}

export const saveMessage = async (message: MessageData): Promise<RoomModel> => {
    const { roomId } = message;
    if (!roomId) throw Error(`MISSING_ROOM_ID`);

    const room = await Room.findById(roomId);
    if (!room) throw Error(`ROOM_${roomId}_NOT_AVAILABLE`);

    room.messages.push(message);
    const updatedRoom = await room.save();
    return updatedRoom;
}