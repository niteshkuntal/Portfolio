import { useEffect, useState } from 'react'

// Tiny hash router. GitHub Pages serves static files only, so case studies live
// at #/work/<slug>. Any other hash (like #work) is treated as a section on the home page.
function parse() {
  const hash = window.location.hash
  const match = hash.match(/^#\/work\/([\w-]+)/)
  if (match) return { page: 'case', slug: match[1], section: null }
  const section = hash.length > 1 && !hash.startsWith('#/') ? hash.slice(1) : null
  return { page: 'home', slug: null, section }
}

export function useRoute() {
  const [route, setRoute] = useState(parse)

  useEffect(() => {
    const onChange = () => setRoute(parse())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
