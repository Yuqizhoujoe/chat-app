import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";

import typeDefs from "./typeDefs/index.js";
import resolvers from "./resolvers/index.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";
    return { token };
  },
});

const app = express();
app.use(cors());

async function startApolloServer() {
  // start apollo server
  await server.start();

  // apply middleware to the express app
  server.applyMiddleware({ app, path: "/graphql" });

  // start the express server
  const PORT = 8004;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startApolloServer();
