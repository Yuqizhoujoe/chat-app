const UserType = `
    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String!
    }

    type Query {
        user (username: String!): User
        users: [User]
    }
`

export default UserType;