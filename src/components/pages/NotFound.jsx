import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-100 flex items-center justify-center px-6">
      <div className="text-center max-w-md mx-auto space-y-8">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
            <ApperIcon name="FileQuestion" size={64} className="text-primary/60" />
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-accent to-warning rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-gradient-to-r from-success to-info rounded-full opacity-60 animate-bounce" style={{ animationDelay: "0.5s" }}></div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
          <p className="text-gray-600 leading-relaxed">
            Oops! The page you're looking for seems to have wandered off. 
            Don't worry, let's get you back on track with your tasks.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => navigate("/")}
            variant="primary"
            size="lg"
            className="w-full"
            icon="Home"
          >
            Back to Tasks
          </Button>
          
          <Button 
            onClick={() => window.history.back()}
            variant="secondary"
            size="lg"
            className="w-full"
            icon="ArrowLeft"
          >
            Go Back
          </Button>
        </div>

        {/* Help Text */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? The page you're looking for might have been moved or deleted.
          </p>
          <div className="mt-3 flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            <div className="w-1 h-1 bg-gradient-to-r from-secondary to-accent rounded-full"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-accent to-warning rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound