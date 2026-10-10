import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { CloseIcon, MenuIcon } from '../components/Icons'
import { ThemeToggle } from '../components/ThemeToggle'
import { NAV_ITEMS } from '../data/content'
import { useBrandAssets } from '../hooks/useBrandAssets'
import { lockScroll, unlockScroll } from '../hooks/useSmoothScroll'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const brand = useBrandAssets()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    lockScroll()
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 821px)')
    const onResize = () => desktop.matches && setOpen(false)

    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onResize)
    return () => {
      unlockScroll()
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onResize)
      toggle?.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#home" aria-label="Odylytics — back to top">
          <img src={brand.wordmark} alt="" width="1826" height="565" />
        </a>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <ThemeToggle />
          <Button href="#contact" variant="inverse" size="sm" arrow={false} className="nav__cta">
            Get in touch
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={menuRef} className="nav__menu" hidden={!open} data-lenis-prevent>
        <nav aria-label="Mobile">
          <ol>
            {NAV_ITEMS.map((item, index) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  <span className="nav__menu-index">{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <Button href="#contact" variant="inverse" arrow={false} onClick={() => setOpen(false)}>
          Get in touch
        </Button>
      </div>
    </header>
  )
}
