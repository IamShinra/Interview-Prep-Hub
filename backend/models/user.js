import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    profilePic: String,
    email: String,
    enrollnmentNo: {
        type: Number,
        unique: true,
    },
});

const User = mongoose.model("users", userSchema);

export default User;