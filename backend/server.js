// Package import
import path from "path";
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
const PORT = process.env.PORT || 5000;

// Deploy
const __dirname = path.resolve();
// This gives us absolute path to the root file

// app.get("/", (req, res) => {
//     // root route http://localhost:5000/
//     res.send("Welcome to my website!");
// })

// Middleware
app.use(express.json());  // To parse the incoming requests with JSON payloads ( from req.body)
app.use(cookieParser());  // We use this middleware to access the cookies, before calling any routes

// We use this middleware to extract fields from req.body to parse the database JSON schema
app.use("/api/auth", authRoutes); 
// Message Routes 
app.use("/api/messages", messageRoutes);
// user Routes
app.use("/api/users", userRoutes);


app.use(express.static(path.join(__dirname, "/frontend/dist")));  
// static function is generally used to serve static files in our frontend applications(like HTML, CSS, JS, audio, image files etc)
// So when we build this application and deploy it using vite, it will bundle the whole frontend codes into the dist folder, this we do for optimisation.

// Now any route apart from the upper ones will render index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    // This'll send the HTML file
});
// This way we can run our frontend from server as well

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
})