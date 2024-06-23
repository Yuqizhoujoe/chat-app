import axios from "axios";

const userResolver = {
  Query: {
    user: async (parent, args, context) => {
      const response = await axios.get(
        `http://localhost:8000/users/${args.userId}`,
        {
          headers: {
            Authorization: context.token,
          },
        }
      );
    },
  },
};

export default userResolver;
