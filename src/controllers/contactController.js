import { Response } from "../helper/helper.js";
import Contact from "../models/contactModel.js";

export const contact = async (req, res) => {
    console.log(req.body);
    const result = await Contact.create(req.body);
    Response(res, true, 201, "Message sent successfully", result._id);
};
