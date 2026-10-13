import { useCallback, useEffect, useState } from 'react'
import * as tasksApi from '../api/tasks'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      setTasks(await tasksApi.getTasks())
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])
  return { tasks, loading, error, refresh, createTask: tasksApi.createTask, completeTask: tasksApi.completeTask, deleteTask: tasksApi.deleteTask }
}
