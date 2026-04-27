type Props = {
  className?: string;
};

/**
 * Layered "voxel summer valley" — gentle nod to the Minecraft mountain image
 * the user referenced. Built with chunky stepped silhouettes so the shapes
 * read both as a real landscape and as a soft voxel world.
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
          <stop offset="0%" stopColor="#cde0ee" />
          <stop offset="55%" stopColor="#e6d4b8" />
          <stop offset="100%" stopColor="#f5efe3" />
        </linearGradient>
        <linearGradient id="m-snow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbfaf6" />
          <stop offset="100%" stopColor="#cfc5b1" />
        </linearGradient>
        <linearGradient id="m-rock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b3a99a" />
          <stop offset="100%" stopColor="#857c6f" />
        </linearGradient>
        <linearGradient id="m-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9bbf7a" />
          <stop offset="100%" stopColor="#5d7d52" />
        </linearGradient>
        <linearGradient id="m-hill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bcd07f" />
          <stop offset="100%" stopColor="#7a9c6b" />
        </linearGradient>
        <linearGradient id="m-meadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c2d68a" />
          <stop offset="100%" stopColor="#9bbf6c" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1600" height="900" fill="url(#m-sky)" />

      {/* Soft sun */}
      <circle cx="1180" cy="220" r="110" fill="#f3d6a8" opacity="0.5" />
      <circle cx="1180" cy="220" r="70" fill="#f1c98a" opacity="0.7" />

      {/* Cloud strokes */}
      <g fill="#fbfaf6" opacity="0.55">
        <ellipse cx="320" cy="180" rx="120" ry="9" />
        <ellipse cx="430" cy="220" rx="80" ry="6" />
        <ellipse cx="900" cy="140" rx="160" ry="8" />
        <ellipse cx="1380" cy="320" rx="90" ry="7" />
      </g>

      {/* Far distant range — soft */}
      <path
        d="M0 540
           L120 460 L260 500 L380 380 L520 470
           L660 420 L820 360 L960 440 L1100 380
           L1260 460 L1420 400 L1600 460
           L1600 900 L0 900 Z"
        fill="url(#m-snow)"
        opacity="0.85"
      />

      {/* Mid voxel-stepped peaks (chunky stair silhouette) */}
      <g fill="url(#m-rock)" opacity="0.78">
        {/* Left peak */}
        <path d="M120 600
                 L160 600 L160 560 L200 560 L200 520 L240 520 L240 480
                 L280 480 L280 440 L320 440 L320 400 L360 400 L360 440
                 L400 440 L400 480 L440 480 L440 520 L480 520 L480 560
                 L520 560 L520 600 L560 600 L560 700 L120 700 Z" />
        {/* Center main peak */}
        <path d="M540 700
                 L540 600 L580 600 L580 560 L620 560 L620 520 L660 520
                 L660 480 L700 480 L700 440 L740 440 L740 400 L780 400
                 L780 360 L820 360 L820 320 L860 320 L860 280 L900 280
                 L900 320 L940 320 L940 360 L980 360 L980 400 L1020 400
                 L1020 440 L1060 440 L1060 480 L1100 480 L1100 520
                 L1140 520 L1140 560 L1180 560 L1180 600 L1220 600
                 L1220 700 Z" />
        {/* Right peak */}
        <path d="M1180 700
                 L1180 600 L1220 600 L1220 560 L1260 560 L1260 520
                 L1300 520 L1300 480 L1340 480 L1340 440 L1380 440
                 L1380 480 L1420 480 L1420 520 L1460 520 L1460 560
                 L1500 560 L1500 600 L1540 600 L1540 700 Z" />
      </g>

      {/* Snow caps on the mid peaks (stepped) */}
      <g fill="url(#m-snow)">
        {/* Left peak cap */}
        <path d="M280 480 L280 440 L320 440 L320 400 L360 400 L360 440 L400 440 L400 480 L380 480 L380 460 L340 460 L340 480 Z" />
        {/* Main peak — large cap */}
        <path d="M740 440 L740 400 L780 400 L780 360 L820 360 L820 320 L860 320 L860 280 L900 280 L900 320 L940 320 L940 360 L980 360 L980 400 L1020 400 L1020 440 L1000 440 L1000 420 L960 420 L960 400 L920 400 L920 380 L880 380 L880 360 L860 360 L860 380 L820 380 L820 400 L800 400 L800 420 L780 420 L780 440 Z" />
        {/* Right peak cap */}
        <path d="M1300 480 L1300 440 L1340 440 L1340 480 L1320 480 Z" />
      </g>

      {/* Forest hills layered */}
      <path
        d="M0 720
           L160 690 L320 720 L480 680 L640 720 L800 680 L960 720 L1120 690
           L1280 720 L1440 690 L1600 710
           L1600 900 L0 900 Z"
        fill="url(#m-hill2)"
      />
      <path
        d="M0 760
           L200 730 L400 770 L580 720 L760 780 L920 730 L1100 780
           L1280 740 L1480 780 L1600 760
           L1600 900 L0 900 Z"
        fill="url(#m-hill)"
        opacity="0.92"
      />

      {/* Meadow voxel rim */}
      <g>
        <rect x="0" y="800" width="1600" height="100" fill="url(#m-meadow)" />
        {/* Subtle voxel-block highlights along the top of the meadow */}
        {Array.from({ length: 80 }).map((_, i) => (
          <rect
            key={i}
            x={i * 20}
            y={800}
            width={20}
            height={i % 2 === 0 ? 6 : 4}
            fill="#d3e09a"
            opacity={0.55}
          />
        ))}
      </g>

      {/* Flowers across the meadow */}
      <g>
        {Array.from({ length: 90 }).map((_, i) => {
          const x = ((i * 53) % 1600) + (i % 4) * 5;
          const y = 815 + ((i * 17) % 70);
          const palette = ["#fbfaf6", "#d9a87a", "#c084c4", "#f3d27a", "#e8a3b6"];
          return (
            <g key={i} opacity={0.9}>
              <circle cx={x} cy={y} r={1.8} fill={palette[i % palette.length]} />
              <rect x={x - 0.3} y={y} width={0.6} height={4} fill="#5d7d52" opacity={0.4} />
            </g>
          );
        })}
      </g>

      {/* Birch silhouettes — nod to the user's birch photo */}
      <g opacity="0.85">
        <rect x="1380" y="650" width="6" height="170" fill="#fbfaf6" />
        <rect x="1380" y="680" width="6" height="3" fill="#2b2a26" />
        <rect x="1380" y="720" width="6" height="3" fill="#2b2a26" />
        <rect x="1380" y="760" width="6" height="3" fill="#2b2a26" />
        <ellipse cx="1383" cy="640" rx="36" ry="18" fill="#7a9c6b" />
        <ellipse cx="1383" cy="630" rx="28" ry="14" fill="#9bbf7a" />

        <rect x="1420" y="700" width="5" height="120" fill="#fbfaf6" />
        <rect x="1420" y="730" width="5" height="2" fill="#2b2a26" />
        <rect x="1420" y="760" width="5" height="2" fill="#2b2a26" />
        <ellipse cx="1422" cy="690" rx="28" ry="14" fill="#7a9c6b" />

        <rect x="100" y="720" width="5" height="110" fill="#fbfaf6" />
        <rect x="100" y="750" width="5" height="2" fill="#2b2a26" />
        <ellipse cx="102" cy="712" rx="24" ry="12" fill="#7a9c6b" />
      </g>

      {/* Trail — winding path going up to the summit */}
      <path
        d="M180 850
           C 360 800, 460 760, 600 720
           S 880 580, 980 460
           S 1060 320, 880 290"
        stroke="#d9a87a"
        strokeWidth="3"
        strokeDasharray="3 8"
        fill="none"
        opacity="0.9"
      />

      {/* Summit flag — voxel style */}
      <g transform="translate(880,278)">
        <rect x="-1.5" y="-18" width="3" height="20" fill="#2b2a26" />
        <rect x="1.5" y="-18" width="14" height="8" fill="#d9a87a" />
        <rect x="1.5" y="-18" width="14" height="2" fill="#c08a5a" />
      </g>
    </svg>
  );
}
