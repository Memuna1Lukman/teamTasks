import Button from '../components/Button'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import { useAuth } from '../hooks/useAuth'
import { useTasks } from '../hooks/useTasks'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { tasks, loading, error, refresh, createTask, completeTask, deleteTask } = useTasks()
  const mutate = async (action) => { await action(); await refresh() }

  return <main className="dashboard"><header><div><p className="eyebrow">TASK MANAGER</p><h1>Hello, {user.full_name}</h1></div><Button onClick={logout}>Sign out</Button></header>
    <section><h2>Create a task</h2><TaskForm onCreate={(task) => mutate(() => createTask(task))} /></section>
    <section><div className="section-heading"><h2>Your tasks</h2><Button onClick={refresh}>Refresh</Button></div>
      {error && <p className="error" role="alert">{error}</p>}
      {loading ? <p>Loading tasks…</p> : tasks.length ? <div className="task-list">{tasks.map((task) => <TaskCard key={task.id} task={task} onComplete={(id) => mutate(() => completeTask(id))} onDelete={(id) => mutate(() => deleteTask(id))} />)}</div> : <p className="empty">No tasks yet. Create your first one above.</p>}
    </section>
  </main>
}
