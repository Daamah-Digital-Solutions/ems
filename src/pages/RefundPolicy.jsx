import { EMAIL, PHONE, WA } from '../constants'
import { useLang } from '../i18n'
import LegalDoc from '../components/LegalDoc'

// Subscriptions, refunds & alternatives policy for a KSA fitness service.
// Content published verbatim (client-supplied); copy lives in the i18n layer.
// // TODO: have a lawyer review before launch.
export default function RefundPolicy() {
  const { t } = useLang()
  const sections = [
    ...t('legal.refund.sections'),
    {
      h: t('legal.contactH'),
      body: [
        <p key="c">
          {t('legal.refund.contactLead')}{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> {t('legal.orWhatsApp')}{' '}
          <a href={WA} target="_blank" rel="noopener noreferrer">{t('footer.whatsapp')} ({PHONE})</a>.
        </p>,
      ],
    },
  ]
  return (
    <LegalDoc
      title={t('legal.refund.title')}
      accent={t('legal.refund.accent')}
      updated={t('legal.refund.updated')}
      intro={t('legal.refund.intro')}
      sections={sections}
    />
  )
}
