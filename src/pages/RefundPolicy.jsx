import { useEffect, useState } from 'react'
import { EMAIL, PHONE, WA, SITE, waLink } from '../constants'
import { useLang } from '../i18n'
import { WaIcon } from '../components/icons'
import { LATIN_RUN } from '../bidi'

// Subscriptions, refunds & alternatives policy. Clause text is client-supplied
// and lives in legal.refund (shared with the branded PDFs in policy/).
// // TODO: have a lawyer review before launch.

const SPLIT = new RegExp(`(${LATIN_RUN.source})`, 'g')
const pad = (n) => String(n).padStart(2, '0')

export default function RefundPolicy() {
  const { t, lang } = useLang()
  const r = (k) => t(`legal.refund.${k}`)
  const sections = r('sections')
  const tiles = r('tiles')
  const labels = r('contactLabels')
  const [active, setActive] = useState(0)

  // Isolate Latin runs in Arabic so EMS / (PT) / MyoStyle® keep their order.
  const iso = (s) =>
    lang === 'ar' ? s.split(SPLIT).map((part, i) => (i % 2 ? <bdi key={i}>{part}</bdi> : part)) : s

  // Highlight the section being read in the side contents.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const els = sections.map((_, i) => document.getElementById(`clause-${i + 1}`)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.i))
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  const jump = (e, i) => {
    e.preventDefault()
    document.getElementById(`clause-${i + 1}`)?.scrollIntoView({ block: 'start' })
  }

  return (
    <>
      {/* COVER */}
      <section className="rp-head">
        <div className="wrap">
          <div className="rp-cover rv">
            <span className="rp-glow" aria-hidden="true" />
            <svg className="arc" viewBox="0 0 600 600" preserveAspectRatio="none" aria-hidden="true">
              <path d="M70,540 C40,300 180,70 470,60 C300,120 150,300 220,560" />
            </svg>
            <div className="rp-cover-in">
              <div className="rp-cover-top">
                <span className="eyebrow">{r('eyebrow')}</span>
                <span className="rp-tag">{r('tag')}</span>
              </div>
              <h1>
                {r('title')} <span className="r">{r('accent')}</span>
              </h1>
              <p className="rp-lede">{r('intro')}</p>
              <div className="rp-actions">
                <a
                  className="btn-lg"
                  href={`/docs/refund-policy-${lang}.pdf`}
                  download={`EMS-ElRiyadh-Refund-Policy-${lang.toUpperCase()}.pdf`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19.5h14" />
                  </svg>
                  {r('download')}
                </a>
                <a className="rp-ghost" href={waLink(t('msg.question'))} target="_blank" rel="noopener noreferrer">
                  <WaIcon />
                  {t('common.askWhatsApp')}
                </a>
              </div>
              <dl className="rp-meta">
                <div>
                  <dt>{r('meta.sections')}</dt>
                  <dd>{pad(sections.length)}</dd>
                </div>
                <div>
                  <dt>{r('meta.scope')}</dt>
                  <dd>{iso(r('meta.scopeValue'))}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="rp-glance">
        <div className="wrap">
          <div className="rp-label rv">
            <span>{r('glanceTitle')}</span>
            <i aria-hidden="true" />
          </div>
          <div className="rp-tiles">
            {tiles.map(([v, l], i) => (
              <div className={`rp-tile rv${i ? ` d${Math.min(i, 3)}` : ''}`} key={v}>
                <b>{iso(v)}</b>
                <p>{iso(l)}</p>
              </div>
            ))}
          </div>
          <p className="rp-note rv">{r('glanceNote')}</p>
        </div>
      </section>

      {/* CLAUSES */}
      <section className="rp-body">
        <div className="wrap rp-grid">
          <aside className="rp-toc" aria-label={r('tocTitle')}>
            <span className="rp-toc-h">{r('tocTitle')}</span>
            <ol>
              {sections.map((s, i) => (
                <li key={i}>
                  <a
                    href={`#clause-${i + 1}`}
                    className={active === i ? 'on' : undefined}
                    aria-current={active === i ? 'true' : undefined}
                    onClick={(e) => jump(e, i)}
                  >
                    <span className="n">{pad(i + 1)}</span>
                    <span>{iso(s.title)}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="rp-sections">
            {sections.map((s, i) => (
              <article className="rp-sec rv" id={`clause-${i + 1}`} data-i={i} key={i}>
                <div className="rp-num" aria-hidden="true">{pad(i + 1)}</div>
                <div className="rp-sec-body">
                  <h2>{iso(s.title)}</h2>
                  {s.clauses.map((c, j) => (
                    <div className="rp-clause" key={j}>
                      {c.label && (
                        <h3>
                          <span>{iso(c.label)}</span>
                        </h3>
                      )}
                      {c.items ? (
                        <ul>
                          {c.items.map((li) => (
                            <li key={li}>{iso(li)}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{iso(c.text)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}

            <div className="rp-contact rv">
              <span className="rp-glow" aria-hidden="true" />
              <div className="rp-contact-h">
                <h2>{r('contactTitle')}</h2>
                <p>{r('contactSub')}</p>
                <a className="btn-lg" href={waLink(t('msg.question'))} target="_blank" rel="noopener noreferrer">
                  <WaIcon />
                  {t('common.askWhatsApp')}
                </a>
              </div>
              <div className="rp-contact-items">
                <a href={WA} target="_blank" rel="noopener noreferrer">
                  <span>{labels[0]}</span>
                  <b dir="ltr">{PHONE}</b>
                </a>
                <a href={`mailto:${EMAIL}`}>
                  <span>{labels[1]}</span>
                  <b dir="ltr">{EMAIL}</b>
                </a>
                <a href={SITE}>
                  <span>{labels[2]}</span>
                  <b dir="ltr">{SITE.replace('https://', '')}</b>
                </a>
              </div>
            </div>
            <p className="rp-disclaimer">{iso(r('disclaimer'))}</p>
          </div>
        </div>
      </section>
    </>
  )
}
