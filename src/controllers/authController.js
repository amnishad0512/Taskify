import { generateOTP, Response, sendEmail } from "../helper/helper.js";
import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const emailOTP = {

};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (isValidPassword) {
            const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '7d' });
            res.status(200).json({ token, user });
        } else {
            Response(res, false, 400, "Invalid credential");
        }
    } else {
        Response(res, false, 400, "Invalid credential");
    }
};

export const emailVerification = async (req, res) => {
    const { email } = req.body;
    const result = await User.findOne({ email });
    if (result) {
        Response(res, false, 400, "email already exist");
    } else {
        const OTP = generateOTP();
        const isOTPSend = await sendEmail('otp', email, OTP);
        if (isOTPSend) {
            emailOTP[email] = {
                OTP,
                expiresIn: new Date().getTime() + 5 * 60 * 1000
            };
            Response(res, true, 200, "OTP send successfully");
        } else {
            Response(res, false, 400, "something went wrong");
        }
    }
};

export const verifyOTP = (req, res) => {
    const { email, otp } = req.body;
    const otpDetail = emailOTP[email];
    console.log('otpDetail:', otpDetail);
    if (!otpDetail) {
        return Response(res, false, 400, "Invalid OTP");
    }

    const currentTime = new Date().getTime();
    console.log('currentTime > otpDetail.expiresAt:', currentTime > otpDetail.expiresIn);
    if (currentTime > otpDetail.expiresIn) {
        return Response(res, false, 400, "OTP has expired");
    }

    if (otpDetail.OTP == otp) {
        Response(res, true, 200, "OTP verified successfully");
        delete emailOTP[email];
        console.log('emailOTP:', emailOTP);
    } else {
        Response(res, false, 400, "Invalid OTP");
    }
};

export const registration = async (req, res) => {
    const { email, password } = req.body;
    if (email in emailOTP) {
        Response(res, false, 403, "please verify the email");
    } else {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            Response(res, false, 400, "User with this email already exists");
            return;
        }

        req.body.password = bcrypt.hashSync(password, +process.env.SALT);
        const user = await User.create(req.body);
        Response(res, true, 201, "user added successfully", user._id);
    }
};

export const forgetPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        console.log('token:', token);
        const isResetLinkSend = await sendEmail('forgetPassword', email, token);
        if (isResetLinkSend) {
            Response(res, true, 200, "Reset link send to your email");
        } else {
            Response(res, false, 400, "Something went wrong");
        }
    } else {
        Response(res, false, 400, "Email not exits");
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    console.log('token:', token);
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        Response(res, false, 400, "Password and confirm password is not same");
    } else {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findOne({ _id: decoded.userId });
            if (user) {
                user.password = bcrypt.hashSync(password, +process.env.SALT);
                await user.save();
                Response(res, true, 200, "Password reset successfully");
            } else {
                Response(res, false, 400, "Invalid token");
            }

        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                Response(res, false, 400, "Invalid token signature");
            } else if (error instanceof jwt.TokenExpiredError) {
                Response(res, false, 400, "Token has expired");
            } else {
                Response(res, false, 400, "Failed to verify token");
            }
        }
    }
};

export const logout = async (req, res) => {
    Response(res, true, 200, "logout successfully");
};

