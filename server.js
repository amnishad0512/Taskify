import express from 'express';
import connectDB from './src/config/db.js';
import Router from './src/routes/route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const server = express();
server.use(express.json());
server.use(cookieParser());
server.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

connectDB();

server.use("/api/v1", Router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
