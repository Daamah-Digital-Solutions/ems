const ITEMS = [
  {
    title: 'Full-body activation',
    text: 'Gentle impulses engage many muscle groups at once — far more than movement alone.',
    icon: <path d="M3 12h4l3 8 4-16 3 8h4" />,
  },
  {
    title: 'Only 20 minutes',
    text: 'Two short sessions a week. Intense, efficient, and easy to keep — even on a full schedule.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: 'One-on-one coaching',
    text: 'A dedicated trainer calibrates every session to you and guides each movement.',
    icon: (
      <>
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11l2 2 4-4" />
      </>
    ),
  },
  {
    title: 'It comes to you',
    text: 'Home, hotel or compound — we bring the German MyoStyle® system to your door.',
    icon: (
      <>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
  },
]

export default function Benefits() {
  return (
    <section id="why" className="pad">
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="eyebrow">Why EMS ElRiyadh</span>
            <h2>
              Big results,<br />
              <span className="r">small windows.</span>
            </h2>
          </div>
          <span className="idx">01 — The idea</span>
        </div>
        <div className="benefits">
          {ITEMS.map((it, i) => (
            <div className={`bcard rv${i ? ` d${i}` : ''}`} key={it.title}>
              <div className="ic">
                <svg viewBox="0 0 24 24">{it.icon}</svg>
              </div>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
