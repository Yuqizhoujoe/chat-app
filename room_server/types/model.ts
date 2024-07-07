import { Document } from "mongoose"

export type MessageData = {
    timestamp: string,
    content: string,
    username: string,
    avatar: string,
    roomId?: string
}

export interface MessgaeModel extends Document, MessageData {

}

export type UserData = {
    username: string;
    avatar: string;
}

export interface UserModel extends Document, UserData {
}

export interface RoomModel extends Document {
    name: string;
    description: string;
    picture: string;
    roomId: string;
    users: UserData[];
    messages: MessageData[]
}

export type RoomData = {
    name?: string;
    description?: string;
    picture?: string;
}