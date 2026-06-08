import { Link } from 'react-router-dom'
import { waLink } from '../constants'
import { useLang, rich } from '../i18n'
import { WaIcon } from '../components/icons'
import HeroIcon from '../components/HeroIcon'
import CtaStrip from '../components/CtaStrip'

const PRINCIPLE_ICONS = [
  <path d="M3 12h4l3 8 4-16 3 8h4" />,
  (
    <>
      <path d="M12 2l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </>
  ),
  (
    <>
      <path d="M20 4a6 6 0 0 0-8 0L4 12v7h7l8-8a6 6 0 0 0 1-7z" />
      <path d="M15 8L7 16" />
    </>
  ),
  (
    <>
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M17 11l2 2 4-4" />
    </>
  ),
]
const STEP_IMGS = ['/images/cut3.jpg', '/images/hero.jpg', '/images/cut2.jpg']

export default function HowItWorks() {
  const { t } = useLang()
  const principle = t('hiw.principle')
  const forItems = t('hiw.for')
  const steps = t('hiw.steps')
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">{t('hiw.heroEyebrow')}</span>
            <h1 className="rv d1">
              {t('hiw.heroTitleA')}<span className="r">{t('hiw.heroTitleR')}</span>
            </h1>
            <p className="lede rv d2">{rich(t('hiw.lede'))}</p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink(t('msg.session'))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                {t('common.bookWhatsApp')}
              </a>
              <Link className="ghost" to="/about">
                {t('hiw.aboutLink')} <span className="a">→</span>
              </Link>
            </div>
          </div>

          <div className="phero-media phero-media-icon">
            <HeroIcon>
              <path d="M2 12h4l2.5 7 4-14 2.5 7h2l1.5-3 1.5 3H22" />
            </HeroIcon>
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">{t('hiw.principleEyebrow')}</span>
              <h2>
                {t('hiw.principleTitleA')}<span className="r">{t('hiw.principleTitleR')}</span>
              </h2>
            </div>
            <span className="idx">{t('hiw.idx')}</span>
          </div>
          <p className="lead-p rv">{rich(t('hiw.leadP'))}</p>
          <div className="benefits">
            {principle.map((p, i) => (
              <div className={`bcard rv${i ? ` d${i}` : ''}`} key={p.title}>
                <div className="ic">
                  <svg viewBox="0 0 24 24">{PRINCIPLE_ICONS[i]}</svg>
                </div>
                <h3>{rich(p.title)}</h3>
                <p>{rich(p.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how pad">
        <div className="wrap">
          <div className="split">
            <div className="plate rv" style={{ aspectRatio: '4 / 3.6' }}>
              <img src="/images/soc1.jpg" alt={t('hiw.whoImgAlt')} loading="lazy" decoding="async" />
            </div>
            <div className="prose rv d1">
              <span className="eyebrow">{t('hiw.whoEyebrow')}</span>
              <h2>
                {t('hiw.whoTitleA')}<span className="r">{t('hiw.whoTitleR')}</span>
              </h2>
              <p>{rich(t('hiw.whoP'))}</p>
              <ul className="checklist">
                {forItems.map((item, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                    <span>{rich(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">{t('hiw.insideEyebrow')}</span>
              <h2>
                {t('hiw.insideTitleA')}<span className="r">{t('hiw.insideTitleR')}</span>
              </h2>
            </div>
            <span className="idx">{t('hiw.idx2')}</span>
          </div>
          <div className="steps">
            {steps.map((s, i) => (
              <div className={`step rv${i ? ` d${i}` : ''}`} key={s.title}>
                <div className="pic">
                  <span className="no">{i + 1}</span>
                  <img src={STEP_IMGS[i]} alt={s.alt} loading="lazy" decoding="async" />
                </div>
                <h3>{rich(s.title)}</h3>
                <p>{rich(s.text)}</p>
              </div>
            ))}
          </div>

          <div className="note rv" style={{ margin: '2.6rem auto 0' }}>
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
                <path d="M12 8v5" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <div>
              <h3>{t('hiw.readinessTitle')}</h3>
              <p>{rich(t('hiw.readinessText'))}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip lineKey="hiw.ctaLine" msgKey="msg.trySession" />
    </>
  )
}
