import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'
import { projects } from '../data/projects.js'
import CoverArt from './CoverArt.jsx'

export default function CaseStudy({ slug }) {
  const root = useRef(null)
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  useLayoutEffect(() => {
    if (!project) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline()
          .from('.case__title', { yPercent: 40, opacity: 0, duration: 1.1, ease: 'expo.out' })
          .from('.case__cover', { clipPath: 'inset(0 0 100% 0)', duration: 1.2, ease: 'expo.inOut' }, '-=0.7')
      })
    }, root)
    return () => ctx.revert()
  }, [project])

  if (!project) {
    return (
      <main className="case wrap">
        <h1 className="case__title">This project isn’t here</h1>
        <p className="case__summary">The link may be out of date.</p>
        <a className="case__back" href="#work">See all work</a>
      </main>
    )
  }

  const sections = [
    { heading: 'The problem', text: project.challenge },
    { heading: 'What we did', text: project.approach },
    { heading: 'What changed', text: project.outcome },
  ]

  return (
    <main className="case" ref={root}>
      <div className="wrap">
        <a className="case__back" href="#work">All work</a>
        {project.placeholder && (
          <p className="case__note">Sample project. This case study is placeholder content.</p>
        )}
        <h1 className="case__title">{project.title}</h1>
        <p className="case__summary">{project.summary}</p>

        <dl className="case__facts">
          <div><dt>Year</dt><dd>{project.year}</dd></div>
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Built with</dt><dd>{project.stack}</dd></div>
        </dl>
      </div>

      <div className="case__cover wrap">
        <CoverArt hue={project.hue} title={project.title} large />
      </div>

      <div className="wrap">
        {sections.map((s) => (
          <section className="case__section" key={s.heading}>
            <h2 className="case__heading">{s.heading}</h2>
            <p className="case__text">{s.text}</p>
          </section>
        ))}

        <ul className="case__results">
          {project.results.map((r) => (
            <li key={r.label}>
              <span className="case__value">{r.value}</span>
              <span className="case__label">{r.label}</span>
            </li>
          ))}
        </ul>

        {next && next.slug !== project.slug && (
          <a className="case__next" href={`#/work/${next.slug}`}>
            <span className="case__next-label">Next project</span>
            <span className="case__next-title">{next.title}</span>
          </a>
        )}
      </div>
    </main>
  )
}
