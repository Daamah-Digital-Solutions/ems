import { waLink } from '../constants'
import { useLang, rich } from '../i18n'
import { WaIcon } from '../components/icons'
import HeroIcon from '../components/HeroIcon'
import CtaStrip from '../components/CtaStrip'

export default function Results() {
  const { t } = useLang()
  const expect = t('results.expect')
  // PLACEHOLDER TESTIMONIALS — fictional, experiential, no outcome/medical claims.
  // TODO: replace with real, consented client reviews.
  const reviews = t('results.reviews')
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">{t('results.heroEyebrow')}</span>
            <h1 className="rv d1">
              {t('results.heroTitleA')}<span className="r">{t('results.heroTitleR')}</span>
            </h1>
            <p className="lede rv d2">{rich(t('results.lede'))}</p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink(t('msg.firstSession'))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                {t('common.bookWhatsApp')}
              </a>
            </div>
          </div>

          <div className="phero-media phero-media-icon">
            <HeroIcon>
              <path d="M3 16.5l5.5-5.5 3.5 3.5L20 7" />
              <path d="M15 7h5v5" />
              <path d="M5.4 4.1l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7L3.1 7l1.7-.6z" />
            </HeroIcon>
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="split">
            <div className="plate rv" style={{ aspectRatio: '4 / 3.6' }}>
              <img src="/images/cut2.jpg" alt={t('results.expectImgAlt')} loading="lazy" decoding="async" />
            </div>
            <div className="prose rv d1">
              <span className="eyebrow">{t('results.expectEyebrow')}</span>
              <h2>
                {t('results.expectTitleA')}<span className="r">{t('results.expectTitleR')}</span>
              </h2>
              <p>{rich(t('results.expectP'))}</p>
              <ul className="checklist">
                {expect.map((it) => (
                  <li key={it}>
                    <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                    <span>{rich(it)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="how pad">
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">{t('results.reviewsEyebrow')}</span>
              <h2>
                {t('results.reviewsTitleA')}<span className="r">{t('results.reviewsTitleR')}</span>
              </h2>
            </div>
            <span className="idx">{t('results.idx')}</span>
          </div>
          <div className="quotes">
            {reviews.map((r, i) => (
              <div className={`qcard rv${i % 3 ? ` d${i % 3}` : ''}`} key={r.name + i}>
                <span className="qmark" aria-hidden="true">&ldquo;</span>
                <blockquote>{rich(r.quote)}</blockquote>
                <div className="who">
                  <span className="avatar" aria-hidden="true">{r.initials}</span>
                  <div>
                    <div className="nm">{r.name}</div>
                    <div className="area">{r.area}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip lineKey="results.ctaLine" msgKey="msg.firstSession" />
    </>
  )
}
