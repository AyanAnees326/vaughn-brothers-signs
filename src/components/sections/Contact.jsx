import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { company } from '../../data/site'
import Reveal from '../ui/Reveal'
import RopeDivider from '../ui/RopeDivider'
import QuoteTrigger from '../quote/QuoteTrigger'
import { StarMark } from '../ui/StarMark'

const details = [
  { Icon: Phone, label: 'Shop line', value: company.phone, href: `tel:${company.phone.replace(/\D/g, '')}` },
  { Icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
  { Icon: MapPin, label: 'The shop', value: company.address },
  { Icon: Clock, label: 'Hours', value: company.hours },
]

export default function Contact() {
  return (
    <section id="contact" className="woodgrain relative bg-ink py-20 text-bone sm:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <Reveal>
          <div className="eyebrow flex items-center justify-center gap-2 text-burnt-lit">
            <StarMark className="h-3 w-3" />
            Ready when you are
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="display-xl mt-4 text-bone">
            Let&apos;s get you
            <br />
            up in lights.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-xl text-balance font-sans text-base text-bone/60 sm:text-lg">
            Tell us what you are building and where it is going. We will come
            measure the building, check what the city will allow, and put a real
            number in front of you.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-9 flex justify-center">
            <QuoteTrigger id="quote-contact" variant="primary" size="lg">
              Start your job ticket
            </QuoteTrigger>
          </div>
        </Reveal>

        <RopeDivider tone="light" className="my-12 opacity-40" />

        <div className="grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-4">
          {details.map(({ Icon, label, value, href }, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <div>
                <div className="flex items-center gap-2 text-burnt-lit">
                  <Icon className="h-4 w-4" />
                  <span className="eyebrow">{label}</span>
                </div>
                {href ? (
                  <a
                    href={href}
                    className="mt-2 block font-slab text-base leading-snug text-bone transition-colors hover:text-burnt-lit"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-2 font-slab text-base leading-snug text-bone">
                    {value}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
