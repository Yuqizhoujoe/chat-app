import { gql } from "apollo-server-express";

const roomTypeDefs = gql`
  type Room {
    _id: ID!
    name: String!
    picture: String!
    description: String!
    users: [ID]!
    messages: [Message]!
  }

  type Query {
    rooms: [Room]!
    room(roomId: ID!): Room
  }

  type Mutation {
    joinRoom(roomId: ID!, userId: ID!): Room
  }
`;

export default roomTypeDefs;
