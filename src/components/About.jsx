import { site } from '../data/site.js'

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <h2 className="visually-hidden" id="about-title">About</h2>
        <p className="about__statement">{site.statement}</p>
        <div className="about__grid">
          {site.capabilities.map((c) => (
            <div className="about__item" key={c.title}>
              <h3 className="about__heading">{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
