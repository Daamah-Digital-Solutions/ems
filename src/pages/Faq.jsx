import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { waLink } from '../constants'
import { useLang } from '../i18n'
import { WaIcon } from '../components/icons'
import HeroIcon from '../components/HeroIcon'
import CtaStrip from '../components/CtaStrip'

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
  const items = t('faqPage.items')
  const askList = t('faqPage.askList')
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">{t('faqPage.heroEyebrow')}</span>
            <h1 className="rv d1">
              {t('faqPage.heroTitleA')}<span className="r">{t('faqPage.heroTitleR')}</span>
            </h1>
            <p className="lede rv d2">{t('faqPage.lede')}</p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink(t('msg.question'))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                {t('common.askWhatsApp')}
              </a>
              <Link className="ghost" to="/contact">
                {t('faqPage.contactLink')} <span className="a">→</span>
              </Link>
            </div>
          </div>

          <div className="phero-media phero-media-icon">
            <HeroIcon>
              <path d="M8.6 9.2a3.4 3.4 0 1 1 5 3c-1.1.8-1.6 1.4-1.6 2.8" />
              <path d="M12 18.6h.01" />
            </HeroIcon>
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="faq rv">
            {items.map(([q, a]) => (
              <Item key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="how pad">
        <div className="wrap">
          <div className="split">
            <div className="plate rv" style={{ aspectRatio: '4 / 3.6' }}>
              <img src="/images/cut2.jpg" alt={t('faqPage.askImgAlt')} loading="lazy" decoding="async" />
            </div>
            <div className="prose rv d1">
              <span className="eyebrow">{t('faqPage.askEyebrow')}</span>
              <h2>
                {t('faqPage.askTitleA')}<span className="r">{t('faqPage.askTitleR')}</span>
              </h2>
              <p>{t('faqPage.askP')}</p>
              <ul className="checklist">
                {askList.map((it) => (
                  <li key={it}><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg><span>{it}</span></li>
                ))}
              </ul>
              <p style={{ marginTop: '1.4rem' }}>
                <a
                  className="btn-lg"
                  href={waLink(t('msg.question'))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WaIcon />
                  {t('common.askWhatsApp')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip lineKey="faqPage.ctaLine" msgKey="msg.question" />
    </>
  )
}
