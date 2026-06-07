import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useNavScrolled } from '../hooks/useScrollReveal'
import { useTheme } from '../hooks/useTheme'
import { waLink } from '../constants'
import { PRIMARY, MORE } from '../nav'
import { Ring, WaIcon } from './icons'

const BOOK_MSG = "Hi EMS ElRiyadh, I'd like to book a session."

export default function Nav() {
  const scrolled = useNavScrolled(30)
  const { toggle } = useTheme()
  const { pathname } = useLocation()
  const [moreOpen, setMoreOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Close both menus on navigation.
  useEffect(() => {
    setMoreOpen(false)
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Escape closes whatever is open.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMoreOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="brand" aria-label="EMS ElRiyadh home">
          <Ring />
          <span className="wm">
            <b>EMS</b>
            <span>ElRiyadh</span>
          </span>
        </Link>

        <nav className="nav-mid">
          {PRIMARY.map(([to, label]) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}

          <div
            className={`nav-more${moreOpen ? ' open' : ''}`}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setMoreOpen(false)
            }}
          >
            <button
              type="button"
              className="nav-more-btn"
              aria-expanded={moreOpen}
              aria-haspopup="true"
              onClick={() => setMoreOpen((o) => !o)}
            >
              More <span className="chev" aria-hidden="true" />
            </button>
            <div className="nav-more-panel" role="menu">
              {MORE.map(([to, label]) => (
                <NavLink key={to} to={to} role="menuitem">
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
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
          {[...PRIMARY, ...MORE].map(([to, label]) => (
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
