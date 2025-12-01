import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks, addTask, clearCompleted } from '../todoSlice'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import TaskInput from '../components/tasks/TaskInput'
import TaskFilters from '../components/tasks/TaskFilters'
import TaskList from '../components/tasks/TaskList'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorDisplay from '../components/common/ErrorDisplay'
import LoginModal from '../components/auth/LoginModal'

export default function HomePage({ isAdmin: isAdminProp }) {
  const { isAuthenticated } = useAuth()
  const isAdmin = isAdminProp || isAuthenticated
  const { items: todos, status, error } = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('all')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [minLoadingTimePassed, setMinLoadingTimePassed] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks())
    }
  }, [status, dispatch])

  // Ensure loading screen shows for at least 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingTimePassed(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Get only top-level tasks (no parent)
  const topLevelTodos = todos.filter(t => t.parentId === null)

  // Filter logic
  const getFilteredTodos = () => {
    if (filter === 'all') return topLevelTodos
    if (filter === 'completed') return topLevelTodos.filter(t => t.completed)
    if (filter === 'active') return topLevelTodos.filter(t => !t.completed)
    return topLevelTodos
  }

  const filtered = getFilteredTodos()

  // Calculate overall progress
  const totalTasks = todos.length
  const completedTasks = todos.filter(t => t.completed).length
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Show loading screen if data is loading OR minimum time hasn't passed
  if (status === 'loading' || !minLoadingTimePassed) {
    return <LoadingSpinner />
  }

  if (status === 'failed') {
    return <ErrorDisplay error={error} onRetry={() => dispatch(fetchTasks())} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-5xl mx-auto">
        <Header
          completedTasks={completedTasks}
          totalTasks={totalTasks}
          progressPercent={progressPercent}
          onLoginClick={() => setShowLoginModal(true)}
        />

        <section className="mb-4">
          <TaskInput
            onAddTask={(task) => dispatch(addTask(task))}
            isAdmin={isAdmin}
          />
        </section>

        <section className="mb-4">
          <TaskFilters
            filter={filter}
            setFilter={setFilter}
            topLevelTodos={topLevelTodos}
            onClearCompleted={() => dispatch(clearCompleted())}
            isAdmin={isAdmin}
          />

          <TaskList tasks={filtered} isAdmin={isAdmin} />
        </section>

        <Footer />
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  )
}
