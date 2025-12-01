export default function TaskFilters({ filter, setFilter, topLevelTodos, onClearCompleted, isAdmin }) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      <button
        onClick={() => setFilter('all')}
        className={`px-4 py-2 rounded-md transition-colors ${filter === 'all' ? 'bg-sky-600 text-white' : 'bg-white hover:bg-gray-100'
          }`}
      >
        All ({topLevelTodos.length})
      </button>
      <button
        onClick={() => setFilter('active')}
        className={`px-4 py-2 rounded-md transition-colors ${filter === 'active' ? 'bg-sky-600 text-white' : 'bg-white hover:bg-gray-100'
          }`}
      >
        Active ({topLevelTodos.filter(t => !t.completed).length})
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={`px-4 py-2 rounded-md transition-colors ${filter === 'completed' ? 'bg-sky-600 text-white' : 'bg-white hover:bg-gray-100'
          }`}
      >
        Completed ({topLevelTodos.filter(t => t.completed).length})
      </button>
      {isAdmin && (
        <button
          onClick={onClearCompleted}
          className="ml-auto px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          Clear Completed
        </button>
      )}
    </div>
  )
}

