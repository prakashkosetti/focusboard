export default function StatCard({ title, value, hint, icon: Icon, tone = 'indigo' }) {
  return (
    <article className="stat">
      <span className={`stat-icon tone-${tone}`} aria-hidden="true"><Icon size={16} /></span>
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
      <p className="stat-hint">{hint}</p>
    </article>
  )
}