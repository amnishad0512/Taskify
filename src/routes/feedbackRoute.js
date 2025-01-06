import express from "express";
import { feedback } from "../controllers/feedbackController.js";
const feedbackRoute = express.Router();

feedbackRoute.post("/", feedback);

export default feedbackRoute;