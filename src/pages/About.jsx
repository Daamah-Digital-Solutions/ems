import { Link } from 'react-router-dom'
import { waLink } from '../constants'
import { useLang, rich } from '../i18n'
import { WaIcon } from '../components/icons'
import HeroIcon from '../components/HeroIcon'
import CtaStrip from '../components/CtaStrip'

const ICONS = [
  (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  (
    <>
      <path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </>
  ),
  (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  (
    <>
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
      <path d="M1 14h6M9 8h6M17 16h6" />
    </>
  ),
]

export default function About() {
  const { t } = useLang()
  const values = t('about.values')
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">{t('about.heroEyebrow')}</span>
            <h1 className="rv d1">
              {t('about.heroTitleA')}<span className="r">{t('about.heroTitleR')}</span>
            </h1>
            <p className="lede rv d2">{rich(t('about.lede'))}</p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink(t('msg.knowMore'))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                {t('common.bookWhatsApp')}
              </a>
              <Link className="ghost" to="/how-it-works">
                {t('about.howLink')} <span className="a">→</span>
              </Link>
            </div>
          </div>

          <div className="phero-media phero-media-icon">
            <HeroIcon>
              <circle cx="9" cy="8.5" r="3.2" />
              <path d="M3.5 19.5v-1a4.5 4.5 0 0 1 4.5-4.5h2a4.5 4.5 0 0 1 4.5 4.5v1" />
              <circle cx="16.5" cy="9.5" r="2.3" />
              <path d="M15.5 14.2h1a4 4 0 0 1 4 4v1.3" />
            </HeroIcon>
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">{t('about.ideaEyebrow')}</span>
              <h2>
                {t('about.ideaTitleA')}<span className="r">{t('about.ideaTitleR')}</span>
              </h2>
            </div>
            <span className="idx">{t('about.idx')}</span>
          </div>
          <p className="lead-p rv">{rich(t('about.leadP'))}</p>
          <div className="benefits">
            {values.map((v, i) => (
              <div className={`bcard rv${i ? ` d${i}` : ''}`} key={v.title}>
                <div className="ic">
                  <svg viewBox="0 0 24 24">{ICONS[i]}</svg>
                </div>
                <h3>{rich(v.title)}</h3>
                <p>{rich(v.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how pad">
        <div className="wrap">
          <div className="split">
            <div className="plate rv" style={{ aspectRatio: '4 / 3.6' }}>
              <img
                src="/images/cut3.jpg"
                alt={t('about.imgAlt')}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="prose rv d1">
              <span className="eyebrow">{t('about.partnerEyebrow')}</span>
              <h2>
                {t('about.partnerTitleA')}<span className="r">{rich(t('about.partnerTitleR'))}</span>
              </h2>
              <p>{rich(t('about.partnerP1'))}</p>
              <p>{rich(t('about.partnerP2'))}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip lineKey="about.ctaLine" msgKey="msg.session" />
    </>
  )
}
