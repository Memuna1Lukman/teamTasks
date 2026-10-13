import { apiClient } from './client'

export const getCurrentUser = () => apiClient('/auth/me')

export function login(email, password) {
  const body = new URLSearchParams({ username: email, password })
  return apiClient('/auth/login', {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}

export function register(email, fullName, password) {
  return apiClient('/users/', {
    method: 'POST',
    body: JSON.stringify({ email, full_name: fullName, password }),
    headers: { 'Content-Type': 'application/json' },
  })
}

export const logout = () => apiClient('/auth/logout', { method: 'POST' })
