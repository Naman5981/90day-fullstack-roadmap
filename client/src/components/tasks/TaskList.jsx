import TaskItem from './TaskItem'

export default function TaskList({ tasks, isAdmin }) {
  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white border-2 border-dashed border-gray-300 rounded-lg">
        No tasks to display
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map(item => (
        <TaskItem key={item.id} item={item} level={0} isAdmin={isAdmin} />
      ))}
    </div>
  )
}

