// app/livescores/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="container mx-auto">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-8 mx-auto"></div>
          
          <div className="shadow-lg rounded-xl overflow-hidden bg-white dark:bg-gray-800">
            <div className="h-12 bg-gray-300 dark:bg-gray-700"></div>
            
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex justify-between items-center h-full">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}