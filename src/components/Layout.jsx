import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useSeo } from '../seo'
import { initAnalytics, trackPageView, trackLead } from '../analytics'

import Loader from './Loader'
import Nav from './Nav'
import Footer from './Footer'
import MobileBook from './MobileBook'

// Shared shell for every route: ambient glow, intro Loader, Nav, the routed
// page (<Outlet/>), Footer and the mobile Book bar. Also drives per-route SEO
// and analytics. Re-runs reveals and resets scroll on each navigation.
// `loaded` is passed to pages via Outlet context — Home forwards it to <Hero/>.
export default function Layout({ loaded }) {
  const { pathname, hash } = useLocation()

  // Re-observe `.rv` / `.arc` elements on the freshly-mounted page.
  useScrollReveal(pathname)

  // Per-route document title / meta / OG / canonical.
  useSeo(pathname)

  // ScrollToTop — but never fight an in-page hash jump (Home anchors).
  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  // Start analytics once; report SPA pageviews on navigation.
  useEffect(() => {
    initAnalytics()
  }, [])
  useEffect(() => {
    trackPageView(pathname)
  }, [pathname])

  // Fire a Lead conversion whenever a WhatsApp link is clicked, anywhere.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href*="wa.me"]')
      if (a) trackLead({ page_path: pathname })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [pathname])

  return (
    <>
      <div className="glow g1" aria-hidden="true" />
      <div className="glow g2" aria-hidden="true" />

      <Loader done={loaded} />
      <Nav />

      <Outlet context={{ loaded }} />

      <Footer />
      <MobileBook />
    </>
  )
}
