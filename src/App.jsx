import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { prefersReduced } from './constants'

import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Pricing from './pages/Pricing'
import Locations from './pages/Locations'
import Results from './pages/Results'
import Faq from './pages/Faq'
import Articles from './pages/Articles'
import Article from './pages/Article'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const delay = prefersReduced() ? 150 : 700
    let done = false
    const finish = () => {
      if (done) return
      done = true
      setLoaded(true)
    }
    const t = setTimeout(finish, delay)
    const onLoad = () => setTimeout(finish, delay)
    window.addEventListener('load', onLoad)
    const fallback = setTimeout(finish, 2400)
    return () => {
      clearTimeout(t)
      clearTimeout(fallback)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <Routes>
      <Route element={<Layout loaded={loaded} />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="locations" element={<Locations />} />
        <Route path="results" element={<Results />} />
        <Route path="faq" element={<Faq />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
