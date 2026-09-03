import { useEffect, useState } from 'react'
import { motion, useScroll } from 'motion/react'
import { Menu, Phone } from 'lucide-react'
import { company, navLinks } from '../../data/site'
import { BrandMark } from '../ui/StarMark'
import QuoteTrigger from '../quote/QuoteTrigger'
import ThemeToggle from './ThemeToggle'
import MobileDrawer from './MobileDrawer'

export default function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => setScrolled(v > 40))
    return unsubscribe
  }, [scrollY])

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'border-b border-ink/10 bg-bone/90 backdrop-blur-md dark:border-bone/10 dark:bg-ink/90'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a
            href="#top"
            className="flex shrink-0 items-center gap-3"
            aria-label={`${company.legal} — home`}
          >
            <BrandMark className={scrolled ? 'h-9 w-9' : 'h-10 w-10'} />
            <span
              className={`hidden font-slab leading-tight sm:block ${
                scrolled ? 'text-sm' : 'text-base'
              } ${scrolled ? 'text-ink dark:text-bone' : 'text-bone'}`}
            >
              The Vaughn Brothers
              <span className="block font-sans text-[0.6rem] font-semibold uppercase tracking-[0.2em] opacity-55">
                Sign Co. · Houston
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-sans text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:text-burnt ${
                  scrolled ? 'text-ink/70 dark:text-bone/70' : 'text-bone/70'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${company.phone.replace(/\D/g, '')}`}
              className={`hidden items-center gap-2 font-slab text-sm transition-colors hover:text-burnt lg:flex ${
                scrolled ? 'text-ink dark:text-bone' : 'text-bone'
              }`}
            >
              <Phone className="h-4 w-4" />
              {company.phone}
            </a>

            <ThemeToggle
              className={scrolled ? '' : 'text-bone/70'}
            />

            <div className="hidden md:block">
              <QuoteTrigger id="quote-nav" variant="primary" size="sm">
                Get a Quote
              </QuoteTrigger>
            </div>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className={`rounded-sm p-2 md:hidden ${
                scrolled ? 'text-ink dark:text-bone' : 'text-bone'
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
