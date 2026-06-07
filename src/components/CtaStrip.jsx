import { waLink, WA, PHONE } from '../constants'
import { WaIcon } from './icons'

// Compact closing CTA for inner pages — much shorter than the full <Final/>
// (which stays on Home + Contact). One line + WhatsApp button + phone.
export default function CtaStrip({
  line = (
    <>
      Ready when <span className="r">you are.</span>
    </>
  ),
  message = "Hi EMS ElRiyadh, I'd like to book a session.",
}) {
  return (
    <section className="ctastrip">
      <div className="wrap cta-in rv">
        <p className="ct">{line}</p>
        <div className="cta-act">
          <a className="btn-lg" href={waLink(message)} target="_blank" rel="noopener noreferrer">
            <WaIcon />
            Book on WhatsApp
          </a>
          <span className="ph">
            or call{' '}
            <a href={WA} target="_blank" rel="noopener noreferrer">{PHONE}</a>
          </span>
        </div>
      </div>
    </section>
  )
}
