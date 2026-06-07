import { Link } from 'react-router-dom'
import { ARTICLES } from '../data/articles'
import { waLink } from '../constants'
import { WaIcon } from '../components/icons'
import CtaStrip from '../components/CtaStrip'

export default function Articles() {
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">Journal</span>
            <h1 className="rv d1">
              Articles &amp; <span className="r">insights.</span>
            </h1>
            <p className="lede rv d2">
              Short, practical reads on training efficiently, staying consistent and
              getting the most from EMS — wherever you are in Riyadh.
            </p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink("Hi EMS ElRiyadh, I'd like to book a session.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                Book on WhatsApp
              </a>
            </div>
          </div>

          <div className="phero-media rv d1">
            <svg className="arc" viewBox="0 0 600 600" aria-hidden="true" preserveAspectRatio="none">
              <path d="M70,540 C40,300 180,70 470,60 C300,120 150,300 220,560" />
            </svg>
            <div className="plate">
              <img src="/images/soc2.jpg" alt="EMS ElRiyadh training" decoding="async" />
            </div>
            <div className="fbadge b1">
              <span className="v">20<small style={{ fontSize: '.6em' }}>′</small></span>
              <span className="k">reads &amp;<br />routines</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="alist">
            {ARTICLES.map((a, i) => (
              <Link className={`acard rv${i % 3 ? ` d${i % 3}` : ''}`} to={`/articles/${a.slug}`} key={a.slug}>
                <div className="cover">
                  <img src={a.cover} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="body">
                  <span className="meta">
                    {a.tag} <span className="s">·</span> {a.read}
                  </span>
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                  <span className="more">
                    Read article <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="fine rv">
            Sample articles shown for layout — real posts will replace these.
            {/* TODO: replace placeholder articles with real content (or wire to a CMS/markdown source) */}
          </p>
        </div>
      </section>

      <CtaStrip
        line={<>Less reading, more <span className="r">training?</span></>}
        message="Hi EMS ElRiyadh, I'd like to book a session."
      />
    </>
  )
}
