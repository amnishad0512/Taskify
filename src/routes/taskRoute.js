import express from "express";
import { createTask, deleteAllTask, deleteTask, getAllTasks, getAllTasksAgainstUser, getTask, updateTask } from "../controllers/taskController.js";
import { authorization } from "../middleware/authorization.js";
const taskRoute = express.Router();

taskRoute.get("/", authorization, getAllTasks);
taskRoute.get("/user/:userId", getAllTasksAgainstUser);
taskRoute.get("/:taskId", getTask);
taskRoute.post("/", createTask);
taskRoute.delete("/:taskId", deleteTask);
taskRoute.delete("/", deleteAllTask);
taskRoute.patch("/:taskId", updateTask);

export default taskRoute;