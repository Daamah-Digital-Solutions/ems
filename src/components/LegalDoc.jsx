import { useLang } from '../i18n'

// Shared layout for legal documents (Privacy, Terms). Content is passed as a
// section array so the copy stays editable in one place per page.
export default function LegalDoc({ title, accent, updated, intro, sections }) {
  const { t } = useLang()
  return (
    <section className="pad" style={{ paddingTop: 'clamp(7.5rem,13vw,10rem)' }}>
      <div className="wrap">
        <div className="prose">
          <span className="eyebrow">{t('legal.eyebrow')}</span>
          <h1 className="dsp" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', margin: '.6rem 0 0' }}>
            {title} {accent && <span className="r">{accent}</span>}
          </h1>
          <p className="docmeta" style={{ marginTop: '.9rem' }}>{t('legal.lastUpdated')} {updated}</p>
          {intro && <p className="lead">{intro}</p>}
          {sections.map((s, i) => (
            <section key={i}>
              <h2>{s.h}</h2>
              {s.body.map((b, j) => {
                if (typeof b === 'string') return <p key={j}>{b}</p>
                if (b.ul) {
                  return (
                    <ul key={j}>
                      {b.ul.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  )
                }
                return <div key={j}>{b}</div>
              })}
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
