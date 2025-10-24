import Guild from "../models/guild.model.js";
import User from "../models/user.model.js";
import Channel from "../models/channel.model.js";

// Create a new Guild (server)
export const createGuild = async (req, res) => {
  try {
    const { name, icon } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Guild name is required" });
    }

    // 1️⃣ Create the guild first
    const newGuild = await Guild.create({
      name,
      icon: icon || "",
      owner: req.userId,   // set user as owner
      members: [req.userId],
      channels: [], // will add the default channel later
    });

    // 2️⃣ Create default "general" text channel linked to the guild
    const generalChannel = await Channel.create({
      name: "general",
      type: "text",
      guild: newGuild._id,
    });

    // 3️⃣ Update guild with the newly created channel
    newGuild.channels.push(generalChannel._id);
    await newGuild.save();

    // 4️⃣ Add guild to user's guilds
    const user = await User.findById(req.userId);
    user.guilds.push(newGuild._id);
    await user.save();

    res.status(201).json({ message: "Guild created", guild: newGuild });
  } catch (error) {
    console.error("Create guild error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Join an existing guild
export const joinGuild = async (req, res) => {
  try {
    const { guildId } = req.params;

    const guild = await Guild.findById(guildId);
    if (!guild) return res.status(404).json({ message: "Guild not found" });

    if (guild.members.includes(req.userId)) {
      return res.status(400).json({ message: "Already a member" });
    }

    guild.members.push(req.userId);
    await guild.save();

    const user = await User.findById(req.userId);
    user.guilds.push(guild._id);
    await user.save();

    res.status(200).json({ message: "Joined guild", guild });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all guilds of the logged-in user
export const getUserGuilds = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("guilds");
    res.status(200).json({ guilds: user.guilds });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
