import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, addTask, clearCompleted } from '../todoSlice';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TaskInput from '../components/tasks/TaskInput';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskList from '../components/tasks/TaskList';
import ErrorDisplay from '../components/common/ErrorDisplay';

export default function HomePage() {
  const { user } = useAuth();
  const { items: todos, status, error } = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  // Get only top-level tasks (no parent)
  const topLevelTodos = todos.filter(t => t.parentId === null);

  // Filter logic
  const getFilteredTodos = () => {
    if (filter === 'all') return topLevelTodos;
    if (filter === 'completed') return topLevelTodos.filter(t => t.completed);
    if (filter === 'active') return topLevelTodos.filter(t => !t.completed);
    return topLevelTodos;
  };

  const filtered = getFilteredTodos();

  // Calculate overall progress
  const totalTasks = todos.length;
  const completedTasks = todos.filter(t => t.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (status === 'failed') {
    return <ErrorDisplay error={error} onRetry={() => dispatch(fetchTasks())} />;
  }

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="w-full max-w-5xl mx-auto relative z-10">
        <Header
          completedTasks={completedTasks}
          totalTasks={totalTasks}
          progressPercent={progressPercent}
          userName={user?.name}
        />

        <section className="mb-6">
          <TaskInput
            onAddTask={(task) => dispatch(addTask(task))}
            isAdmin={true}
          />
        </section>

        <section className="mb-6">
          <TaskFilters
            filter={filter}
            setFilter={setFilter}
            topLevelTodos={topLevelTodos}
            onClearCompleted={() => dispatch(clearCompleted())}
            isAdmin={true}
          />

          {status === 'loading' ? (
            <div className="glass-strong rounded-2xl p-12 text-center animate-scale backdrop-blur-xl">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}></div>
                </div>
                <p className="text-gray-300 font-medium">Loading your roadmap...</p>
              </div>
            </div>
          ) : (
            <TaskList tasks={filtered} isAdmin={true} />
          )}
        </section>

        <Footer />
      </div>
    </div>
  );
}
