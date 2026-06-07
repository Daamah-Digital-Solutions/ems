import { useEffect, useState } from 'react'

// Adds `.in` to every `.rv` and `.arc` element when it scrolls into view,
// and primes the neon-arc SVG paths for their draw animation.
// Pass a `key` (e.g. the route pathname) so it re-observes the fresh DOM
// after each navigation — every page is built with `.rv` reveals.
export function useScrollReveal(key) {
  useEffect(() => {
    // Belt-and-suspenders: the pre-paint script in index.html already adds this
    // under (prefers-reduced-motion: no-preference). Re-assert it here so the
    // hidden-then-reveal state is only ever active while JS is running.
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) document.documentElement.classList.add('reveal-ready')

    const els = document.querySelectorAll('.rv, .arc')
    const reveal = (el) => el.classList.add('in')

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

    // No IntersectionObserver (or reduced motion) → reveal everything now.
    if (reduce || typeof IntersectionObserver === 'undefined') {
      els.forEach(reveal)
      return
    }

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
    els.forEach((el) => io.observe(el))

    // Failsafe: if the observer never fires for something already on-screen
    // (short pages, above the fold), reveal it so it's never stuck hidden.
    const failsafe = setTimeout(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) reveal(el)
      })
    }, 1400)

    return () => {
      io.disconnect()
      clearTimeout(failsafe)
    }
  }, [key])
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
