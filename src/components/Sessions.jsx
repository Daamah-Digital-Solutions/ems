import { waLink } from '../constants'
import { Check } from './icons'

const PLANS = [
  {
    name: 'Trial',
    title: <>First session</>,
    items: ['One 20-minute intro session', 'Full kit brought to you', 'Personal calibration & goals chat'],
    cta: 'Try it →',
    msg: "Hi, I'd like to try a first EMS session.",
    pick: 'line',
  },
  {
    name: 'The Rhythm',
    title: (
      <>
        2×20 <span className="r">/ week</span>
      </>
    ),
    items: ['Two sessions weekly, same trainer', 'Progressive personalised plan', 'Priority slots across Riyadh'],
    cta: 'Start the rhythm →',
    msg: "Hi, I'd like the 2x20 weekly EMS plan.",
    pick: 'solid',
    feat: true,
  },
  {
    name: 'Concierge',
    title: <>Bespoke</>,
    items: ['Tailored frequency & timing', 'Couples & household sessions', 'Dedicated trainer & discretion'],
    cta: 'Enquire →',
    msg: "Hi, I'm interested in a bespoke EMS concierge plan.",
    pick: 'line',
  },
]

export default function Sessions() {
  return (
    <section id="sessions" className="pad">
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="eyebrow">Sessions</span>
            <h2>
              Pick your <span className="r">plan.</span>
            </h2>
          </div>
          <span className="idx">04 — Book</span>
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
        <p className="fine">
          EMS ElRiyadh is a premium fitness &amp; wellbeing service supporting muscle toning,
          strength and time-efficient training, powered by the German MyoStyle® system. It is a
          fitness training system, not a medical device or treatment, and complements an active,
          healthy lifestyle. Your trainer runs a short readiness chat before your first session.
        </p>
      </div>
    </section>
  )
}
