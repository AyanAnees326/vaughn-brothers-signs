import { AnimatePresence, motion } from 'motion/react'
import { useReducedMotion } from '../../lib/hooks'

// Texas flag, used in exactly one place in the whole site.
const FLAG = ['#002868', '#f5f1e8', '#bf0a30']

function Bolt({ className }) {
  return (
    <span
      className={`absolute h-2.5 w-2.5 rounded-full bg-gradient-to-b from-[#9c948a] to-[#3d3833] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_1px_2px_rgba(0,0,0,0.8)] ${className}`}
    />
  )
}

export default function NeonSign({
  text,
  color,
  fontCss,
  on,
  isEasterEgg,
  flickerKey,
  children,
}) {
  const reduced = useReducedMotion()
  const letters = (text || ' ').split('')

  return (
    <div className="relative w-full max-w-3xl">
      {/* Light spill thrown onto the brick behind the cabinet */}
      <AnimatePresence>
        {on && (
          <motion.div
            key="spill"
            aria-hidden="true"
            className="pointer-events-none absolute -inset-16 -z-10 rounded-[50%] blur-3xl"
            style={{
              background: `radial-gradient(ellipse at center, ${
                isEasterEgg ? '#bf0a30' : color
              } 0%, transparent 68%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.42 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Cabinet */}
      <div className="relative rounded-lg border-2 border-[#4a423c] bg-gradient-to-b from-[#252019] to-[#15110e] p-1.5 shadow-[0_28px_60px_-18px_rgba(0,0,0,0.9)]">
        <Bolt className="left-2 top-2" />
        <Bolt className="right-2 top-2" />
        <Bolt className="bottom-2 left-2" />
        <Bolt className="bottom-2 right-2" />

        <div className="rounded-md border border-black/70 bg-[#0d0a08]/85 px-5 py-9 sm:px-10 sm:py-12">
          {/* Sign face */}
          <div
            key={flickerKey}
            className={`flex min-h-[4.5rem] flex-wrap items-center justify-center gap-x-0.5 text-center sm:min-h-[7rem] ${
              on ? (reduced ? '' : 'flicker-on buzzing') : ''
            }`}
            style={{
              fontFamily: fontCss,
              fontSize: 'clamp(2rem, 8vw, 5rem)',
              lineHeight: 1.15,
              '--neon': isEasterEgg ? FLAG[2] : color,
            }}
          >
            {letters.map((ch, i) => {
              const eggColor = isEasterEgg ? FLAG[i % FLAG.length] : null
              return (
                <motion.span
                  key={`${ch}-${i}`}
                  className={on ? 'neon-lit' : 'neon-dark'}
                  style={{
                    '--neon': eggColor ?? color,
                    // Preserve the width of typed spaces.
                    whiteSpace: 'pre',
                  }}
                  // Whammy-bar dive: only when the easter egg is lit.
                  animate={
                    isEasterEgg && on && !reduced
                      ? { y: [0, -9, 3, 0], rotate: [0, -3, 2, 0] }
                      : { y: 0, rotate: 0 }
                  }
                  transition={
                    isEasterEgg && on && !reduced
                      ? {
                          duration: 1.6,
                          repeat: Infinity,
                          delay: i * 0.12,
                          ease: 'easeInOut',
                        }
                      : { duration: 0.3 }
                  }
                >
                  {ch}
                </motion.span>
              )
            })}
          </div>

          <AnimatePresence>
            {isEasterEgg && on && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 text-center font-script text-sm text-bone/60"
              >
                for the Texas blues
              </motion.p>
            )}
          </AnimatePresence>

          {/* Hairline under-rail, then the CTA mounted on the face itself */}
          <div className="mx-auto mt-7 h-px w-2/3 bg-gradient-to-r from-transparent via-bone/20 to-transparent" />
          <div className="mt-6 flex justify-center">{children}</div>
        </div>
      </div>

      {/* Mounting arms into the brick */}
      <div className="mx-auto flex w-1/2 justify-between px-8">
        <span className="h-5 w-1.5 rounded-b bg-gradient-to-b from-[#4a423c] to-transparent" />
        <span className="h-5 w-1.5 rounded-b bg-gradient-to-b from-[#4a423c] to-transparent" />
      </div>
    </div>
  )
}
