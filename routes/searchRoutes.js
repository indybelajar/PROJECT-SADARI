import express from "express";
import { searchAll } from "../controllers/searchController.js";

const router = express.Router();

console.log("Search routes loaded");

// Test route untuk debug
router.get("/test", (req, res) => {
  res.json({ message: "Search route is working!" });
});

// Route utama untuk pencarian
router.get("/", searchAll);

export default router;