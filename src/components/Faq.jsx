import { useRef, useState } from 'react'
import { PHONE } from '../constants'

const QA = [
  [
    'What does a session feel like?',
    'A gentle, tingling pulse that builds as you move. Your trainer calibrates intensity to you and adjusts throughout — you stay fully in control. Most describe it as a deep, satisfying muscle engagement rather than anything uncomfortable.',
  ],
  [
    'Why only 20 minutes, twice a week?',
    'The impulse engages many muscle groups at once, so a short, focused session is efficient. Two sessions weekly leaves ample recovery — and keeps the commitment realistic for a full schedule.',
  ],
  [
    'Do I need equipment or space?',
    'None. We bring everything — the German MyoStyle® system, the impulse suit and your trainer. A few square metres of floor is all it takes, at home, your hotel or your compound.',
  ],
  [
    'Is EMS suitable for me?',
    'EMS supports general fitness, toning and strength for many active adults. As with starting any new training, we recommend checking with your doctor if you have a health condition, are pregnant, or use an implanted electronic device. Your trainer will also run a short readiness chat first.',
  ],
  [
    'How do I book?',
    `One message. Tap any WhatsApp button or write to ${PHONE} — we'll find a time, confirm your location anywhere in Riyadh, and arrive ready.`,
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
    <section id="faq" className="pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="shead rv" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div>
            <span className="eyebrow">Good to know</span>
            <h2>
              Questions, <span className="r">answered.</span>
            </h2>
          </div>
        </div>
        <div className="faq rv">
          {QA.map(([q, a]) => (
            <Item key={q} q={q} a={a} />
          ))}
        </div>
      </div>
    </section>
  )
}
