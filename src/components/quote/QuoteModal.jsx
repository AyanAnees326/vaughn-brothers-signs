import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useQuote } from '../../lib/quoteContext'
import { useReducedMotion, useScrollLock } from '../../lib/hooks'
import Button from '../ui/Button'
import StepSign from './StepSign'
import StepSite from './StepSite'
import StepContact from './StepContact'
import JobTicket from './JobTicket'

const STEPS = [
  { id: 'sign', title: 'What are we building?', Component: StepSign },
  { id: 'site', title: "Where's it going?", Component: StepSite },
  { id: 'contact', title: 'How do we reach you?', Component: StepContact },
]

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function QuoteModal() {
  const { isOpen, close, step, next, back, submit, ticket, sourceId } = useQuote()
  const [dir, setDir] = useState(1)
  const panelRef = useRef(null)
  const reduced = useReducedMotion()

  useScrollLock(isOpen)

  const handleNext = useCallback(() => {
    setDir(1)
    next()
  }, [next])

  const handleBack = useCallback(() => {
    setDir(-1)
    back()
  }, [back])

  // Escape to close, Tab trapped inside the panel.
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = Array.from(panelRef.current.querySelectorAll(FOCUSABLE))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, close])

  // Move focus into the panel once the morph has settled.
  useEffect(() => {
    if (!isOpen) return
    const t = setTimeout(() => {
      const el = panelRef.current?.querySelector(FOCUSABLE)
      el?.focus()
    }, 340)
    return () => clearTimeout(t)
  }, [isOpen])

  const Current = STEPS[step].Component
  const isLast = step === STEPS.length - 1

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-ink/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />

          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain p-3 py-6 sm:p-6 sm:py-10">
            <motion.div
              key="panel"
              ref={panelRef}
              layoutId={sourceId}
              role="dialog"
              aria-modal="true"
              aria-label="Request a quote"
              onClick={(e) => e.stopPropagation()}
              style={{ borderRadius: 6 }}
              transition={{
                type: 'spring',
                stiffness: 320,
                damping: 34,
                duration: reduced ? 0.2 : undefined,
              }}
              className="relative my-auto w-full max-w-2xl overflow-hidden border-2 border-burnt bg-bone shadow-[0_40px_90px_-20px_rgba(0,0,0,0.6)] dark:bg-ink-soft"
            >
              {/* Content fades in after the box has finished growing, so the
                  text never stretches with the layout animation. */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: reduced ? 0 : 0.18 }}
                className="p-5 sm:p-8"
              >
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close quote form"
                  className="absolute right-3 top-3 rounded-sm p-1.5 text-ink/45 transition-colors hover:bg-ink/10 hover:text-ink dark:text-bone/45 dark:hover:bg-bone/10 dark:hover:text-bone"
                >
                  <X className="h-5 w-5" />
                </button>

                {ticket ? (
                  <JobTicket />
                ) : (
                  <>
                    <p className="eyebrow text-burnt">
                      Job Ticket · Step {step + 1} of {STEPS.length}
                    </p>
                    <h2 className="display-md mt-2 pr-8 text-ink dark:text-bone">
                      {STEPS[step].title}
                    </h2>

                    {/* Progress rail */}
                    <div className="mt-5 flex gap-1.5">
                      {STEPS.map((s, i) => (
                        <div
                          key={s.id}
                          className="h-1 flex-1 overflow-hidden rounded-full bg-ink/12 dark:bg-bone/12"
                        >
                          <motion.div
                            className="h-full bg-burnt"
                            initial={false}
                            animate={{ scaleX: i <= step ? 1 : 0 }}
                            style={{ originX: 0 }}
                            transition={{ duration: 0.4, ease: [0.2, 0.9, 0.25, 1] }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-7 overflow-hidden">
                      <AnimatePresence mode="wait" initial={false} custom={dir}>
                        <motion.div
                          key={step}
                          custom={dir}
                          initial={
                            reduced
                              ? { opacity: 0 }
                              : { opacity: 0, x: dir > 0 ? 44 : -44 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          exit={
                            reduced
                              ? { opacity: 0 }
                              : { opacity: 0, x: dir > 0 ? -44 : 44 }
                          }
                          transition={{ duration: 0.3, ease: [0.2, 0.9, 0.25, 1] }}
                        >
                          <Current />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-3 border-t border-ink/10 pt-5 dark:border-bone/10">
                      {step > 0 ? (
                        <Button variant="ghost" size="md" onClick={handleBack}>
                          ← Back
                        </Button>
                      ) : (
                        <span className="font-sans text-xs text-ink/40 dark:text-bone/40">
                          Takes about a minute
                        </span>
                      )}

                      {isLast ? (
                        <Button variant="primary" size="lg" onClick={submit}>
                          Send it to the shop
                        </Button>
                      ) : (
                        <Button variant="primary" size="md" onClick={handleNext}>
                          Next →
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
