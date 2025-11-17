import { useState } from "react"
import { motion } from "framer-motion"
import { format, isToday, isTomorrow, isPast } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"
import Checkbox from "@/components/atoms/Checkbox"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  onRestore,
  isDragging = false,
  className 
}) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleToggleComplete = async () => {
    setIsCompleting(true)
    try {
      await onToggleComplete(task.Id)
    } finally {
      setIsCompleting(false)
    }
  }

  const formatDueDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    
    if (isToday(date)) return "Today"
    if (isTomorrow(date)) return "Tomorrow"
    return format(date, "MMM d")
  }

  const getDueDateColor = (dateString) => {
    if (!dateString) return "text-gray-500"
    const date = new Date(dateString)
    
    if (isPast(date) && !isToday(date)) return "text-error"
    if (isToday(date)) return "text-warning"
    return "text-gray-500"
  }

  const priorityConfig = {
    high: { variant: "high", icon: "AlertTriangle" },
    medium: { variant: "medium", icon: "Circle" },
    low: { variant: "low", icon: "Minus" }
  }

  const priority = priorityConfig[task.priority] || priorityConfig.medium

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: task.completed ? 0.6 : 1, 
        y: 0,
        scale: isDragging ? 0.95 : 1
      }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "bg-surface rounded-xl border shadow-sm transition-all duration-200 card-hover",
        task.completed && "task-complete",
        isDragging && "drag-preview shadow-2xl",
        "hover:shadow-lg hover:border-gray-300",
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Checkbox */}
          <div className="flex-shrink-0 mt-1">
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
              disabled={isCompleting}
              size="lg"
              className={cn(
                "transition-all duration-300",
                isCompleting && "animate-pulse"
              )}
            />
          </div>

          {/* Task content */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Title and actions */}
            <div className="flex items-start justify-between">
              <h3 className={cn(
                "text-base font-semibold leading-relaxed",
                task.completed 
                  ? "text-gray-500 line-through" 
                  : "text-gray-900"
              )}>
                {task.title}
              </h3>
              
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
                {!task.completed ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(task)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-primary"
                    >
                      <ApperIcon name="Edit2" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(task.Id)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-error"
                    >
                      <ApperIcon name="Trash2" size={14} />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRestore && onRestore(task.Id)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-success"
                  >
                    <ApperIcon name="RotateCcw" size={14} />
                  </Button>
                )}
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <p className={cn(
                "text-sm leading-relaxed",
                task.completed 
                  ? "text-gray-400 line-through" 
                  : "text-gray-600"
              )}>
                {task.description}
              </p>
            )}

            {/* Meta information */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-3">
                {/* Priority badge */}
                <Badge variant={priority.variant} size="sm">
                  <ApperIcon name={priority.icon} size={12} className="mr-1" />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>

                {/* Due date */}
                {task.dueDate && (
                  <div className="flex items-center space-x-1">
                    <ApperIcon 
                      name="Calendar" 
                      size={14} 
                      className={getDueDateColor(task.dueDate)} 
                    />
                    <span className={cn(
                      "text-sm font-medium",
                      getDueDateColor(task.dueDate)
                    )}>
                      {formatDueDate(task.dueDate)}
                    </span>
                  </div>
                )}
              </div>

              {/* Drag handle */}
              {!task.completed && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing">
                  <ApperIcon name="GripVertical" size={16} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard