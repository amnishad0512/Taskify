import express from "express";
import { contact } from "../controllers/contactController.js";
const contactRoute = express.Router();

contactRoute.post("/", contact);

export default contactRoute;