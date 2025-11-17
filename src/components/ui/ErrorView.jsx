import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const ErrorView = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading your tasks. Please try again.", 
  onRetry,
  showRetry = true 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md mx-auto space-y-6">
        {/* Error icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-red-200 rounded-full"></div>
          <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-r from-error/10 to-error/20 rounded-full border border-error/20">
            <ApperIcon name="AlertCircle" size={36} className="text-error" />
          </div>
        </div>

        {/* Error content */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          {showRetry && onRetry && (
            <Button 
              onClick={onRetry}
              variant="primary"
              size="lg"
              className="w-full"
            >
              <ApperIcon name="RefreshCw" size={20} className="mr-2" />
              Try Again
            </Button>
          )}
          
          <Button 
            onClick={() => window.location.reload()}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            <ApperIcon name="RotateCcw" size={20} className="mr-2" />
            Refresh Page
          </Button>
        </div>

        {/* Help text */}
        <p className="text-sm text-gray-500 mt-6">
          If the problem persists, try refreshing the page or clearing your browser cache.
        </p>
      </div>
    </div>
  )
}

export default ErrorView