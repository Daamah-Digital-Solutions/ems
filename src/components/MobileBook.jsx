import { waLink } from '../constants'
import { useLang } from '../i18n'
import { WaIcon } from './icons'

export default function MobileBook() {
  const { t } = useLang()
  return (
    <div className="mbook">
      <a
        href={waLink(t('msg.session'))}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WaIcon />
        {t('common.bookWhatsApp')}
      </a>
    </div>
  )
}
