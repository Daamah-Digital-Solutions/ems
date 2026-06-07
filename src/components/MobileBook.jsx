import { waLink } from '../constants'
import { WaIcon } from './icons'

export default function MobileBook() {
  return (
    <div className="mbook">
      <a
        href={waLink("Hi EMS ElRiyadh, I'd like to book a session.")}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WaIcon />
        Book on WhatsApp
      </a>
    </div>
  )
}
