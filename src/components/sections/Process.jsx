import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { process } from '../../data/site'
import { useReducedMotion } from '../../lib/hooks'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Process() {
  const railRef = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 65%', 'end 60%'],
  })
  const railScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id="process" className="relative bg-ink py-20 text-bone sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How a job runs"
          title="Four steps, and the second one is where most signs die."
          lede="Anyone can bend aluminum. The reason a sign takes four months instead of four weeks is almost always paperwork — so that is the part we run hardest."
          tone="light"
        />

        <div ref={railRef} className="relative mt-14 pl-10 sm:pl-16">
          {/* Progress rail */}
          <div className="absolute bottom-0 left-3 top-2 w-0.5 bg-bone/12 sm:left-6">
            <motion.div
              className="h-full w-full origin-top bg-burnt"
              style={{ scaleY: reduced ? 1 : railScale }}
            />
          </div>

          <div className="space-y-12">
            {process.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05}>
                <div className="relative">
                  {/* Node */}
                  <span className="absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-burnt bg-ink font-sans text-[0.6rem] font-bold text-burnt sm:-left-[3.65rem]">
                    {i + 1}
                  </span>

                  <div className="rounded-sm border-2 border-bone/10 bg-bone/[0.03] p-5 sm:p-7">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-display text-3xl text-burnt">
                        {item.step}
                      </span>
                      <h3 className="font-slab text-2xl">{item.title}</h3>
                    </div>

                    <p className="mt-2 font-script text-lg text-bone/55">
                      {item.lede}
                    </p>
                    <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-bone/70">
                      {item.body}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.meta.map((m) => (
                        <li
                          key={m}
                          className="rounded-sm border border-bone/15 px-2.5 py-1 font-sans text-[0.65rem] font-bold uppercase tracking-[0.12em] text-bone/55"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
