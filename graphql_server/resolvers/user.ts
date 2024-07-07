import axios from "../axios";
import { User } from "../types"

const userResolver = {
    Query: {
        user: async (parent: unknown, args: { username: string }): Promise<User> => {
            const response = await axios.get(`http://localhost:8001/users/${args.username}`);
            return response.data;
        },
        users: async (): Promise<User[]> => {
            const response = await axios.get(`http://localhost:8001/users`);
            console.log(response)
            return response.data;
        }
    }
}

export default userResolver;