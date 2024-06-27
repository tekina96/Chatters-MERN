// Package import
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// File import
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

// Variables
// const app = express();  // We comment out here because we are calling from socket.js file
const PORT = process.env.PORT;


app.get("/", (req, res) => {
    // root route http://localhost:5000/
    res.send("Welcome to my website!");
})

// Middleware
app.use(express.json());  // To parse the incoming requests with JSON payloads ( from req.body)
app.use(cookieParser());  // We use this middleware to access the cookies, before calling any routes

// We use this middleware to extract fields from req.body to parse the database JSON schema
app.use("/api/auth", authRoutes); 
// Message Routes 
app.use("/api/messages", messageRoutes);
// user Routes
app.use("/api/users", userRoutes);




server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
})