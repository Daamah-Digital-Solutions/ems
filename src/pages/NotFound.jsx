import Stub from '../components/Stub'
import { useLang } from '../i18n'

export default function NotFound() {
  const { t } = useLang()
  return (
    <Stub eyebrow={t('notFound.eyebrow')} title={t('notFound.title')} accent={t('notFound.accent')}>
      {t('notFound.text')}
    </Stub>
  )
}
