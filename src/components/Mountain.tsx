type Props = {
  className?: string;
};

/**
 * Brutalist alpine peak — black silhouette with a neon-lime edge glow,
 * floating in the dark hero. Designed to read as a "summit" object,
 * not a landscape painting.
 */
export function Mountain({ className }: Props) {
  return (
    <svg
      viewBox="0 0 900 900"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden
    >
      <defs>
        {/* Edge glow filter — soft neon halo around the peak */}
        <filter id="m-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Inner face shading */}
        <linearGradient id="m-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1c20" />
          <stop offset="50%" stopColor="#0e0f12" />
          <stop offset="100%" stopColor="#06070a" />
        </linearGradient>

        {/* Lime rim light gradient on snow ridge */}
        <linearGradient id="m-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#cdff3d" stopOpacity="0" />
          <stop offset="40%" stopColor="#cdff3d" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#cdff3d" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#cdff3d" stopOpacity="0" />
        </linearGradient>

        {/* Radial halo behind summit */}
        <radialGradient id="m-halo" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#cdff3d" stopOpacity="0.30" />
          <stop offset="40%" stopColor="#cdff3d" stopOpacity="0.10" />
          <stop offset="80%" stopColor="#cdff3d" stopOpacity="0" />
        </radialGradient>

        {/* Far ridge fill — dimmer */}
        <linearGradient id="m-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16181d" />
          <stop offset="100%" stopColor="#0a0b0e" />
        </linearGradient>
      </defs>

      {/* Soft halo behind the peak */}
      <rect width="900" height="900" fill="url(#m-halo)" />

      {/* Stars / light particles */}
      <g fill="#cdff3d" opacity="0.7">
        <circle cx="120" cy="180" r="1.2" />
        <circle cx="780" cy="140" r="1.1" />
        <circle cx="640" cy="240" r="0.9" />
        <circle cx="220" cy="310" r="0.9" />
        <circle cx="850" cy="380" r="1.0" />
      </g>
      <g fill="#ffffff" opacity="0.45">
        <circle cx="180" cy="120" r="0.8" />
        <circle cx="710" cy="200" r="0.9" />
        <circle cx="430" cy="90" r="0.7" />
        <circle cx="560" cy="160" r="0.6" />
        <circle cx="320" cy="220" r="0.8" />
      </g>

      {/* Far ridge (dim secondary peaks) */}
      <path
        d="M -20 720 L 140 560 L 240 600 L 360 470 L 480 580 L 600 470 L 720 560 L 840 480 L 920 540 L 920 800 L -20 800 Z"
        fill="url(#m-far)"
        opacity="0.85"
      />

      {/* Main peak silhouette — angular, bold */}
      <path
        d="M 90 760 L 350 360 L 410 430 L 470 290 L 540 410 L 600 350 L 700 470 L 820 760 Z"
        fill="url(#m-face)"
        stroke="#0a0b0e"
        strokeWidth="1"
      />

      {/* Lime edge light along upper-left summit ridge */}
      <g filter="url(#m-glow)">
        <path
          d="M 350 360 L 410 430 L 470 290 L 540 410 L 600 350"
          fill="none"
          stroke="url(#m-rim)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>

      {/* Snow facets — angular highlights on summit */}
      <path
        d="M 470 290 L 500 340 L 540 410 L 510 380 L 470 320 Z"
        fill="#e7ffb0"
        opacity="0.18"
      />
      <path
        d="M 410 430 L 440 460 L 470 320 L 470 290 L 380 410 Z"
        fill="#cdff3d"
        opacity="0.10"
      />

      {/* Hairline trail markers — dotted ascent path */}
      <path
        d="M 760 720 C 660 660, 580 580, 540 500 C 510 440, 490 360, 470 290"
        fill="none"
        stroke="#cdff3d"
        strokeWidth="1.4"
        strokeDasharray="2 6"
        opacity="0.65"
      />

      {/* Tiny climber dot near summit */}
      <circle cx="495" cy="350" r="3.2" fill="#cdff3d" />
      <circle
        cx="495"
        cy="350"
        r="6"
        fill="none"
        stroke="#cdff3d"
        strokeWidth="0.8"
        opacity="0.6"
      />
    </svg>
  );
}
