import type { ReactNode } from 'react'

type Props = {
  /** Renders one copy of the items. Called twice; the second copy is hidden from assistive tech. */
  renderItems: (copy: 'primary' | 'clone') => ReactNode
  className?: string
  label?: string
}

export function Marquee({ renderItems, className, label }: Props) {
  return (
    <div className={['marquee', className ?? ''].filter(Boolean).join(' ')} aria-label={label} role={label ? 'region' : undefined}>
      <div className="marquee__track">
        <div className="marquee__group">{renderItems('primary')}</div>
        <div className="marquee__group" aria-hidden="true" inert>
          {renderItems('clone')}
        </div>
      </div>
    </div>
  )
}
