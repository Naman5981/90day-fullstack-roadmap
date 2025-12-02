import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header({ completedTasks, totalTasks, progressPercent, userName }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="mb-8 animate-slide-up">
      {/* Floating background orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-3 font-['Outfit']">
            <span className="gradient-text-blue">90-Day Roadmap</span>
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            Track your journey from Full-Stack to DevOps & AI Engineering
          </p>
          {userName && (
            <div className="flex items-center gap-2 mt-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="text-gray-400">
                Welcome back,{' '}
                <span className="font-bold gradient-text">{userName}</span>!
              </p>
            </div>
          )}
        </div>

        <div className="ml-4">
          <button
            onClick={handleLogout}
            className="group px-5 py-2.5 glass-dark text-white font-semibold rounded-xl hover:glass-strong transition-all duration-300 flex items-center gap-2 hover-glow"
          >
            <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Progress Card with Glassmorphism */}
      <div className="glass-strong rounded-2xl p-6 shadow-lg backdrop-blur-xl relative overflow-hidden group hover-glow">
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer"></div>
        </div>

        <div className="flex justify-between items-center mb-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">Overall Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold gradient-text-blue">{progressPercent}%</span>
            <span className="text-gray-400 text-sm">
              {completedTasks}/{totalTasks} tasks
            </span>
          </div>
        </div>

        {/* Modern Progress Bar */}
        <div className="relative h-4 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${progressPercent}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
