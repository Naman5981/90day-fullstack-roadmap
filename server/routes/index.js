const express = require('express');
const router = express.Router();
const taskRoutes = require('./taskRoutes');
const authRoutes = require('./auth');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.use('/auth', authRoutes);

// Protected routes - require authentication
router.use('/tasks', authMiddleware, taskRoutes);

module.exports = router;
