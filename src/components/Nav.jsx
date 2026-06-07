import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useNavScrolled } from '../hooks/useScrollReveal'
import { useTheme } from '../hooks/useTheme'
import { waLink } from '../constants'
import { LINKS } from '../nav'
import { WaIcon } from './icons'
import emsIcon from '../ems-icon.svg'

const BOOK_MSG = "Hi EMS ElRiyadh, I'd like to book a session."

export default function Nav() {
  const scrolled = useNavScrolled(30)
  const { toggle } = useTheme()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu on navigation.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Escape closes the mobile menu.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="brand" aria-label="EMS ElRiyadh home">
          <img className="brand-mark" src={emsIcon} alt="" />
          <span className="wm">
            <b>EMS</b>
            <span>ElRiyadh</span>
          </span>
        </Link>

        <nav className="nav-mid">
          {LINKS.map(([to, label]) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-r">
          <button className="tg" onClick={toggle} aria-label="Toggle theme">
            <span className="k" aria-hidden="true" />
          </button>
          <a
            className="btn"
            href={waLink(BOOK_MSG)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WaIcon />
            <span className="t">Book</span>
          </a>
          <button
            type="button"
            className={`burger${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile slide-in menu */}
      <button
        type="button"
        className={`m-scrim${menuOpen ? ' open' : ''}`}
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setMenuOpen(false)}
      />
      <aside className={`m-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="m-links">
          {LINKS.map(([to, label]) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </nav>
        <a
          className="btn-lg"
          href={waLink(BOOK_MSG)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WaIcon />
          Book on WhatsApp
        </a>
      </aside>
    </>
  )
}
