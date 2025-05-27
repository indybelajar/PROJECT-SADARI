import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient();

const uploadVideo = async (req, res) => {
  try {
    console.log("--- Upload Video Request ---");
    console.log("Cloud Name (Function):", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API Key (Function):", process.env.CLOUDINARY_API_KEY);
    console.log("API Secret (Function):", process.env.CLOUDINARY_API_SECRET);
    console.log("File Path:", req.file ? req.file.path : 'No file path');

    if (!req.file) {
      return res.status(400).json({ message: "File video harus di-upload" });
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("Cloudinary Config:", cloudinary.config());

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });

    console.log("Cloudinary Upload Result:", result);

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title dan description harus diisi" });
    }

    const newVideo = await prisma.video.create({
      data: {
        title,
        description,
        videoUrl: result.secure_url,
      },
    });

    res.status(201).json(newVideo);
  } catch (error) {
    console.error("--- Upload Video Error ---");
    console.error("Error saat upload:", error);
    res.status(500).json({ message: error.message });
  }
};

const getVideos = async (req, res) => {
  try {
    const videos = await prisma.video.findMany();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedVideo = await prisma.video.update({
      where: { id: (id) },
      data: {
        title,
        description,
      },
    });

    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.video.delete({
      where: { id: (id) },
    });

    res.json({ message: "Video berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { uploadVideo, getVideos, updateVideo, deleteVideo };
