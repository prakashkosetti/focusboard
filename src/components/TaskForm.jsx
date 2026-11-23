import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { STATUSES, PRIORITIES, CATEGORIES } from '../data/sampleTasks'

const blank = { title: '', description: '', category: 'Design', status: 'To do', priority: 'Medium', dueDate: '' }

export default function TaskForm({ task, onSave, onCancel }) {
  const editing = Boolean(task)
  const [values, setValues] = useState(task ? { ...blank, ...task } : blank)
  const [errors, setErrors] = useState({})
  const titleRef = useRef(null)

  useEffect(() => {
    titleRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onCancel()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onCancel])

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const title = values.title.trim()
    const next = {}
    if (!title) next.title = 'Enter a task title.'
    if (!values.dueDate) next.dueDate = 'Pick a due date.'
    setErrors(next)
    if (Object.keys(next).length) {
      if (next.title) titleRef.current?.focus()
      return
    }
    onSave({ ...values, title, description: values.description.trim() })
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <form className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title" onSubmit={submit} noValidate>
        <div className="modal-head">
          <div>
            <h2 id="form-title">{editing ? 'Edit task' : 'Create new task'}</h2>
            <p>{editing ? 'Update the details of this task.' : 'Add your task details to stay on top of your work.'}</p>
          </div>
          <button type="button" className="icon-btn" aria-label="Close form" onClick={onCancel}><X size={14} /></button>
        </div>

        <div className="field">
          <label htmlFor="f-title">Task title <span aria-hidden="true">*</span></label>
          <input id="f-title" ref={titleRef} value={values.title} onChange={set('title')}
            placeholder="e.g. Update pricing page" aria-required="true"
            aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'e-title' : undefined} />
          {errors.title && <p id="e-title" className="error" role="alert">{errors.title}</p>}
        </div>

        <div className="field">
          <label htmlFor="f-desc">Description</label>
          <textarea id="f-desc" rows="3" value={values.description} onChange={set('description')} placeholder="Add notes about this task…" />
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor="f-status">Status</label>
            <select id="f-status" value={values.status} onChange={set('status')}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-priority">Priority</label>
            <select id="f-priority" value={values.priority} onChange={set('priority')}>
              {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label htmlFor="f-date">Due date <span aria-hidden="true">*</span></label>
            <input id="f-date" type="date" value={values.dueDate} onChange={set('dueDate')}
              aria-required="true" aria-invalid={Boolean(errors.dueDate)}
              aria-describedby={errors.dueDate ? 'e-date' : undefined} />
            {errors.dueDate && <p id="e-date" className="error" role="alert">{errors.dueDate}</p>}
          </div>
          <div className="field">
            <label htmlFor="f-cat">Category</label>
            <select id="f-cat" value={values.category} onChange={set('category')}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <p className="req-note">* Required field</p>
        <div className="modal-actions">
          <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn primary">{editing ? 'Save changes' : 'Create task'}</button>
        </div>
      </form>
    </div>
  )
}