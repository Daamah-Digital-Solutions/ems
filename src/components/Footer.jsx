import { Link } from 'react-router-dom'
import { WA, PHONE } from '../constants'
import { LINKS, LEGAL } from '../nav'
import emsIcon from '../ems-icon.svg'

export default function Footer() {
  const half = Math.ceil(LINKS.length / 2)
  const colA = LINKS.slice(0, half)
  const colB = LINKS.slice(half)
  return (
    <footer>
      <div className="foot">
        <div className="fb">
          <img className="brand-mark" src={emsIcon} alt="" style={{ width: 40, height: 40 }} />
          <span className="wm">
            <b>EMS ElRiyadh</b>
            <span>EMS training · Riyadh, KSA</span>
          </span>
        </div>
        <div className="fcol">
          <span className="h">Explore</span>
          {colA.map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </div>
        <div className="fcol">
          <span className="h">Discover</span>
          {colB.map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </div>
        <div className="fcol">
          <span className="h">Book</span>
          <a href={WA} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={WA} target="_blank" rel="noopener noreferrer">
            {PHONE}
          </a>
        </div>
      </div>
      <div className="fend">
        <span>© {new Date().getFullYear()} EMS ElRiyadh — Premium German fitness system · Not a medical device.</span>
        <span className="legal">
          {LEGAL.map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </span>
        <span className="partner">Powered by <b>MyoStyle®</b></span>
      </div>
    </footer>
  )
}
