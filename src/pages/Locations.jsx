import { waLink } from '../constants'
import { useLang } from '../i18n'
import { Arrow, WaIcon } from '../components/icons'
import HeroIcon from '../components/HeroIcon'
import CtaStrip from '../components/CtaStrip'

const PLACE_IMGS = [
  'https://images.unsplash.com/photo-1586439496903-c96e9f18f212?q=80&w=1100&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1100&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?q=80&w=1100&auto=format&fit=crop',
]
const PLACE_MSGS = ['msg.atHome', 'msg.atHotel', 'msg.atCompound']

const COVERAGE_ICONS = [
  (
    <>
      <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
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
      <path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </>
  ),
]

export default function Locations() {
  const { t } = useLang()
  const places = t('locations.places')
  const coverage = t('locations.coverage')
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">{t('locations.heroEyebrow')}</span>
            <h1 className="rv d1">
              {t('locations.heroTitleA')}<span className="r">{t('locations.heroTitleR')}</span>
            </h1>
            <p className="lede rv d2">{t('locations.lede')}</p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink(t('msg.coverage'))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                {t('locations.checkArea')}
              </a>
            </div>
          </div>

          <div className="phero-media phero-media-icon">
            <HeroIcon>
              <path d="M12 21s-6.5-5-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 16 12 21 12 21z" />
              <circle cx="12" cy="10.5" r="2.4" />
            </HeroIcon>
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">{t('locations.whereEyebrow')}</span>
              <h2>
                {t('locations.whereTitleA')}<span className="r">{t('locations.whereTitleR')}</span>
              </h2>
            </div>
            <span className="idx">{t('locations.idx')}</span>
          </div>
        </div>
        <div className="band">
          {places.map((p, i) => (
            <a
              key={p.tag}
              className={`wc rv${i ? ` d${i}` : ''}`}
              href={waLink(t(PLACE_MSGS[i]))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                loading="lazy"
                decoding="async"
                src={PLACE_IMGS[i]}
                alt={p.title}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span className="tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <span className="go">
                {t('common.bookCard')} <Arrow />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">{t('locations.coverageEyebrow')}</span>
              <h2>
                {t('locations.coverageTitleA')}<span className="r">{t('locations.coverageTitleR')}</span>
              </h2>
            </div>
            <span className="idx">{t('locations.idx2')}</span>
          </div>
          <div className="benefits">
            {coverage.map((v, i) => (
              <div className={`bcard rv${i ? ` d${i}` : ''}`} key={v.title}>
                <div className="ic">
                  <svg viewBox="0 0 24 24">{COVERAGE_ICONS[i]}</svg>
                </div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
          <div className="note rv" style={{ margin: '2.4rem auto 0' }}>
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </div>
            <div>
              <h3>{t('locations.schedulingTitle')}</h3>
              <p>{t('locations.schedulingText')}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip lineKey="locations.ctaLine" msgKey="msg.coverage" />
    </>
  )
}
