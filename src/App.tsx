import './App.css'
import { useReveal } from './hooks/useReveal'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { Contact } from './sections/Contact'
import { Featured } from './sections/Featured'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { LogoStrip } from './sections/LogoStrip'
import { Nav } from './sections/Nav'
import { Partners } from './sections/Partners'
import { Recognition } from './sections/Recognition'
import { Solutions } from './sections/Solutions'
import { Team } from './sections/Team'
import { Testimonials } from './sections/Testimonials'

function App() {
  useReveal()
  useSmoothScroll()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Solutions />
        <LogoStrip />
        <Featured />
        <Recognition />
        <Partners />
        <Testimonials />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
