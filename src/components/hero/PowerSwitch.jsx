import { motion } from 'motion/react'

/**
 * A physical toggle rather than a checkbox — the throw, the shadow and the
 * indicator lamp are what make the sign feel like hardware.
 */
export default function PowerSwitch({ on, onToggle }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Sign power"
        onClick={onToggle}
        className="group relative h-14 w-9 rounded-md border border-black/60 bg-gradient-to-b from-[#3a332d] to-[#1d1916] p-1 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)]"
      >
        <motion.span
          className="block h-6 w-full rounded-[3px] border-t border-white/25 bg-gradient-to-b from-[#d8d2c6] to-[#8d867a] shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
          animate={{ y: on ? 0 : 24 }}
          transition={{ type: 'spring', stiffness: 700, damping: 26 }}
        />
      </button>

      <div className="flex flex-col gap-1">
        <span
          className="h-2.5 w-2.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: on ? 'var(--color-volt)' : '#3d3833',
            boxShadow: on ? '0 0 10px var(--color-volt)' : 'none',
          }}
        />
        <span className="font-sans text-[0.6rem] font-bold tracking-[0.2em] text-bone/50">
          {on ? 'ON' : 'OFF'}
        </span>
      </div>
    </div>
  )
}
