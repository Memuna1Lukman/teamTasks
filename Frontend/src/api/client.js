const API_URL = import.meta.env.VITE_API_URL ?? 'https://teamtasks-raw.vercel.app/'

export async function apiClient(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.detail || 'Something went wrong. Please try again.')
  }

  if (response.status === 204) return null
  return response.json()
}
