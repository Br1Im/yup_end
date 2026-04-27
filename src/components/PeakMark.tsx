type Props = {
  className?: string;
  size?: number;
};

/**
 * Tiny peak glyph used as a YUP wordmark accent in the header.
 * Lime triangular peak with a subtle glow.
 */
export function PeakMark({ className, size = 16 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
      style={{
        filter: "drop-shadow(0 0 6px rgba(205,255,61,0.7))",
      }}
    >
      <path
        d="M2 13 L8 3 L14 13 Z"
        fill="#cdff3d"
        stroke="#cdff3d"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
