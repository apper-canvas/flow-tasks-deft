import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "No tasks yet", 
  message = "Add your first task to get started with Flow Tasks.", 
  actionText = "Add Task",
  onAction,
  illustration = "CheckSquare"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Empty state illustration */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full scale-150"></div>
        <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border-2 border-primary/20 empty-illustration">
          <ApperIcon name={illustration} size={48} className="text-primary/60" />
        </div>
        
        {/* Floating elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-accent to-warning rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-gradient-to-r from-success to-info rounded-full opacity-60 animate-bounce" style={{ animationDelay: "0.5s" }}></div>
      </div>

      {/* Empty state content */}
      <div className="space-y-4 max-w-md">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{message}</p>
      </div>

      {/* Call to action */}
      {onAction && (
        <div className="mt-8 space-y-3">
          <Button 
            onClick={onAction}
            variant="primary"
            size="lg"
            className="px-8"
          >
            <ApperIcon name="Plus" size={20} className="mr-2" />
            {actionText}
          </Button>
          
          <p className="text-sm text-gray-500">
            Start organizing your tasks and boost your productivity
          </p>
        </div>
      )}

      {/* Decorative arrow (pointing up to quick add) */}
      {onAction && (
        <div className="mt-6 opacity-60">
          <ApperIcon name="ArrowUp" size={24} className="text-primary/40 animate-bounce" />
        </div>
      )}
    </div>
  )
}

export default Empty