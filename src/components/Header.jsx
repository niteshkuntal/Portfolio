import { site } from '../data/site.js'

export default function Header() {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <a className="header__name" href="#/">
          {site.name}
        </a>
        <nav aria-label="Main">
          <ul className="header__nav">
            <li><a href="#work">Work</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
