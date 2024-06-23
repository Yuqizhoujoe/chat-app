import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String!
  }

  type Query {
    user(userId: ID!): User
    users: [User]!
  }
`;

export default userTypeDefs;
