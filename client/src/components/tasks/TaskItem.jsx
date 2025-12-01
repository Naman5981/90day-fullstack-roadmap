import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ChevronRightIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/24/outline'
import { toggleTodo, deleteTodo, editTodo, toggleExpanded } from '../../todoSlice'

export default function TaskItem({ item, level = 0, isAdmin = false }) {
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(item.text)
  const allTodos = useSelector(state => state.todos.items)

  // Find children of this task
  const children = allTodos.filter(t => t.parentId === item.id)
  const hasChildren = children.length > 0

  const saveEdit = () => {
    if (text.trim() && isAdmin) {
      dispatch(editTodo({ id: item.id, text: text.trim() }))
    }
    setEditing(false)
  }

  const isWeekHeader = level === 0 && item.text.startsWith('WEEK')

  return (
    <div className="w-full">
      <div
        className={`flex items-center justify-between gap-2 p-3 rounded-md transition-colors ${isWeekHeader
          ? 'bg-gradient-to-r from-sky-50 to-blue-50 border-l-4 border-sky-500'
          : level === 0
            ? 'bg-white border border-gray-200'
            : 'bg-gray-50 border-l-2 border-gray-300'
          }`}
        style={{ marginLeft: `${level * 24}px` }}
      >
        <div className="flex items-center gap-3 flex-1">
          {hasChildren && (
            <button
              onClick={() => dispatch(toggleExpanded(item.id))}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              {item.isExpanded ? (
                <ChevronDownIcon className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}

          {!hasChildren && <div className="w-6" />}

          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => dispatch(toggleTodo(item.id))}
            className="w-4 h-4 accent-sky-600 cursor-pointer"
          />

          {editing ? (
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={e => e.key === 'Enter' && saveEdit()}
              className="flex-1 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              autoFocus
            />
          ) : (
            <span
              className={`flex-1 ${item.completed ? 'line-through text-gray-400' : ''} ${isWeekHeader ? 'font-semibold text-sky-900' : ''
                }`}
              onDoubleClick={() => isAdmin && setEditing(true)}
            >
              {item.text}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hasChildren && (
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
              {children.filter(c => c.completed).length}/{children.length}
            </span>
          )}
          {isAdmin && (
            <>
              {editing ? (
                <button
                  onClick={saveEdit}
                  className="px-3 py-1 text-sm bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteTodo(item.id))}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete task and all subtasks"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Render children if expanded */}
      {hasChildren && item.isExpanded && (
        <div className="mt-2 space-y-2">
          {children.map(child => (
            <TaskItem key={child.id} item={child} level={level + 1} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </div>
  )
}

