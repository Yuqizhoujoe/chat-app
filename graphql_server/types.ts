export type User = {
    _id: string;
    username: string;
    email?: string;
    avatar: string;
}

export type Message = {
    _id: string;
    content: string;
    username: string;
    timestamp: string;
    avatar: string;
}

export type Room = {
    _id: string;
    roomId: string;
    name: string;
    picture: string;
    description: string;
    users: User[]
    messages: Message[]
}

export type Context = {
    token: string
}