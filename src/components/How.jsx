import { useLang } from '../i18n'

const IMGS = ['/images/cut3.jpg', '/images/hero.jpg', '/images/cut2.jpg']

export default function How() {
  const { t } = useLang()
  const steps = t('how.steps')
  return (
    <section id="how" className="how pad">
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="eyebrow">{t('how.eyebrow')}</span>
            <h2>
              {t('how.titleA')}<br />
              {t('how.titleMid')}<span className="r">{t('how.titleR')}</span>
            </h2>
          </div>
          <span className="idx">{t('how.idx')}</span>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div className={`step rv${i ? ` d${i}` : ''}`} key={s.title}>
              <div className="pic">
                <span className="no">{i + 1}</span>
                <img src={IMGS[i]} alt={s.alt} loading={i === 0 ? undefined : 'lazy'} decoding="async" />
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
