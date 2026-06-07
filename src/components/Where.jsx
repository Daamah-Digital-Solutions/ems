import { waLink } from '../constants'
import { useLang } from '../i18n'
import { Arrow } from './icons'

const IMGS = [
  'https://images.unsplash.com/photo-1586439496903-c96e9f18f212?q=80&w=1100&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1100&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?q=80&w=1100&auto=format&fit=crop',
]
const MSGS = ['msg.atHome', 'msg.atHotel', 'msg.atCompound']

export default function Where() {
  const { t } = useLang()
  const places = t('where.places')
  return (
    <section id="where" className="pad">
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="eyebrow">{t('where.eyebrow')}</span>
            <h2>
              {t('where.titleA')}<br />
              {t('where.titleMid')}<span className="r">{t('where.titleR')}</span>
            </h2>
          </div>
          <span className="idx">{t('where.idx')}</span>
        </div>
        <div className="where-grid">
          {places.map((p, i) => (
            <a
              key={p.tag}
              className={`wc rv${i ? ` d${i}` : ''}`}
              href={waLink(t(MSGS[i]))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                loading="lazy"
                decoding="async"
                src={IMGS[i]}
                alt={p.title}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span className="tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <span className="go">
                {t('common.bookCard')} <Arrow />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
