import { Link } from 'react-router-dom'
import { WA, PHONE } from '../constants'
import { LINKS, LEGAL } from '../nav'
import { useLang } from '../i18n'
import emsIcon from '../ems-icon.svg'

export default function Footer() {
  const { t } = useLang()
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
            <span>{t('footer.tagline')}</span>
          </span>
        </div>
        <div className="fcol">
          <span className="h">{t('footer.explore')}</span>
          {colA.map(([to, label]) => (
            <Link key={to} to={to}>
              {t(label)}
            </Link>
          ))}
        </div>
        <div className="fcol">
          <span className="h">{t('footer.discover')}</span>
          {colB.map(([to, label]) => (
            <Link key={to} to={to}>
              {t(label)}
            </Link>
          ))}
        </div>
        <div className="fcol">
          <span className="h">{t('footer.book')}</span>
          <a href={WA} target="_blank" rel="noopener noreferrer">
            {t('footer.whatsapp')}
          </a>
          <a href={WA} target="_blank" rel="noopener noreferrer">
            {PHONE}
          </a>
        </div>
      </div>
      <div className="fpay">
        <span className="fpay-label">{t('footer.payments')}</span>
        <div className="fpay-logos">
          {/* Trust signal only — booking is via WhatsApp, no on-site checkout.
              Per-logo sizing so the wordmarks/marks share the same optical
              height (Tabby's SVG bakes in its pill padding, so it renders taller). */}
          <span className="pay-chip pay-tabby">
            <img src="/images/tabby.svg" alt="Tabby" loading="lazy" decoding="async" />
          </span>
          <span className="pay-chip pay-light pay-tamara">
            <img src="/images/tamara-text-logo-black-en.svg" alt="Tamara" loading="lazy" decoding="async" />
          </span>
          <span className="pay-chip pay-light pay-visa">
            <img src="/images/visa-logo.png" alt="Visa" loading="lazy" decoding="async" />
          </span>
          <span className="pay-chip pay-light pay-mastercard">
            <img src="/images/master-card_symbol-is.svg" alt="Mastercard" loading="lazy" decoding="async" />
          </span>
        </div>
      </div>
      <div className="fend">
        <span>© {new Date().getFullYear()} EMS ElRiyadh — {t('footer.rights')}</span>
        <span className="legal">
          {LEGAL.map(([to, label]) => (
            <Link key={to} to={to}>
              {t(label)}
            </Link>
          ))}
        </span>
        <span className="partner">{t('footer.poweredBy')} <b>MyoStyle®</b></span>
        <span className="credit">
          {t('footer.developedBy')}{' '}
          <a href="https://daamah.net" target="_blank" rel="noopener noreferrer">
            {t('footer.agency')}
          </a>
        </span>
      </div>
    </footer>
  )
}
