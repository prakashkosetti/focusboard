import { ChevronDown } from 'lucide-react'

export default function Header() {
  return (
    <header className="topbar">
    <span className="mobile-brand">FocusBoard</span>
      <p className="crumbs">
        <span>Workspace</span> <span aria-hidden="true">/</span> <strong>Overview</strong>
      </p>
      <button type="button" className="profile" aria-label="Account menu for Jane Doe">
        <span className="avatar" aria-hidden="true">JD</span>
        <ChevronDown size={14} aria-hidden="true" />
      </button>
    </header>
  )
}