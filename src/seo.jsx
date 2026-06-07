import { useEffect } from 'react'
import { SITE } from './constants'
import { hasArticle } from './data/articles'
import { useLang } from './i18n'
import en from './i18n/en'
import ar from './i18n/ar'

const DICTS = { en, ar }
const OG_IMAGE = `${SITE}/og-image.png` // TODO: final OG image (current: red bg + brand icon + name)
const OG_LOCALE = { en: 'en_US', ar: 'ar_SA' }

// Resolve per-route title + description from the active language dictionary.
// Article pages reuse the localized post title/excerpt.
function resolve(dict, pathname) {
  const r = dict.seo.routes[pathname]
  if (r) return { title: r.title, desc: r.desc }
  const m = pathname.match(/^\/articles\/(.+)$/)
  if (m && hasArticle(m[1])) {
    const post = dict.art[m[1]]
    if (post) return { title: `${post.title} · ${dict.seo.brand}`, desc: post.excerpt }
  }
  return { title: dict.seo.brand, desc: dict.seo.defaultDesc }
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

// Sets document title + meta/OG/Twitter/canonical on each navigation and on
// language change (Arabic when lang=ar, English when lang=en).
export function useSeo(pathname) {
  const { lang } = useLang()
  useEffect(() => {
    const dict = DICTS[lang] || en
    const { title, desc } = resolve(dict, pathname)
    const url = `${SITE}${pathname}`
    const altLang = lang === 'ar' ? 'en' : 'ar'
    document.title = title
    meta('name', 'description', desc)
    canonical(url)
    meta('property', 'og:title', title)
    meta('property', 'og:description', desc)
    meta('property', 'og:url', url)
    meta('property', 'og:type', 'website')
    meta('property', 'og:site_name', dict.seo.brand)
    meta('property', 'og:image', OG_IMAGE)
    meta('property', 'og:locale', OG_LOCALE[lang] || 'en_US')
    meta('property', 'og:locale:alternate', OG_LOCALE[altLang])
    meta('name', 'twitter:card', 'summary_large_image')
    meta('name', 'twitter:title', title)
    meta('name', 'twitter:description', desc)
    meta('name', 'twitter:image', OG_IMAGE)
  }, [pathname, lang])
}
