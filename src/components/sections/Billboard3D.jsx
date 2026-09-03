import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useCoarsePointer, useReducedMotion } from '../../lib/hooks'
import SectionHeading from '../ui/SectionHeading'
import QuoteTrigger from '../quote/QuoteTrigger'

export default function Billboard3D() {
  const sectionRef = useRef(null)
  const coarse = useCoarsePointer()
  const reduced = useReducedMotion()

  // Cursor position, normalised to -0.5..0.5 around the section centre.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.6 })

  const rotateY = useTransform(sx, [-0.5, 0.5], [-16, 16])
  const rotateX = useTransform(sy, [-0.5, 0.5], [11, -11])

  // Each layer takes a fraction of the tilt, which is what separates them.
  const shiftFar = useTransform(sx, [-0.5, 0.5], [16, -16])
  const shiftMid = useTransform(sx, [-0.5, 0.5], [34, -34])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const rigY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const skyY = useTransform(scrollYProgress, [0, 1], [-30, 30])
  // Message swap as the board passes.
  const panelA = useTransform(scrollYProgress, [0.32, 0.46], [1, 0])
  const panelB = useTransform(scrollYProgress, [0.36, 0.5], [0, 1])

  useEffect(() => {
    // Touch devices get a slow idle tilt instead of a dead rectangle.
    if (!coarse || reduced) return
    let raf
    const start = performance.now()
    const loop = (now) => {
      const t = (now - start) / 1000
      px.set(Math.sin(t * 0.5) * 0.32)
      py.set(Math.cos(t * 0.34) * 0.22)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [coarse, reduced, px, py])

  const handleMove = (e) => {
    if (coarse || reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    if (coarse) return
    px.set(0)
    py.set(0)
  }

  return (
    <section
      ref={sectionRef}
      id="billboard"
      className="relative overflow-hidden bg-gradient-to-b from-[#1b2a3a] via-[#3d5068] to-[#c98a52] py-20 sm:py-28"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Sky wash + sun */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduced ? 0 : skyY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#ffb765] opacity-30 blur-3xl" />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Highway Work"
          title="Read it at 65 miles an hour."
          lede="Pylons, bulletins and highway bulletins engineered for Gulf Coast wind and TxDOT setbacks. Move your cursor — the board moves with you."
          tone="light"
          align="center"
        />

        {/* 3D rig */}
        <motion.div
          style={{ perspective: 1200, y: reduced ? 0 : rigY }}
          className="relative mx-auto mt-14 flex max-w-3xl justify-center"
        >
          {/* Far layer — water tower + mesquite silhouettes */}
          <motion.div
            aria-hidden="true"
            style={{ x: reduced ? 0 : shiftFar }}
            className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between px-2 opacity-45"
          >
            <svg viewBox="0 0 60 80" className="h-20 w-14 fill-[#16202c]">
              <path d="M22 80V44h-4l12-22 12 22h-4v36z" />
              <rect x="26" y="8" width="8" height="16" />
              <ellipse cx="30" cy="10" rx="14" ry="7" />
            </svg>
            <svg viewBox="0 0 80 60" className="h-14 w-20 fill-[#16202c]">
              <path d="M38 60V34c-8-2-14-8-16-16 6 2 12 6 16 12V16c0-6 4-10 4-10s4 4 4 10v12c4-6 10-10 16-12-2 8-8 14-16 16v26z" />
            </svg>
          </motion.div>

          {/* Mid layer — pole */}
          <motion.div
            aria-hidden="true"
            style={{ x: reduced ? 0 : shiftMid }}
            className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-6 -translate-x-1/2 bg-gradient-to-b from-[#59636e] to-[#2b3038] shadow-[4px_0_10px_rgba(0,0,0,0.35)]"
          />

          {/* Board face */}
          <motion.div
            style={{
              rotateX: reduced ? 0 : rotateX,
              rotateY: reduced ? 0 : rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative z-10 mb-28 w-full"
          >
            <div
              className="relative overflow-hidden rounded-sm border-[6px] border-[#3a3f47] bg-ink shadow-[0_40px_70px_-24px_rgba(0,0,0,0.85)]"
              style={{ transform: 'translateZ(50px)' }}
            >
              {/* Two messages, cross-faded by scroll */}
              <motion.div
                style={{ opacity: reduced ? 1 : panelA }}
                className="flex min-h-[13rem] flex-col items-center justify-center gap-3 px-6 py-10 text-center sm:min-h-[16rem]"
              >
                <p className="eyebrow text-burnt-lit">Since 1987</p>
                <p className="display-lg text-bone">Vaughn Bros.</p>
                <p className="font-script text-lg text-bone/60">
                  built to be seen
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: reduced ? 0 : panelB }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 py-10 text-center"
              >
                <p className="display-md text-bone">
                  Your sign could
                  <br />
                  be up here.
                </p>
                <QuoteTrigger id="quote-billboard" variant="primary" size="md">
                  Start a Quote
                </QuoteTrigger>
              </motion.div>

              {/* Gooseneck lamp wash across the face */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/12 to-transparent"
              />
            </div>

            {/* Lamps on the catwalk */}
            <div
              aria-hidden="true"
              className="absolute -top-4 left-0 right-0 flex justify-around px-10"
              style={{ transform: 'translateZ(66px)' }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-2.5 w-6 rounded-t-full bg-[#8d949d] shadow-[0_0_14px_4px_rgba(255,214,150,0.55)]"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <p className="mt-2 text-center font-sans text-xs text-bone/45 sm:hidden">
          Board tilts on its own here — try it on a desktop for cursor control.
        </p>
      </div>
    </section>
  )
}
