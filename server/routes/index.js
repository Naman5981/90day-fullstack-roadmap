const express = require('express');
const router = express.Router();
const taskRoutes = require('./taskRoutes');
const adminRoutes = require('./adminRoutes');

// Mount routes
router.use('/tasks', taskRoutes);
router.use('/admin', adminRoutes);

module.exports = router;

