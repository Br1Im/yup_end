type Props = {
  className?: string;
};

/**
 * Monumental, photographic-feeling alpine silhouette — three layered ridges
 * with a dawn glow on the summit. No voxel/cute details. Designed to read
 * serious and ambitious behind a dark hero.
 */
export function Mountain({ className }: Props) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="m-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c0d12" />
          <stop offset="55%" stopColor="#1a1820" />
          <stop offset="80%" stopColor="#5a3a2c" />
          <stop offset="92%" stopColor="#c7855e" />
          <stop offset="100%" stopColor="#e7b783" />
        </linearGradient>

        {/* Dawn halo behind the summit */}
        <radialGradient id="m-halo" cx="50%" cy="62%" r="55%">
          <stop offset="0%" stopColor="#f1c08a" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#d68e58" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#3a2424" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#0c0d12" stopOpacity="0.0" />
        </radialGradient>

        {/* Far ridge — atmospheric, lightest */}
        <linearGradient id="m-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c6b5e" />
          <stop offset="100%" stopColor="#3a3536" />
        </linearGradient>
        {/* Mid ridge */}
        <linearGradient id="m-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3c43" />
          <stop offset="100%" stopColor="#1c1d23" />
        </linearGradient>
        {/* Near ridge — almost black */}
        <linearGradient id="m-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15161b" />
          <stop offset="100%" stopColor="#0a0b0e" />
        </linearGradient>

        {/* Soft snow rim on the summit */}
        <linearGradient id="m-snow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4d8b3" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#9c7a55" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1600" height="900" fill="url(#m-sky)" />
      {/* Halo — sun about to crest */}
      <rect width="1600" height="900" fill="url(#m-halo)" />

      {/* A faint sun disk just behind the summit */}
      <circle cx="860" cy="500" r="42" fill="#f4cf95" opacity="0.55" />
      <circle cx="860" cy="500" r="22" fill="#fce4be" opacity="0.85" />

      {/* Quiet star dots in the upper sky */}
      <g fill="#e7d3b0" opacity="0.35">
        <circle cx="180" cy="80" r="0.9" />
        <circle cx="320" cy="40" r="1.1" />
        <circle cx="540" cy="110" r="0.8" />
        <circle cx="900" cy="60" r="0.9" />
        <circle cx="1180" cy="120" r="1.1" />
        <circle cx="1380" cy="70" r="0.8" />
        <circle cx="1500" cy="180" r="0.9" />
      </g>

      {/* Far ridge (left and right wings) */}
      <path
        d="M0 600
           C 120 560, 220 540, 320 555
           C 420 570, 500 520, 600 540
           C 700 560, 760 510, 860 470
           C 960 510, 1020 560, 1120 540
           C 1220 520, 1320 560, 1440 545
           C 1520 535, 1580 555, 1600 560
           L 1600 900 L 0 900 Z"
        fill="url(#m-far)"
        opacity="0.9"
      />

      {/* Mid ridge — broader silhouette around the central summit */}
      <path
        d="M0 720
           L 80 690
           C 220 660, 320 660, 420 700
           C 500 730, 580 690, 640 640
           C 720 580, 780 540, 860 480
           C 940 540, 1000 600, 1080 640
           C 1160 670, 1240 660, 1340 690
           C 1440 715, 1540 700, 1600 720
           L 1600 900 L 0 900 Z"
        fill="url(#m-mid)"
      />

      {/* Subtle snow rim along the central summit */}
      <path
        d="M740 580
           C 780 540, 820 510, 860 480
           C 900 510, 940 540, 980 580
           C 940 570, 900 565, 860 562
           C 820 565, 780 570, 740 580 Z"
        fill="url(#m-snow)"
      />

      {/* Near ridge — the closest, blackest mass with a sharper peak silhouette */}
      <path
        d="M0 820
           L 60 800
           C 180 770, 280 780, 360 815
           C 440 845, 520 800, 600 750
           C 680 700, 760 660, 820 600
           L 860 565
           L 900 600
           C 960 660, 1040 700, 1120 740
           C 1200 775, 1300 760, 1380 790
           C 1460 815, 1540 805, 1600 815
           L 1600 900 L 0 900 Z"
        fill="url(#m-near)"
      />

      {/* Hairline summit guideline — minimal "marker" for the goal */}
      <g opacity="0.85">
        <line
          x1="860"
          y1="565"
          x2="860"
          y2="490"
          stroke="#d6603d"
          strokeWidth="1.2"
          strokeDasharray="2 4"
        />
        <circle cx="860" cy="488" r="3" fill="#d6603d" />
      </g>

      {/* Scattered light particles drifting up — atmosphere/snow blown by wind */}
      <g fill="#f3d4a4" opacity="0.45">
        <circle cx="240" cy="650" r="1.1" />
        <circle cx="360" cy="700" r="1.1" />
        <circle cx="500" cy="630" r="0.9" />
        <circle cx="640" cy="660" r="1.1" />
        <circle cx="1080" cy="630" r="1" />
        <circle cx="1240" cy="690" r="1.1" />
        <circle cx="1380" cy="640" r="0.9" />
      </g>
    </svg>
  );
}
