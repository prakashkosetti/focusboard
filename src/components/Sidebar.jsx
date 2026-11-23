import { LayoutGrid, ListChecks, CalendarDays, Settings, Layers } from 'lucide-react'

const items = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'tasks', label: 'My tasks', icon: ListChecks },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true"><Layers size={16} /></span>
        <span className="brand-name">FocusBoard</span>
      </div>
      <nav aria-label="Main navigation">
        <ul>
          {items.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                type="button"
                className={`nav-item ${active === id ? 'is-active' : ''}`}
                aria-current={active === id ? 'page' : undefined}
                onClick={() => onSelect(id)}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}