import { AnimatePresence, motion } from 'motion/react'

export function FieldShell({ label, htmlFor, error, hint, children }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="eyebrow text-ink/60 dark:text-bone/60"
        >
          {label}
        </label>
        {hint && (
          <span className="font-sans text-[0.65rem] text-ink/40 dark:text-bone/40">
            {hint}
          </span>
        )}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 font-sans text-xs font-semibold text-burnt"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputBase =
  'w-full rounded-sm border-2 bg-transparent px-3 py-2.5 font-sans text-sm text-ink transition-colors placeholder:text-ink/30 focus:border-burnt focus:outline-none dark:text-bone dark:placeholder:text-bone/30'

export function TextField({ label, id, error, hint, ...rest }) {
  return (
    <FieldShell label={label} htmlFor={id} error={error} hint={hint}>
      <input
        id={id}
        aria-invalid={!!error}
        className={`${inputBase} ${
          error ? 'border-burnt' : 'border-ink/20 dark:border-bone/20'
        }`}
        {...rest}
      />
    </FieldShell>
  )
}

export function TextArea({ label, id, error, hint, ...rest }) {
  return (
    <FieldShell label={label} htmlFor={id} error={error} hint={hint}>
      <textarea
        id={id}
        rows={3}
        aria-invalid={!!error}
        className={`${inputBase} resize-none ${
          error ? 'border-burnt' : 'border-ink/20 dark:border-bone/20'
        }`}
        {...rest}
      />
    </FieldShell>
  )
}

export function SelectField({ label, id, error, options, ...rest }) {
  return (
    <FieldShell label={label} htmlFor={id} error={error}>
      <select
        id={id}
        aria-invalid={!!error}
        className={`${inputBase} appearance-none ${
          error ? 'border-burnt' : 'border-ink/20 dark:border-bone/20'
        }`}
        {...rest}
      >
        <option value="">Choose one…</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

/** Segmented pill row — used for timeline, budget and contact method. */
export function Segmented({ label, options, value, onChange, error, name }) {
  return (
    <FieldShell label={label} error={error}>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.id
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              name={name}
              onClick={() => onChange(o.id)}
              className={`rounded-sm border-2 px-3.5 py-2 font-sans text-xs font-bold uppercase tracking-[0.1em] transition-all ${
                active
                  ? 'border-burnt bg-burnt text-bone'
                  : 'border-ink/15 text-ink/65 hover:border-burnt/60 hover:text-ink dark:border-bone/15 dark:text-bone/65 dark:hover:text-bone'
              }`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </FieldShell>
  )
}

/** Multi-select cards — step one's sign types. */
export function CardSelect({ label, options, values, onToggle, error, hint }) {
  return (
    <FieldShell label={label} error={error} hint={hint}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {options.map((o) => {
          const active = values.includes(o.id)
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(o.id)}
              className={`relative rounded-sm border-2 px-3 py-3 text-left font-sans text-xs font-bold leading-snug transition-all ${
                active
                  ? 'border-burnt bg-burnt/10 text-ink dark:text-bone'
                  : 'border-ink/15 text-ink/60 hover:border-burnt/50 dark:border-bone/15 dark:text-bone/60'
              }`}
            >
              {active && (
                <motion.span
                  layoutId={`card-dot-${o.id}`}
                  className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-burnt"
                />
              )}
              {o.label}
            </button>
          )
        })}
      </div>
    </FieldShell>
  )
}
