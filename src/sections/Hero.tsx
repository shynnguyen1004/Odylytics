import { useEffect, useRef } from 'react'
import { Aurora } from '../components/Aurora'
import { Button } from '../components/Button'
import { HERO } from '../data/content'
import { useBrandAssets } from '../hooks/useBrandAssets'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { useRotatingWord } from '../hooks/useRotatingWord'
import { setPastHero, useTheme } from '../hooks/useTheme'

const AURORA_STOPS: [string, string, string] = ['#AE0BFF', '#FF8C00', '#AE0BFF']

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const brand = useBrandAssets('hero')
  const theme = useTheme()
  const reducedMotion = usePrefersReducedMotion()
  const wordIndex = useRotatingWord(HERO.rotatingWords.length, 2500, !reducedMotion)
  const previousIndex = (wordIndex - 1 + HERO.rotatingWords.length) % HERO.rotatingWords.length

  useEffect(() => {
    const hero = ref.current
    if (!hero) return
    const root = document.documentElement
    // The page turns light once the hero's bottom edge rises above mid-viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0)
        // Enable the colour fade only after the first measurement so a reload mid-page doesn't animate.
        requestAnimationFrame(() => root.classList.add('surface-animate'))
      },
      { rootMargin: '-50% 0px 0px 0px' },
    )
    observer.observe(hero)
    return () => {
      observer.disconnect()
      setPastHero(false)
    }
  }, [])

  return (
    <section id="home" ref={ref} className="hero" aria-labelledby="hero-title">
      <Aurora colorStops={AURORA_STOPS} amplitude={1} blend={0.5} speed={0.5} lightMode={theme === 'light'} paused={reducedMotion} flip />

      <div className="container hero__content">
        <img className="hero__logo" src={brand.wordmark} alt="Odylytics" width="1826" height="565" />
        <p className="eyebrow">{HERO.eyebrow}</p>

        <h1 id="hero-title" className="sr-only">
          {HERO.srHeadline}
        </h1>
        <div className="display hero__headline" aria-hidden="true">
          <span className="hero__line">{HERO.headlineTop}</span>
          <span className="hero__line">
            {HERO.headlineBottom}{' '}
            <span className="rotator" aria-live="off">
              {HERO.rotatingWords.map((word, index) => (
                <span
                  key={word}
                  className={`rotator__word${index === wordIndex ? ' is-active' : ''}${index === previousIndex && !reducedMotion ? ' is-prev' : ''}`}
                >
                  {word}.
                </span>
              ))}
            </span>
          </span>
        </div>

        <p className="body-l hero__sub">{HERO.subheadline}</p>

        <div className="hero__ctas">
          <Button href={HERO.primaryCta.href} arrow={false}>
            {HERO.primaryCta.label}
          </Button>
          <Button href={HERO.secondaryCta.href} variant="outline" arrow={false}>
            {HERO.secondaryCta.label}
          </Button>
        </div>

        <p className="hero__note">
          <img src={brand.symbol} alt="" />
          Engineering Safer Communities.
        </p>
      </div>
    </section>
  )
}
