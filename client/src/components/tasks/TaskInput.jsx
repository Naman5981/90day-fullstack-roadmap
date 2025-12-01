import { useState } from 'react'

export default function TaskInput({ onAddTask, isAdmin }) {
  const [text, setText] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAddTask({ text: text.trim(), parentId: null })
    setText('')
  }

  if (!isAdmin) return null

  return (
    <form onSubmit={handleAdd} className="flex gap-2">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add custom task..."
        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors">Add</button>
    </form>
  )
}

