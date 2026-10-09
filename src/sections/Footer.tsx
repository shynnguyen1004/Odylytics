import { COMPANY_LINKS, CONTACT, SOCIALS, SOLUTIONS } from '../data/content'
import { useBrandAssets } from '../hooks/useBrandAssets'

export function Footer() {
  const brand = useBrandAssets()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={brand.wordmark} alt="Odylytics" width="1826" height="565" />
            <p>Engineering Safer Communities. AI-powered digital solutions for governments, enterprises and communities.</p>
          </div>

          <div className="footer__col">
            <h2 className="footer__heading">Solutions</h2>
            <ul>
              {SOLUTIONS.map((solution) => (
                <li key={solution.id}>
                  <a href="#solutions">{solution.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="footer__heading">Company</h2>
            <ul>
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="footer__heading">Contact</h2>
            <dl className="footer__contact">
              <div>
                <dt>A</dt>
                <dd>{CONTACT.address}</dd>
              </div>
              <div>
                <dt>P</dt>
                <dd>
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
                </dd>
              </div>
              <div>
                <dt>E</dt>
                <dd>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="footer__col">
            <h2 className="footer__heading">Social</h2>
            <ul>
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a href={social.href}>{social.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Odylytics. All rights reserved.</p>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
