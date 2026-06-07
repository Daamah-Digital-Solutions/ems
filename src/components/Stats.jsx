import { useEffect, useRef, useState } from 'react'
import { prefersReduced } from '../constants'

function Stat({ to, suffix = '', small, value, k }) {
  const ref = useRef(null)
  const [n, setN] = useState(to != null ? 0 : null)

  useEffect(() => {
    if (to == null) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((x) => {
          if (!x.isIntersecting) return
          obs.unobserve(el)
          if (prefersReduced()) {
            setN(to)
            return
          }
          let t0 = null
          const step = (t) => {
            if (!t0) t0 = t
            const pr = Math.min((t - t0) / 1000, 1)
            setN(Math.floor((1 - Math.pow(1 - pr, 3)) * to))
            if (pr < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        })
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to])

  return (
    <div className="stat">
      <div className="v" ref={ref}>
        {value != null ? value : n}
        {suffix}
        {small && <small>{small}</small>}
      </div>
      <div className="k">{k}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="pad" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="stats rv">
          <Stat to={20} small="′" k="Per session" />
          <Stat to={2} suffix="×" k="Per week" />
          <Stat value="1:1" k="Personal trainer" />
          <Stat to={0} small=" commute" k="We come to you" />
        </div>
      </div>
    </section>
  )
}
