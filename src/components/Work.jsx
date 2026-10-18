import { projects } from '../data/projects.js'
import CoverArt from './CoverArt.jsx'

export default function Work() {
  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <h2 className="section__title" id="work-title">Selected work</h2>
        <ul className="work__list">
          {projects.map((p) => (
            <li key={p.slug}>
              <a className="work__item" href={`#/work/${p.slug}`}>
                <div className="work__thumb">
                  <CoverArt hue={p.hue} title={p.title} />
                </div>
                <div className="work__text">
                  <h3 className="work__name">{p.title}</h3>
                  <p className="work__summary">{p.summary}</p>
                </div>
                <p className="work__year">{p.year}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
