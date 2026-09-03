import { AnimatePresence, motion, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import QuoteTrigger from './QuoteTrigger'

/**
 * Floating trigger that appears once the hero is behind you, so the CTA is
 * never more than a thumb away on a long page.
 */
export default function QuoteFab() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => {
      setVisible(v > window.innerHeight * 0.9)
    })
    return unsubscribe
  }, [scrollY])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          className="fixed bottom-5 right-5 z-30 sm:bottom-7 sm:right-7"
        >
          <QuoteTrigger id="quote-fab" variant="primary" size="lg">
            Get a Quote
          </QuoteTrigger>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
