import { contactMethodOptions } from '../../data/site'
import { formatPhone, useQuote } from '../../lib/quoteContext'
import { Segmented, TextArea, TextField } from './Field'

export default function StepContact() {
  const { data, setField, errors } = useQuote()

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="q-name"
          label="Full name"
          placeholder="Who are we talking to?"
          autoComplete="name"
          value={data.fullName}
          error={errors.fullName}
          onChange={(e) => setField('fullName', e.target.value)}
        />
        <TextField
          id="q-phone"
          label="Phone"
          type="tel"
          inputMode="tel"
          placeholder="(555) 555-5555"
          autoComplete="tel"
          value={data.phone}
          error={errors.phone}
          onChange={(e) => setField('phone', formatPhone(e.target.value))}
        />
      </div>

      <TextField
        id="q-email"
        label="Email"
        type="email"
        inputMode="email"
        placeholder="you@yourshop.com"
        autoComplete="email"
        value={data.email}
        error={errors.email}
        onChange={(e) => setField('email', e.target.value)}
      />

      <Segmented
        label="Best way to reach you"
        name="preferredContact"
        options={contactMethodOptions}
        value={data.preferredContact}
        onChange={(v) => setField('preferredContact', v)}
      />

      <TextArea
        id="q-notes"
        label="Project notes"
        placeholder="Landlord requirements, a deadline, a photo you want to send over later…"
        value={data.notes}
        onChange={(e) => setField('notes', e.target.value)}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={data.consent}
            onChange={(e) => setField('consent', e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-burnt"
          />
          <span className="font-sans text-xs leading-relaxed text-ink/60 dark:text-bone/60">
            You can contact me about this project. We keep it to the job — no
            mailing list, no resale.
          </span>
        </label>
        {errors.consent && (
          <p className="mt-1.5 font-sans text-xs font-semibold text-burnt">
            {errors.consent}
          </p>
        )}
      </div>
    </div>
  )
}
