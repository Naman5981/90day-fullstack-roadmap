export default function Footer() {
  return (
    <footer className="text-sm text-gray-600 mt-8 bg-white p-4 rounded-lg shadow-sm">
      <div className="mb-2">
        <strong>💡 Tips:</strong>
      </div>
      <ul className="list-disc list-inside space-y-1 text-gray-600">
        <li>Click the chevron icon to expand/collapse week tasks</li>
        <li>Double-click any task to edit it</li>
        <li>Your progress is saved to the database - access from any device! ☁️</li>
        <li>Track shows completed subtasks for each week</li>
      </ul>
    </footer>
  )
}

