import { useState } from 'react'
import Button from './Button'

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('MEDIUM')

  async function submit(event) {
    event.preventDefault()
    await onCreate({ title, description: description || null, priority })
    setTitle(''); setDescription(''); setPriority('MEDIUM')
  }

  return <form className="task-form" onSubmit={submit}>
    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required />
    <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" />
    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
      <option value="LOW">Low priority</option><option value="MEDIUM">Medium priority</option><option value="HIGH">High priority</option>
    </select>
    <Button type="submit">Add task</Button>
  </form>
}
