import { useState, useEffect, useCallback } from "react"
import { listService } from "@/services/api/listService"
import { toast } from "react-toastify"

export function useLists() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadLists = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await listService.getAll()
      setLists(data)
    } catch (err) {
      setError(err.message)
      console.error("Error loading lists:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadLists()
  }, [loadLists])

  const createList = async (listData) => {
    try {
      const newList = await listService.create(listData)
      setLists(prev => [...prev, newList])
      toast.success("List created successfully!")
      return newList
    } catch (err) {
      toast.error("Failed to create list")
      console.error("Error creating list:", err)
      throw err
    }
  }

  const updateList = async (id, updates) => {
    try {
      const updatedList = await listService.update(id, updates)
      setLists(prev => prev.map(list => 
        list.Id === parseInt(id) ? updatedList : list
      ))
      return updatedList
    } catch (err) {
      toast.error("Failed to update list")
      console.error("Error updating list:", err)
      throw err
    }
  }

  const deleteList = async (id) => {
    try {
      await listService.delete(id)
      setLists(prev => prev.filter(list => list.Id !== parseInt(id)))
      toast.success("List deleted successfully!")
    } catch (err) {
      toast.error("Failed to delete list")
      console.error("Error deleting list:", err)
      throw err
    }
  }

  return {
    lists,
    loading,
    error,
    loadLists,
    createList,
    updateList,
    deleteList
  }
}