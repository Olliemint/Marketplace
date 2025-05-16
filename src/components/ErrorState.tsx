export default function ErrorState(){
    return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-2">
        Failed to load products
      </h2>
      <p className="text-gray-600 mb-6">
        We're having trouble loading our products. Please try again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
 
    )
}
