import { Response } from "../helper/helper.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
};

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
};

export const createUser = async (req, res) => {
    try {
        // Check if user already exists with the same email
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            Response(res, false, 400, "User with this email already exists");
            return
        }

        // If user doesn't exist, create new user
        const result = await User.create(req.body);
        Response(res, true, 201, "User created successfully", result._id);
    } catch (error) {
        Response(res, false, 400, "Something went wrong");
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    const { acknowledged, deletedCount } = await User.deleteOne({ _id: userId });
    if (acknowledged && deletedCount) {
        res.status(200).json(userId);
    } else {
        res.status(400).json(userId);
    }
};

export const updateUser = async (req, res) => {
    const { userId } = req.params;
    if (userId) {
        const userId = req.params.userId;
        const user = await User.findByIdAndUpdate({ _id: userId }, { $set: req.body },{ new: true });
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '7d' });
        res.status(200).json({ token, user });
    }
};