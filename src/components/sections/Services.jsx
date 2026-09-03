import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/site'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { StarMark } from '../ui/StarMark'

function ServiceCard({ service, index }) {
  return (
    <Reveal delay={index * 0.06}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        className="group relative h-full overflow-hidden rounded-sm border-2 border-ink/12 bg-bone p-6 dark:border-bone/12 dark:bg-ink-soft"
      >
        <span className="stitch-inner" />

        {/* Burnt wash sweeps up on hover */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-burnt transition-all duration-300 group-hover:h-full" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3">
            <StarMark className="h-4 w-4 text-burnt transition-colors group-hover:text-bone" />
            <ArrowUpRight className="h-5 w-5 text-ink/25 transition-colors group-hover:text-bone dark:text-bone/25" />
          </div>

          <h3 className="mt-4 font-slab text-xl text-ink transition-colors group-hover:text-bone dark:text-bone">
            {service.title}
          </h3>
          <p className="mt-2.5 font-sans text-sm leading-relaxed text-ink/60 transition-colors group-hover:text-bone/85 dark:text-bone/60">
            {service.blurb}
          </p>

          {/* Spec list reveals with the wash */}
          <ul className="mt-4 space-y-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {service.specs.map((spec) => (
              <li
                key={spec}
                className="flex items-center gap-2 font-sans text-[0.7rem] font-bold uppercase tracking-[0.12em] text-bone/80"
              >
                <span className="h-1 w-1 rounded-full bg-bone/60" />
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </Reveal>
  )
}

export default function Services() {
  return (
    <section id="services" className="grain relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we build"
          title="Six things we do, and do all the way through."
          lede="Design, permitting, fabrication and installation happen under one roof. Nothing gets handed to an out-of-state shop halfway through."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
