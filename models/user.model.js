import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" }, // user profile pic
    status: {
      type: String,
      enum: ["online", "idle", "dnd", "offline"],
      default: "offline",
    },
    aboutMe: { type: String, default: "" },
    guilds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guild",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
