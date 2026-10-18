import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap.js'
import { hasWebGL, isLowPower, prefersReducedMotion } from '../lib/device.js'
import { site } from '../data/site.js'

// Three.js only downloads when the device can actually show it.
const HeroScene = lazy(() => import('./HeroScene.jsx'))

function SplitWord({ word }) {
  return (
    <span className="hero__word" aria-hidden="true">
      {[...word].map((char, i) => (
        <span className="hero__char" key={i}>
          {char}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const root = useRef(null)
  const progress = useRef(0)
  const [use3D] = useState(() => hasWebGL() && !prefersReducedMotion())
  const [lowPower] = useState(isLowPower)
  const [active, setActive] = useState(true)

  // Pause the WebGL loop whenever the hero is off screen, to save battery.
  useEffect(() => {
    if (!use3D || !root.current) return
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting))
    io.observe(root.current)
    return () => io.disconnect()
  }, [use3D])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          progress.current = self.progress
        },
      })

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({ delay: 0.15 })
        intro
          .from('.hero__char', { yPercent: 115, duration: 1.3, ease: 'expo.out', stagger: 0.035 })
          .from('.hero__fade', { opacity: 0, y: 14, duration: 1, ease: 'power3.out', stagger: 0.12 }, '-=0.8')

        gsap.to('.hero__title', {
          yPercent: -18,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: '60% bottom', scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const words = site.name.split(' ')

  return (
    <section className="hero" ref={root}>
      <div className="hero__stage">
        {use3D ? (
          <Suspense fallback={<div className="hero__fallback" aria-hidden="true" />}>
            <HeroScene progressRef={progress} active={active} lowPower={lowPower} />
          </Suspense>
        ) : (
          <div className="hero__fallback" aria-hidden="true" />
        )}

        <div className="hero__content wrap">
          <h1 className="hero__title" aria-label={site.name}>
            {words.map((word) => (
              <SplitWord word={word} key={word} />
            ))}
          </h1>
          <div className="hero__meta">
            <p className="hero__role hero__fade">{site.role}</p>
            <p className="hero__intro hero__fade">{site.intro}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
