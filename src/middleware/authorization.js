import jwt from 'jsonwebtoken';
import { Response } from '../helper/helper.js';
import User from '../models/userModel.js';

export const authorization = async(req, res, next) => {
    if (req.headers.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization?.split(" ")[1];
        console.log('token:', token);
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log('decoded:', decoded)
            const user = await User.findById(decoded.userId);
            console.log('user:', user)
            if (user && user.role === 'Admin') {
                next();
            } else {
                Response(res, false, 403, "Don't have a permission to access this resource");
            }
        } catch (err) {
            Response(res, false, 403, "Something went wrong");
        }
    } else {
        Response(res, false, 403, "Don't have a permission to access this resource");
    }
};