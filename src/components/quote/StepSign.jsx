import { illuminationOptions, signTypeOptions } from '../../data/site'
import { useQuote } from '../../lib/quoteContext'
import { CardSelect, FieldShell, Segmented } from './Field'

const MAX_W = 150
const MAX_H = 80
const PERSON_FT = 6

/**
 * Scale drawing measured in feet. The viewBox is sized in the same units as
 * the sign, so the browser handles the fitting and the proportions stay honest
 * at every size — the 6 ft figure correctly shrinks to a sliver beside an
 * 80 ft pylon, which is the whole point of the drawing.
 */
function ScaleDrawing({ widthFt, heightFt }) {
  const padX = Math.max(3, widthFt * 0.08)
  const gap = Math.max(1.5, widthFt * 0.04)
  const personW = Math.max(1.4, PERSON_FT * 0.32)

  const contentW = personW + gap + widthFt
  const vbW = contentW + padX * 2
  const vbH = Math.max(heightFt, PERSON_FT) * 1.16 + 2
  const groundY = vbH - 1

  const personX = padX
  const signX = padX + personW + gap
  // Strokes are in viewBox units, so scale them with the drawing.
  const stroke = Math.max(vbW, vbH) * 0.006

  return (
    <div className="relative mt-3 h-36 w-full overflow-hidden rounded-sm border-2 border-ink/15 bg-ink/[0.03] px-2 pb-5 pt-2 dark:border-bone/15 dark:bg-bone/[0.03]">
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        preserveAspectRatio="xMidYMax meet"
        className="h-full w-full overflow-visible"
        aria-label={`Scale drawing: a ${widthFt} by ${heightFt} foot sign beside a 6 foot person`}
      >
        {/* Ground */}
        <line
          x1="0"
          y1={groundY}
          x2={vbW}
          y2={groundY}
          className="stroke-ink/30 dark:stroke-bone/30"
          strokeWidth={stroke}
        />

        {/* 6 ft figure */}
        <rect
          x={personX}
          y={groundY - PERSON_FT}
          width={personW}
          height={PERSON_FT}
          rx={personW / 2}
          className="fill-ink/35 dark:fill-bone/35"
        />

        {/* The sign */}
        <rect
          x={signX}
          y={groundY - heightFt}
          width={widthFt}
          height={heightFt}
          className="fill-burnt/20 stroke-burnt"
          strokeWidth={stroke * 2}
        />
      </svg>

      {/* Labels sit outside the SVG so they don't scale with the viewBox. */}
      <span className="absolute right-2 top-2 rounded-sm bg-burnt px-1.5 py-0.5 font-sans text-[0.65rem] font-bold text-bone">
        {widthFt}′ × {heightFt}′
      </span>
      <span className="absolute bottom-1.5 left-2 font-sans text-[0.6rem] text-ink/40 dark:text-bone/40">
        6 ft person for scale
      </span>
    </div>
  )
}

/** Slider for feel, number input for precision — the range is too wide for one. */
function Slider({ id, label, value, min, max, onChange }) {
  const clamp = (n) => Math.min(max, Math.max(min, n))

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="font-sans text-xs font-bold text-ink/60 dark:text-bone/60"
        >
          {label}
        </label>
        <div className="flex items-baseline gap-1">
          <input
            type="number"
            aria-label={`${label} in feet`}
            min={min}
            max={max}
            value={value}
            onChange={(e) => {
              const n = Number(e.target.value)
              if (!Number.isNaN(n)) onChange(clamp(n))
            }}
            className="w-14 rounded-sm border border-ink/20 bg-transparent px-1.5 py-0.5 text-right font-slab text-sm text-burnt focus:border-burnt focus:outline-none dark:border-bone/20"
          />
          <span className="font-slab text-sm text-burnt">ft</span>
        </div>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink/15 accent-burnt dark:bg-bone/15"
      />
    </div>
  )
}

export default function StepSign() {
  const { data, setField, toggleSignType, errors } = useQuote()

  return (
    <div className="space-y-6">
      <CardSelect
        label="What are we building?"
        hint="Pick all that apply"
        options={signTypeOptions}
        values={data.signTypes}
        onToggle={toggleSignType}
        error={errors.signTypes}
      />

      <Segmented
        label="Illumination"
        name="illumination"
        options={illuminationOptions}
        value={data.illumination}
        onChange={(v) => setField('illumination', v)}
        error={errors.illumination}
      />

      <FieldShell label="Approximate size" hint="Rough is fine — drag or type">
        <div className="grid gap-4 sm:grid-cols-2">
          <Slider
            id="q-width"
            label="Width"
            value={data.widthFt}
            min={1}
            max={MAX_W}
            onChange={(v) => setField('widthFt', v)}
          />
          <Slider
            id="q-height"
            label="Height"
            value={data.heightFt}
            min={1}
            max={MAX_H}
            onChange={(v) => setField('heightFt', v)}
          />
        </div>
        <ScaleDrawing widthFt={data.widthFt} heightFt={data.heightFt} />
      </FieldShell>
    </div>
  )
}
