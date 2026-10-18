// Your case studies. These three are SAMPLE projects (placeholder: true shows a
// "Sample project" note on the page). Replace them with your real work and set
// placeholder to false. `hue` (0–360) sets the colour of each project's cover art.

export const projects = [
  {
    slug: 'tidewater',
    placeholder: true,
    title: 'Tidewater',
    summary: 'A booking flow for a coastal ferry line, rebuilt to work on a weak signal at the pier.',
    year: '2026',
    role: 'Design and front-end',
    stack: 'React, GSAP, service worker',
    hue: 205,
    challenge:
      'Most tickets were bought on phones minutes before departure, often on patchy mobile data. The old site loaded 4 MB of scripts before showing a timetable.',
    approach:
      'We moved the timetable into the first HTML response, cached routes offline, and reduced booking to three screens. Motion was limited to one thing: a progress line that follows the boat across the crossing.',
    outcome:
      'The timetable became readable in under a second on a throttled 3G profile, and the booking flow lost two thirds of its steps.',
    results: [
      { value: '0.9 s', label: 'to a readable timetable on slow 3G' },
      { value: '3', label: 'screens to book, down from 9' },
    ],
  },
  {
    slug: 'field-notes',
    placeholder: true,
    title: 'Field Notes',
    summary: 'A reading app for long-form journalism, designed around attention rather than engagement.',
    year: '2025',
    role: 'Front-end and motion',
    stack: 'React, Three.js, IndexedDB',
    hue: 32,
    challenge:
      'Readers saved articles and never returned to them. The reading view competed with recommendations, badges and streaks.',
    approach:
      'We stripped the reading view to type and margin, added a quiet 3D shelf for saved pieces, and let scroll position drive a single chapter marker instead of a progress bar.',
    outcome:
      'Saved articles were finished far more often, and the reading view became the screen people chose to share.',
    results: [
      { value: '2.4×', label: 'more saved articles finished' },
      { value: '48 KB', label: 'JavaScript on the reading view' },
    ],
  },
  {
    slug: 'kiln',
    placeholder: true,
    title: 'Kiln',
    summary: 'An online shop for a small ceramics studio, where each piece is one of a kind.',
    year: '2025',
    role: 'Design and development',
    stack: 'React, React Three Fiber, Shopify Storefront API',
    hue: 12,
    challenge:
      'Every pot was unique, so product photos alone could not show glaze, weight and texture. Customers kept emailing to ask what a piece really looked like.',
    approach:
      'Each piece got a turntable you can drag, lit to match the studio window. On older phones it falls back to a photo sequence so nobody is locked out.',
    outcome:
      'Questions about appearance dropped sharply, and pieces sold out faster after each kiln firing.',
    results: [
      { value: '−70%', label: 'emails asking what a piece looks like' },
      { value: '1 day', label: 'average time for a firing to sell out' },
    ],
  },
]
