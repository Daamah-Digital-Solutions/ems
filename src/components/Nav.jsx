import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useNavScrolled } from '../hooks/useScrollReveal'
import { useTheme } from '../hooks/useTheme'
import { useLang } from '../i18n'
import { waLink } from '../constants'
import { LINKS } from '../nav'
import { WaIcon } from './icons'
import emsIcon from '../ems-icon.svg'

export default function Nav() {
  const scrolled = useNavScrolled(30)
  const { toggle } = useTheme()
  const { t, lang, toggle: toggleLang } = useLang()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const BOOK_MSG = t('msg.session')

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
              {t(label)}
            </NavLink>
          ))}
        </nav>

        <div className="nav-r">
          <button
            className="lang"
            onClick={toggleLang}
            aria-label={lang === 'en' ? t('nav.switchToArabic') : t('nav.switchToEnglish')}
          >
            {lang === 'en' ? 'ع' : 'EN'}
          </button>
          <button className="tg" onClick={toggle} aria-label={t('nav.toggleTheme')}>
            <span className="k" aria-hidden="true" />
          </button>
          <a
            className="btn"
            href={waLink(BOOK_MSG)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WaIcon />
            <span className="t">{t('common.book')}</span>
          </a>
          <button
            type="button"
            className={`burger${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
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
              {t(label)}
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
          {t('common.bookWhatsApp')}
        </a>
      </aside>
    </>
  )
}
