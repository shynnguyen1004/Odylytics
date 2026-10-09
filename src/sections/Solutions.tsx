import { SectionHeading } from '../components/SectionHeading'
import { SOLUTIONS, SOLUTIONS_HEADING } from '../data/content'
import { useBrandAssets } from '../hooks/useBrandAssets'

export function Solutions() {
  const { solutionLogo } = useBrandAssets()
  return (
    <section id="solutions" className="section" aria-labelledby="solutions-title">
      <div className="container">
        <SectionHeading id="solutions-title" {...SOLUTIONS_HEADING} />

        <ul className="sol-grid">
          {SOLUTIONS.map((solution, index) => (
            <li key={solution.id} className="card card--hover sol-card" data-reveal>
              <div className="sol-card__top">
                <span className="logo-chip sol-card__logo">
                  {solution.logo ? (
                    <img src={solutionLogo(solution.logo)} alt={`${solution.name} logo`} loading="lazy" />
                  ) : (
                    <span className="logo-placeholder">Logo</span>
                  )}
                </span>
                {solution.flagship ? <span className="tag">Flagship</span> : <span className="label">{String(index + 1).padStart(2, '0')}</span>}
              </div>
              <div>
                <h3 className="sol-card__name">{solution.name}</h3>
                <p className="sol-card__cat">{solution.category}</p>
              </div>
              <p className="sol-card__desc">{solution.oneLiner}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
