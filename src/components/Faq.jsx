import { useRef, useState } from 'react'
import { useLang } from '../i18n'

function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  return (
    <div className="fr">
      <button className="fq" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {q}
        <span className="pm" aria-hidden="true" />
      </button>
      <div
        className="fa"
        ref={ref}
        style={{ maxHeight: open && ref.current ? ref.current.scrollHeight : 0 }}
      >
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function Faq() {
  const { t } = useLang()
  const items = t('faqHome.items')
  return (
    <section id="faq" className="pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="shead rv" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div>
            <span className="eyebrow">{t('faqHome.eyebrow')}</span>
            <h2>
              {t('faqHome.titleA')}<span className="r">{t('faqHome.titleR')}</span>
            </h2>
          </div>
        </div>
        <div className="faq rv">
          {items.map(([q, a]) => (
            <Item key={q} q={q} a={a} />
          ))}
        </div>
      </div>
    </section>
  )
}
