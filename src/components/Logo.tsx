type LogoProps = {
  size?: number;
  /** ring color, defaults to paper/white for dark backgrounds */
  ring?: string;
  className?: string;
  /** add the soft glow around the core */
  glow?: boolean;
};

/**
 * The Margin "aperture mark": an open ring (gap at top-left) with a single
 * glowing gold core. Ring inverts by background; the gold core is constant.
 */
export function Logo({
  size = 40,
  ring = "#f7f6f3",
  className,
  glow = true,
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="margin-core" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FFD879" />
          <stop offset="100%" stopColor="#FFC233" />
        </radialGradient>
        {glow && (
          <filter id="margin-core-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>
      <path
        d="M 46.53 75.07 A 59.0 59.0 0 1 0 75.07 46.53"
        fill="none"
        stroke={ring}
        strokeWidth={17}
        strokeLinecap="round"
      />
      <circle
        cx={100}
        cy={100}
        r={18}
        fill="url(#margin-core)"
        filter={glow ? "url(#margin-core-glow)" : undefined}
      />
    </svg>
  );
}

/** Logo + lowercase wordmark lockup. */
export function Wordmark({
  size = 30,
  ring = "#f7f6f3",
  className,
}: {
  size?: number;
  ring?: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <Logo size={size} ring={ring} glow />
      <span
        className="font-sans font-medium tracking-[-0.04em] text-paper"
        style={{ fontSize: size * 0.74 }}
      >
        margin
      </span>
    </span>
  );
}
