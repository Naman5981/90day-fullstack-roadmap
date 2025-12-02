const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// All routes are protected by authMiddleware in index.js
// Users can manage their own tasks

// Get all tasks for the authenticated user
router.get('/', taskController.getAllTasks);

// Create a new task
router.post('/', taskController.createTask);

// Update a task
router.put('/:id', taskController.updateTask);

// Delete a task
router.delete('/:id', taskController.deleteTask);

// Clear completed tasks
router.delete('/action/clear-completed', taskController.clearCompleted);

// Toggle task completion
router.patch('/:id/toggle', taskController.toggleCompletion);

// Toggle task expanded state
router.patch('/:id/expand', taskController.toggleExpanded);

module.exports = router;
