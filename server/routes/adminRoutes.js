const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET, ADMIN_PASSWORD } = require('../config/constants');

// Admin login endpoint
router.post('/login', (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ 
                success: false,
                message: 'Password is required' 
            });
        }

        if (password !== ADMIN_PASSWORD) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid password' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { admin: true, timestamp: Date.now() },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            message: 'Login successful'
        });
    } catch (err) {
        console.error('Admin login error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Server error during login' 
        });
    }
});

module.exports = router;

