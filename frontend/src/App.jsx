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
    <main className="app-shell">
      <section className="hero card">
        <p className="eyebrow">Notepads</p>
        <h1>Write fast, keep things simple.</h1>
        <p className="subtitle">Create notes and read them back from one clean interface.</p>
      </section>

      <section className="card form-card">
        <form onSubmit={handleSubmit} className="form-grid">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
          <textarea name="content" placeholder="Content" rows="5" value={form.content} onChange={handleChange} />
          <button type="submit">Create notepad</button>
        </form>
      </section>

      {error ? <p className="message error">{error}</p> : null}
      {loading ? <p className="message">Loading...</p> : null}

      <section className="notes-section">
        <div className="section-header">
          <h2>Saved notepads</h2>
          <span>{notepads.length} total</span>
        </div>

        <div className="notes-list">
          {notepads.map((notepad) => (
            <article key={notepad.id} className="note-card card">
              <div className="note-meta">
                <strong>{notepad.title}</strong>
                <small>ID {notepad.id}</small>
              </div>
              <p>{notepad.content}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
