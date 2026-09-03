import { motion } from 'motion/react'
import {
  budgetOptions,
  company,
  contactMethodOptions,
  illuminationOptions,
  propertyTypeOptions,
  signTypeOptions,
  timelineOptions,
} from '../../data/site'
import { useQuote } from '../../lib/quoteContext'
import { BrandMark } from '../ui/StarMark'
import Button from '../ui/Button'

const labelOf = (options, id) => options.find((o) => o.id === id)?.label ?? '—'

function Row({ term, children }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-ink/20 py-2 dark:border-bone/20">
      <dt className="shrink-0 font-sans text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink/45 dark:text-bone/45">
        {term}
      </dt>
      <dd className="text-right font-sans text-sm font-semibold text-ink dark:text-bone">
        {children}
      </dd>
    </div>
  )
}

export default function JobTicket() {
  const { data, ticket, close, reset } = useQuote()

  const types =
    data.signTypes.map((id) => labelOf(signTypeOptions, id)).join(', ') || '—'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.9, 0.25, 1] }}
      className="relative"
    >
      {/* Perforated top edge, so it reads as a torn-off shop ticket */}
      <div
        aria-hidden="true"
        className="h-3 w-full bg-[radial-gradient(circle_at_6px_0,transparent_5px,currentColor_5px)] bg-[length:12px_12px] text-ink/10 dark:text-bone/10"
      />

      <div className="relative overflow-hidden px-1 pb-2 pt-4">
        {/* RECEIVED stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 2.4, rotate: -26 }}
          animate={{ opacity: 1, scale: 1, rotate: -13 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 14 }}
          className="pointer-events-none absolute right-2 top-8 z-10 select-none rounded-sm border-[3px] border-burnt px-3 py-1 sm:right-6"
        >
          <span className="font-slab text-lg tracking-[0.14em] text-burnt sm:text-2xl">
            RECEIVED
          </span>
        </motion.div>

        <div className="flex items-center gap-3">
          <BrandMark className="h-10 w-10 shrink-0" />
          <div>
            <p className="font-slab text-base leading-tight text-ink dark:text-bone">
              {company.legal}
            </p>
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.16em] text-ink/45 dark:text-bone/45">
              Job Ticket
            </p>
          </div>
        </div>

        <p className="mt-5 font-slab text-3xl text-burnt sm:text-4xl">{ticket}</p>
        <p className="mt-1 font-sans text-sm text-ink/60 dark:text-bone/60">
          Thanks, {data.fullName.split(' ')[0] || 'friend'}. One of us will get
          back to you by {data.preferredContact === 'email' ? 'email' : 'phone'}{' '}
          inside one business day.
        </p>

        <dl className="mt-6">
          <Row term="Sign type">{types}</Row>
          <Row term="Illumination">
            {labelOf(illuminationOptions, data.illumination)}
          </Row>
          <Row term="Size">
            {data.widthFt}′ × {data.heightFt}′
          </Row>
          <Row term="Business">{data.businessName || '—'}</Row>
          <Row term="Location">{data.location || '—'}</Row>
          <Row term="Property">
            {labelOf(propertyTypeOptions, data.propertyType)}
          </Row>
          <Row term="Permitting">
            {data.permitting === 'handle' ? 'We handle it' : 'Client handles it'}
          </Row>
          <Row term="Timeline">{labelOf(timelineOptions, data.timeline)}</Row>
          <Row term="Budget">
            {data.budget ? labelOf(budgetOptions, data.budget) : 'Not specified'}
          </Row>
          <Row term="Contact">
            {data.phone} · {labelOf(contactMethodOptions, data.preferredContact)}
          </Row>
        </dl>

        <p className="mt-4 font-sans text-[0.65rem] leading-relaxed text-ink/40 dark:text-bone/40">
          This is a front-end mockup — nothing was actually submitted anywhere.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="primary" size="md" onClick={close}>
            Done
          </Button>
          <Button variant="outline" size="md" onClick={reset}>
            Start another
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
