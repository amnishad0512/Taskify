import express from 'express';
import taskRoute from "./taskRoute.js";
import userRoute from "./userRoute.js";
import authRoute from './authRoute.js';

const Router = express.Router();

Router.use('/tasks', taskRoute);
Router.use('/users', userRoute);
Router.use('/auth', authRoute);

export default Router;