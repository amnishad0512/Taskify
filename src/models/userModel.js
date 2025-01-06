import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: 'User',
    },
    theme: {
        type: String,
        enum: ["dark", "light"],
        default: 'light',
    },
    lang: {
        type: String,
        enum: ["en", "hi"],
        default: 'en',
    }
}, { timestamps: true });

const User = model("Users", userSchema);
export default User;