import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js";
import { authorization } from "../middleware/authorization.js";
const userRoute = express.Router();

userRoute.get("/", authorization, getAllUsers);
userRoute.get("/:userId", getUser);
userRoute.post("/", authorization, createUser);
userRoute.delete("/:userId", deleteUser);
userRoute.put("/:userId", updateUser);

export default userRoute;