import { useEffect, useState } from 'react'
import { createNotepad, fetchNotepads } from './api'

const emptyForm = {
  title: '',
  content: '',
}

export default function App() {
  const [notepads, setNotepads] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNotepads()
  }, [])

  async function loadNotepads() {
    try {
      setError('')
      setLoading(true)
      const data = await fetchNotepads()
      setNotepads(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setError('')
      await createNotepad(form)
      setForm(emptyForm)
      await loadNotepads()
    } catch (err) {
      setError(err.message)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Notepads</h1>
      <p>Small app to create and read notes.</p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          rows="5"
          value={form.content}
          onChange={handleChange}
        />
        <button type="submit">Create notepad</button>
      </form>

      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}
      {loading ? <p>Loading...</p> : null}

      <section>
        <h2>Saved notepads</h2>
        <ul>
          {notepads.map((notepad) => (
            <li key={notepad.id} style={{ marginBottom: 16 }}>
              <strong>{notepad.title}</strong>
              <p>{notepad.content}</p>
              <small>ID: {notepad.id}</small>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
