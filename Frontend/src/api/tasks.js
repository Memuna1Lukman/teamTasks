import { apiClient } from './client'

export const getTasks = () => apiClient('/tasks/')
export const createTask = (task) => apiClient('/tasks/', { method: 'POST', body: JSON.stringify(task) })
export const completeTask = (id) => apiClient(`/tasks/${id}/complete`, { method: 'PATCH' })
export const deleteTask = (id) => apiClient(`/tasks/${id}`, { method: 'DELETE' })
