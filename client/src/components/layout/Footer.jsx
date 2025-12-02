export default function Footer() {
  return (
    <footer className="mt-12 text-center relative z-10">
      <div className="glass-dark rounded-2xl p-6 backdrop-blur-xl">
        <div className="mb-4">
          <h3 className="text-lg font-bold gradient-text mb-2">💡 Pro Tips</h3>
        </div>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex items-center gap-2 justify-center">
            <span className="text-purple-400">▶</span>
            Click the chevron to expand/collapse week tasks
          </li>
          <li className="flex items-center gap-2 justify-center">
            <span className="text-pink-400">✍️</span>
            Double-click any task to edit it
          </li>
          <li className="flex items-center gap-2 justify-center">
            <span className="text-cyan-400">☁️</span>
            Your progress syncs automatically - access from any device!
          </li>
          <li className="flex items-center gap-2 justify-center">
            <span className="text-violet-400">📊</span>
            Track shows completed subtasks for each week
          </li>
        </ul>

        <div className="mt-6 pt-4 border-t border-gray-700/50">
          <p className="text-gray-400 text-sm">
            Made with <span className="text-red-400 animate-pulse">♥</span> by{' '}
            <span className="gradient-text font-semibold">DevDoc</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
