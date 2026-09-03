import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { portfolio } from '../../data/site'
import { useReducedMotion } from '../../lib/hooks'
import SectionHeading from '../ui/SectionHeading'
import { StarMark } from '../ui/StarMark'

const SPEED = 34 // px per second
const GAP = 20

/** Placeholder artwork — real photography drops in here. */
function SignPlate({ palette, title }) {
  return (
    <div
      className="relative flex h-40 items-center justify-center overflow-hidden rounded-sm sm:h-48"
      style={{
        backgroundImage: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 100%)`,
      }}
      role="img"
      aria-label={`${title} — illustration placeholder`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.28),transparent_60%)]" />
      <svg viewBox="0 0 120 60" className="relative h-20 w-32 opacity-85">
        <rect
          x="6"
          y="8"
          width="108"
          height="36"
          rx="3"
          fill="rgba(0,0,0,0.42)"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2"
        />
        <rect x="56" y="44" width="8" height="14" fill="rgba(0,0,0,0.45)" />
        <circle cx="26" cy="26" r="4" fill="rgba(255,255,255,0.85)" />
        <rect x="38" y="22" width="52" height="4" rx="2" fill="rgba(255,255,255,0.85)" />
        <rect x="38" y="31" width="34" height="3" rx="1.5" fill="rgba(255,255,255,0.55)" />
      </svg>
    </div>
  )
}

function Card({ item }) {
  return (
    <article className="flex h-full w-[300px] flex-col rounded-sm border-2 border-ink/12 bg-bone p-4 dark:border-bone/12 dark:bg-ink-soft sm:w-[340px]">
      <SignPlate palette={item.palette} title={item.title} />

      <div className="flex flex-1 flex-col p-1 pt-4">
        <div className="flex items-center gap-2">
          <StarMark className="h-3 w-3 text-burnt" />
          <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.16em] text-burnt">
            {item.type}
          </span>
        </div>

        <h3 className="mt-2 font-slab text-lg leading-snug text-ink dark:text-bone">
          {item.title}
        </h3>
        <p className="mt-0.5 font-sans text-sm font-semibold text-ink/55 dark:text-bone/55">
          {item.client}
        </p>
        <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-ink/60 dark:text-bone/60">
          {item.note}
        </p>
        <p className="mt-4 border-t border-dashed border-ink/20 pt-3 font-sans text-[0.65rem] uppercase tracking-[0.16em] text-ink/40 dark:border-bone/20 dark:text-bone/40">
          Installed {item.year}
        </p>
      </div>
    </article>
  )
}

/**
 * A self-driving rail. The page scrolls normally past this section — the cards
 * travel on their own, and any manual input (hover, drag, wheel, arrows) takes
 * over immediately and hands back when you let go.
 */
export default function PortfolioRail() {
  const reduced = useReducedMotion()
  const trackRef = useRef(null)
  const [playing, setPlaying] = useState(true)

  // Deliberately NOT paused by hover: on desktop the pointer rests over this
  // section the whole time you're reading it, so hover-to-pause reads as a
  // broken rail. Only a real grab or a sideways gesture stops it.
  const holding = useRef(false) // pointer is held down on the rail
  const pausedUntil = useRef(0) // temporary yield after wheel / arrow input
  const offset = useRef(0) // authoritative position, kept as a float
  const onScreen = useRef(true)

  // Mouse drag state. Touch is deliberately left to the browser's own
  // overflow scrolling, which already has momentum we can't improve on.
  const drag = useRef(null)
  const glide = useRef(0) // px/sec carried over after a flick

  // Doubled so the loop can wrap seamlessly; the copy is hidden from AT.
  const items = reduced ? portfolio : [...portfolio, ...portfolio]

  // Only run the loop while the section is actually in view.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !playing) return
    const el = trackRef.current
    if (!el) return

    let raf
    let last = performance.now()
    offset.current = el.scrollLeft

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const half = el.scrollWidth / 2

      if (half > 0 && onScreen.current) {
        const idle = !holding.current && now > pausedUntil.current

        // scrollLeft rounds to an integer on write, so a ~0.55px-per-frame
        // increment applied directly to the DOM would be discarded every
        // frame and never accumulate. Track the real position as a float
        // here and assign it instead.
        if (Math.abs(glide.current) > 8) {
          // Inertia from a flick — decays out, then auto-scroll takes back over.
          offset.current = el.scrollLeft + glide.current * dt
          el.scrollLeft = offset.current
          glide.current *= Math.pow(0.94, dt * 60)
        } else if (idle) {
          glide.current = 0
          // Re-sync first, so manual scrolling during the pause isn't undone.
          if (Math.abs(el.scrollLeft - offset.current) > 2) {
            offset.current = el.scrollLeft
          }
          offset.current += SPEED * dt
          if (offset.current >= half) offset.current -= half
          el.scrollLeft = offset.current
        } else {
          offset.current = el.scrollLeft
        }

        // Wrap manual scrolling in both directions so it never hits an end.
        // Dragging and gliding both count as manual here.
        const manual = !idle || Math.abs(glide.current) > 8
        if (el.scrollLeft >= half) {
          offset.current = el.scrollLeft - half
          el.scrollLeft = offset.current
        } else if (el.scrollLeft < 1 && manual) {
          offset.current = half - 1
          el.scrollLeft = offset.current
        }
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced, playing])

  const yield_ = useCallback((ms = 1800) => {
    pausedUntil.current = performance.now() + ms
  }, [])

  // Vertical page scrolling must never pause the rail — only sideways intent.
  const handleWheel = useCallback(
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) yield_()
    },
    [yield_],
  )

  // --- Mouse drag ---------------------------------------------------------
  // A native overflow-x container does not scroll on mouse drag, so this is
  // added by hand. Touch is excluded: the browser already does it better.

  const onPointerDown = useCallback((e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const el = trackRef.current
    if (!el) return
    // Throws if the pointer isn't active; the drag still works without it.
    try {
      el.setPointerCapture(e.pointerId)
    } catch {
      /* no capture available — pointermove on the element still fires */
    }
    holding.current = true
    glide.current = 0
    drag.current = {
      startX: e.clientX,
      startScroll: el.scrollLeft,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
      moved: false,
    }
  }, [])

  const onPointerMove = useCallback((e) => {
    const d = drag.current
    const el = trackRef.current
    if (!d || !el) return

    const dx = e.clientX - d.startX
    if (Math.abs(dx) > 3) d.moved = true
    el.scrollLeft = d.startScroll - dx
    offset.current = el.scrollLeft

    const now = performance.now()
    const dt = (now - d.lastT) / 1000
    if (dt > 0.004) {
      // Negative: dragging right moves content left.
      d.velocity = -(e.clientX - d.lastX) / dt
      d.lastX = e.clientX
      d.lastT = now
    }
  }, [])

  const endDrag = useCallback((e) => {
    const d = drag.current
    if (!d) return
    const el = trackRef.current
    try {
      el?.releasePointerCapture(e.pointerId)
    } catch {
      /* capture was never taken */
    }
    // Carry the flick, clamped so a fast wrist-flick can't launch it.
    if (d.moved && performance.now() - d.lastT < 120) {
      glide.current = Math.max(-2600, Math.min(2600, d.velocity))
    }
    drag.current = null
    holding.current = false
  }, [])

  const nudge = useCallback(
    (dir) => {
      const el = trackRef.current
      if (!el) return
      const card = el.querySelector('[data-card]')
      const step = (card?.offsetWidth ?? 320) + GAP
      yield_()
      el.scrollBy({ left: dir * step, behavior: 'smooth' })
    },
    [yield_],
  )

  return (
    <section id="work" className="grain py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Thirty-eight years of things people drive past."
            lede="A few we are proud of. Every one designed, permitted, built and hung by the same crew."
          />

          {/* Manual controls */}
          <div className="flex items-center gap-2">
            {!reduced && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Pause the rail' : 'Play the rail'}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink/20 text-ink/60 transition-colors hover:border-burnt hover:text-burnt dark:border-bone/20 dark:text-bone/60"
              >
                {playing ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Previous projects"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink/20 text-ink/60 transition-colors hover:border-burnt hover:text-burnt dark:border-bone/20 dark:text-bone/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Next projects"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink/20 text-ink/60 transition-colors hover:border-burnt hover:text-burnt dark:border-bone/20 dark:text-bone/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-10 flex cursor-grab select-none overflow-x-auto overscroll-x-contain pb-2 active:cursor-grabbing"
        style={{ gap: `${GAP}px`, paddingInline: 'max(1rem, calc((100vw - 80rem) / 2))' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onDragStart={(e) => e.preventDefault()}
        onWheel={handleWheel}
        onTouchStart={() => (holding.current = true)}
        onTouchEnd={() => (holding.current = false)}
        onFocusCapture={() => yield_(2000)}
      >
        {items.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            data-card
            aria-hidden={i >= portfolio.length ? 'true' : undefined}
            className="shrink-0"
          >
            <Card item={item} />
          </div>
        ))}
      </div>

      <p className="mx-auto mt-4 max-w-7xl px-4 font-sans text-xs text-ink/40 dark:text-bone/40 sm:px-6">
        Grab it to browse, or use the arrows — it keeps moving on its own.
      </p>
    </section>
  )
}
