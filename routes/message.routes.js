import express from "express";
import { sendMessage, getChannelMessages } from "../controllers/message.controller.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

// Send a message
router.post("/send/:channelId", isAuth, sendMessage);

// Get messages from a channel
router.get("/:channelId", isAuth, getChannelMessages);

export default router;
