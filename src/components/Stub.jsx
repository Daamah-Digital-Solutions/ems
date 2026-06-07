import { Link } from 'react-router-dom'

// Temporary placeholder shell for routes whose real content lands in later
// build steps. Uses the same section language as Home (eyebrow + h2 + reveals)
// so navigation can be reviewed on-brand. Each page file replaces this with
// real sections when its step comes up.
export default function Stub({ eyebrow, title, accent, children }) {
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
            Back home <span className="a">→</span>
          </Link>
        </p>
      </div>
    </main>
  )
}
