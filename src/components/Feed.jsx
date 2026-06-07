import { IG_HANDLE, INSTAGRAM } from '../constants'
import { useLang } from '../i18n'
import { IgIcon } from './icons'

const POSTS = ['/images/soc1.jpg', '/images/soc2.jpg', '/images/soc3.jpg']

export default function Feed() {
  const { t } = useLang()
  return (
    <section id="feed" className="social pad">
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="eyebrow">{IG_HANDLE}</span>
            <h2>
              {t('feed.titleA')}<br />
              {t('feed.titleMid')}<span className="r">{t('feed.titleR')}</span>
            </h2>
          </div>
          <a className="ghost" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
            {t('common.follow')} <span className="a">→</span>
          </a>
        </div>
        <div className="sgrid">
          {POSTS.map((src, i) => (
            <div className={`sg rv${i ? ` d${i}` : ''}`} key={src}>
              <img loading="lazy" decoding="async" src={src} alt="EMS ElRiyadh social post" />
              <span className="ig">
                <IgIcon /> {IG_HANDLE}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
