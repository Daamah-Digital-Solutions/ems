import { waLink, WA, PHONE } from '../constants'
import { useLang, rich } from '../i18n'
import { WaIcon } from './icons'

// Compact closing CTA for inner pages — much shorter than the full <Final/>
// (which stays on Home + Contact). One line + WhatsApp button + phone.
// lineKey -> i18n key for the headline (supports [[accent]] markers).
export default function CtaStrip({ lineKey = 'cta.defaultLine', msgKey = 'msg.session' }) {
  const { t } = useLang()
  return (
    <section className="ctastrip">
      <div className="wrap cta-in rv">
        <p className="ct">{rich(t(lineKey))}</p>
        <div className="cta-act">
          <a className="btn-lg" href={waLink(t(msgKey))} target="_blank" rel="noopener noreferrer">
            <WaIcon />
            {t('common.bookWhatsApp')}
          </a>
          <span className="ph">
            {t('common.orCall')}{' '}
            <a href={WA} target="_blank" rel="noopener noreferrer"><bdi dir="ltr">{PHONE}</bdi></a>
          </span>
        </div>
      </div>
    </section>
  )
}
