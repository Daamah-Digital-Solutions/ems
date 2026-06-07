import { waLink } from '../constants'
import { Arrow, WaIcon } from '../components/icons'
import CtaStrip from '../components/CtaStrip'

// Coverage = ALL of Riyadh (home / hotel / compound). No specific districts,
// no published opening hours — scheduling is flexible.
const PLACES = [
  {
    tag: 'Home',
    title: 'At Home',
    text: "Living room, terrace or garden — wherever you're most at ease.",
    // Interior-only placeholder (no people). TODO: replace with real brand photo.
    img: 'https://images.unsplash.com/photo-1586439496903-c96e9f18f212?q=80&w=1100&auto=format&fit=crop',
    msg: "Hi EMS ElRiyadh, I'd like a session at home.",
  },
  {
    tag: 'Hotel',
    title: 'In Your Hotel',
    text: 'Travelling through Riyadh? Keep your rhythm without finding a gym.',
    img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1100&auto=format&fit=crop',
    msg: "Hi EMS ElRiyadh, I'd like a session at my hotel.",
  },
  {
    tag: 'Compound',
    title: 'On Your Compound',
    text: 'Private, discreet sessions inside your community, on your schedule.',
    img: 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?q=80&w=1100&auto=format&fit=crop',
    msg: "Hi EMS ElRiyadh, I'd like a session on my compound.",
  },
]

const COVERAGE = [
  {
    title: 'Anywhere in Riyadh',
    text: 'Wherever you are in the city, the studio comes to you. No districts to check — if you’re in Riyadh, we cover it.',
    icon: (
      <>
        <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    title: 'We bring everything',
    text: 'The MyoStyle® system, the impulse suit and your trainer arrive ready. A few square metres of floor is all it takes.',
    icon: (
      <>
        <path d="M3 11l9-8 9 8" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
  },
  {
    title: 'Flexible scheduling',
    text: 'Pick a time that suits you and we’ll confirm it over WhatsApp. We work around your week, day or evening.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: 'Private & discreet',
    text: 'One-on-one, in your own space. Calm, focused and completely yours — no crowds and no audience.',
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" />
        <path d="M9.5 12l1.8 1.8L15 10" />
      </>
    ),
  },
]

export default function Locations() {
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">Coverage</span>
            <h1 className="rv d1">
              All of <span className="r">Riyadh.</span>
            </h1>
            <p className="lede rv d2">
              Home, hotel or compound — wherever you are in Riyadh, we bring the
              session to you. There are no fixed districts and no rigid hours: just
              flexible scheduling and a trainer at your door.
            </p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink("Hi EMS ElRiyadh, I'd like to check coverage for my area in Riyadh.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                Check my area
              </a>
            </div>
          </div>

          <div className="phero-media rv d1">
            <svg className="arc" viewBox="0 0 600 600" aria-hidden="true" preserveAspectRatio="none">
              <path d="M70,540 C40,300 180,70 470,60 C300,120 150,300 220,560" />
            </svg>
            <div className="plate">
              <img src="/images/cut3.jpg" alt="An EMS session set up in a client's own space" decoding="async" />
            </div>
            <div className="fbadge b1">
              <span className="v">Riyadh</span>
              <span className="k">city-wide<br />coverage</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">Where we come</span>
              <h2>
                Your space is the <span className="r">studio.</span>
              </h2>
            </div>
            <span className="idx">01 — Where</span>
          </div>
        </div>
        <div className="band">
          {PLACES.map((p, i) => (
            <a
              key={p.tag}
              className={`wc rv${i ? ` d${i}` : ''}`}
              href={waLink(p.msg)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                loading="lazy"
                decoding="async"
                src={p.img}
                alt={p.title}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span className="tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <span className="go">
                Book <Arrow />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="shead rv">
            <div>
              <span className="eyebrow">How coverage works</span>
              <h2>
                Simple, <span className="r">city-wide.</span>
              </h2>
            </div>
            <span className="idx">02 — Coverage</span>
          </div>
          <div className="benefits">
            {COVERAGE.map((v, i) => (
              <div className={`bcard rv${i ? ` d${i}` : ''}`} key={v.title}>
                <div className="ic">
                  <svg viewBox="0 0 24 24">{v.icon}</svg>
                </div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
          <div className="note rv" style={{ margin: '2.4rem auto 0' }}>
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </div>
            <div>
              <h3>Scheduling</h3>
              <p>
                We keep things flexible across Riyadh rather than fixing set
                hours — tell us a time that suits you, day or evening, and
                we&apos;ll confirm it over WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip
        line={<>We come to <span className="r">you.</span></>}
        message="Hi EMS ElRiyadh, I'd like to check coverage for my area in Riyadh."
      />
    </>
  )
}
