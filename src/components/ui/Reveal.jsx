import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useReducedMotion } from '../../lib/hooks'

/**
 * The single scroll-reveal wrapper for the whole site. Every section uses this
 * rather than wiring its own useInView, so timing stays consistent.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  as = 'div',
  className = '',
  once = true,
  amount = 0.25,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })
  const reduced = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : reduced
            ? { opacity: 0 }
            : { opacity: 0, y }
      }
      transition={{
        duration: reduced ? 0.3 : 0.7,
        delay: reduced ? 0 : delay,
        ease: [0.2, 0.9, 0.25, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
