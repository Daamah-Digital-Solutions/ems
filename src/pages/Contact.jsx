import { useState } from 'react'
import { waLink, WA, PHONE, EMAIL, IG_HANDLE, INSTAGRAM } from '../constants'
import { WaIcon, IgIcon } from '../components/icons'
import HeroIcon from '../components/HeroIcon'
import Final from '../components/Final'

const PLANS = ['Trial — first session', '2×20 per week', 'Concierge / bespoke', 'Not sure yet']
const TIMES = ['Morning', 'Afternoon', 'Evening', 'Flexible']

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 5h18v14H3z M3 6l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 17l2 5h-3A15 15 0 0 1 3 7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export default function Contact() {
  const [f, setF] = useState({ name: '', phone: '', area: '', plan: PLANS[0], time: TIMES[0], notes: '' })

  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  const buildMessage = () => {
    const lines = [
      'Hi EMS ElRiyadh! I’d like to book a session.',
      f.name && `Name: ${f.name}`,
      f.phone && `Phone: ${f.phone}`,
      f.area && `Area in Riyadh: ${f.area}`,
      f.plan && `Plan: ${f.plan}`,
      f.time && `Preferred time: ${f.time}`,
      f.notes && `Notes: ${f.notes}`,
    ].filter(Boolean)
    return lines.join('\n')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // No backend — open WhatsApp with the composed message pre-filled.
    window.open(waLink(buildMessage()), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">Get in touch</span>
            <h1 className="rv d1">
              Book your <span className="r">session.</span>
            </h1>
            <p className="lede rv d2">
              Tell us a few details and we’ll open WhatsApp with your message ready
              to send — or reach us directly. We’ll confirm a time and your location
              anywhere in Riyadh.
            </p>
          </div>

          <div className="phero-media phero-media-icon">
            <HeroIcon>
              {/* chat bubble */}
              <path d="M20 4H4a1.6 1.6 0 0 0-1.6 1.6v8.8A1.6 1.6 0 0 0 4 16h3v3.8L11.2 16H20a1.6 1.6 0 0 0 1.6-1.6V5.6A1.6 1.6 0 0 0 20 4z" />
              <path d="M8 10h.01M12 10h.01M16 10h.01" />
            </HeroIcon>
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cgrid">
            <form className="form rv" onSubmit={onSubmit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-name">Your name</label>
                  <input id="c-name" type="text" autoComplete="name" value={f.name} onChange={set('name')} placeholder="e.g. Sara" />
                </div>
                <div className="field">
                  <label htmlFor="c-phone">Phone</label>
                  <input id="c-phone" type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} placeholder="05X XXX XXXX" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-area">Area in Riyadh</label>
                <input id="c-area" type="text" value={f.area} onChange={set('area')} placeholder="Home, hotel or compound — and your area" />
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-plan">Plan</label>
                  <select id="c-plan" value={f.plan} onChange={set('plan')}>
                    {PLANS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="c-time">Preferred time</label>
                  <select id="c-time" value={f.time} onChange={set('time')}>
                    {TIMES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-notes">Anything else? (optional)</label>
                <textarea id="c-notes" value={f.notes} onChange={set('notes')} placeholder="Goals, questions, scheduling notes…" />
              </div>
              <button type="submit" className="btn-lg submit">
                <WaIcon />
                Open WhatsApp with my details
              </button>
              <p className="hint">
                No account or payment needed. Submitting opens WhatsApp with your
                message pre-filled — you choose when to send it.
              </p>
            </form>

            <div className="cmethods rv d1">
              <a className="cm" href={waLink("Hi EMS ElRiyadh, I'd like to book a session.")} target="_blank" rel="noopener noreferrer">
                <span className="ic"><WaIcon /></span>
                <span>
                  <span className="k">WhatsApp</span>
                  <span className="v">{PHONE}</span>
                </span>
              </a>
              <a className="cm" href={`tel:${PHONE.replace(/\s/g, '')}`}>
                <span className="ic"><PhoneIcon /></span>
                <span>
                  <span className="k">Call</span>
                  <span className="v">{PHONE}</span>
                </span>
              </a>
              <a className="cm" href={`mailto:${EMAIL}`}>
                <span className="ic"><MailIcon /></span>
                <span>
                  <span className="k">Email</span>
                  <span className="v">{EMAIL}</span>
                </span>
              </a>
              <a className="cm" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                <span className="ic"><IgIcon /></span>
                <span>
                  <span className="k">Instagram</span>
                  <span className="v">{IG_HANDLE}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Final />
    </>
  )
}
