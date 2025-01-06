import { Response } from "../helper/helper.js";
import Feedback from "../models/feedbackSchema.js";

export const feedback = async (req, res) => {
    const result = await Feedback.create(req.body);
    Response(res, true, 201, "Feedback sent successfully", result._id);
};
