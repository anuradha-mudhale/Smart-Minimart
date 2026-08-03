// DB connection import
const db = require('../config/db');

// Password hashing
const bcrypt = require('bcryptjs');

// JWT token

const jwt = require('jsonwebtoken');


// ================= REGISTER =================
exports.register = (req, res) => {

    const { name, email, password } = req.body;

    // 🔴 Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required ❌" });
    }

    // 🔴 Check user already exists
    const checkSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
            return res.status(400).json({ message: "Email already exists ❌" });
        }

        // password hash
        const hashedPassword = bcrypt.hashSync(password, 10);

        // 👉 default role USER = 2
        const role_id = 2;

        const insertSql = "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)";

        db.query(insertSql, [name, email, hashedPassword, role_id], (err, result) => {

            if (err) return res.status(500).json(err);

            res.json({ message: "User registered successfully ✅" });
        });
    });
};


// ================= LOGIN =================
exports.login = (req, res) => {

    const { email, password } = req.body;

    // 🔴 validation
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required ❌" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {

        if (err) return res.status(500).json(err);

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found ❌" });
        }

        const user = results[0];

        // password compare
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials ❌" });
        }


        const token = jwt.sign(
            { id: user.id, role: user.role_id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 🔴 IMPORTANT: password remove
        delete user.password;

        res.json({
            message: "Login successful ✅",
            token,
            user
        });
    });
};