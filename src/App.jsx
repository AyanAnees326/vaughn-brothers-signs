import { ThemeProvider } from './lib/theme'
import { QuoteProvider } from './lib/quoteContext'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Hero from './components/hero/Hero'
import TrustMarquee from './components/sections/TrustMarquee'
import PortfolioRail from './components/sections/PortfolioRail'
import Services from './components/sections/Services'
import Billboard3D from './components/sections/Billboard3D'
import Process from './components/sections/Process'
import Stats from './components/sections/Stats'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'
import QuoteFab from './components/quote/QuoteFab'
import QuoteModal from './components/quote/QuoteModal'

export default function App() {
  return (
    <ThemeProvider>
      <QuoteProvider>
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-burnt focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-bold focus:text-bone"
        >
          Skip to content
        </a>

        <Nav />

        <main>
          <Hero />
          <TrustMarquee />
          <PortfolioRail />
          <Services />
          <Billboard3D />
          <Process />
          <Stats />
          <Testimonials />
          <Contact />
        </main>

        <Footer />

        <QuoteFab />
        <QuoteModal />
      </QuoteProvider>
    </ThemeProvider>
  )
}
