import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './hooks'

const easeOut = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Counts from 0 to `target` once `active` flips true. Driven by rAF rather than
 * an interval so it stays smooth and self-corrects on slow frames.
 */
export function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0)
  const reduced = useReducedMotion()
  const frame = useRef(0)

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setValue(target)
      return
    }

    let start = null
    const tick = (now) => {
      if (start === null) start = now
      const progress = Math.min((now - start) / duration, 1)
      setValue(target * easeOut(progress))
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [target, active, duration, reduced])

  return value
}
