import TaskCard from './TaskCard'

export default function TaskList({ tasks, hasAny, onStatus, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty">
        <p><strong>{hasAny ? 'No tasks match your search or filters.' : 'No tasks yet.'}</strong></p>
        <p>{hasAny ? 'Try a different keyword or reset the filters.' : 'Select New task to add your first one.'}</p>
      </div>
    )
  }
  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onStatus={onStatus} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}