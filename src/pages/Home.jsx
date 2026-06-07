import { useOutletContext } from 'react-router-dom'

import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import Benefits from '../components/Benefits'
import How from '../components/How'
import Stats from '../components/Stats'
import Where from '../components/Where'
import Feed from '../components/Feed'
import Sessions from '../components/Sessions'
import Faq from '../components/Faq'
import Final from '../components/Final'

// The approved landing — sections unchanged, just lifted into a routed page.
export default function Home() {
  const { loaded } = useOutletContext()

  return (
    <>
      <main id="top">
        <Hero loaded={loaded} />
      </main>

      <Ticker />
      <Benefits />
      <How />
      <Stats />
      <Where />
      <Feed />
      <Sessions />
      <Faq />
      <Final />
    </>
  )
}
