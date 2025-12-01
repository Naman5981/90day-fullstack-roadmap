const taskService = require('../services/taskService');
const mongoose = require('mongoose');

const taskController = {
    // GET all tasks
    async getAllTasks(req, res) {
        try {
            // Check if MongoDB is connected
            const connectionState = mongoose.connection.readyState;
            if (connectionState !== 1) {
                return res.status(503).json({ 
                    message: 'Database not connected. Please check MongoDB connection.',
                    error: 'MongoDB connection state: ' + connectionState
                });
            }

            const tasks = await taskService.getAllTasks();
            res.json(tasks);
        } catch (err) {
            console.error('❌ Error fetching tasks:', err);
            res.status(500).json({ 
                message: err.message || 'Internal server error',
                error: 'Failed to fetch tasks from database'
            });
        }
    },

    // POST create task
    async createTask(req, res) {
        try {
            const newTask = await taskService.createTask(req.body);
            res.status(201).json(newTask);
        } catch (err) {
            console.error('Error creating task:', err);
            res.status(400).json({ message: err.message });
        }
    },

    // PUT update task
    async updateTask(req, res) {
        try {
            const updatedTask = await taskService.updateTask(req.params.id, req.body);
            res.json(updatedTask);
        } catch (err) {
            console.error('Error updating task:', err);
            res.status(err.message === 'Task not found' ? 404 : 500).json({ message: err.message });
        }
    },

    // PATCH toggle completion
    async toggleCompletion(req, res) {
        try {
            const updatedTask = await taskService.toggleCompletion(req.params.id);
            res.json(updatedTask);
        } catch (err) {
            console.error('Error toggling task:', err);
            res.status(err.message === 'Task not found' ? 404 : 500).json({ message: err.message });
        }
    },

    // PATCH toggle expanded
    async toggleExpanded(req, res) {
        try {
            const updatedTask = await taskService.toggleExpanded(req.params.id);
            res.json(updatedTask);
        } catch (err) {
            console.error('Error toggling expanded:', err);
            res.status(err.message === 'Task not found' ? 404 : 500).json({ message: err.message });
        }
    },

    // DELETE task
    async deleteTask(req, res) {
        try {
            const result = await taskService.deleteTaskWithChildren(req.params.id);
            res.json(result);
        } catch (err) {
            console.error('Error deleting task:', err);
            res.status(err.message === 'Task not found' ? 404 : 500).json({ message: err.message });
        }
    },

    // DELETE clear completed
    async clearCompleted(req, res) {
        try {
            const result = await taskService.clearCompleted();
            res.json(result);
        } catch (err) {
            console.error('Error clearing completed:', err);
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = taskController;

