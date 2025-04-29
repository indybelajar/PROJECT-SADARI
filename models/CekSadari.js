import mongoose from "mongoose";
import { userDB } from "../database.js";

const cekSadariSchema = new mongoose.Schema({
    kemerahan: {
        type: String,
        required: true,
        enum: ['Tidak ada kemerahan', 'Terdapat kemerahan']
    },
    benjolan: {
        type: String,
        required: true,
        enum: ['Tidak ada benjolan', 'Terdapat benjolan']
    },
    cairan: {
        type: String,
        required: true,
        enum: ['Tidak ada cairan', 'Cairan ASI', 'Darah', 'Cairan Lainnya']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CekSadari = userDB.model('CekSadari', cekSadariSchema);

export default CekSadari;
