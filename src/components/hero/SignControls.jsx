import { neonColors, signFonts } from '../../data/site'
import PowerSwitch from './PowerSwitch'

export default function SignControls({
  text,
  onTextChange,
  color,
  onColorChange,
  fontId,
  onFontChange,
  on,
  onToggle,
}) {
  return (
    <div className="w-full max-w-3xl rounded-lg border border-bone/10 bg-black/35 p-4 backdrop-blur-sm sm:p-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-6">
        {/* Sign text */}
        <div className="min-w-0 flex-1">
          <label
            htmlFor="sign-text"
            className="eyebrow mb-2 block text-bone/45"
          >
            Your sign says
          </label>
          <input
            id="sign-text"
            type="text"
            value={text}
            maxLength={14}
            onChange={(e) => onTextChange(e.target.value.toUpperCase())}
            placeholder="TYPE HERE"
            className="w-full rounded border border-bone/15 bg-black/50 px-3 py-2.5 font-sans text-base font-bold uppercase tracking-wider text-bone placeholder:text-bone/25 focus:border-burnt focus:outline-none"
          />
          <p className="mt-1.5 font-sans text-[0.65rem] text-bone/35">
            {14 - text.length} characters left
          </p>
        </div>

        <PowerSwitch on={on} onToggle={onToggle} />
      </div>

      <div className="mt-5 flex flex-col gap-5 border-t border-bone/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Tube colour */}
        <div>
          <span className="eyebrow mb-2 block text-bone/45">Tube colour</span>
          <div className="flex flex-wrap gap-2">
            {neonColors.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => onColorChange(c.value)}
                aria-label={c.name}
                aria-pressed={color === c.value}
                title={c.name}
                className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                  color === c.value
                    ? 'border-bone scale-110'
                    : 'border-bone/20'
                }`}
                style={{
                  backgroundColor: c.value,
                  boxShadow:
                    color === c.value ? `0 0 14px ${c.value}` : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* Typeface */}
        <div>
          <span className="eyebrow mb-2 block text-bone/45">Typeface</span>
          <div className="inline-flex rounded border border-bone/15 p-0.5">
            {signFonts.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => onFontChange(f.id)}
                aria-pressed={fontId === f.id}
                className={`rounded px-3.5 py-1.5 font-sans text-[0.7rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                  fontId === f.id
                    ? 'bg-burnt text-bone'
                    : 'text-bone/55 hover:text-bone'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
