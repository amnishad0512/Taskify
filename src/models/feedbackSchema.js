import { Schema, model } from "mongoose";

const feedbackSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
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

const Feedback = model("Feedbacks", feedbackSchema);
export default Feedback;