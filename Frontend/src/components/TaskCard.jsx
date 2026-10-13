import Button from './Button'

export default function TaskCard({ task, onComplete, onDelete }) {
  const done = task.status === 'DONE'
  return (
    <article className="task-card">
      <div>
        <p className="task-meta">{task.priority} · {task.status.replace('_', ' ')}</p>
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
      </div>
      <div className="task-actions">
        {!done && <Button onClick={() => onComplete(task.id)}>Complete</Button>}
        <button className="text-button" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </article>
  )
}
