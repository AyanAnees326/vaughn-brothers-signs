import { motion } from 'motion/react'

const base =
  'relative inline-flex items-center justify-center gap-2 font-sans font-bold uppercase tracking-[0.14em] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed select-none'

const sizes = {
  sm: 'px-4 py-2 text-[0.7rem]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-sm',
}

const variants = {
  primary:
    'bg-burnt text-bone hover:bg-burnt-lit shadow-[0_4px_0_0_#7d2f0d] active:shadow-[0_1px_0_0_#7d2f0d] active:translate-y-[3px]',
  outline:
    'border-2 border-current text-ink dark:text-bone hover:bg-ink hover:text-bone dark:hover:bg-bone dark:hover:text-ink',
  ghost: 'text-ink/70 dark:text-bone/70 hover:text-burnt',
  light:
    'bg-bone text-ink hover:bg-white shadow-[0_4px_0_0_rgba(0,0,0,0.45)] active:shadow-[0_1px_0_0_rgba(0,0,0,0.45)] active:translate-y-[3px]',
}

export default function Button({
  as = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const Tag = motion[as] ?? motion.button
  return (
    <Tag
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
