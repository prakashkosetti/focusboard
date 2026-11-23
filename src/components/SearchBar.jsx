import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <Search size={14} aria-hidden="true" />
      <label htmlFor="task-search" className="sr-only">Search tasks by title</label>
      <input
        id="task-search"
        type="search"
        placeholder="Find a task…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}