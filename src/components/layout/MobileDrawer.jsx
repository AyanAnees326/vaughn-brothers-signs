import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { company, navLinks } from '../../data/site'
import { useScrollLock } from '../../lib/hooks'
import { StarMark } from '../ui/StarMark'
import QuoteTrigger from '../quote/QuoteTrigger'
import ThemeToggle from './ThemeToggle'

export default function MobileDrawer({ open, onClose }) {
  useScrollLock(open)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-ink text-bone md:hidden"
          initial={{ opacity: 0, clipPath: 'circle(0% at 92% 5%)' }}
          animate={{ opacity: 1, clipPath: 'circle(150% at 92% 5%)' }}
          exit={{ opacity: 0, clipPath: 'circle(0% at 92% 5%)' }}
          transition={{ duration: 0.45, ease: [0.2, 0.9, 0.25, 1] }}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <span className="font-slab text-sm tracking-wide">
              {company.short}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-sm p-2 text-bone/70 hover:text-bone"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-7">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.07, duration: 0.4 }}
                className="flex items-center gap-4 border-b border-bone/10 py-4 font-display text-3xl text-bone"
              >
                <StarMark className="h-4 w-4 text-burnt" />
                {link.label}
              </motion.a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex items-center justify-between gap-4 px-7 pb-10 pt-6"
          >
            <div>
              <a
                href={`tel:${company.phone.replace(/\D/g, '')}`}
                className="font-slab text-lg text-burnt-lit"
              >
                {company.phone}
              </a>
              <p className="mt-1 font-sans text-xs text-bone/45">
                {company.hours}
              </p>
            </div>
            <ThemeToggle className="shrink-0 text-bone/70" />
          </motion.div>

          <div className="px-7 pb-10" onClick={onClose}>
            <QuoteTrigger
              id="quote-drawer"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Get a Quote
            </QuoteTrigger>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
