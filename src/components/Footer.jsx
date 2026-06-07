import { Link } from 'react-router-dom'
import { WA, PHONE } from '../constants'
import { PRIMARY, MORE, LEGAL } from '../nav'
import { Ring } from './icons'

export default function Footer() {
  return (
    <footer>
      <div className="foot">
        <div className="fb">
          <Ring style={{ width: 40, height: 40 }} />
          <span className="wm">
            <b>EMS ElRiyadh</b>
            <span>Mobile EMS training · Riyadh, KSA</span>
          </span>
        </div>
        <div className="fcol">
          <span className="h">Explore</span>
          {PRIMARY.map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </div>
        <div className="fcol">
          <span className="h">Discover</span>
          {MORE.map(([to, label]) => (
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
