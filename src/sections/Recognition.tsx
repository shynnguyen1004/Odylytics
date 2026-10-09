import { SectionHeading } from '../components/SectionHeading'
import { RECOGNITION, RECOGNITION_HEADING, SOLUTIONS } from '../data/content'
import type { RecognitionType } from '../data/content'
import { useBrandAssets } from '../hooks/useBrandAssets'

const typeClass: Record<RecognitionType, string> = {
  AWARD: 'tag',
  CERTIFICATION: 'tag tag--neutral',
  ACCELERATOR: 'tag tag--signal',
}

export function Recognition() {
  const { solutionLogo } = useBrandAssets()
  return (
    <section id="recognition" className="section" aria-labelledby="recognition-title">
      <div className="container">
        <SectionHeading id="recognition-title" {...RECOGNITION_HEADING} />

        <div className="rec-columns">
          {RECOGNITION.map((group) => {
            const logo = SOLUTIONS.find((solution) => solution.id === group.solutionId)?.logo
            return (
              <div key={group.solutionId} className="card rec-column" data-reveal>
                <h3 className="rec-column__title">
                  {logo && (
                    <span className="logo-chip">
                      <img src={solutionLogo(logo)} alt="" loading="lazy" />
                    </span>
                  )}
                  <span>{group.solutionName}</span>
                </h3>
                <ul>
                  {group.items.map((item, index) => (
                    <li key={index} className="rec-card">
                      <div className="rec-card__logo">
                        {item.issuerLogo ? (
                          <img src={item.issuerLogo} alt={`${item.issuer} logo`} loading="lazy" />
                        ) : (
                          <span className="logo-placeholder" aria-hidden="true">
                            Logo
                          </span>
                        )}
                      </div>
                      <div>
                        <span className={typeClass[item.type]}>{item.type}</span>
                        <h4 className="rec-card__title">{item.title}</h4>
                        <p className="rec-card__meta">
                          {item.issuer} <span aria-hidden="true">·</span> {item.year}
                        </p>
                        <p className="rec-card__context">{item.context}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
