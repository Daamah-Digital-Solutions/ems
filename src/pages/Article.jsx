import { Link, useParams } from 'react-router-dom'
import { getArticle } from '../data/articles'
import { waLink } from '../constants'
import { WaIcon } from '../components/icons'
import CtaStrip from '../components/CtaStrip'
import NotFound from './NotFound'

function Block({ block }) {
  switch (block.type) {
    case 'lead':
      return <p className="lead">{block.text}</p>
    case 'h2':
      return <h2>{block.text}</h2>
    case 'h3':
      return <h3>{block.text}</h3>
    case 'ul':
      return (
        <ul>
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      )
    default:
      return <p>{block.text}</p>
  }
}

export default function Article() {
  const { slug } = useParams()
  const post = getArticle(slug)

  // Unknown slug → reuse the 404 page so deep links never dead-end.
  if (!post) return <NotFound />

  return (
    <>
      <article className="pad" style={{ paddingTop: 'clamp(7.5rem,13vw,10rem)' }}>
        <div className="wrap">
          <div className="prose">
            <Link className="backlink" to="/articles">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
              All articles
            </Link>
            <span className="eyebrow">{post.tag}</span>
            <h1 className="dsp" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', margin: '.6rem 0 0' }}>
              {post.title}
            </h1>
            <p className="docmeta" style={{ marginTop: '.9rem' }}>
              {post.read}
              {/* TODO: add a real publish date when posts are finalised */}
            </p>
          </div>

          <div className="prose" style={{ marginTop: '1.5rem' }}>
            <figure
              style={{
                margin: '0 0 2rem',
                borderRadius: 20,
                overflow: 'hidden',
                aspectRatio: '16 / 9',
                boxShadow: 'var(--shadow)',
              }}
            >
              <img
                src={post.cover}
                alt=""
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'var(--img)' }}
              />
            </figure>
            {post.body.map((block, i) => (
              <Block block={block} key={i} />
            ))}

            <p style={{ marginTop: '2rem' }}>
              <a
                className="btn-lg"
                href={waLink("Hi EMS ElRiyadh, I'd like to book a session.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                Book a session
              </a>
            </p>
          </div>
        </div>
      </article>

      <CtaStrip
        line={<>Ready to <span className="r">begin?</span></>}
        message="Hi EMS ElRiyadh, I'd like to book a session."
      />
    </>
  )
}
