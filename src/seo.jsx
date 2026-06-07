import { useEffect } from 'react'
import { SITE } from './constants'
import { getArticle } from './data/articles'

const BRAND = 'EMS ElRiyadh'
const DEFAULT_DESC =
  'Premium one-on-one EMS training brought to your home, hotel or compound in Riyadh. German-engineered with MyoStyle®. 20 minutes, twice a week.'
const OG_IMAGE = `${SITE}/og-image.png` // TODO: final OG image (current: red bg + brand icon + name)

// Per-route metadata. Title shown as "<page> · EMS ElRiyadh" (Home is special).
const ROUTES = {
  '/': { title: `${BRAND} — The studio comes to you`, desc: DEFAULT_DESC },
  '/about': { title: `About · ${BRAND}`, desc: 'The idea behind EMS ElRiyadh — private, one-on-one EMS training that comes to you across Riyadh, powered by the German MyoStyle® system.' },
  '/how-it-works': { title: `How EMS Works · ${BRAND}`, desc: 'How EMS works and what a session feels like — twenty guided minutes with a dedicated trainer, anywhere in Riyadh.' },
  '/pricing': { title: `Sessions & Plans · ${BRAND}`, desc: 'EMS ElRiyadh plans by what’s included — Trial, weekly and bespoke. Enquire on WhatsApp for the right option.' },
  '/locations': { title: `Coverage · ${BRAND}`, desc: 'All of Riyadh — home, hotel or compound. Flexible scheduling, the studio comes to you.' },
  '/results': { title: `Results & Reviews · ${BRAND}`, desc: 'What to expect from EMS ElRiyadh — a consistent, time-efficient routine with real one-on-one coaching.' },
  '/faq': { title: `FAQ · ${BRAND}`, desc: 'Common questions about EMS training with EMS ElRiyadh — the session, the suit, coverage and booking.' },
  '/articles': { title: `Articles · ${BRAND}`, desc: 'Short, practical reads on training efficiently and staying consistent with EMS in Riyadh.' },
  '/contact': { title: `Contact & Book · ${BRAND}`, desc: 'Book your EMS ElRiyadh session — share a few details and we’ll open WhatsApp with your message ready to send.' },
  '/privacy': { title: `Privacy Policy · ${BRAND}`, desc: 'How EMS ElRiyadh collects and uses your information.' },
  '/terms': { title: `Terms of Service · ${BRAND}`, desc: 'The terms for using the EMS ElRiyadh website and training with us.' },
}

function resolve(pathname) {
  if (ROUTES[pathname]) return ROUTES[pathname]
  const m = pathname.match(/^\/articles\/(.+)$/)
  if (m) {
    const post = getArticle(m[1])
    if (post) return { title: `${post.title} · ${BRAND}`, desc: post.excerpt }
  }
  return { title: BRAND, desc: DEFAULT_DESC }
}

// Upsert a <meta> tag identified by name/property.
function meta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function canonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Sets document title + meta/OG/Twitter/canonical on each navigation.
export function useSeo(pathname) {
  useEffect(() => {
    const { title, desc } = resolve(pathname)
    const url = `${SITE}${pathname}`
    document.title = title
    meta('name', 'description', desc)
    canonical(url)
    meta('property', 'og:title', title)
    meta('property', 'og:description', desc)
    meta('property', 'og:url', url)
    meta('property', 'og:type', 'website')
    meta('property', 'og:site_name', BRAND)
    meta('property', 'og:image', OG_IMAGE)
    meta('name', 'twitter:card', 'summary_large_image')
    meta('name', 'twitter:title', title)
    meta('name', 'twitter:description', desc)
    meta('name', 'twitter:image', OG_IMAGE)
  }, [pathname])
}
