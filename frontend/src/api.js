const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export async function fetchNotepads() {
  const response = await fetch(`${API_BASE_URL}/notepads`)
  if (!response.ok) {
    throw new Error('Failed to load notepads')
  }
  return response.json()
}

export async function createNotepad(payload) {
  const response = await fetch(`${API_BASE_URL}/notepads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to create notepad')
  }

  return response.json()
}
