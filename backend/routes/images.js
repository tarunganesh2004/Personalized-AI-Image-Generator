// server/routes/images.js
const express = require('express');
const axios = require('axios');
const Image = require('../models/Image');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/generate', authMiddleware, async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/images/generations',
            { prompt, n: 1, size: "1024x1024" },
            { headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` } }
        );

        const imageUrl = response.data.data[0].url;
        const image = await Image.create({ url: imageUrl, prompt, userId: req.user.id });

        res.json(image);
    } catch (error) {
        res.status(500).json({ message: "Image generation failed", error });
    }
});

module.exports = router;
