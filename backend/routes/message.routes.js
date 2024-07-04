import express from "express"
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute,getMessages);  
// getMessages btw current user and user id passed

router.post("/send/:id", protectRoute,sendMessage);  
// This means protect the route before running the sendMessage function, we do this via protectRoute middleware
// so the protectRoute is a authorization we are adding so only the users who pass the function can sendMessage


export default router;