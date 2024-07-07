import roomResolvers from "./resolvers/room";
import userResolver from "./resolvers/user";

export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...roomResolvers.Query
    },
    Room: {
        ...roomResolvers.Room
    },
    Mutation: {
        ...roomResolvers.Mutation
    }
}