// Large on-brand hero icon for inner pages: the red ring motif (like the logo)
// with a topic glyph centred inside, both in brand red with the neon glow.
// Decorative — the page <h1> carries the meaning, so it's aria-hidden, and it's
// hidden entirely on mobile (≤768px) via the .phero-media-icon wrapper.
export default function HeroIcon({ children }) {
  return (
    <div className="phero-icon rv d1" aria-hidden="true">
      <svg className="hi-ring" viewBox="0 0 220 220">
        <circle cx="110" cy="110" r="96" />
      </svg>
      <svg className="hi-glyph" viewBox="0 0 24 24">
        {children}
      </svg>
    </div>
  )
}
