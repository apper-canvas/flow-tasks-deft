import ApperIcon from "@/components/ApperIcon"

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-sm mx-auto px-6">
        {/* Animated logo */}
        <div className="relative mx-auto w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 animate-pulse"></div>
          <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg">
            <ApperIcon name="CheckSquare" size={28} className="text-white" />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Loading Flow Tasks</h2>
          <p className="text-sm text-gray-600">Getting your tasks ready...</p>
        </div>

        {/* Progress indicator */}
        <div className="w-full max-w-xs mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton cards */}
        <div className="space-y-4 mt-8">
          <div className="bg-surface rounded-lg p-4 border shadow-sm">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-4"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg p-4 border shadow-sm">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading