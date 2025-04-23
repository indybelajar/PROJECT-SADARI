import Admin from '../models/adminLog.js';
import bcrypt from 'bcrypt';

// REGISTER
export const registAdmin = async (req, res) => {
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newRegist = new Admin({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword // Save the hashed password
        });

        const savedRegist = await newRegist.save();
        res.status(201).json(savedRegist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// LOGIN
export const loginAdmin = async (req, res) => {
    // Validasi jika email dan password tidak ada dalam body request
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Email dan password harus diisi!" });
    }

    // Validasi jika ada field lain selain email dan password
    const allowedFields = ['email', 'password'];
    const requestFields = Object.keys(req.body);

    // Cek apakah ada field selain email dan password
    const invalidFields = requestFields.filter(field => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
        return res.status(400).json({ message: `Field ${invalidFields.join(', ')} tidak diperbolehkan` });
    }

    try {
        const newLogin = await Admin.findOne({ email: req.body.email });

        // Check if the admin exists and compare passwords
        if (!newLogin || !(await bcrypt.compare(req.body.password, newLogin.password))) {
            return res.status(401).json({ message: "Email atau password salah!" });
        }

        res.status(200).json({ message: "Login berhasil!", admin: newLogin });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// GET ALL ADMINS
export const getAllAdmin = async (req, res) => {
    try {
        const admins = await Admin.find(); // Fetch all admin records
        res.status(200).json(admins); // Send the list of admins as a response
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors
    }
};
