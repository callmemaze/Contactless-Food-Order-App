import PostMessage from "./model.js";
import mongoose from "mongoose";

export const getMenu = async (req, res) => {
  try {
    const postMessages = await PostMessage.find({ name: req.query.res });
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
