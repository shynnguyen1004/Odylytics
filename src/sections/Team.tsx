import { LinkedInIcon } from '../components/Icons'
import { SectionHeading } from '../components/SectionHeading'
import { TEAM, TEAM_HEADING } from '../data/content'
import { useBrandAssets } from '../hooks/useBrandAssets'

export function Team() {
  const brand = useBrandAssets()
  return (
    <section id="team" className="section" aria-labelledby="team-title">
      <div className="container">
        <SectionHeading id="team-title" {...TEAM_HEADING} />

        <ul className="team-grid">
          {TEAM.map((member, index) => (
            <li key={index} className="card card--hover team-card" data-reveal>
              <div className="team-card__photo">
                {member.photo ? (
                  <img src={member.photo} alt={`Portrait of ${member.name}`} loading="lazy" />
                ) : (
                  <img className="team-card__placeholder" src={brand.symbol} alt="" />
                )}
              </div>
              <div className="team-card__body">
                <h3 className="team-card__name">{member.name}</h3>
                <span className="team-card__role">{member.role}</span>
                <p className="team-card__bio">{member.bio}</p>
                {member.linkedin ? (
                  <a className="icon-link" href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}>
                    <LinkedInIcon />
                  </a>
                ) : (
                  <span className="icon-link is-disabled" title="LinkedIn profile coming soon">
                    <LinkedInIcon />
                    <span className="sr-only">LinkedIn profile coming soon</span>
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
