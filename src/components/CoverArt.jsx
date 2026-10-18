// Generated cover art for each project, so the site looks finished before
// real screenshots exist. Replace with <img> once you have project images.
export default function CoverArt({ hue, title, large = false }) {
  const bg = `hsl(${hue} 42% 16%)`
  const mid = `hsl(${hue} 55% 42%)`
  const light = `hsl(${(hue + 30) % 360} 70% 78%)`

  return (
    <svg
      className={large ? 'cover cover--large' : 'cover'}
      viewBox="0 0 800 500"
      role="img"
      aria-label={`Cover image for ${title}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="800" height="500" fill={bg} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle
          key={i}
          cx="560"
          cy="250"
          r={60 + i * 48}
          fill="none"
          stroke={mid}
          strokeOpacity={0.7 - i * 0.1}
          strokeWidth="1.5"
        />
      ))}
      <circle cx="560" cy="250" r="58" fill={light} />
      <rect x="64" y="300" width="230" height="10" rx="5" fill={light} opacity="0.85" />
      <rect x="64" y="330" width="160" height="10" rx="5" fill={light} opacity="0.45" />
      <rect x="64" y="360" width="190" height="10" rx="5" fill={light} opacity="0.45" />
    </svg>
  )
}
