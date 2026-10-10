import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useEffect } from 'react'
import { usePrefersReducedMotion } from './useMediaQuery'

let lenis: Lenis | null = null
let locks = 0
let pendingTarget: HTMLElement | null = null

function scrollToTarget(target: HTMLElement) {
  // Lenis already honours `scroll-padding-top` (the fixed nav height) on <html>.
  lenis?.scrollTo(target)
}

/**
 * Lock page scrolling (mobile menu, modal). Lenis drives scroll position itself,
 * so `overflow: hidden` alone would not stop wheel scrolling — it must be paused too.
 */
export function lockScroll() {
  locks += 1
  document.body.style.overflow = 'hidden'
  lenis?.stop()
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1)
  if (locks > 0) return
  document.body.style.overflow = ''
  lenis?.start()
  // `start()` resets Lenis and cancels in-flight scrolls, so anchor jumps
  // requested while locked (mobile menu links) run only after it.
  if (pendingTarget) {
    scrollToTarget(pendingTarget)
    pendingTarget = null
  }
}

/** Inertia ("smooth") wheel scrolling via Lenis; off under prefers-reduced-motion. Touch keeps native scrolling. */
export function useSmoothScroll() {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const instance = new Lenis({ lerp: 0.09, autoRaf: true })
    lenis = instance
    if (locks > 0) instance.stop()

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link || link.classList.contains('skip-link')) return
      const target = document.querySelector<HTMLElement>(link.hash)
      if (!target) return

      event.preventDefault()
      history.pushState(null, '', link.hash)
      if (locks > 0) pendingTarget = target
      else scrollToTarget(target)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      instance.destroy()
      lenis = null
    }
  }, [reducedMotion])
}
