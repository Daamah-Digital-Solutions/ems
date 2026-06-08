import { useLang } from '../i18n'

function Run({ items }) {
  return (
    <span>
      {items.map((t, i) => (
        <span key={i} style={{ display: 'inline-flex', gap: '2.4rem', alignItems: 'center' }}>
          {t} <i className="s">✦</i>{' '}
        </span>
      ))}
    </span>
  )
}

export default function Ticker() {
  const { t } = useLang()
  const items = t('ticker.items')
  return (
    <div className="ticker" aria-hidden="true">
      <div className="t">
        <Run items={items} />
        <Run items={items} />
      </div>
    </div>
  )
}
