import { Button } from '../components/Button'
import { Marquee } from '../components/Marquee'
import { HERO, SOLUTIONS } from '../data/content'
import type { Solution } from '../data/content'
import { useBrandAssets } from '../hooks/useBrandAssets'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { useRotatingWord } from '../hooks/useRotatingWord'

function StripItem({ solution }: { solution: Solution }) {
  const { solutionLogo } = useBrandAssets()
  if (!solution.logo) {
    return <span className="strip-item strip-item--placeholder">{solution.name}</span>
  }
  return (
    <span className="strip-item">
      <img src={solutionLogo(solution.logo)} alt={solution.name} loading="lazy" />
    </span>
  )
}

export function Hero() {
  const brand = useBrandAssets()
  const reducedMotion = usePrefersReducedMotion()
  const wordIndex = useRotatingWord(HERO.rotatingWords.length, 2500, !reducedMotion)
  const previousIndex = (wordIndex - 1 + HERO.rotatingWords.length) % HERO.rotatingWords.length

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="aurora" aria-hidden="true" />

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

      <div className="hero__trust">
        <p className="hero__trust-label">Six solutions. One AI core.</p>
        <Marquee
          label="Odylytics solutions"
          renderItems={() => SOLUTIONS.map((solution) => <StripItem key={solution.id} solution={solution} />)}
        />
        <div className="strip-static" aria-hidden="true">
          {SOLUTIONS.map((solution) => (
            <StripItem key={solution.id} solution={solution} />
          ))}
        </div>
      </div>
    </section>
  )
}
