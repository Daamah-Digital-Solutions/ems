// Lightweight analytics: Google Analytics 4 + Meta Pixel.
// IDs come from env vars (Vite) so they stay out of the repo:
//   VITE_GA4_ID        e.g. G-XXXXXXXXXX
//   VITE_META_PIXEL_ID e.g. 1234567890
// If an ID is absent, that tool is simply skipped — safe in dev.

const GA4_ID = import.meta.env.VITE_GA4_ID
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID

let started = false

export function initAnalytics() {
  if (started || typeof window === 'undefined') return
  started = true

  // --- Google Analytics 4 ---
  if (GA4_ID) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA4_ID)
  }

  // --- Meta (Facebook) Pixel ---
  if (PIXEL_ID) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    /* eslint-enable */
    window.fbq('init', PIXEL_ID)
    window.fbq('track', 'PageView')
  }
}

// Notify GA4 of a client-side route change (SPA pageview).
export function trackPageView(path) {
  if (GA4_ID && window.gtag) window.gtag('event', 'page_view', { page_path: path })
  if (PIXEL_ID && window.fbq) window.fbq('track', 'PageView')
}

// Fire a Lead conversion — called when a visitor taps a WhatsApp link.
export function trackLead(detail = {}) {
  if (GA4_ID && window.gtag) window.gtag('event', 'generate_lead', { method: 'whatsapp', ...detail })
  if (PIXEL_ID && window.fbq) window.fbq('track', 'Lead', detail)
}
