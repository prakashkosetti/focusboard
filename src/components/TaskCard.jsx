import { Calendar, Pencil, Trash2, Circle, CircleDot, CheckCircle2 } from 'lucide-react'
import { STATUSES } from '../data/sampleTasks'

const statusIcon = { 'To do': Circle, 'In progress': CircleDot, Completed: CheckCircle2 }
const slug = (s) => s.toLowerCase().replace(/\s+/g, '-')

function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`)
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function TaskCard({ task, onStatus, onEdit, onDelete }) {
  const Icon = statusIcon[task.status]
  return (
    <li className={`task ${task.status === 'Completed' ? 'is-done' : ''}`}>
      <span className={`status-icon s-${slug(task.status)}`}>
        <Icon size={16} aria-hidden="true" />
        <span className="sr-only">{task.status}</span>
      </span>

      <div className="task-main">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
      </div>

      <div className="task-meta">
        <span className="chip chip-cat">{task.category}</span>
        <span className={`chip p-${slug(task.priority)}`}>{task.priority}</span>
        <span className="due"><Calendar size={12} aria-hidden="true" /> {formatDate(task.dueDate)}</span>
      </div>

      <div className="task-actions">
        <label className="sr-only" htmlFor={`status-${task.id}`}>Status for {task.title}</label>
        <select
          id={`status-${task.id}`}
          className={`status-select s-${slug(task.status)}`}
          value={task.status}
          onChange={(e) => onStatus(task.id, e.target.value)}
        >
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button type="button" className="icon-btn" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}>
          <Pencil size={14} />
        </button>
        <button type="button" className="icon-btn danger" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)}>
          <Trash2 size={14} />
        </button>
      </div>
    </li>
  )
}