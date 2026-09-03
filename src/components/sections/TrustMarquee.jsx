import { trustNames } from '../../data/site'
import Marquee from '../ui/Marquee'
import { StarMark } from '../ui/StarMark'

export default function TrustMarquee() {
  return (
    <section className="border-y border-ink/10 bg-ink py-6 dark:border-bone/10">
      <p className="mb-4 text-center font-sans text-[0.65rem] uppercase tracking-[0.25em] text-bone/35">
        Seen all over the Gulf Coast
      </p>
      <Marquee speed={42}>
        {trustNames.map((name, i) => (
          <span key={`${name}-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-7 font-display text-lg text-bone/55 sm:text-2xl">
              {name}
            </span>
            <StarMark className="h-3 w-3 shrink-0 text-burnt" />
          </span>
        ))}
      </Marquee>
    </section>
  )
}
