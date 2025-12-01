export default function ErrorDisplay({ error, onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md border border-red-200">
        <p className="text-red-600 font-semibold mb-2">Error loading tasks</p>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

