// Helper function to transform MongoDB document to frontend format
const transformTask = (task) => ({
    id: task._id.toString(),
    text: task.text,
    completed: task.completed,
    parentId: task.parentId ? task.parentId.toString() : null,
    isExpanded: task.isExpanded,
    order: task.order
});

module.exports = transformTask;

