import axios from "../axios";

// types
import { Context, Room, Message } from "../types"

const roomResolvers = {
    Query: {
        rooms: async (): Promise<Room[]> => {
            const response = await axios.get("/rooms/");
            return response.data;
        },
        room: async (parent: unknown, args: { roomId: string }): Promise<Room> => {
            const response = await axios.get(`/rooms/${args.roomId}`);
            return response.data;
        }
    },
    Room: {
        messages: async (parent: Room): Promise<Message[]> => {
            const messages = parent.messages || [];
            messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            return messages;
        }
    },

    Mutation: {
        joinRoom: async (parent: unknown, args: { roomId: string, username: string }, context: Context): Promise<Room> => {
            console.log(args);
            const response = await axios.put(`/rooms/${args.roomId}`, { username: args.username });
            return response.data;
        }
    }
}

export default roomResolvers;