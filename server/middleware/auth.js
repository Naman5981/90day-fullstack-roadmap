const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');

// Middleware to verify JWT token for admin access
const authenticateAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token.'
        });
    }
};

module.exports = { authenticateAdmin };

