import { motion } from 'motion/react'
import { useQuote } from '../../lib/quoteContext'

const sizes = {
  sm: 'px-4 py-2 text-[0.7rem]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-sm',
}

const variants = {
  primary:
    'bg-burnt text-bone hover:bg-burnt-lit shadow-[0_4px_0_0_#7d2f0d] active:shadow-[0_1px_0_0_#7d2f0d] active:translate-y-[3px]',
  light:
    'bg-bone text-ink hover:bg-white shadow-[0_4px_0_0_rgba(0,0,0,0.45)] active:shadow-[0_1px_0_0_rgba(0,0,0,0.45)] active:translate-y-[3px]',
}

/**
 * Every "Get a Quote" button on the site. Each instance keeps its own
 * `layoutId`; the modal adopts the id of whichever one was pressed, so the
 * panel physically grows out of that button. While its own panel is open the
 * trigger unmounts — that hand-off is the animation.
 */
export default function QuoteTrigger({
  id,
  children = 'Get a Quote',
  variant = 'primary',
  size = 'md',
  className = '',
}) {
  const { open, isOpen, sourceId } = useQuote()
  const isSource = isOpen && sourceId === id

  if (isSource) return null

  return (
    <motion.button
      type="button"
      layoutId={id}
      onClick={() => open(id)}
      className={`relative inline-flex items-center justify-center gap-2 rounded-sm font-sans font-bold uppercase tracking-[0.14em] transition-colors duration-200 ${sizes[size]} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
    >
      <motion.span layout="position" className="whitespace-nowrap">
        {children}
      </motion.span>
    </motion.button>
  )
}
