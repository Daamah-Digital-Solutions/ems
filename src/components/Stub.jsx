import { Link } from 'react-router-dom'
import { useLang } from '../i18n'

// Shared shell for the 404 page (eyebrow + h2 + reveals), matching Home's
// section language.
export default function Stub({ eyebrow, title, accent, children }) {
  const { t } = useLang()
  return (
    <main className="pad stub">
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>
              {title} {accent && <span className="r">{accent}</span>}
            </h2>
          </div>
        </div>
        <p className="stub-lead rv d1">{children}</p>
        <p className="rv d2" style={{ marginTop: '1.6rem' }}>
          <Link className="ghost" to="/">
            {t('common.backHome')} <span className="a">→</span>
          </Link>
        </p>
      </div>
    </main>
  )
}
