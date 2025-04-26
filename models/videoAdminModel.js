import mongoose from "mongoose";
import { adminDB } from "../database.js"; // Import dbAdmin

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  videoUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Video = adminDB.model('Video', videoSchema);

export default Video;
