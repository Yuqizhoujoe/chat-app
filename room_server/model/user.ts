import mongoose from "mongoose";

import { UserModel } from "../types/model";

const userSchema = new mongoose.Schema<UserModel>({
    username: {
        type: String,
        unique: true,
    },
    avatar: String
})

export default userSchema;