import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

const slides = [
  { title: 'Make today count.', text: 'A little focus goes a long way.', tag: 'Next up', name: 'Design landing page', progress: 62 },
  { title: 'Small steps, big progress.', text: 'Keep your priorities in view.', tag: 'In progress', name: 'Fix navigation', progress: 67 },
  { title: 'Celebrate the wins.', text: 'Every completed task moves you forward.', tag: 'Completed', name: 'Onboarding copy', progress: 100 },
]

export default function FocusNotes() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]
  const go = (i) => setIndex((i + slides.length) % slides.length)

  return (
    <section className="notes" aria-roledescription="carousel" aria-label="Focus notes">
      <div className="notes-body" aria-live="polite">
        <p className="notes-eyebrow">
          <span>Focus notes</span>
          <span>{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        </p>
        <h2>{slide.title}</h2>
        <p className="notes-text">{slide.text}</p>

        <div className="dots" role="group" aria-label="Choose slide">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className={`dot ${i === index ? 'is-active' : ''}`}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>

      <div className="notes-art" aria-hidden="true">
        <div className="notes-ghost" />
        <div className="notes-card">
          <span className="notes-check"><Check size={14} /></span>
          <div className="notes-card-text">
            <span className="notes-card-tag">{slide.tag}</span>
            <strong>{slide.name}</strong>
          </div>
          <div className="bar"><span style={{ width: `${slide.progress}%` }} /></div>
          <small>{slide.progress}%</small>
        </div>
      </div>

      <div className="notes-controls">
        <button type="button" className="round" aria-label="Previous slide" onClick={() => go(index - 1)}>
          <ChevronLeft size={16} />
        </button>
        <button type="button" className="round solid" aria-label="Next slide" onClick={() => go(index + 1)}>
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  )
}