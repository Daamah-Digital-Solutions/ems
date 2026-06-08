import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'

// One-tap language switcher used in both the desktop nav and the mobile menu.
// A flag + language name; selecting an option applies immediately and closes
// (no confirm step). SVG flags (not emoji — emoji flags don't render on Windows).
const LANGS = [
  { code: 'en', label: 'English', flag: '/images/flags/gb.svg' },
  { code: 'ar', label: 'العربية', flag: '/images/flags/sa.svg' },
]

export default function LangSwitch({ variant = 'desktop', onSelect }) {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = LANGS.find((l) => l.code === lang) || LANGS[0]

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pick = (code) => {
    setLang(code)
    setOpen(false)
    if (onSelect) onSelect()
  }

  return (
    <div className={`langsw langsw-${variant}${open ? ' open' : ''}`} ref={ref}>
      <button
        type="button"
        className="langsw-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
        onClick={() => setOpen((o) => !o)}
      >
        <img className="flag" src={current.flag} alt="" />
        <span className="ln">{current.label}</span>
        <svg className="chev" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <ul className="langsw-menu" role="listbox" aria-label={t('nav.language')}>
        {LANGS.map((l) => (
          <li key={l.code} role="option" aria-selected={l.code === lang}>
            <button
              type="button"
              className={l.code === lang ? 'on' : ''}
              onClick={() => pick(l.code)}
            >
              <img className="flag" src={l.flag} alt="" />
              <span className="ln">{l.label}</span>
              {l.code === lang && (
                <svg className="tick" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
