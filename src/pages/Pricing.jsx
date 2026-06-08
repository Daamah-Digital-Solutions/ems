import { waLink } from '../constants'
import { useLang, rich } from '../i18n'
import { Check, WaIcon } from '../components/icons'
import HeroIcon from '../components/HeroIcon'
import CtaStrip from '../components/CtaStrip'

const META = [
  { pick: 'line', msg: 'msg.trySession' },
  { pick: 'solid', feat: true, msg: 'msg.rhythm' },
  { pick: 'line', msg: 'msg.concierge' },
]

export default function Pricing() {
  const { t } = useLang()
  const plans = t('pricing.plans')
  const included = t('pricing.included')
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">{t('pricing.heroEyebrow')}</span>
            <h1 className="rv d1">
              {t('pricing.heroTitleA')}<span className="r">{t('pricing.heroTitleR')}</span>
            </h1>
            <p className="lede rv d2">{t('pricing.lede')}</p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink(t('msg.plans'))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                {t('common.enquireWhatsApp')}
              </a>
            </div>
          </div>

          <div className="phero-media phero-media-icon">
            <HeroIcon>
              <path d="M12 3.5l8.5 4.75L12 13 3.5 8.25z" />
              <path d="M3.5 12L12 16.75 20.5 12" />
              <path d="M3.5 15.5L12 20.25 20.5 15.5" />
            </HeroIcon>
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">{t('pricing.plansEyebrow')}</span>
              <h2>
                {t('pricing.plansTitleA')}<span className="r">{t('pricing.plansTitleR')}</span>
              </h2>
            </div>
            <span className="idx">{t('pricing.idx')}</span>
          </div>
          <div className="sx">
            {plans.map((p, i) => {
              const m = META[i]
              return (
                <div className={`scard rv${m.feat ? ' feat' : ''}${i ? ` d${i}` : ''}`} key={p.name}>
                  {m.feat && <span className="badge">{t('pricing.badge')}</span>}
                  <span className="pn">{p.name}</span>
                  <div className="pt">
                    {p.titleR ? (
                      <>{rich(p.titleA)}<span className="r">{rich(p.titleR)}</span></>
                    ) : (
                      rich(p.title)
                    )}
                  </div>
                  <ul>
                    {p.items.map((it) => (
                      <li key={it}>
                        <Check />
                        {rich(it)}
                      </li>
                    ))}
                  </ul>
                  <a
                    className={`pick ${m.pick}`}
                    href={waLink(t(m.msg))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.cta}
                  </a>
                </div>
              )
            })}
          </div>
          <div className="note rv" style={{ margin: '2rem auto 0' }}>
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h3>{t('pricing.noteTitle')}</h3>
              <p>{t('pricing.noteText')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how pad">
        <div className="wrap">
          <div className="split">
            <div className="plate rv" style={{ aspectRatio: '4 / 3.6' }}>
              <img src="/images/soc3.jpg" alt={t('pricing.includedImgAlt')} loading="lazy" decoding="async" />
            </div>
            <div className="prose rv d1">
              <span className="eyebrow">{t('pricing.includedEyebrow')}</span>
              <h2>
                {t('pricing.includedTitleA')}<span className="r">{t('pricing.includedTitleR')}</span>
              </h2>
              <p>{t('pricing.includedP')}</p>
              <ul className="checklist">
                {included.map((it) => (
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

      <CtaStrip lineKey="pricing.ctaLine" msgKey="msg.plans" />
    </>
  )
}
