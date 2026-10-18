import { useEffect } from 'react'
import { ScrollTrigger } from './lib/gsap.js'
import { useRoute } from './lib/useRoute.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import CaseStudy from './components/CaseStudy.jsx'

export default function App() {
  const route = useRoute()

  useEffect(() => {
    if (route.page === 'case') {
      window.scrollTo(0, 0)
    } else if (route.section) {
      const el = document.getElementById(route.section)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo(0, 0)
    }
    // Page height changed, so scroll positions need recalculating.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [route.page, route.slug, route.section])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      {route.page === 'case' ? (
        <div id="main">
          <CaseStudy slug={route.slug} key={route.slug} />
          <Contact />
        </div>
      ) : (
        <>
          <Hero />
          <main id="main">
            <Work />
            <About />
          </main>
          <Contact />
        </>
      )}
    </>
  )
}
