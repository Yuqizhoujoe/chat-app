const RoomType = `
    type Message {
        _id: ID
        content: String!
        username: String!
        avatar: String!
        timestamp: String
    }

    type Room {
        _id: ID!
        roomId: ID!
        name: String!
        picture: String!
        desctiption: String!
        users: [User]
        messages: [Message]
    }

    type Query {
        rooms: [Room]
        room(roomId: ID!): Room
    }

    type Mutation {
        joinRoom(roomId: ID!, username: String!): Room
    }
`

export default RoomType;