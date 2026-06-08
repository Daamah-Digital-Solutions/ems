import { waLink } from '../constants'
import { useLang, rich } from '../i18n'
import { Check } from './icons'

// Non-copy config (style + WhatsApp message key) stays here; text from locale.
const META = [
  { pick: 'line', msg: 'msg.trySession' },
  { pick: 'solid', feat: true, msg: 'msg.rhythm' },
  { pick: 'line', msg: 'msg.concierge' },
]

export default function Sessions() {
  const { t } = useLang()
  const plans = t('sessions.plans')
  return (
    <section id="sessions" className="pad">
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="eyebrow">{t('sessions.eyebrow')}</span>
            <h2>
              {t('sessions.titleA')}<span className="r">{t('sessions.titleR')}</span>
            </h2>
          </div>
          <span className="idx">{t('sessions.idx')}</span>
        </div>
        <div className="sx">
          {plans.map((p, i) => {
            const m = META[i]
            return (
              <div className={`scard rv${m.feat ? ' feat' : ''}${i ? ` d${i}` : ''}`} key={p.name}>
                {m.feat && <span className="badge">{t('sessions.badge')}</span>}
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
        <p className="fine">{rich(t('sessions.fine'))}</p>
      </div>
    </section>
  )
}
