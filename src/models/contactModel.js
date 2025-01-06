import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Working", "Completed"],
        default: 'Working',
    },
    seen: {
        type: Boolean,
        enum: [true, false],
        default: false,
    },
}, { timestamps: true });

const Contact = model("Contacts", contactSchema);
export default Contact;