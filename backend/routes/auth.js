// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: "User registered" });
    } catch (error) {
        res.status(400).json({ message: "User registration failed", error });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            res.json({ token });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(400).json({ message: "Login failed", error });
    }
});

module.exports = router;
