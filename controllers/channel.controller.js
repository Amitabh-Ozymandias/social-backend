import Channel from "../models/channel.model.js";
import Guild from "../models/guild.model.js";

// Create a new channel in a guild
export const createChannel = async (req, res) => {
  try {
    const { guildId } = req.params;
    const { name, type } = req.body;

    if (!name) return res.status(400).json({ message: "Channel name required" });

    // Find the guild
    const guild = await Guild.findById(guildId);
    if (!guild) return res.status(404).json({ message: "Guild not found" });

    // Check that user is the owner of the guild
    if (guild.owner.toString() !== req.userId) {
      return res.status(403).json({ message: "Only guild owner can create channels" });
    }

    // Create channel
    const newChannel = await Channel.create({
      name,
      type: type || "text",
      guild: guild._id,
    });

    // Add channel to guild
    guild.channels.push(newChannel._id);
    await guild.save();

    res.status(201).json({ message: "Channel created", channel: newChannel });
  } catch (error) {
    console.error("Create channel error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all channels of a guild
export const getGuildChannels = async (req, res) => {
  try {
    const { guildId } = req.params;

    const guild = await Guild.findById(guildId).populate("channels");
    if (!guild) return res.status(404).json({ message: "Guild not found" });

    res.status(200).json({ channels: guild.channels });
  } catch (error) {
    console.error("Get channels error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
