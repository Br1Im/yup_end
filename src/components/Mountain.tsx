type Props = {
  className?: string;
};

/**
 * Minimal alpine peak — single triangular silhouette with a lime ridge stroke
 * and a subtle halo. No clutter, no ornaments. Just a summit.
 */
export function Mountain({ className }: Props) {
  return (
    <svg
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="m-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15161b" />
          <stop offset="100%" stopColor="#06070a" />
        </linearGradient>
        <radialGradient id="m-halo" cx="50%" cy="42%" r="42%">
          <stop offset="0%" stopColor="#cdff3d" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#cdff3d" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#cdff3d" stopOpacity="0" />
        </radialGradient>
        <filter id="m-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* halo */}
      <rect width="600" height="600" fill="url(#m-halo)" />

      {/* horizon line */}
      <line
        x1="80"
        y1="430"
        x2="520"
        y2="430"
        stroke="#cdff3d"
        strokeOpacity="0.18"
        strokeWidth="1"
      />

      {/* peak silhouette — single triangle */}
      <polygon
        points="300,170 510,430 90,430"
        fill="url(#m-fill)"
        stroke="#0a0b0e"
        strokeWidth="1"
      />

      {/* lime left ridge — the only accent */}
      <line
        x1="300"
        y1="170"
        x2="90"
        y2="430"
        stroke="#cdff3d"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#m-soft)"
      />
      <line
        x1="300"
        y1="170"
        x2="90"
        y2="430"
        stroke="#cdff3d"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* summit dot */}
      <circle cx="300" cy="170" r="3.5" fill="#cdff3d" />
      <circle
        cx="300"
        cy="170"
        r="9"
        fill="none"
        stroke="#cdff3d"
        strokeWidth="1"
        strokeOpacity="0.45"
      />
    </svg>
  );
}
