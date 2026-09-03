import { motion } from 'motion/react'
import { budgetOptions, propertyTypeOptions, timelineOptions } from '../../data/site'
import { useQuote } from '../../lib/quoteContext'
import { FieldShell, SelectField, Segmented, TextField } from './Field'

/** Two-state toggle for the permitting question. */
function PermitToggle({ value, onChange }) {
  const options = [
    { id: 'handle', label: 'Handle it for me' },
    { id: 'self', label: "We've got it covered" },
  ]
  return (
    <FieldShell label="Permitting">
      <div className="inline-flex rounded-sm border-2 border-ink/15 p-1 dark:border-bone/15">
        {options.map((o) => {
          const active = value === o.id
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.id)}
              className="relative rounded-sm px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.1em]"
            >
              {active && (
                <motion.span
                  layoutId="permit-pill"
                  className="absolute inset-0 rounded-sm bg-burnt"
                  transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  active ? 'text-bone' : 'text-ink/60 dark:text-bone/60'
                }`}
              >
                {o.label}
              </span>
            </button>
          )
        })}
      </div>
      <p className="mt-2 font-sans text-xs leading-relaxed text-ink/45 dark:text-bone/45">
        City of Houston filing, deed-restriction review and sealed wind-load
        engineering. Most jobs need all three.
      </p>
    </FieldShell>
  )
}

export default function StepSite() {
  const { data, setField, errors } = useQuote()

  return (
    <div className="space-y-5">
      <TextField
        id="q-business"
        label="Business name"
        placeholder="The name going on the sign"
        hint={data.businessName ? 'Carried over from your sign' : undefined}
        value={data.businessName}
        error={errors.businessName}
        onChange={(e) => setField('businessName', e.target.value)}
      />

      <TextField
        id="q-location"
        label="Install address or ZIP"
        placeholder="1234 Example Street, or just 00000"
        value={data.location}
        error={errors.location}
        onChange={(e) => setField('location', e.target.value)}
      />

      <SelectField
        id="q-property"
        label="Property type"
        options={propertyTypeOptions}
        value={data.propertyType}
        error={errors.propertyType}
        onChange={(e) => setField('propertyType', e.target.value)}
      />

      <PermitToggle
        value={data.permitting}
        onChange={(v) => setField('permitting', v)}
      />

      <Segmented
        label="Timeline"
        name="timeline"
        options={timelineOptions}
        value={data.timeline}
        onChange={(v) => setField('timeline', v)}
        error={errors.timeline}
      />

      <Segmented
        label="Budget range"
        name="budget"
        options={budgetOptions}
        value={data.budget}
        onChange={(v) => setField('budget', v)}
      />
    </div>
  )
}
