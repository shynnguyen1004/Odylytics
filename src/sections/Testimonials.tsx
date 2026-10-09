import { useRef, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '../components/Icons'
import { Modal } from '../components/Modal'
import { SectionHeading } from '../components/SectionHeading'
import { TESTIMONIALS, TESTIMONIALS_HEADING } from '../data/content'
import type { Testimonial } from '../data/content'

const MAX_QUOTE = 300

function truncate(text: string) {
  if (text.length <= MAX_QUOTE) return text
  const cut = text.slice(0, MAX_QUOTE)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

function Person({ item }: { item: Testimonial }) {
  return (
    <div className="person">
      <span className="avatar" aria-hidden="true">
        {item.avatar ? <img src={item.avatar} alt="" /> : item.name.charAt(0)}
      </span>
      <span>
        <span className="person__name">{item.name}</span>
        <span className="person__role">{item.role}</span>
      </span>
    </div>
  )
}

export function Testimonials() {
  const [active, setActive] = useState<Testimonial | null>(null)
  const trackRef = useRef<HTMLUListElement>(null)

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('.quote-card')
    const step = card ? card.offsetWidth + 20 : track.clientWidth * 0.8
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <section id="testimonials" className="section" aria-labelledby="testimonials-title">
      <div className="container quotes">
        <SectionHeading id="testimonials-title" {...TESTIMONIALS_HEADING} />

        <ul className="quotes__track" ref={trackRef} data-reveal>
          {TESTIMONIALS.map((item, index) => {
            const long = item.quote.length > MAX_QUOTE
            return (
              <li key={index} className="card quote-card">
                <span className="tag tag--neutral quote-card__solution">{item.solution}</span>
                <blockquote className="quote-card__quote">
                  <p>“{truncate(item.quote)}”</p>
                </blockquote>
                {long && (
                  <button type="button" className="text-btn" onClick={() => setActive(item)}>
                    Read more <span className="sr-only">from {item.name}</span>
                  </button>
                )}
                <Person item={item} />
              </li>
            )
          })}
        </ul>

        <div className="quotes__nav">
          <button type="button" className="quotes__arrow" aria-label="Previous testimonial" onClick={() => scrollByCard(-1)}>
            <ArrowLeftIcon />
          </button>
          <button type="button" className="quotes__arrow" aria-label="Next testimonial" onClick={() => scrollByCard(1)}>
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <Modal open={active !== null} onClose={() => setActive(null)} labelledBy="quote-modal-title">
        {active && (
          <>
            <span className="tag tag--neutral">{active.solution}</span>
            <h3 id="quote-modal-title" className="sr-only">
              Testimonial from {active.name}
            </h3>
            <blockquote className="modal__quote">
              <p>“{active.quote}”</p>
            </blockquote>
            <Person item={active} />
          </>
        )}
      </Modal>
    </section>
  )
}
