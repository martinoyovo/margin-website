/**
 * Ecosystem diagram: Margin at the center, with living "vein/circuit" lines
 * carrying energy to and from the three Apple apps it works across. Pure SVG —
 * a faint base trace, an animated flowing dash, and pulse dots that travel from
 * each app into Margin (it reads them) and back out (it acts on them).
 *
 * Animations are CSS keyframes (vein-flow, vein-glow) + SMIL animateMotion,
 * all disabled under prefers-reduced-motion (see globals.css).
 */

const CENTER = { x: 300, y: 188 };

const APPS = [
  {
    label: "Apple Notes",
    icon: "/brand/apps/notes.png",
    x: 300,
    y: 46,
    // path runs app -> center, so pulses travel inward by default
    path: "M 300 46 Q 336 122 300 188",
  },
  {
    label: "Reminders",
    icon: "/brand/apps/reminders.png",
    x: 86,
    y: 322,
    path: "M 86 322 Q 196 252 300 188",
  },
  {
    label: "Calendar",
    icon: "/brand/apps/calendar.png",
    x: 514,
    y: 322,
    path: "M 514 322 Q 404 252 300 188",
  },
];

export function EcosystemDiagram() {
  return (
    <svg
      viewBox="0 0 600 392"
      className="mx-auto h-auto w-full max-w-2xl"
      role="img"
      aria-label="Margin connects to Apple Notes, Reminders, and Calendar"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="vein-center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,194,51,0.45)" />
          <stop offset="60%" stopColor="rgba(255,194,51,0.12)" />
          <stop offset="100%" stopColor="rgba(255,194,51,0)" />
        </radialGradient>
        <filter id="vein-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* connectors */}
      {APPS.map((a, i) => (
        <g key={a.label}>
          {/* faint base trace */}
          <path
            d={a.path}
            fill="none"
            stroke="rgba(255,194,51,0.18)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          {/* animated flowing dash (the "circuit" current) */}
          <path
            d={a.path}
            fill="none"
            stroke="rgba(255,194,51,0.55)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="3 11"
            className="vein-flow"
            style={{ animationDelay: `${i * -0.45}s` }}
          />
          {/* pulse dots travelling app -> Margin */}
          <circle r={3} fill="#FFD879" filter="url(#vein-soft)" className="vein-pulse">
            <animateMotion dur="2.8s" repeatCount="indefinite" begin={`${i * 0.6}s`} path={a.path} />
          </circle>
          <circle r={2.2} fill="#FFC233" className="vein-pulse">
            <animateMotion dur="2.8s" repeatCount="indefinite" begin={`${i * 0.6 + 1.4}s`} path={a.path} />
          </circle>
        </g>
      ))}

      {/* app nodes */}
      {APPS.map((a) => (
        <g key={a.label}>
          <rect
            x={a.x - 33}
            y={a.y - 33}
            width={66}
            height={66}
            rx={17}
            fill="var(--color-surface)"
            stroke="var(--color-line)"
          />
          <image href={a.icon} x={a.x - 25} y={a.y - 25} width={50} height={50} />
          <text
            x={a.x}
            y={a.y + 52}
            textAnchor="middle"
            fontSize={14.5}
            fill="var(--color-muted)"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {a.label}
          </text>
        </g>
      ))}

      {/* Margin core */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={62}
        fill="url(#vein-center-glow)"
        className="vein-glow"
      />
      <image
        href="/brand/icon_256x256.png"
        x={CENTER.x - 42}
        y={CENTER.y - 42}
        width={84}
        height={84}
      />
      <text
        x={CENTER.x}
        y={CENTER.y + 64}
        textAnchor="middle"
        fontSize={15}
        fontWeight={600}
        fill="var(--color-paper)"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Margin
      </text>
    </svg>
  );
}
