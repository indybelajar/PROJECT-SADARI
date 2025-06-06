// controllers/videoUserController.js
import { v2 as cloudinary } from "cloudinary";

console.log("--- Video User Controller Loaded ---");
console.log("Cloud Name (Global):", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key (Global):", process.env.CLOUDINARY_API_KEY);
console.log("API Secret (Global):", process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getUserVideosFromCloudinary = async (req, res) => {
  console.log("--- getUserVideosFromCloudinary Called ---");
  try {
    // Konfigurasi Cloudinary (optional, bisa cukup sekali di awal)
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    console.log("Cloudinary Config (Inside Try):", cloudinary.config());
    console.log("Attempting to fetch resources from Cloudinary...");

    // Mendapatkan list video yang diupload
    const result = await cloudinary.api.resources({
      resource_type: "video",
      type: "upload",
    });

    console.log("Cloudinary API Result:", result);

    // Kirimkan array resources video
    res.json(result.resources);
  } catch (error) {
    console.error("--- Error in getUserVideosFromCloudinary ---");
    console.error("Error fetching videos from Cloudinary:", error);

    res.status(500).json({
      message: "Failed to fetch videos from Cloudinary",
      error: {
        message: error.message || "Unknown error",
        code: error.code || "No code",
        details: error.details || "No details",
      },
    });
  }
};

export { getUserVideosFromCloudinary };
