// config
import "./config"

import express from "express";
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"

import { typeDefs } from "./schema"
import { resolvers } from "./resolvers"

const app = express();
const PORT = process.env.PORT || 8004;

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    await server.start();

    app.use(express.json());
    app.use("/graphql", expressMiddleware(server, {
        context: async ({ req }) => {
            const token = req.headers.authorization || "";
            return { token }
        }
    }))

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}/graphql`)
    })
}

startServer();