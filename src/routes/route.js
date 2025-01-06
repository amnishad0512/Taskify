import express from 'express';
import taskRoute from "./taskRoute.js";
import userRoute from "./userRoute.js";
import authRoute from './authRoute.js';
import contactRoute from './contactRoute.js';
import feedbackRoute from './feedbackRoute.js';

const Router = express.Router();

Router.use('/tasks', taskRoute);
Router.use('/users', userRoute);
Router.use('/auth', authRoute);
Router.use('/contact', contactRoute);
Router.use('/feedback', feedbackRoute);

export default Router;