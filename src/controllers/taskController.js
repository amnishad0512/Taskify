import { Response } from "../helper/helper.js";
import Task from "../models/taskModel.js";

export const getAllTasks = async (req, res) => {
    const allTasks = await Task.find();
    Response(res, true, 200, "Tasks retrieved successfully", allTasks);
};

export const getAllTasksAgainstUser = async (req, res) => {
    const { userId } = req.params;
    const allTasks = await Task.find({ userId });
    Response(res, true, 200, "Tasks retrieved successfully", allTasks);
};

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.taskId);
    Response(res, true, 200, "Task retrieved successfully", task);

};

export const createTask = async (req, res) => {
    const result = await Task.create(req.body);
    Response(res, true, 201, "Task created successfully", result._id);
};

export const deleteTask = async (req, res) => {
    const taskId = req.params.taskId;
    const { acknowledged, deletedCount } = await Task.deleteOne({ _id: taskId });
    if (acknowledged && deletedCount) {
        Response(res, true, 200, "Task deleted successfully", taskId);

    } else {
        Response(res, true, 400, "Something went wrong", taskId);
    }
};

export const deleteAllTask = async (req, res) => {
    const { acknowledged, deletedCount } = await Task.deleteMany();
    if (acknowledged && deletedCount) {
        Response(res, true, 200, "Task deleted successfully");

    } else {
        Response(res, true, 400, "Something went wrong");
    }
};

export const updateTask = async (req, res) => {
    const taskId = req.params.taskId;
    const updatedTask = await Task.findByIdAndUpdate({ _id: taskId }, { $set: req.body });
    Response(res, true, 200, "Task updated successfully", taskId);
};