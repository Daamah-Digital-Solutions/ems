import { Link } from 'react-router-dom'
import { waLink } from '../constants'
import { WaIcon } from '../components/icons'
import HeroIcon from '../components/HeroIcon'
import CtaStrip from '../components/CtaStrip'

// The general EMS principle — strictly descriptive, no medical or
// guaranteed-result claims, no invented specs. Mirrors the approved Home copy.
const PRINCIPLE = [
  {
    title: 'Impulse meets movement',
    text: 'Light electrical impulses sync with each exercise, so your own effort and the system work together.',
    icon: <path d="M3 12h4l3 8 4-16 3 8h4" />,
  },
  {
    title: 'Full-body in one go',
    text: 'Many muscle groups can be engaged at once — which is what makes such a short session feel so complete.',
    icon: (
      <>
        <path d="M12 2l9 5-9 5-9-5 9-5z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 17l9 5 9-5" />
      </>
    ),
  },
  {
    title: 'Low-impact by nature',
    text: 'Sessions are built around controlled, gentle movements rather than heavy weights.',
    icon: (
      <>
        <path d="M20 4a6 6 0 0 0-8 0L4 12v7h7l8-8a6 6 0 0 0 1-7z" />
        <path d="M15 8L7 16" />
      </>
    ),
  },
  {
    title: 'Always guided',
    text: 'A trainer calibrates and coaches every minute. You stay in control throughout — and you never train alone.',
    icon: (
      <>
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11l2 2 4-4" />
      </>
    ),
  },
]

// Who it's for — qualitative only, no numbers or claims.
const FOR = [
  <>
    <b>Busy schedules</b> that need training to be efficient, not all-consuming
  </>,
  <>
    Anyone who values <b>privacy</b> and undivided, one-on-one attention
  </>,
  <>
    People <b>easing back into training</b> who want guidance and full control
  </>,
  <>
    Those who would rather <b>skip the gym and the commute</b> entirely
  </>,
]

const STEPS = [
  {
    img: '/images/cut3.jpg',
    alt: 'A trainer fitting the EMS suit before a session',
    title: 'Settle & calibrate',
    text: 'Your trainer arrives, helps you into the impulse suit over a light base layer, and sets the intensity to a level that feels right for you.',
  },
  {
    img: '/images/hero.jpg',
    alt: 'A guided EMS session in progress',
    title: 'Twenty guided minutes',
    text: 'You move through simple exercises as the impulses sync with you. Most describe it as a deep, tingling muscle engagement — and your trainer adjusts it throughout.',
  },
  {
    img: '/images/cut2.jpg',
    alt: 'Relaxing after a session',
    title: 'Cool down & carry on',
    text: 'A short wind-down, we pack the kit away, and the rest of your day is yours — no commute, no clean-up.',
  },
]

export default function HowItWorks() {
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">How EMS works</span>
            <h1 className="rv d1">
              Twenty minutes, <span className="r">fully engaged.</span>
            </h1>
            <p className="lede rv d2">
              EMS — Electrical Muscle Stimulation — adds gentle electrical impulses
              to the movements you&apos;re already doing, encouraging many muscle
              groups to engage together. Paired with a trainer&apos;s guidance,
              that&apos;s the idea behind a short, focused session.
            </p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink("Hi EMS ElRiyadh, I'd like to book a session.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                Book on WhatsApp
              </a>
              <Link className="ghost" to="/about">
                About us <span className="a">→</span>
              </Link>
            </div>
          </div>

          <div className="phero-media phero-media-icon">
            <HeroIcon>
              {/* EMS impulse / pulse waveform — same brand stroke style as the icons */}
              <path d="M2 12h4l2.5 7 4-14 2.5 7h2l1.5-3 1.5 3H22" />
            </HeroIcon>
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">The principle</span>
              <h2>
                Your movement, <span className="r">amplified.</span>
              </h2>
            </div>
            <span className="idx">01 — The principle</span>
          </div>
          <p className="lead-p rv">
            During a session you move through simple, low-impact exercises while
            the suit delivers light impulses in sync with you. You stay in
            control the whole time, and your trainer fine-tunes the intensity to
            suit you.
          </p>
          <div className="benefits">
            {PRINCIPLE.map((p, i) => (
              <div className={`bcard rv${i ? ` d${i}` : ''}`} key={p.title}>
                <div className="ic">
                  <svg viewBox="0 0 24 24">{p.icon}</svg>
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how pad">
        <div className="wrap">
          <div className="split">
            <div className="plate rv" style={{ aspectRatio: '4 / 3.6' }}>
              <img src="/images/soc1.jpg" alt="One-on-one EMS coaching at home" loading="lazy" decoding="async" />
            </div>
            <div className="prose rv d1">
              <span className="eyebrow">Who it&apos;s for</span>
              <h2>
                Made for real <span className="r">schedules.</span>
              </h2>
              <p>
                EMS suits a wide range of active adults. It is especially at home
                with people who want results from training without rearranging
                their whole week around it.
              </p>
              <ul className="checklist">
                {FOR.map((item, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">Inside a session</span>
              <h2>
                What a session <span className="r">feels like.</span>
              </h2>
            </div>
            <span className="idx">02 — The session</span>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className={`step rv${i ? ` d${i}` : ''}`} key={s.title}>
                <div className="pic">
                  <span className="no">{i + 1}</span>
                  <img src={s.img} alt={s.alt} loading="lazy" decoding="async" />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>

          <div className="note rv" style={{ margin: '2.6rem auto 0' }}>
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
                <path d="M12 8v5" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <div>
              <h3>A quick readiness note</h3>
              <p>
                EMS supports general fitness, toning and strength for many active
                adults. As with starting any new training, we recommend checking
                with your doctor first if you have a health condition, are
                pregnant, or use an implanted electronic device such as a
                pacemaker. Before your first session, your trainer also runs a
                short readiness chat. EMS ElRiyadh is a fitness training service —
                not a medical device or treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip
        line={<>Curious how it <span className="r">feels?</span></>}
        message="Hi EMS ElRiyadh, I'd like to try a first EMS session."
      />
    </>
  )
}
