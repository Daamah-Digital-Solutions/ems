// Shared inline SVG icons.

export function Ring({ className = 'ring', style }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true" style={style}>
      <circle cx="20" cy="20" r="14" strokeDasharray="74 14" transform="rotate(-128 20 20)" />
    </svg>
  )
}

export function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M.06 24l1.7-6.2a11.9 11.9 0 1 1 4.5 4.4L.06 24Zm6.6-3.8.4.25a9.9 9.9 0 1 0-3-3l.26.4-1 3.6 3.34-1.25Zm11.4-5.5c-.16-.27-.6-.43-1.25-.75s-1.45-.58-1.66-.65-.37-.1-.53.1-.6.74-.74.9-.27.18-.5.06a8 8 0 0 1-2.35-1.45 8.8 8.8 0 0 1-1.62-2c-.17-.3 0-.45.13-.6s.27-.32.4-.48a1.9 1.9 0 0 0 .27-.45.5.5 0 0 0 0-.48c-.07-.13-.53-1.28-.73-1.76s-.4-.4-.53-.4h-.45a.87.87 0 0 0-.63.3 2.65 2.65 0 0 0-.82 2 4.6 4.6 0 0 0 .96 2.43c.12.16 1.66 2.54 4.03 3.56a13.6 13.6 0 0 0 1.35.5 3.2 3.2 0 0 0 1.48.1c.45-.07 1.45-.6 1.66-1.17a2 2 0 0 0 .14-1.18Z" />
    </svg>
  )
}

export function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2Zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Zm0 10.56a4.16 4.16 0 1 1 0-8.32 4.16 4.16 0 0 1 0 8.32Zm6.65-10.81a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
  )
}

// White arrow used inside the dark "Where" cards.
export function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" fill="none" />
    </svg>
  )
}

// Check mark used in the session lists (inherits stroke from CSS).
export function Check() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}
