import { waLink } from '../constants'
import { Check, WaIcon } from '../components/icons'
import CtaStrip from '../components/CtaStrip'

// Plans are presented by INCLUSIONS only — never by price. Every CTA routes to
// WhatsApp ("Enquire"). Pricing is shared on enquiry.
const PLANS = [
  {
    name: 'Trial',
    title: <>First session</>,
    items: [
      'One 20-minute intro session',
      'Full German MyoStyle® kit brought to you',
      'Personal calibration & goals chat',
      'Flexible scheduling across Riyadh',
    ],
    cta: 'Enquire on WhatsApp →',
    msg: "Hi EMS ElRiyadh, I'd like to try a first EMS session.",
    pick: 'line',
  },
  {
    name: 'The Rhythm',
    title: (
      <>
        2×20 <span className="r">/ week</span>
      </>
    ),
    items: [
      'Two sessions weekly, same trainer',
      'Progressive, personalised plan',
      'Priority slots across Riyadh',
      'Home, hotel or compound',
    ],
    cta: 'Enquire on WhatsApp →',
    msg: "Hi EMS ElRiyadh, I'd like the 2x20 weekly EMS plan.",
    pick: 'solid',
    feat: true,
  },
  {
    name: 'Concierge',
    title: <>Bespoke</>,
    items: [
      'Tailored frequency & timing',
      'Couples & household sessions',
      'Dedicated trainer & full discretion',
      'Travel-friendly across Riyadh',
    ],
    cta: 'Enquire on WhatsApp →',
    msg: "Hi EMS ElRiyadh, I'm interested in a bespoke EMS concierge plan.",
    pick: 'line',
  },
]

const INCLUDED = [
  'The full MyoStyle® system & impulse suit, brought to you',
  'A dedicated one-on-one trainer, every session',
  'Intensity calibrated and fine-tuned to your comfort',
  'Flexible scheduling, anywhere in Riyadh',
]

export default function Pricing() {
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">Sessions &amp; plans</span>
            <h1 className="rv d1">
              Plans built around <span className="r">you.</span>
            </h1>
            <p className="lede rv d2">
              Pick the rhythm that fits your week. Every plan is one-on-one, comes
              to your door, and is tailored to how often you want to train — so we
              share the right option and pricing on a quick WhatsApp enquiry.
            </p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink("Hi EMS ElRiyadh, I'd like to hear about your plans.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                Enquire on WhatsApp
              </a>
            </div>
          </div>

          <div className="phero-media rv d1">
            <svg className="arc" viewBox="0 0 600 600" aria-hidden="true" preserveAspectRatio="none">
              <path d="M70,540 C40,300 180,70 470,60 C300,120 150,300 220,560" />
            </svg>
            <div className="plate">
              <img src="/images/cut2.jpg" alt="A premium EMS session brought to your space" decoding="async" />
            </div>
            <div className="fbadge b1">
              <span className="v">20<small style={{ fontSize: '.6em' }}>′</small></span>
              <span className="k">per<br />session</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">Choose your rhythm</span>
              <h2>
                Pick your <span className="r">plan.</span>
              </h2>
            </div>
            <span className="idx">01 — Plans</span>
          </div>
          <div className="sx">
            {PLANS.map((p, i) => (
              <div className={`scard rv${p.feat ? ' feat' : ''}${i ? ` d${i}` : ''}`} key={p.name}>
                {p.feat && <span className="badge">Most chosen</span>}
                <span className="pn">{p.name}</span>
                <div className="pt">{p.title}</div>
                <ul>
                  {p.items.map((it) => (
                    <li key={it}>
                      <Check />
                      {it}
                    </li>
                  ))}
                </ul>
                <a
                  className={`pick ${p.pick}`}
                  href={waLink(p.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
          <div className="note rv" style={{ margin: '2rem auto 0' }}>
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h3>How pricing works</h3>
              <p>
                Because plans are tailored to your frequency, location and goals,
                we share pricing on enquiry rather than listing it here. Send one
                WhatsApp message and we&apos;ll put together the right option for
                you — no obligation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="how pad">
        <div className="wrap">
          <div className="split">
            <div className="plate rv" style={{ aspectRatio: '4 / 3.6' }}>
              <img src="/images/soc3.jpg" alt="Premium one-on-one EMS coaching" loading="lazy" decoding="async" />
            </div>
            <div className="prose rv d1">
              <span className="eyebrow">Always included</span>
              <h2>
                In every <span className="r">session.</span>
              </h2>
              <p>
                Whatever rhythm you choose, the essentials never change — premium
                kit, a dedicated coach and a session shaped entirely around you.
              </p>
              <ul className="checklist">
                {INCLUDED.map((it) => (
                  <li key={it}>
                    <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip
        line={<>Find your <span className="r">rhythm.</span></>}
        message="Hi EMS ElRiyadh, I'd like to hear about your plans."
      />
    </>
  )
}
