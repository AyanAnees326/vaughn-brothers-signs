import { useRef } from 'react'
import { useInView } from 'motion/react'
import { stats } from '../../data/site'
import { useCountUp } from '../../lib/useCountUp'
import Reveal from '../ui/Reveal'

function Stat({ stat, active }) {
  const value = useCountUp(stat.value, active)
  const display = Math.round(value).toLocaleString('en-US')

  return (
    <div className="border-l-2 border-burnt pl-4 sm:pl-5">
      <p className="font-display text-3xl leading-none text-ink dark:text-bone sm:text-5xl">
        {display}
        <span className="text-burnt">{stat.suffix}</span>
      </p>
      <p className="mt-2 font-sans text-xs font-semibold uppercase leading-snug tracking-[0.12em] text-ink/50 dark:text-bone/50">
        {stat.label}
      </p>
    </div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section ref={ref} className="border-y-2 border-ink/10 py-14 dark:border-bone/10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <Stat stat={stat} active={inView} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
