/**
 * Lariat rope rule between bands. The dash pattern reads as twisted cord; the
 * two offset strands give it depth without an image.
 */
export default function RopeDivider({ className = '', tone = 'dark' }) {
  const stroke = tone === 'light' ? 'rgba(245,241,232,0.5)' : 'rgba(169,118,47,0.75)'
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 12" preserveAspectRatio="none" className="h-3 w-full">
        <path
          d="M0 6 H1200"
          fill="none"
          stroke={stroke}
          strokeWidth="3"
          strokeDasharray="9 7"
          strokeLinecap="round"
        />
        <path
          d="M0 6 H1200"
          fill="none"
          stroke={stroke}
          strokeWidth="3"
          strokeDasharray="9 7"
          strokeDashoffset="8"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
    </div>
  )
}
