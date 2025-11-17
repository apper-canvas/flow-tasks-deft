import { useState } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"

const QuickAddTask = ({ onAdd, currentListId = "work", className }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    try {
      await onAdd({
        title: title.trim(),
        priority,
        dueDate: dueDate || null,
        listId: currentListId
      })
      
      // Reset form
      setTitle("")
      setPriority("medium")
      setDueDate("")
      setIsExpanded(false)
    } catch (error) {
      console.error("Failed to add task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setTitle("")
    setPriority("medium")
    setDueDate("")
    setIsExpanded(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div className={cn("bg-surface rounded-xl shadow-lg border border-gray-200 transition-all duration-300", className)}>
      {!isExpanded ? (
        // Collapsed state - quick add button
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-4 flex items-center space-x-3 text-left hover:bg-gray-50 transition-colors duration-200 rounded-xl group"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
            <ApperIcon name="Plus" size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
              Add a new task...
            </p>
          </div>
          <div className="flex-shrink-0">
            <ApperIcon name="ChevronRight" size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
          </div>
        </button>
      ) : (
        // Expanded state - full form
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg mt-1">
              <ApperIcon name="Plus" size={20} className="text-white" />
            </div>
            <div className="flex-1 space-y-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What needs to be done?"
                className="text-base border-0 shadow-none bg-transparent px-0 py-2 focus:ring-0 focus:border-b-2 focus:border-primary rounded-none"
                autoFocus
                disabled={isSubmitting}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  disabled={isSubmitting}
                  label="Priority"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </Select>
                
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  disabled={isSubmitting}
                  label="Due Date"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={isSubmitting}
              disabled={!title.trim()}
            >
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Add Task
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default QuickAddTask