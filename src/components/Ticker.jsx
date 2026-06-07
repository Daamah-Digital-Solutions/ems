const ITEMS = [
  'The studio comes to you',
  '2×20 per week',
  'German-engineered · MyoStyle®',
  'Anywhere in Riyadh',
  'Book on WhatsApp',
]

function Run() {
  return (
    <span>
      {ITEMS.map((t, i) => (
        <span key={i} style={{ display: 'inline-flex', gap: '2.4rem', alignItems: 'center' }}>
          {t} <i className="s">✦</i>{' '}
        </span>
      ))}
    </span>
  )
}

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="t">
        <Run />
        <Run />
      </div>
    </div>
  )
}
