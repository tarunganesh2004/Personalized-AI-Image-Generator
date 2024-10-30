// server/middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware function to authenticate the token
module.exports = (req, res, next) => {
    // Get token from the headers
    const token = req.header('Authorization')?.split(' ')[1]; // Expecting 'Bearer <token>'

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request object
        next(); // Move to the next middleware
    } catch (error) {
        // Invalid token
        res.status(400).json({ message: "Invalid token." });
    }
};
