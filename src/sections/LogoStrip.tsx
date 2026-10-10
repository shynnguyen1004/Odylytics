import { Marquee } from '../components/Marquee'
import { SOLUTIONS } from '../data/content'
import type { Solution } from '../data/content'
import { useBrandAssets } from '../hooks/useBrandAssets'

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

export function LogoStrip() {
  return (
    <section className="logo-strip" aria-label="Odylytics solutions">
      <p className="logo-strip__label">Six solutions. One AI core.</p>
      <Marquee
        label="Odylytics solutions"
        renderItems={() => SOLUTIONS.map((solution) => <StripItem key={solution.id} solution={solution} />)}
      />
      <div className="strip-static" aria-hidden="true">
        {SOLUTIONS.map((solution) => (
          <StripItem key={solution.id} solution={solution} />
        ))}
      </div>
    </section>
  )
}
