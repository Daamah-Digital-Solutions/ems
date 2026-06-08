import { EMAIL, PHONE, WA } from '../constants'
import { useLang } from '../i18n'
import LegalDoc from '../components/LegalDoc'

// Plain-language terms for a KSA mobile EMS fitness service.
// // TODO: have a lawyer review before launch.
export default function Terms() {
  const { t } = useLang()
  const sections = [
    ...t('legal.terms.sections'),
    {
      h: t('legal.contactH'),
      body: [
        <p key="c">
          {t('legal.terms.contactLead')}{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> {t('legal.orWhatsApp')}{' '}
          <a href={WA} target="_blank" rel="noopener noreferrer">{t('footer.whatsapp')} ({PHONE})</a>.
        </p>,
      ],
    },
  ]
  return (
    <LegalDoc
      title={t('legal.terms.title')}
      accent={t('legal.terms.accent')}
      updated={t('legal.terms.updated')}
      intro={t('legal.terms.intro')}
      sections={sections}
    />
  )
}
