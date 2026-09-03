import { useEffect, useState } from 'react'

/**
 * Reactive matchMedia. Every capability check in the app routes through this so
 * no component invents its own listener bookkeeping.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True on touch devices. Gates every cursor-driven effect. */
export function useCoarsePointer() {
  return useMediaQuery('(pointer: coarse)')
}

/** Honors the OS accessibility setting; heavy scroll scenes fall back to fades. */
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)')
}

/** Locks background scroll without the layout shift from a vanishing scrollbar. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const { body } = document
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    const gap = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
    }
  }, [locked])
}
