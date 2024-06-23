import userResolver from "./user.js";
import roomResolvers from "./room.js";

const resolvers = {
  Query: {
    ...userResolver.Query,
    ...roomResolvers.Query,
  },
  Mutation: {
    ...roomResolvers.Mutation,
  },
};

export default resolvers;
