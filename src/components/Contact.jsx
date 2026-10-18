import { site } from '../data/site.js'

export default function Contact() {
  const { email, links } = site.contact
  const primary = email ? { label: email, href: `mailto:${email}` } : links[0]

  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 className="contact__title" id="contact-title">Have a project in mind?</h2>
        {primary && (
          <a className="contact__primary" href={primary.href}>
            {email ? primary.label : `Find me on ${primary.label}`}
          </a>
        )}
        <div className="contact__bottom">
          <ul className="contact__links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
