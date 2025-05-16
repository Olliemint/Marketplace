export default function ProductSkeleton(){
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow animate-pulse"
              >
                <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 h-64" />
                <div className="p-4 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-10 bg-gray-200 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
