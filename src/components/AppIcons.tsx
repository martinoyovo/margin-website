/**
 * SparkleGlyph stands in for "Apple Intelligence" in the comparison header.
 * It's an original mark, not Apple's artwork. The real Notes / Reminders /
 * Calendar app icons live in /public/brand/apps and are shown as images.
 */

type GlyphProps = { size?: number; className?: string };

export function SparkleGlyph({ size = 22, className }: GlyphProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2c.7 5.6 1.6 6.8 7.5 10C13.6 15.2 12.7 16.4 12 22c-.7-5.6-1.6-6.8-7.5-10C10.4 8.8 11.3 7.6 12 2Z" />
    </svg>
  );
}
