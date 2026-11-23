import { STATUSES, PRIORITIES } from '../data/sampleTasks'

export default function FilterTabs({ status, onStatus, priority, onPriority, counts, onReset, dirty }) {
  const tabs = ['All', ...STATUSES]
  return (
    <div className="filters">
      <div className="tabs" role="group" aria-label="Filter by status">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            className={`tab ${status === t ? 'is-active' : ''}`}
            aria-pressed={status === t}
            onClick={() => onStatus(t)}
          >
            {t} <span className="count">{counts[t]}</span>
          </button>
        ))}
      </div>

      <div className="filter-right">
        <label htmlFor="priority-filter" className="select-label">Priority:</label>
        <select id="priority-filter" value={priority} onChange={(e) => onPriority(e.target.value)}>
          <option value="All">All</option>
          {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        {dirty && <button type="button" className="link-btn" onClick={onReset}>Reset</button>}
      </div>
    </div>
  )
}