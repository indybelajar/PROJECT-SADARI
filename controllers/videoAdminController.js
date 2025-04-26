import Video from "../models/videoAdminModel.js";
import { v2 as cloudinary } from "cloudinary";

const uploadVideo = async (req, res) => {
  try {
    // Log environment variables di dalam fungsi (pastikan nilainya ada)
    console.log("--- Upload Video Request ---");
    console.log("Cloud Name (Function):", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API Key (Function):", process.env.CLOUDINARY_API_KEY);
    console.log("API Secret (Function):", process.env.CLOUDINARY_API_SECRET);
    console.log("File Path:", req.file ? req.file.path : 'No file path');

    // Konfigurasi Cloudinary di dalam fungsi
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("Cloudinary Config:", cloudinary.config()); // Log konfigurasi setelah diatur

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });

    console.log("Cloudinary Upload Result:", result); // Log hasil upload dari Cloudinary

    const newVideo = new Video({
      title: req.body.title,
      description: req.body.description,
      videoUrl: result.secure_url,
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    console.error("--- Upload Video Error ---");
    console.error("Error saat upload:", error);
    res.status(500).json({ message: error.message });
  }
};

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVideo = await Video.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { uploadVideo, getVideos, updateVideo, deleteVideo };