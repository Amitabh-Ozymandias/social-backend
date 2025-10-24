import express from "express";
import { createChannel, getGuildChannels } from "../controllers/channel.controller.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

// Create a new channel in a guild
router.post("/create/:guildId", isAuth, createChannel);

// Get all channels in a guild
router.get("/guild/:guildId", isAuth, getGuildChannels);

export default router;
