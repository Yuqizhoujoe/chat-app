import axios from "axios";

const ROOM_RESOLVER = "ROOM_RESOLVER";

const roomResolvers = {
  Query: {
    rooms: async () => {
      const response = await axios.get("http://localhost:8000/rooms/");
      return response.data;
    },
    room: async (parent, args) => {
      const response = await axios.get(
        `http://localhost:8000/rooms/${args.roomId}`
      );
      return response.data;
    },
  },
  Room: {
    messages: async (parent, args) => {
      const messages = parent.messages || [];
      messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      return messages;
    },
  },
  Mutation: {
    joinRoom: async (parent, args, context) => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8001/users/${args.userId}`,
          {
            headers: {
              Authorization: context.token,
            },
          }
        );
        const user = userResponse.data || {};
        if (!user) {
          throw Error(`User not found!`);
        }
        console.log(`${ROOM_RESOLVER}_JOIN_ROOM_USER: `, user);

        const roomResponse = await axios.post(
          `http://localhost:8000/rooms/join-room/${args.roomId}`,
          { userId: user.id }
        );

        const roomData = roomResponse.data || {};
        if (!roomData) {
          throw Error(
            `Failed to Add user ${args.userId} to Room ${args.roomId}`
          );
        }

        console.log(`${ROOM_RESOLVER}_JOIN_ROOM_ROOM_DATA: `, roomData);
        return roomData;
      } catch (error) {
        console.error(`${ROOM_RESOLVER}_JOIN_ROOM_ERROR: `, error);
      }
    },
  },
};

export default roomResolvers;
