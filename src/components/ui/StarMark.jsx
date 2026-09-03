/** Lone star — used as a bullet, section mark and inside the VB monogram. */
export function StarMark({ className = 'h-4 w-4', style }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M12 1.6l2.9 6.05 6.6.9-4.8 4.6 1.16 6.6L12 16.6 6.14 19.75 7.3 13.15 2.5 8.55l6.6-.9z" />
    </svg>
  )
}

/** The VB branding-iron monogram: nav mark, footer, job-ticket stamp. */
export function BrandMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="9" className="fill-ink dark:fill-bone" />
      <rect
        x="6"
        y="6"
        width="52"
        height="52"
        rx="6"
        fill="none"
        strokeWidth="2.5"
        className="stroke-burnt"
      />
      <text
        x="17"
        y="43"
        textAnchor="middle"
        className="fill-bone dark:fill-ink"
        style={{ fontFamily: "'Alfa Slab One', serif", fontSize: 26 }}
      >
        V
      </text>
      <text
        x="47"
        y="43"
        textAnchor="middle"
        className="fill-bone dark:fill-ink"
        style={{ fontFamily: "'Alfa Slab One', serif", fontSize: 26 }}
      >
        B
      </text>
      <path
        d="M32 22.5l1.9 3.9 4.3.6-3.1 3 .7 4.3-3.8-2-3.8 2 .7-4.3-3.1-3 4.3-.6z"
        className="fill-burnt"
      />
    </svg>
  )
}
