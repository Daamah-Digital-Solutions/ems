import { waLink } from '../constants'
import { WaIcon } from '../components/icons'
import CtaStrip from '../components/CtaStrip'

// "What to expect" — qualitative and experiential only. No numbers, ratings,
// outcomes or medical/guaranteed-result claims.
const EXPECT = [
  'A routine that fits — two short sessions a week, around your life',
  'Time back in your day — no commute, no waiting, no clean-up',
  'Coaching every minute, with a dedicated one-on-one trainer',
  'A calm, private session in your own space',
]

// PLACEHOLDER TESTIMONIALS — fictional, experiential, no outcome/medical claims.
const REVIEWS = [
  { quote: 'They arrived right on time, set everything up, and I was training within minutes. No gym, no commute — it just works.', name: 'A. M.', initials: 'AM', area: 'Riyadh' }, // TODO: replace with real testimonial
  { quote: 'Twenty minutes that actually fit my schedule. My coach kept it calm and focused the whole way through.', name: 'N. S.', initials: 'NS', area: 'Riyadh' }, // TODO: replace with real testimonial
  { quote: 'Doing it at home made all the difference. It feels private and easy, and it’s genuinely something I look forward to.', name: 'L. K.', initials: 'LK', area: 'Riyadh' }, // TODO: replace with real testimonial
  { quote: 'The one-on-one attention is the best part. Every session is adjusted to how I’m feeling that day.', name: 'R. A.', initials: 'RA', area: 'Riyadh' }, // TODO: replace with real testimonial
  { quote: 'Having the studio come to the compound is so convenient, and booking over WhatsApp couldn’t be simpler.', name: 'H. Y.', initials: 'HY', area: 'Riyadh' }, // TODO: replace with real testimonial
  { quote: 'Professional, friendly and never rushed. It has become the easiest healthy habit I’ve managed to keep.', name: 'S. T.', initials: 'ST', area: 'Riyadh' }, // TODO: replace with real testimonial
]

export default function Results() {
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">Results &amp; reviews</span>
            <h1 className="rv d1">
              What to <span className="r">expect.</span>
            </h1>
            <p className="lede rv d2">
              Everyone&apos;s different, so we keep it honest: EMS ElRiyadh is about
              a consistent, time-efficient routine with real coaching — delivered to
              your door. Here&apos;s what the experience is like, in our clients&apos;
              words.
            </p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink("Hi EMS ElRiyadh, I'd like to book a first session.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                Book a first session
              </a>
            </div>
          </div>

          <div className="phero-media rv d1">
            <svg className="arc" viewBox="0 0 600 600" aria-hidden="true" preserveAspectRatio="none">
              <path d="M70,540 C40,300 180,70 470,60 C300,120 150,300 220,560" />
            </svg>
            <div className="plate">
              <img src="/images/soc3.jpg" alt="A client during an EMS ElRiyadh session" decoding="async" />
            </div>
            <div className="fbadge b1">
              <span className="v">1:1</span>
              <span className="k">real<br />coaching</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="split">
            <div className="plate rv" style={{ aspectRatio: '4 / 3.6' }}>
              <img src="/images/cut2.jpg" alt="The calm of training in your own space" loading="lazy" decoding="async" />
            </div>
            <div className="prose rv d1">
              <span className="eyebrow">The experience</span>
              <h2>
                What you&apos;ll <span className="r">notice.</span>
              </h2>
              <p>
                We won&apos;t promise numbers. What clients tell us they value is
                simpler — a routine that&apos;s easy to keep, and a session that
                feels genuinely their own.
              </p>
              <ul className="checklist">
                {EXPECT.map((it) => (
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

      <section className="how pad">
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">In their words</span>
              <h2>
                What clients <span className="r">say.</span>
              </h2>
            </div>
            <span className="idx">02 — Testimonials</span>
          </div>
          <div className="quotes">
            {REVIEWS.map((r, i) => (
              <div className={`qcard rv${i % 3 ? ` d${i % 3}` : ''}`} key={r.name + i}>
                <span className="qmark" aria-hidden="true">&ldquo;</span>
                <blockquote>{r.quote}</blockquote>
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
          <p className="fine rv">
            Reviews shown are placeholders for layout and will be replaced with
            real, consented client feedback. EMS ElRiyadh is a fitness &amp;
            wellbeing service, not a medical device or treatment.
            {/* TODO: replace placeholder testimonials with real, consented client reviews */}
          </p>
        </div>
      </section>

      <CtaStrip
        line={<>See how it <span className="r">feels.</span></>}
        message="Hi EMS ElRiyadh, I'd like to book a first session."
      />
    </>
  )
}
