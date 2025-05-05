import User from '../models/userLog.js';
import bcrypt from 'bcrypt';

export const registUser = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Validasi username (hanya huruf, angka, underscore)
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({
            message: "Username hanya boleh mengandung huruf, angka, dan underscore tanpa spasi atau karakter spesial."
        });
    }

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Konfirmasi password tidak cocok dengan password."
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// LOGIN
export const loginUser = async (req, res) => {

    if(!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Email dan password harus diisi!" });
    }

    const allowedFields = ['email', 'password'];
    const requestFields = Object.keys(req.body);

    const invalidFields = requestFields.filter(field => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
        return res.status(400).json({ message: `Field ${invalidFields.join(', ')} tidak diperbolehkan` });
    }
    
    try {
        const foundUser = await User.findOne({ email: req.body.email });
        if (!foundUser || !(await bcrypt.compare(req.body.password, foundUser.password))) {
            return res.status(401).json({ message: "Email atau password salah!" });
        }
        res.status(200).json({ message: "Login berhasil!", user: foundUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all user records
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors
    }
};
