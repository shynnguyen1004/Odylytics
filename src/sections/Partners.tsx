import { SectionHeading } from '../components/SectionHeading'
import { PARTNERS, PARTNERS_HEADING } from '../data/content'

export function Partners() {
  return (
    <section id="partners" className="section" aria-labelledby="partners-title">
      <div className="container">
        <SectionHeading id="partners-title" {...PARTNERS_HEADING} />

        <ul className="partner-grid">
          {PARTNERS.map((partner, index) => (
            <li key={index} className="card card--hover partner" data-reveal>
              <div className="partner__logo">
                {partner.logo ? (
                  <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" />
                ) : (
                  <span className="logo-placeholder" aria-hidden="true">
                    Partner logo
                  </span>
                )}
              </div>
              <span className="partner__type">{partner.type}</span>
              <h3 className="partner__name">{partner.name}</h3>
              <p className="partner__desc">{partner.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
