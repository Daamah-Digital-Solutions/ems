import { Link } from 'react-router-dom'
import { waLink } from '../constants'
import { WaIcon } from '../components/icons'
import CtaStrip from '../components/CtaStrip'

// Values behind the service — only facts we have: comes to you, private/1:1,
// time-efficient, calibrated. No invented numbers, dates or specs.
const VALUES = [
  {
    title: 'It comes to you',
    text: 'Home, hotel or compound — your space becomes the studio. We bring the full German MyoStyle® system and set up in minutes.',
    icon: (
      <>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
  },
  {
    title: 'Private & one-on-one',
    text: 'Every session is just you and your trainer. No crowds, no waiting, no audience — calm, focused and completely yours.',
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" />
        <path d="M9.5 12l1.8 1.8L15 10" />
      </>
    ),
  },
  {
    title: 'Time-efficient by design',
    text: 'Twenty focused minutes, twice a week. We respect your schedule and hand the rest of your day straight back to you.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: 'Calibrated to you',
    text: 'Your trainer adjusts the intensity and guides every movement, so each session meets you exactly where you are.',
    icon: (
      <>
        <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
        <path d="M1 14h6M9 8h6M17 16h6" />
      </>
    ),
  },
]

export default function About() {
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">About EMS ElRiyadh</span>
            <h1 className="rv d1">
              The studio that comes to <span className="r">you.</span>
            </h1>
            <p className="lede rv d2">
              EMS ElRiyadh brings premium, one-on-one Electrical Muscle Stimulation
              training to homes, hotels and compounds across Riyadh. The idea is
              simple: remove everything that stands between you and a focused
              workout — the commute, the crowded gym, the rigid timetable — and
              bring the session to your door instead.
            </p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink("Hi EMS ElRiyadh, I'd like to know more about your sessions.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                Book on WhatsApp
              </a>
              <Link className="ghost" to="/how-it-works">
                How EMS works <span className="a">→</span>
              </Link>
            </div>
          </div>

          <div className="phero-media rv d1">
            <svg className="arc" viewBox="0 0 600 600" aria-hidden="true" preserveAspectRatio="none">
              <path d="M70,540 C40,300 180,70 470,60 C300,120 150,300 220,560" />
            </svg>
            <div className="plate">
              <img src="/images/hero.jpg" alt="An EMS ElRiyadh trainer coaching a client" decoding="async" />
            </div>
            <div className="fbadge b1">
              <span className="v">1:1</span>
              <span className="k">private<br />sessions</span>
            </div>
            <div className="fbadge b2 float">
              <span className="v">2×</span>
              <span className="k">a week<br />· 20 min</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">Why we exist</span>
              <h2>
                Training, on <span className="r">your terms.</span>
              </h2>
            </div>
            <span className="idx">01 — The idea</span>
          </div>
          <p className="lead-p rv">
            We built EMS ElRiyadh for people whose time is tight and whose
            standards are high. Two short sessions a week, with a trainer who
            comes to you — so staying strong fits around your life, not the other
            way around. These are the principles we hold to.
          </p>
          <div className="benefits">
            {VALUES.map((v, i) => (
              <div className={`bcard rv${i ? ` d${i}` : ''}`} key={v.title}>
                <div className="ic">
                  <svg viewBox="0 0 24 24">{v.icon}</svg>
                </div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how pad">
        <div className="wrap">
          <div className="split">
            <div className="plate rv" style={{ aspectRatio: '4 / 3.6' }}>
              <img
                src="/images/cut3.jpg"
                alt="A client training in the German MyoStyle® EMS suit"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="prose rv d1">
              <span className="eyebrow">Our partner system</span>
              <h2>
                Powered by <span className="r">MyoStyle®.</span>
              </h2>
              <p>
                EMS ElRiyadh trains with MyoStyle®, a German EMS suit and system.
                The impulse suit is worn over a light base layer and works with
                your own movement, while your trainer manages and calibrates the
                system throughout the session.
              </p>
              <p>
                German engineering and a premium feel are central to how a
                session looks and feels — and to why we chose MyoStyle® as our
                partner. {/* TODO: confirm specific MyoStyle® technical details with the brand before publishing any specs */}
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip
        line={<>The studio comes to <span className="r">you.</span></>}
        message="Hi EMS ElRiyadh, I'd like to book a session."
      />
    </>
  )
}
