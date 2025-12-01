const Task = require('../models/Task');
const transformTask = require('../utils/transformTask');

const taskService = {
    // Get all tasks
    async getAllTasks() {
        const tasks = await Task.find().sort({ order: 1, createdAt: 1 });
        return tasks.map(transformTask);
    },

    // Create a new task
    async createTask(taskData) {
        const newTask = await Task.create({
            text: taskData.text,
            parentId: taskData.parentId || null,
            isExpanded: taskData.isExpanded || false,
            completed: false
        });
        return transformTask(newTask);
    },

    // Update a task
    async updateTask(id, updates) {
        const task = await Task.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );
        if (!task) throw new Error('Task not found');
        return transformTask(task);
    },

    // Toggle task completion
    async toggleCompletion(id) {
        const task = await Task.findById(id);
        if (!task) throw new Error('Task not found');
        task.completed = !task.completed;
        const updatedTask = await task.save();
        return transformTask(updatedTask);
    },

    // Toggle task expanded state
    async toggleExpanded(id) {
        const task = await Task.findById(id);
        if (!task) throw new Error('Task not found');
        task.isExpanded = !task.isExpanded;
        const updatedTask = await task.save();
        return transformTask(updatedTask);
    },

    // Delete task and all children
    async deleteTaskWithChildren(id) {
        const task = await Task.findById(id);
        if (!task) throw new Error('Task not found');

        const deleteRecursive = async (taskId) => {
            const children = await Task.find({ parentId: taskId });
            for (const child of children) {
                await deleteRecursive(child._id);
            }
            await Task.findByIdAndDelete(taskId);
        };

        await deleteRecursive(task._id);
        return { message: 'Task and children deleted' };
    },

    // Clear all completed tasks
    async clearCompleted() {
        await Task.deleteMany({ completed: true });
        return { message: 'Completed tasks deleted' };
    }
};

module.exports = taskService;

