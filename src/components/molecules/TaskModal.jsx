import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Textarea from "@/components/atoms/Textarea"

const TaskModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  task = null, 
  currentListId = "work" 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    listId: currentListId
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate || "",
        listId: task.listId || currentListId
      })
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        listId: currentListId
      })
    }
  }, [task, currentListId, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    setIsSubmitting(true)
    try {
      await onSave(task?.Id, {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: formData.dueDate || null
      })
      onClose()
    } catch (error) {
      console.error("Failed to save task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 modal-backdrop"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-surface rounded-2xl shadow-2xl border border-gray-200 z-10"
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mr-3">
                <ApperIcon name={task ? "Edit2" : "Plus"} size={18} className="text-white" />
              </div>
              {task ? "Edit Task" : "Create Task"}
            </h2>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
            >
              <ApperIcon name="X" size={18} />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <Input
              label="Task Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="What needs to be done?"
              required
              autoFocus
              disabled={isSubmitting}
            />

            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Add more details about this task..."
              rows={3}
              disabled={isSubmitting}
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Priority"
                value={formData.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
                disabled={isSubmitting}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </Select>

              <Input
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <Select
              label="List"
              value={formData.listId}
              onChange={(e) => handleChange("listId", e.target.value)}
              disabled={isSubmitting}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
            </Select>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                disabled={!formData.title.trim()}
              >
                {task ? "Update Task" : "Create Task"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default TaskModal