import { waLink, WA, PHONE } from '../constants'
import { WaIcon } from './icons'

export default function Final() {
  return (
    <section className="final">
      <img className="bg" loading="lazy" decoding="async" src="/images/cut2.jpg" alt="" aria-hidden="true" />
      <div className="in rv">
        <h2>
          Ready to <span className="r">begin?</span>
        </h2>
        <p>Two messages, one session, zero commute. Let the studio come to you.</p>
        <a
          className="btn-lg"
          href={waLink("Hi EMS ElRiyadh, I'd like to book a session.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WaIcon />
          Book on WhatsApp
        </a>
        <div className="ph">
          or message{' '}
          <a href={WA} target="_blank" rel="noopener noreferrer">
            {PHONE}
          </a>
        </div>
      </div>
    </section>
  )
}
