import { Link } from 'react-router-dom'
import { ARTICLES } from '../data/articles'
import { waLink } from '../constants'
import { useLang, rich } from '../i18n'
import { WaIcon } from '../components/icons'
import HeroIcon from '../components/HeroIcon'
import CtaStrip from '../components/CtaStrip'

export default function Articles() {
  const { t } = useLang()
  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">{t('articlesPage.heroEyebrow')}</span>
            <h1 className="rv d1">
              {t('articlesPage.heroTitleA')}<span className="r">{t('articlesPage.heroTitleR')}</span>
            </h1>
            <p className="lede rv d2">{t('articlesPage.lede')}</p>
            <div className="phead-cta rv d3">
              <a
                className="btn-lg"
                href={waLink(t('msg.session'))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon />
                {t('common.bookWhatsApp')}
              </a>
            </div>
          </div>

          <div className="phero-media phero-media-icon">
            <HeroIcon>
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
                    {t(`art.${a.slug}.tag`)} <span className="s">·</span> <bdi>{t(`art.${a.slug}.read`)}</bdi>
                  </span>
                  <h3>{rich(t(`art.${a.slug}.title`))}</h3>
                  <p>{rich(t(`art.${a.slug}.excerpt`))}</p>
                  <span className="more">
                    {t('common.readArticle')} <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {/* TODO: wire to a CMS / markdown source as the journal grows */}
        </div>
      </section>

      <CtaStrip lineKey="articlesPage.ctaLine" msgKey="msg.session" />
    </>
  )
}
