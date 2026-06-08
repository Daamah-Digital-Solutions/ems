import { useLang, rich } from '../i18n'

// Icons stay in the component (markup, not copy); text comes from the locale.
const ICONS = [
  <path d="M3 12h4l3 8 4-16 3 8h4" />,
  (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  (
    <>
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M17 11l2 2 4-4" />
    </>
  ),
  (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
]

export default function Benefits() {
  const { t } = useLang()
  const items = t('benefits.items')
  return (
    <section id="why" className="pad">
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="eyebrow">{t('benefits.eyebrow')}</span>
            <h2>
              {t('benefits.titleA')}<br />
              <span className="r">{t('benefits.titleR')}</span>
            </h2>
          </div>
          <span className="idx">{t('benefits.idx')}</span>
        </div>
        <div className="benefits">
          {items.map((it, i) => (
            <div className={`bcard rv${i ? ` d${i}` : ''}`} key={it.title}>
              <div className="ic">
                <svg viewBox="0 0 24 24">{ICONS[i]}</svg>
              </div>
              <h3>{rich(it.title)}</h3>
              <p>{rich(it.text)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
