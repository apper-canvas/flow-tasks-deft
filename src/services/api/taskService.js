import tasksData from "@/services/mockData/tasks.json"

let tasks = [...tasksData]

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(200)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  },

  async getByListId(listId) {
    await delay(200)
    return tasks.filter(t => t.listId === listId).map(t => ({ ...t }))
  },

  async create(taskData) {
    await delay(300)
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      title: taskData.title || "",
      description: taskData.description || "",
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      listId: taskData.listId || "work",
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      order: taskData.order || tasks.filter(t => t.listId === taskData.listId).length + 1
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, updates) {
    await delay(300)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    
    tasks[index] = {
      ...tasks[index],
      ...updates,
      Id: parseInt(id)
    }
    
    if (updates.completed && !tasks[index].completedAt) {
      tasks[index].completedAt = new Date().toISOString()
    } else if (updates.completed === false) {
      tasks[index].completedAt = null
    }
    
    return { ...tasks[index] }
  },

  async delete(id) {
    await delay(300)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    const deletedTask = tasks[index]
    tasks.splice(index, 1)
    return { ...deletedTask }
  },

  async updateOrder(taskId, newOrder, newListId) {
    await delay(200)
    const taskIndex = tasks.findIndex(t => t.Id === parseInt(taskId))
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }

    const task = tasks[taskIndex]
    const oldListId = task.listId

    // Update task list and order
    tasks[taskIndex] = {
      ...task,
      listId: newListId || task.listId,
      order: newOrder
    }

    // Reorder other tasks in the old list
    if (oldListId !== newListId) {
      tasks.filter(t => t.listId === oldListId && t.Id !== parseInt(taskId))
        .sort((a, b) => a.order - b.order)
        .forEach((t, index) => {
          const tIndex = tasks.findIndex(task => task.Id === t.Id)
          tasks[tIndex].order = index + 1
        })
    }

    // Reorder tasks in the new list
    tasks.filter(t => t.listId === (newListId || task.listId))
      .sort((a, b) => a.order - b.order)
      .forEach((t, index) => {
        const tIndex = tasks.findIndex(task => task.Id === t.Id)
        tasks[tIndex].order = index + 1
      })

    return { ...tasks[taskIndex] }
  },

  async toggleComplete(id) {
    await delay(200)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Task not found")
    }
    
    const newCompleted = !tasks[index].completed
    tasks[index] = {
      ...tasks[index],
      completed: newCompleted,
      completedAt: newCompleted ? new Date().toISOString() : null
    }
    
    return { ...tasks[index] }
  }
}