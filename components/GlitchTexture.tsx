/**
 * SVG vertical-bar "data rain" texture used as an overlay on the hero.
 * Rendered as an inline SVG so it scales crisply and can be recolored with
 * currentColor. Pattern is a repeating column of thin bars at decreasing
 * opacity along the Y axis — evokes a frozen/corrupted data stream.
 */
export function GlitchTexture({ className }: { className?: string }) {
  // Deterministic "randomness" so SSR and CSR match.
  const bars = Array.from({ length: 64 }, (_, i) => {
    const x = i * 8;
    const height = 4 + ((i * 37) % 96);
    const y = (i * 53) % 200;
    const opacity = 0.12 + ((i * 13) % 40) / 200;
    return { x, y, height, opacity, key: i };
  });

  return (
    <svg
      className={className}
      viewBox="0 0 512 400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="glitch-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
        </linearGradient>
        <mask id="glitch-mask">
          <rect width="512" height="400" fill="url(#glitch-fade)" />
        </mask>
      </defs>
      <g mask="url(#glitch-mask)">
        {bars.map((b) => (
          <rect
            key={b.key}
            x={b.x}
            y={b.y}
            width={3}
            height={b.height}
            fill="currentColor"
            opacity={b.opacity}
          />
        ))}
        {bars.map((b) => (
          <rect
            key={`b-${b.key}`}
            x={b.x + 2}
            y={b.y + b.height + 8}
            width={2}
            height={b.height * 0.6}
            fill="currentColor"
            opacity={b.opacity * 0.7}
          />
        ))}
      </g>
    </svg>
  );
}
