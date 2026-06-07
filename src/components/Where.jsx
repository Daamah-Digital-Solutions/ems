import { waLink } from '../constants'
import { Arrow } from './icons'

const PLACES = [
  {
    tag: 'Home',
    title: 'At Home',
    text: "Living room, terrace or garden — wherever you're most at ease.",
    img: 'https://images.unsplash.com/photo-1586439496903-c96e9f18f212?q=80&w=1100&auto=format&fit=crop',
    msg: "Hi, I'd like a session at home.",
  },
  {
    tag: 'Hotel',
    title: 'In Your Hotel',
    text: 'Travelling through Riyadh? Keep your rhythm without finding a gym.',
    img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1100&auto=format&fit=crop',
    msg: "Hi, I'd like a session at my hotel.",
  },
  {
    tag: 'Compound',
    title: 'On Your Compound',
    text: 'Private, discreet sessions inside your community, on your schedule.',
    img: 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?q=80&w=1100&auto=format&fit=crop',
    msg: "Hi, I'd like a session on my compound.",
  },
]

export default function Where() {
  return (
    <section id="where" className="pad">
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="eyebrow">Anywhere in Riyadh</span>
            <h2>
              Your space<br />
              is the <span className="r">studio.</span>
            </h2>
          </div>
          <span className="idx">03 — Where we come</span>
        </div>
        <div className="where-grid">
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
      </div>
    </section>
  )
}
