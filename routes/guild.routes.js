import express from "express";
import { createGuild, joinGuild, getUserGuilds } from "../controllers/guild.controller.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

// All routes require authentication
router.post("/create", isAuth, createGuild);
router.post("/join/:guildId", isAuth, joinGuild);
router.get("/my-guilds", isAuth, getUserGuilds);

export default router;
