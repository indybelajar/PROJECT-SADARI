import mongoose from "mongoose";
import { adminDB } from "../database.js"; // Import dbAdmin

const artikelAdminSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true
  },
  konten: String,
  file: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Artikel = adminDB.model('Artikel', artikelAdminSchema);

export default Artikel;

