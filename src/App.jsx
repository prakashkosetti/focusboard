import { useMemo, useState } from 'react'
import { ListChecks, Loader, CheckCircle2, Percent, Plus } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import ConfirmDialog from './components/ConfirmDialog'
import useLocalStorage from './hooks/useLocalStorage'
import { sampleTasks } from './data/sampleTasks'
import SearchBar from './components/SearchBar'
import FilterTabs from './components/FilterTabs'
import FocusNotes from './components/FocusNotes'

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks)
  const [nav, setNav] = useState('overview')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [query, setQuery] = useState('')
const [status, setStatus] = useState('All')
const [priority, setPriority] = useState('All')

  const stats = useMemo(() => {
    const total = tasks.length
    const inProgress = tasks.filter((t) => t.status === 'In progress').length
    const completed = tasks.filter((t) => t.status === 'Completed').length
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
    return { total, inProgress, completed, percent }
  }, [tasks])

  const visible = useMemo(() => {
  const q = query.trim().toLowerCase()
  return tasks.filter(
    (t) =>
      (status === 'All' || t.status === status) &&
      (priority === 'All' || t.priority === priority) &&
      t.title.toLowerCase().includes(q)
  )
}, [tasks, query, status, priority])

const counts = {
  All: tasks.length,
  'To do': tasks.filter((t) => t.status === 'To do').length,
  'In progress': stats.inProgress,
  Completed: stats.completed,
}

const resetFilters = () => { setQuery(''); setStatus('All'); setPriority('All') }

  const newId = () => Date.now() * 1000 + Math.floor(Math.random() * 1000)

  const changeStatus = (id, newStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)))
  }

  const openCreate = () => { setEditing(null); setFormOpen(true) }
  const openEdit = (task) => { setEditing(task); setFormOpen(true) }
  const closeForm = () => { setFormOpen(false); setEditing(null) }

  const saveTask = (values) => {
    if (editing) {
      setTasks((prev) => prev.map((t) => (t.id === editing.id ? { ...t, ...values, id: t.id } : t)))
    } else {
      setTasks((prev) => [{ ...values, id: newId() }, ...prev])
    }
    closeForm()
  }

  const confirmDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== deleting.id))
    setDeleting(null)
  }

  return (
    <div className="app">
      <Sidebar active={nav} onSelect={setNav} />
      <div className="main-col">
        <Header />
        <main className="content">
          <div className="page-head">
            <div>
              <h1>Your work, in focus.</h1>
              <p className="sub">Plan your day, stay organized, and celebrate small wins.</p>
            </div>
            <button type="button" className="btn primary" onClick={openCreate}>
              <Plus size={14} aria-hidden="true" /> New task
            </button>
          </div>

<FocusNotes />

<section aria-labelledby="overview-h"></section>

          <section aria-labelledby="overview-h">
            <h2 id="overview-h" className="section-title">Overview</h2>
            <div className="stats">
              <StatCard title="Total tasks" value={stats.total} hint="Across all projects" icon={ListChecks} />
              <StatCard title="In progress" value={stats.inProgress} hint="Keep the momentum" icon={Loader} tone="blue" />
              <StatCard title="Completed" value={stats.completed} hint="Great work this week" icon={CheckCircle2} tone="green" />
              <StatCard title="Completion" value={`${stats.percent}%`} hint="Of all tasks" icon={Percent} tone="amber" />
            </div>
          </section>

          <section className="tasks" aria-labelledby="tasks-h">
            <h2 id="tasks-h" className="section-title">My tasks</h2>
            <p className="sub">Manage and track everything in one place.</p>
           <div className="toolbar">
  <FilterTabs
    status={status}
    onStatus={setStatus}
    priority={priority}
    onPriority={setPriority}
    counts={counts}
    onReset={resetFilters}
    dirty={status !== 'All' || priority !== 'All' || query !== ''}
  />
  <SearchBar value={query} onChange={setQuery} />
</div>

<p className="sr-only" aria-live="polite">{visible.length} tasks shown</p>

          <TaskList
            tasks={visible}
            hasAny={tasks.length > 0}
            onStatus={changeStatus}
            onEdit={openEdit}
            onDelete={setDeleting}
          />
          </section>
        </main>
      </div>

      {formOpen && (
        <TaskForm
          key={editing ? editing.id : 'new'}
          task={editing}
          onSave={saveTask}
          onCancel={closeForm}
        />
      )}

      {deleting && (
        <ConfirmDialog
          task={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}