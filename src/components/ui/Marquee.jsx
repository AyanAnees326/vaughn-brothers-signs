import { useReducedMotion } from '../../lib/hooks'

/**
 * Infinite marquee at a constant speed.
 *
 * The two copies each get their own wrapper so React keys stay scoped per
 * container — rendering `children` twice as bare siblings collides the keys,
 * which remounts the nodes and restarts the animation mid-cycle. The animation
 * lives on the flex parent, so with each copy exactly half the track the
 * `-50%` keyframe lands precisely on the loop point.
 */
export default function Marquee({
  children,
  speed = 34,
  reverse = false,
  className = '',
}) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className={`flex w-full overflow-hidden ${className}`}>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    )
  }

  return (
    <div className={`flex w-full overflow-hidden ${className}`}>
      <div
        className="flex items-center"
        style={{
          width: 'max-content',
          animation: `marquee-scroll ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
