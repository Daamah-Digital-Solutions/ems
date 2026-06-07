import { waLink } from '../constants'
import { WaIcon } from './icons'

export default function Hero({ loaded }) {
  return (
    <section className={`hero${loaded ? ' go' : ''}`} id="hero">
      <div className="hero-l">
        <span className="eyebrow">Mobile EMS Studio · Riyadh</span>
        <h1>
          <span className="ln l1"><span>The studio</span></span>
          <span className="ln l2"><span>comes to</span></span>
          <span className="ln l3"><span className="r">you.</span></span>
        </h1>
        <p className="sub">
          Premium one-on-one EMS training — the suit, the system and your trainer
          brought to your door. <b>German-engineered with MyoStyle®. 20 minutes,
          twice a week.</b>
        </p>
        <div className="hero-cta">
          <a
            className="btn-lg"
            href={waLink("Hi EMS ElRiyadh, I'd like to book a session.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WaIcon />
            Book on WhatsApp
          </a>
          <a className="ghost" href="#how">
            See how it works <span className="a">→</span>
          </a>
        </div>
        <div className="trust">
          <span className="t"><span className="dot" /> <b>German-engineered</b></span>
          <span className="t"><span className="dot" /> Powered by <b>MyoStyle®</b></span>
          <span className="t"><span className="dot" /> Anywhere in <b>Riyadh</b></span>
        </div>
      </div>

      <div className="hero-media">
        <svg className="arc" viewBox="0 0 600 600" aria-hidden="true" preserveAspectRatio="none">
          <path d="M70,540 C40,300 180,70 470,60 C300,120 150,300 220,560" />
        </svg>
        <div className="frame">
          <img
            src="/images/final-hero.jpg"
            alt="An EMS ElRiyadh trainer coaching a client through a session"
            decoding="async"
          />
        </div>
        <div className="fbadge b1">
          <span className="v">20<small style={{ fontSize: '.6em' }}>′</small></span>
          <span className="k">focused<br />minutes</span>
        </div>
        <div className="fbadge b2 float">
          <span className="v">2×</span>
          <span className="k">sessions<br />a week</span>
        </div>
      </div>
    </section>
  )
}
