type Props = {
  id: string
  eyebrow: string
  lead: string
  main: string
  intro?: string
  className?: string
}

export function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>
}

export function SectionHeading({ id, eyebrow, lead, main, intro, className }: Props) {
  return (
    <header className={['section-heading', className ?? ''].filter(Boolean).join(' ')} data-reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="h2-serif">
        {lead} <em className="em">{main}</em>
      </h2>
      {intro && <p className="body-l section-heading__intro">{intro}</p>}
    </header>
  )
}
