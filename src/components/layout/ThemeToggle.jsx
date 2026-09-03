import { motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../lib/theme'

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative flex h-8 w-14 items-center rounded-full border-2 border-current px-1 text-ink/70 transition-colors dark:text-bone/70 ${className}`}
    >
      <motion.span
        className="flex h-5 w-5 items-center justify-center rounded-full bg-burnt text-bone"
        animate={{ x: isDark ? 22 : 0 }}
        transition={{ type: 'spring', stiffness: 520, damping: 32 }}
      >
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          {isDark ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
        </motion.span>
      </motion.span>
    </button>
  )
}
