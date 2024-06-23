import { gql } from "apollo-server-express";

const messageTypeDefs = gql`
  type Message {
    _id: ID
    content: String!
    username: String!
    userAvatar: String!
    timestamp: String
  }
`;

export default messageTypeDefs;
