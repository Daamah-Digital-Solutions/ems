import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { waLink } from '../constants'
import { WaIcon } from '../components/icons'
import HeroIcon from '../components/HeroIcon'
import CtaStrip from '../components/CtaStrip'

// Full Q&A. Compliant — fitness/experience only, no prices, no medical or
// guaranteed-result claims. Keep the readiness/suitability answer.
const QA = [
  [
    'What is EMS training?',
    'EMS — Electrical Muscle Stimulation — adds gentle electrical impulses to simple exercises, encouraging many muscle groups to engage together. With a trainer guiding you, that makes a short, focused session feel complete.',
  ],
  [
    'What does a session feel like?',
    'A gentle, tingling pulse that builds as you move. Your trainer calibrates the intensity to you and adjusts it throughout — you stay fully in control. Most describe it as a deep, satisfying muscle engagement rather than anything uncomfortable.',
  ],
  [
    'Why only 20 minutes, twice a week?',
    'The impulse engages many muscle groups at once, so a short, focused session is efficient. Two sessions a week leaves ample recovery — and keeps the commitment realistic for a full schedule.',
  ],
  [
    'Do I need equipment or space?',
    'None. We bring everything — the German MyoStyle® system, the impulse suit and your trainer. A few square metres of floor is all it takes, at home, your hotel or your compound.',
  ],
  [
    'What should I wear?',
    'Light, comfortable clothing you can move in. The impulse suit goes on over a base layer, and your trainer will help you get set up before you begin.',
  ],
  [
    'Where do you operate?',
    'All of Riyadh. There are no fixed districts — if you are in the city, we come to you, whether that is your home, your hotel or your compound.',
  ],
  [
    'Is it really one-on-one?',
    'Yes. Every session is just you and a dedicated trainer who guides each movement and tailors the session to how you feel that day. Couples and household sessions can also be arranged.',
  ],
  [
    'Is EMS suitable for me?',
    'EMS supports general fitness, toning and strength for many active adults. As with starting any new training, we recommend checking with your doctor first if you have a health condition, are pregnant, or use an implanted electronic device such as a pacemaker. Your trainer will also run a short readiness chat before your first session. EMS ElRiyadh is a fitness training service, not a medical device or treatment.',
  ],
  [
    'How does scheduling work?',
    'Flexibly. Rather than fixed opening hours, we work around your week — tell us a time that suits you, day or evening, and we will confirm it over WhatsApp.',
  ],
  [
    'How much does it cost?',
    'Plans are tailored to how often you train, where you are and your goals, so we share pricing on a quick WhatsApp enquiry rather than listing it here. There is no obligation — just message us and we will suggest the right option.',
  ],
  [
    'How do I book?',
    `One message. Tap any WhatsApp button or write to us — we will find a time, confirm your location anywhere in Riyadh, and arrive ready.`,
  ],
]

function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  return (
    <div className="fr">
      <button className="fq" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {q}
        <span className="pm" aria-hidden="true" />
      </button>
      <div
        className="fa"
        ref={ref}
        style={{ maxHeight: open && ref.current ? ref.current.scrollHeight : 0 }}
      >
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">Good to know</span>
            <h1 className="rv d1">
              Questions, <span className="r">answered.</span>
            </h1>
            <p className="lede rv d2">
              Everything you might want to know about training with EMS ElRiyadh —
              the session, the suit, coverage and booking. Still unsure? Message us
              on WhatsApp and we will help.
            </p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink("Hi EMS ElRiyadh, I have a question about your sessions.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                Ask on WhatsApp
              </a>
              <Link className="ghost" to="/contact">
                Contact us <span className="a">→</span>
              </Link>
            </div>
          </div>

          <div className="phero-media phero-media-icon">
            <HeroIcon>
              {/* question mark */}
              <path d="M8.6 9.2a3.4 3.4 0 1 1 5 3c-1.1.8-1.6 1.4-1.6 2.8" />
              <path d="M12 18.6h.01" />
            </HeroIcon>
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="faq rv">
            {QA.map(([q, a]) => (
              <Item key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="how pad">
        <div className="wrap">
          <div className="split">
            <div className="plate rv" style={{ aspectRatio: '4 / 3.6' }}>
              <img src="/images/cut2.jpg" alt="A relaxed EMS session in your own space" loading="lazy" decoding="async" />
            </div>
            <div className="prose rv d1">
              <span className="eyebrow">Prefer to just ask?</span>
              <h2>
                We&apos;re happy to <span className="r">help.</span>
              </h2>
              <p>
                If your question isn&apos;t here, a quick message is the easiest
                way. Tell us what you&apos;d like to know and we&apos;ll come
                straight back to you — no pressure, no obligation.
              </p>
              <ul className="checklist">
                <li><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg><span>Answers within your day, over WhatsApp</span></li>
                <li><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg><span>Help choosing a plan or a time that suits you</span></li>
                <li><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg><span>A short readiness chat before your first session</span></li>
              </ul>
              <p style={{ marginTop: '1.4rem' }}>
                <a
                  className="btn-lg"
                  href={waLink("Hi EMS ElRiyadh, I have a question about your sessions.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WaIcon />
                  Ask on WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip
        line={<>Still have a <span className="r">question?</span></>}
        message="Hi EMS ElRiyadh, I have a question about your sessions."
      />
    </>
  )
}
