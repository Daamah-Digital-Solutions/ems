import { useState } from 'react'
import { waLink, WA, PHONE, EMAIL, IG_HANDLE, INSTAGRAM } from '../constants'
import { useLang } from '../i18n'
import { WaIcon, IgIcon } from '../components/icons'
import HeroIcon from '../components/HeroIcon'
import Final from '../components/Final'

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 5h18v14H3z M3 6l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 17l2 5h-3A15 15 0 0 1 3 7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export default function Contact() {
  const { t } = useLang()
  const plans = t('contact.plans')
  const times = t('contact.times')
  const [f, setF] = useState({ name: '', phone: '', area: '', plan: '', time: '', notes: '' })

  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  const buildMessage = () => {
    const plan = f.plan || plans[0]
    const time = f.time || times[0]
    const lines = [
      t('contact.msgIntro'),
      f.name && `${t('contact.msgName')}: ${f.name}`,
      f.phone && `${t('contact.msgPhone')}: ${f.phone}`,
      f.area && `${t('contact.msgArea')}: ${f.area}`,
      plan && `${t('contact.msgPlan')}: ${plan}`,
      time && `${t('contact.msgTime')}: ${time}`,
      f.notes && `${t('contact.msgNotes')}: ${f.notes}`,
    ].filter(Boolean)
    return lines.join('\n')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // No backend — open WhatsApp with the composed message pre-filled.
    window.open(waLink(buildMessage()), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <section className="phead phero">
        <div className="wrap phero-grid">
          <div className="phero-copy">
            <span className="eyebrow rv">{t('contact.heroEyebrow')}</span>
            <h1 className="rv d1">
              {t('contact.heroTitleA')}<span className="r">{t('contact.heroTitleR')}</span>
            </h1>
            <p className="lede rv d2">{t('contact.lede')}</p>
          </div>

          <div className="phero-media phero-media-icon">
            <HeroIcon>
              <path d="M20 4H4a1.6 1.6 0 0 0-1.6 1.6v8.8A1.6 1.6 0 0 0 4 16h3v3.8L11.2 16H20a1.6 1.6 0 0 0 1.6-1.6V5.6A1.6 1.6 0 0 0 20 4z" />
              <path d="M8 10h.01M12 10h.01M16 10h.01" />
            </HeroIcon>
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cgrid">
            <form className="form rv" onSubmit={onSubmit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-name">{t('contact.nameLabel')}</label>
                  <input id="c-name" type="text" autoComplete="name" value={f.name} onChange={set('name')} placeholder={t('contact.namePlaceholder')} />
                </div>
                <div className="field">
                  <label htmlFor="c-phone">{t('contact.phoneLabel')}</label>
                  <input id="c-phone" type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} placeholder={t('contact.phonePlaceholder')} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-area">{t('contact.areaLabel')}</label>
                <input id="c-area" type="text" value={f.area} onChange={set('area')} placeholder={t('contact.areaPlaceholder')} />
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-plan">{t('contact.planLabel')}</label>
                  <select id="c-plan" value={f.plan} onChange={set('plan')}>
                    {plans.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="c-time">{t('contact.timeLabel')}</label>
                  <select id="c-time" value={f.time} onChange={set('time')}>
                    {times.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-notes">{t('contact.notesLabel')}</label>
                <textarea id="c-notes" value={f.notes} onChange={set('notes')} placeholder={t('contact.notesPlaceholder')} />
              </div>
              <button type="submit" className="btn-lg submit">
                <WaIcon />
                {t('contact.submit')}
              </button>
              <p className="hint">{t('contact.hint')}</p>
            </form>

            <div className="cmethods rv d1">
              <a className="cm" href={waLink(t('msg.session'))} target="_blank" rel="noopener noreferrer">
                <span className="ic"><WaIcon /></span>
                <span>
                  <span className="k">{t('contact.methods.whatsapp')}</span>
                  <span className="v">{PHONE}</span>
                </span>
              </a>
              <a className="cm" href={`tel:${PHONE.replace(/\s/g, '')}`}>
                <span className="ic"><PhoneIcon /></span>
                <span>
                  <span className="k">{t('contact.methods.call')}</span>
                  <span className="v">{PHONE}</span>
                </span>
              </a>
              <a className="cm" href={`mailto:${EMAIL}`}>
                <span className="ic"><MailIcon /></span>
                <span>
                  <span className="k">{t('contact.methods.email')}</span>
                  <span className="v">{EMAIL}</span>
                </span>
              </a>
              <a className="cm" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                <span className="ic"><IgIcon /></span>
                <span>
                  <span className="k">{t('contact.methods.instagram')}</span>
                  <span className="v">{IG_HANDLE}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Final />
    </>
  )
}
