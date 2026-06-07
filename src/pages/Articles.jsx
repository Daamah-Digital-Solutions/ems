import { Link } from 'react-router-dom'
import { ARTICLES } from '../data/articles'
import { waLink } from '../constants'
import { WaIcon } from '../components/icons'
import HeroIcon from '../components/HeroIcon'
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

          <div className="phero-media phero-media-icon">
            <HeroIcon>
              {/* article / document with lines */}
              <rect x="5" y="3.5" width="14" height="17" rx="2.2" />
              <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" />
            </HeroIcon>
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
          {/* TODO: wire to a CMS / markdown source as the journal grows */}
        </div>
      </section>

      <CtaStrip
        line={<>Less reading, more <span className="r">training?</span></>}
        message="Hi EMS ElRiyadh, I'd like to book a session."
      />
    </>
  )
}
