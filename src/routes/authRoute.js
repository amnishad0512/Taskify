import express from "express";
import { emailVerification, forgetPassword, login, logout, registration, resetPassword, verifyOTP } from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/registration", registration);
authRoute.post("/emailVerification", emailVerification);
authRoute.post("/verifyOTP", verifyOTP);
authRoute.post("/forgetPassword", forgetPassword);
authRoute.post("/resetPassword/:token", resetPassword);
authRoute.post("/logout", logout);

export default authRoute