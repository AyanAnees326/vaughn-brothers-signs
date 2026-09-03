import Reveal from './Reveal'
import { StarMark } from './StarMark'

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  tone = 'dark',
  className = '',
}) {
  const isCenter = align === 'center'
  const muted = tone === 'light' ? 'text-bone/65' : 'text-ink/65 dark:text-bone/65'
  const strong = tone === 'light' ? 'text-bone' : 'text-ink dark:text-bone'

  return (
    <div
      className={`${isCenter ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <div
            className={`eyebrow flex items-center gap-2 text-burnt ${
              isCenter ? 'justify-center' : ''
            }`}
          >
            <StarMark className="h-3 w-3" />
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className={`display-lg mt-3 ${strong}`}>{title}</h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.12}>
          <p className={`mt-4 text-base leading-relaxed text-balance sm:text-lg ${muted}`}>
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  )
}
