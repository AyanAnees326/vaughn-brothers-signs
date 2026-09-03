import { testimonials } from '../../data/site'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { StarMark } from '../ui/StarMark'

export default function Testimonials() {
  return (
    <section className="grain py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Word around town"
          title="What people say after the crane leaves."
          align="center"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="relative h-full rounded-sm border-2 border-ink/12 bg-bone p-6 dark:border-bone/12 dark:bg-ink-soft">
                <span className="stitch-inner" />
                <div className="relative z-10">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <StarMark key={s} className="h-3.5 w-3.5 text-burnt" />
                    ))}
                  </div>
                  <blockquote className="mt-4 font-sans text-sm leading-relaxed text-ink/75 dark:text-bone/75">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-dashed border-ink/20 pt-4 dark:border-bone/20">
                    <span className="block font-slab text-sm text-ink dark:text-bone">
                      {t.name}
                    </span>
                    <span className="mt-0.5 block font-sans text-xs text-ink/50 dark:text-bone/50">
                      {t.role}
                    </span>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
