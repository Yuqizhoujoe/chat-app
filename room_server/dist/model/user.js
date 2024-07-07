import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    avatar: String
});
export default userSchema;
