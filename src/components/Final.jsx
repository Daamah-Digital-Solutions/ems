import { waLink, WA, PHONE } from '../constants'
import { useLang } from '../i18n'
import { WaIcon } from './icons'

export default function Final() {
  const { t } = useLang()
  return (
    <section className="final">
      <img className="bg" loading="lazy" decoding="async" src="/images/cut2.jpg" alt="" aria-hidden="true" />
      <div className="in rv">
        <h2>
          {t('final.titleA')}<span className="r">{t('final.titleR')}</span>
        </h2>
        <p>{t('final.text')}</p>
        <a
          className="btn-lg"
          href={waLink(t('msg.session'))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WaIcon />
          {t('common.bookWhatsApp')}
        </a>
        <div className="ph">
          {t('common.orMessage')}{' '}
          <a href={WA} target="_blank" rel="noopener noreferrer">
            <bdi dir="ltr">{PHONE}</bdi>
          </a>
        </div>
      </div>
    </section>
  )
}
