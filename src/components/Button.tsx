import type { ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'inverse' | 'signal'

type Props = {
  children: ReactNode
  variant?: Variant
  href?: string
  type?: 'button' | 'submit'
  arrow?: boolean
  size?: 'md' | 'sm'
  className?: string
  onClick?: () => void
}

export function Button({ children, variant = 'primary', href, type = 'button', arrow = true, size = 'md', className, onClick }: Props) {
  const classes = ['btn', `btn--${variant}`, size === 'sm' ? 'btn--sm' : '', className ?? ''].filter(Boolean).join(' ')
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {content}
    </button>
  )
}
