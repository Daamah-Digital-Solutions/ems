import { EMAIL, PHONE, WA } from '../constants'
import { useLang } from '../i18n'
import LegalDoc from '../components/LegalDoc'

// Plain-language boilerplate for a KSA fitness service that books via WhatsApp
// and runs ads. // TODO: have a lawyer review before launch.
export default function Privacy() {
  const { t } = useLang()
  const sections = [
    ...t('legal.privacy.sections'),
    {
      h: t('legal.contactH'),
      body: [
        <p key="c">
          {t('legal.privacy.contactLead')}{' '}
          <a href={`mailto:${EMAIL}`}><bdi dir="ltr">{EMAIL}</bdi></a> {t('legal.orWhatsApp')}{' '}
          <a href={WA} target="_blank" rel="noopener noreferrer">{t('footer.whatsapp')} (<bdi dir="ltr">{PHONE}</bdi>)</a>.
        </p>,
      ],
    },
  ]
  return (
    <LegalDoc
      title={t('legal.privacy.title')}
      accent={t('legal.privacy.accent')}
      updated={t('legal.privacy.updated')}
      intro={t('legal.privacy.intro')}
      sections={sections}
    />
  )
}
