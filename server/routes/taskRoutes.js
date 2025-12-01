const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateAdmin } = require('../middleware/auth');

// Public routes (read-only)
router.get('/', taskController.getAllTasks);

// Admin-only routes (write operations)
router.post('/', authenticateAdmin, taskController.createTask);
router.put('/:id', authenticateAdmin, taskController.updateTask);
router.delete('/:id', authenticateAdmin, taskController.deleteTask);
router.delete('/action/clear-completed', authenticateAdmin, taskController.clearCompleted);

// Public routes (anyone can toggle/expand)
router.patch('/:id/toggle', taskController.toggleCompletion);
router.patch('/:id/expand', taskController.toggleExpanded);

module.exports = router;

