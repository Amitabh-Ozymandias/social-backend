import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import guildRouter from "./routes/guild.routes.js";
import channelRouter from "./routes/channel.routes.js";
import messageRouter from "./routes/message.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://social-frontend-fawn.vercel.app", // frontend port
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/guild", guildRouter);
app.use("/api/channel", channelRouter);
app.use("/api/message", messageRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});