import express from 'express';
import connectDB from './src/config/db.js';
import Router from './src/routes/route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { access } from 'fs';
import cookieSession from 'cookie-session';
import passportSession from './src/helper/passport.js'

const server = express();
server.use(express.json());
server.use(cookieParser());
server.use(cors({
    // origin: 'https://taskify.manojnishad.com', // Your frontend URL
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Session middleware
server.use(cookieSession({
    name: 'session',
    keys: ['taskify'],
    maxAge: 24 * 60 * 60 * 1000
}));

// Initialize Passport and restore authentication state from session
server.use(passport.initialize());
server.use(passport.session());


connectDB();

server.use("/api/v1", Router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
