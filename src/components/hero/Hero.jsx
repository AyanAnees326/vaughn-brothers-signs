import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { company, neonColors, signFonts } from '../../data/site'
import { useQuote } from '../../lib/quoteContext'
import { useReducedMotion } from '../../lib/hooks'
import QuoteTrigger from '../quote/QuoteTrigger'
import NeonSign from './NeonSign'
import SignControls from './SignControls'

export default function Hero() {
  const { signText, setSignText } = useQuote()
  const [color, setColor] = useState(neonColors[0].value)
  const [fontId, setFontId] = useState('block')
  const [on, setOn] = useState(true)
  const [flickerKey, setFlickerKey] = useState(0)

  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const signY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -70])
  const signOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0.15])

  const fontCss =
    signFonts.find((f) => f.id === fontId)?.css ?? signFonts[0].css
  const isEasterEgg = signText.trim().toUpperCase() === 'SRV'

  const handleToggle = () => {
    setOn((prev) => {
      if (!prev) setFlickerKey((k) => k + 1)
      return !prev
    })
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="brickwall relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6"
    >
      {/* Vignette so the neon reads as the brightest thing on screen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_25%,rgba(0,0,0,0.75)_100%)]"
      />

      <div className="relative z-10 flex w-full flex-col items-center gap-8">
        <div className="max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow text-burnt-lit"
          >
            {company.city} · Est. {company.since}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="display-xl mt-4 text-bone"
          >
            Signs Built
            <br />
            To Be Seen
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 max-w-lg text-balance text-base text-bone/60 sm:text-lg"
          >
            {company.tagline} Fabrication, permitting and installation, all under
            one roof.
          </motion.p>
        </div>

        <motion.div
          style={{ y: signY, opacity: signOpacity }}
          className="flex w-full flex-col items-center gap-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-script text-lg text-burnt-lit sm:text-xl"
          >
            go on — put your name up in lights
          </motion.p>

          <NeonSign
            text={signText}
            color={color}
            fontCss={fontCss}
            on={on}
            isEasterEgg={isEasterEgg}
            flickerKey={flickerKey}
          >
            <QuoteTrigger id="quote-sign" variant="light" size="lg">
              Get a Quote
            </QuoteTrigger>
          </NeonSign>

          <SignControls
            text={signText}
            onTextChange={setSignText}
            color={color}
            onColorChange={setColor}
            fontId={fontId}
            onFontChange={setFontId}
            on={on}
            onToggle={handleToggle}
          />
        </motion.div>
      </div>

      <motion.a
        href="#work"
        aria-label="Scroll to our work"
        className="relative z-10 mt-12 text-bone/35 transition-colors hover:text-bone"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-7 w-7" />
      </motion.a>
    </section>
  )
}
