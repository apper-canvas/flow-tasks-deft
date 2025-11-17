import listsData from "@/services/mockData/lists.json"
import { taskService } from "@/services/api/taskService"

let lists = [...listsData]

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

export const listService = {
  async getAll() {
    await delay(200)
    // Update task counts
    const allTasks = await taskService.getAll()
    const updatedLists = lists.map(list => ({
      ...list,
      taskCount: allTasks.filter(task => task.listId === list.name.toLowerCase() && !task.completed).length
    }))
    return updatedLists
  },

  async getById(id) {
    await delay(200)
    const list = lists.find(l => l.Id === parseInt(id))
    if (!list) {
      throw new Error("List not found")
    }
    return { ...list }
  },

  async create(listData) {
    await delay(300)
    const newList = {
      Id: Math.max(...lists.map(l => l.Id), 0) + 1,
      name: listData.name || "",
      color: listData.color || "#6366f1",
      order: listData.order || lists.length + 1,
      taskCount: 0
    }
    lists.push(newList)
    return { ...newList }
  },

  async update(id, updates) {
    await delay(300)
    const index = lists.findIndex(l => l.Id === parseInt(id))
    if (index === -1) {
      throw new Error("List not found")
    }
    
    lists[index] = {
      ...lists[index],
      ...updates,
      Id: parseInt(id)
    }
    
    return { ...lists[index] }
  },

  async delete(id) {
    await delay(300)
    const index = lists.findIndex(l => l.Id === parseInt(id))
    if (index === -1) {
      throw new Error("List not found")
    }
    const deletedList = lists[index]
    lists.splice(index, 1)
    return { ...deletedList }
  }
}