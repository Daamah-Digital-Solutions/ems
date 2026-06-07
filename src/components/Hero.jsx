import { waLink } from '../constants'
import { useLang, rich } from '../i18n'
import { WaIcon } from './icons'

export default function Hero({ loaded }) {
  const { t } = useLang()
  const trust = t('hero.trust')
  return (
    <section className={`hero${loaded ? ' go' : ''}`} id="hero">
      <div className="hero-l">
        <span className="eyebrow">{t('hero.eyebrow')}</span>
        <h1>
          <span className="ln l1"><span>{t('hero.line1')}</span></span>
          <span className="ln l2"><span>{t('hero.line2')}</span></span>
          <span className="ln l3"><span className="r">{t('hero.line3')}</span></span>
        </h1>
        <p className="sub">{rich(t('hero.sub'))}</p>
        <div className="hero-cta">
          <a
            className="btn-lg"
            href={waLink(t('msg.session'))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WaIcon />
            {t('common.bookWhatsApp')}
          </a>
          <a className="ghost" href="#how">
            {t('hero.seeHow')} <span className="a">→</span>
          </a>
        </div>
        <div className="trust">
          {trust.map((item, i) => (
            <span className="t" key={i}><span className="dot" /> {rich(item)}</span>
          ))}
        </div>
      </div>

      <div className="hero-media">
        <svg className="arc" viewBox="0 0 600 600" aria-hidden="true" preserveAspectRatio="none">
          <path d="M70,540 C40,300 180,70 470,60 C300,120 150,300 220,560" />
        </svg>
        <div className="frame">
          <img
            src="/images/final-hero.jpg"
            alt="An EMS ElRiyadh trainer coaching a client through a session"
            decoding="async"
          />
        </div>
        <div className="fbadge b1">
          <span className="v">20<small style={{ fontSize: '.6em' }}>′</small></span>
          <span className="k">{t('hero.badge1a')}<br />{t('hero.badge1b')}</span>
        </div>
        <div className="fbadge b2 float">
          <span className="v">2×</span>
          <span className="k">{t('hero.badge2a')}<br />{t('hero.badge2b')}</span>
        </div>
      </div>
    </section>
  )
}
