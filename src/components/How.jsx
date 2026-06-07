const STEPS = [
  {
    img: '/images/cut3.jpg',
    alt: 'A client in the EMS suit at home',
    title: 'We arrive',
    text: "Your trainer brings the suit and the full system to your door. You're ready in minutes — no gym, no equipment.",
  },
  {
    img: '/images/hero.jpg',
    alt: 'Guided EMS training with a coach',
    title: 'You activate',
    text: 'Calibrated impulses sync with every movement as your coach guides you through twenty focused minutes.',
  },
  {
    img: '/images/cut2.jpg',
    alt: 'Relaxing after a session',
    title: 'You recharge',
    text: 'We pack up and disappear — leaving you energised, with the rest of your day completely free.',
  },
]

export default function How() {
  return (
    <section id="how" className="how pad">
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="eyebrow">How it works</span>
            <h2>
              Three steps.<br />
              That's <span className="r">the ritual.</span>
            </h2>
          </div>
          <span className="idx">02 — The session</span>
        </div>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div className={`step rv${i ? ` d${i}` : ''}`} key={s.title}>
              <div className="pic">
                <span className="no">{i + 1}</span>
                <img src={s.img} alt={s.alt} loading={i === 0 ? undefined : 'lazy'} decoding="async" />
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
