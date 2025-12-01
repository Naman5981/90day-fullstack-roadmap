import { useAuth } from '../../contexts/AuthContext'

export default function Header({ completedTasks, totalTasks, progressPercent, onLoginClick }) {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">90-Day Full-Stack Roadmap</h1>
          <p className="text-gray-600 mb-4">Track your journey from Full-Stack to DevOps & AI Engineering</p>
        </div>

        <div className="ml-4">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-4 py-2 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors shadow-sm"
            >
              Admin Login
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-semibold text-sky-600">{completedTasks}/{totalTasks} tasks ({progressPercent}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  )
}

