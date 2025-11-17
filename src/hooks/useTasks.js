import { useState, useEffect, useCallback } from "react"
import { taskService } from "@/services/api/taskService"
import { toast } from "react-toastify"

export function useTasks(listId = null) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      let data
      if (listId) {
        data = await taskService.getByListId(listId)
      } else {
        data = await taskService.getAll()
      }
      setTasks(data)
    } catch (err) {
      setError(err.message)
      console.error("Error loading tasks:", err)
    } finally {
      setLoading(false)
    }
  }, [listId])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [...prev, newTask])
      toast.success("Task created successfully!")
      return newTask
    } catch (err) {
      toast.error("Failed to create task")
      console.error("Error creating task:", err)
      throw err
    }
  }

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates)
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
      return updatedTask
    } catch (err) {
      toast.error("Failed to update task")
      console.error("Error updating task:", err)
      throw err
    }
  }

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id)
      setTasks(prev => prev.filter(task => task.Id !== parseInt(id)))
      toast.success("Task deleted successfully!")
    } catch (err) {
      toast.error("Failed to delete task")
      console.error("Error deleting task:", err)
      throw err
    }
  }

  const toggleComplete = async (id) => {
    try {
      const updatedTask = await taskService.toggleComplete(id)
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
      
      if (updatedTask.completed) {
        toast.success("Task completed! 🎉")
      } else {
        toast.success("Task restored!")
      }
      
      return updatedTask
    } catch (err) {
      toast.error("Failed to update task")
      console.error("Error toggling task:", err)
      throw err
    }
  }

  const updateTaskOrder = async (taskId, newOrder, newListId) => {
    try {
      const updatedTask = await taskService.updateOrder(taskId, newOrder, newListId)
      // Reload all tasks to get updated order
      await loadTasks()
      return updatedTask
    } catch (err) {
      toast.error("Failed to reorder task")
      console.error("Error updating task order:", err)
      throw err
    }
  }

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    updateTaskOrder
  }
}