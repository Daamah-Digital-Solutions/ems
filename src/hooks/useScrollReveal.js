import { useEffect, useRef, useState } from 'react'

// Adds `.in` to every `.rv` and `.arc` element when it scrolls into view,
// and primes the neon-arc SVG paths for their draw animation.
//
// Re-runs on every navigation AND on language change. A language switch
// re-renders content and can REMOUNT `.rv` nodes (many list items are keyed by
// their translated text), which drops the imperatively-added `.in` class and
// would otherwise leave whole sections stuck at opacity:0. Since the content
// was already on screen before the flip, on a language-only change we reveal
// everything immediately — no blank sections, no viewport math, no re-animation.
export function useScrollReveal(pathname, lang) {
  const prev = useRef({ pathname: null, lang: null })
  useEffect(() => {
    // Belt-and-suspenders: the pre-paint script in index.html already adds this
    // under (prefers-reduced-motion: no-preference). Re-assert it here so the
    // hidden-then-reveal state is only ever active while JS is running.
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) document.documentElement.classList.add('reveal-ready')

    const reveal = (el) => el.classList.add('in')
    // Robust viewport height/width (some embeds report window.innerHeight as 0).
    const vh = window.innerHeight || document.documentElement.clientHeight || 0
    const vw = window.innerWidth || document.documentElement.clientWidth || 0
    const inView = (el) => {
      const r = el.getBoundingClientRect()
      return r.top < vh && r.bottom > 0 && r.left < vw && r.right > 0
    }

    const els = document.querySelectorAll('.rv, .arc')

    // prime arc paths (stroke draw)
    document.querySelectorAll('.arc path').forEach((p) => {
      try {
        const L = p.getTotalLength()
        p.style.strokeDasharray = L
        p.style.strokeDashoffset = L
      } catch (e) {
        /* ignore */
      }
    })

    const sameRoute = prev.current.pathname === pathname
    const langChanged = prev.current.lang !== null && prev.current.lang !== lang
    const langFlipOnly = sameRoute && langChanged
    prev.current = { pathname, lang }

    // Reduced motion, no IntersectionObserver, or a language flip on the same
    // page → reveal everything now so nothing is ever stuck hidden.
    if (reduce || typeof IntersectionObserver === 'undefined' || langFlipOnly) {
      els.forEach(reveal)
      return
    }

    // Immediately reveal anything already in the viewport (no wait for the
    // observer's first async callback), then observe the rest for scroll.
    els.forEach((el) => {
      if (inView(el)) reveal(el)
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (x.isIntersecting) {
            reveal(x.target)
            io.unobserve(x.target)
          }
        })
      },
      { threshold: 0.14 }
    )
    els.forEach((el) => {
      if (!el.classList.contains('in')) io.observe(el)
    })

    // Failsafe: reveal anything still on-screen if the observer never fired —
    // never leave a section blank.
    const failsafe = setTimeout(() => {
      els.forEach((el) => {
        if (inView(el)) reveal(el)
      })
    }, 1200)

    return () => {
      io.disconnect()
      clearTimeout(failsafe)
    }
  }, [pathname, lang])
}

// Returns true once the page has been scrolled past `offset`px.
export function useNavScrolled(offset = 30) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > offset)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}
