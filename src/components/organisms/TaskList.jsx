import { useState, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { isToday, isPast, parseISO } from "date-fns"
import TaskCard from "@/components/molecules/TaskCard"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskList = ({ 
  tasks = [], 
  activeFilter = "all",
  onToggleComplete, 
  onEdit, 
  onDelete,
  onRestore,
  onAddTask,
  className 
}) => {
  const [completedExpanded, setCompletedExpanded] = useState(false)

  // Filter tasks based on active filter
  const filteredTasks = useMemo(() => {
    const activeTasks = tasks.filter(task => !task.completed)
    const completedTasks = tasks.filter(task => task.completed)

    const applyFilter = (taskList) => {
      switch (activeFilter) {
        case "today":
          return taskList.filter(task => 
            task.dueDate && isToday(parseISO(task.dueDate))
          )
        case "overdue":
          return taskList.filter(task => 
            task.dueDate && isPast(parseISO(task.dueDate)) && !isToday(parseISO(task.dueDate))
          )
        case "high":
          return taskList.filter(task => task.priority === "high")
        case "medium":
          return taskList.filter(task => task.priority === "medium")
        case "low":
          return taskList.filter(task => task.priority === "low")
        case "completed":
          return completedTasks
        default:
          return taskList
      }
    }

    return {
      active: applyFilter(activeTasks).sort((a, b) => a.order - b.order),
      completed: activeFilter === "completed" ? completedTasks : completedTasks.slice(0, completedExpanded ? undefined : 5)
    }
  }, [tasks, activeFilter, completedExpanded])

  const hasActiveTasks = filteredTasks.active.length > 0
  const hasCompletedTasks = filteredTasks.completed.length > 0
  const totalCompletedTasks = tasks.filter(task => task.completed).length

  // Show empty state if no tasks match the filter
  if (!hasActiveTasks && !hasCompletedTasks) {
    const emptyMessages = {
      today: {
        title: "No tasks due today",
        message: "You're all caught up for today! Add a new task or check other filters.",
        illustration: "Calendar"
      },
      overdue: {
        title: "No overdue tasks",
        message: "Great job staying on top of your deadlines!",
        illustration: "CheckCircle"
      },
      high: {
        title: "No high priority tasks",
        message: "No urgent tasks at the moment. You can focus on medium or low priority items.",
        illustration: "ArrowUp"
      },
      medium: {
        title: "No medium priority tasks",
        message: "All your medium priority tasks are complete!",
        illustration: "Minus"
      },
      low: {
        title: "No low priority tasks",
        message: "No low priority tasks to work on right now.",
        illustration: "ArrowDown"
      },
      completed: {
        title: "No completed tasks yet",
        message: "Start completing some tasks to see them here!",
        illustration: "CheckSquare"
      }
    }

    const config = emptyMessages[activeFilter] || {
      title: "No tasks found",
      message: "Add your first task to get started with Flow Tasks.",
      illustration: "CheckSquare"
    }

    return (
      <div className={className}>
        <Empty
          title={config.title}
          message={config.message}
          illustration={config.illustration}
          actionText="Add Task"
          onAction={activeFilter !== "completed" ? onAddTask : undefined}
        />
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Active Tasks */}
      {hasActiveTasks && activeFilter !== "completed" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <ApperIcon name="List" size={20} className="mr-2 text-gray-500" />
              {activeFilter === "all" ? "Active Tasks" : "Filtered Tasks"}
              <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                {filteredTasks.active.length}
              </span>
            </h3>
          </div>

          <div className="space-y-3 group">
            <AnimatePresence mode="wait">
              {filteredTasks.active.map((task) => (
                <TaskCard
                  key={task.Id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {hasCompletedTasks && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCompletedExpanded(!completedExpanded)}
              className="flex items-center space-x-2 text-left hover:text-gray-900 transition-colors duration-200 group"
            >
              <ApperIcon 
                name={completedExpanded ? "ChevronDown" : "ChevronRight"} 
                size={16} 
                className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200" 
              />
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <ApperIcon name="CheckCircle" size={20} className="mr-2 text-success" />
                Completed Tasks
                <span className="ml-2 px-2 py-1 bg-success/10 text-success text-sm font-medium rounded-full">
                  {totalCompletedTasks}
                </span>
              </h3>
            </button>

            {totalCompletedTasks > 5 && !completedExpanded && (
              <button
                onClick={() => setCompletedExpanded(true)}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                +{totalCompletedTasks - 5} more
              </button>
            )}
          </div>

          <AnimatePresence>
            {(completedExpanded || activeFilter === "completed") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-3 overflow-hidden"
              >
                {filteredTasks.completed.map((task) => (
                  <TaskCard
                    key={task.Id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onRestore={onRestore}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default TaskList