import { useState, useEffect, useMemo } from "react"
import { isToday, isPast, parseISO } from "date-fns"
import { useTasks } from "@/hooks/useTasks"
import { useLists } from "@/hooks/useLists"
import Sidebar from "@/components/organisms/Sidebar"
import TaskList from "@/components/organisms/TaskList"
import QuickAddTask from "@/components/molecules/QuickAddTask"
import FilterBar from "@/components/molecules/FilterBar"
import TaskModal from "@/components/molecules/TaskModal"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const TasksPage = () => {
  const [activeListId, setActiveListId] = useState("all")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const { tasks, loading: tasksLoading, error: tasksError, loadTasks, createTask, updateTask, deleteTask, toggleComplete } = useTasks()
  const { lists, loading: listsLoading, error: listsError, loadLists } = useLists()

  const loading = tasksLoading || listsLoading
  const error = tasksError || listsError

  // Filter tasks by selected list
  const filteredTasks = useMemo(() => {
    if (activeListId === "all") return tasks
    return tasks.filter(task => task.listId === activeListId)
  }, [tasks, activeListId])

  // Calculate task counts for filters and sidebar
  const taskCounts = useMemo(() => {
    const activeTasks = tasks.filter(task => !task.completed)
    const completedTasks = tasks.filter(task => task.completed)
    
    return {
      all: activeTasks.length,
      completed: completedTasks.length,
      today: activeTasks.filter(task => task.dueDate && isToday(parseISO(task.dueDate))).length,
      overdue: activeTasks.filter(task => task.dueDate && isPast(parseISO(task.dueDate)) && !isToday(parseISO(task.dueDate))).length,
      high: activeTasks.filter(task => task.priority === "high").length,
      medium: activeTasks.filter(task => task.priority === "medium").length,
      low: activeTasks.filter(task => task.priority === "low").length,
      work: tasks.filter(task => task.listId === "work" && !task.completed).length,
      personal: tasks.filter(task => task.listId === "personal" && !task.completed).length,
      shopping: tasks.filter(task => task.listId === "shopping" && !task.completed).length
    }
  }, [tasks])

  // Handle task creation
  const handleCreateTask = async (taskData) => {
    try {
      await createTask({
        ...taskData,
        listId: activeListId === "all" ? "work" : activeListId
      })
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  // Handle task editing
  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  // Handle task save from modal
  const handleSaveTask = async (taskId, taskData) => {
    try {
      if (taskId) {
        await updateTask(taskId, taskData)
      } else {
        await createTask(taskData)
      }
      setEditingTask(null)
    } catch (error) {
      console.error("Failed to save task:", error)
    }
  }

  // Handle task deletion with confirmation
  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId)
      } catch (error) {
        console.error("Failed to delete task:", error)
      }
    }
  }

  // Handle task restoration (toggle complete back to false)
  const handleRestoreTask = async (taskId) => {
    try {
      await toggleComplete(taskId)
    } catch (error) {
      console.error("Failed to restore task:", error)
    }
  }

  // Handle opening add task modal
  const handleAddTaskModal = () => {
    setEditingTask(null)
    setIsTaskModalOpen(true)
  }

  // Handle closing task modal
  const handleCloseModal = () => {
    setIsTaskModalOpen(false)
    setEditingTask(null)
  }

  // Show loading state
  if (loading) {
    return <Loading />
  }

  // Show error state
  if (error) {
    return (
      <ErrorView 
        title="Failed to load tasks"
        message="We encountered an error while loading your tasks and lists. Please try refreshing the page."
        onRetry={() => {
          loadTasks()
          loadLists()
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar
        lists={lists}
        activeListId={activeListId}
        onSelectList={setActiveListId}
        taskCounts={taskCounts}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-surface border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeListId === "all" ? "All Tasks" : lists.find(l => l.name.toLowerCase() === activeListId)?.name || "Tasks"}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {taskCounts[activeListId] || 0} active tasks
                {taskCounts.completed > 0 && ` · ${taskCounts.completed} completed`}
              </p>
            </div>
            
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddTaskModal}
              icon="Plus"
            >
              Add Task
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Quick Add */}
            <QuickAddTask 
              onAdd={handleCreateTask}
              currentListId={activeListId === "all" ? "work" : activeListId}
            />

            {/* Filter Bar */}
            <FilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              taskCounts={taskCounts}
            />

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              activeFilter={activeFilter}
              onToggleComplete={toggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onRestore={handleRestoreTask}
              onAddTask={handleAddTaskModal}
            />
          </div>
        </main>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        task={editingTask}
        currentListId={activeListId === "all" ? "work" : activeListId}
      />
    </div>
  )
}

export default TasksPage