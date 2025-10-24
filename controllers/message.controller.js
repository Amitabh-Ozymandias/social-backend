import Message from "../models/message.model.js";
import Channel from "../models/channel.model.js";

// Send a message in a channel
export const sendMessage = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { content } = req.body;

    if (!content) return res.status(400).json({ message: "Message content required" });

    const channel = await Channel.findById(channelId);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    const newMessage = await Message.create({
      content,
      sender: req.userId,
      channel: channel._id,
    });

    channel.messages.push(newMessage._id);
    await channel.save();

    res.status(201).json({ message: "Message sent", newMessage });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all messages in a channel
export const getChannelMessages = async (req, res) => {
  try {
    const { channelId } = req.params;

    const channel = await Channel.findById(channelId).populate({
      path: "messages",
      populate: { path: "sender", select: "username email" },
    });

    if (!channel) return res.status(404).json({ message: "Channel not found" });

    res.status(200).json({ messages: channel.messages });
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
