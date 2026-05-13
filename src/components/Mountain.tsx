type Props = {
  className?: string;
};

/**
 * Minimal alpine peak — single triangular silhouette with a lime ridge stroke
 * and a subtle halo. The lime ridge doubles as an animated ascent trail with
 * three camp markers (Base / Camp I / Summit) so the landing hero quietly
 * reinforces the brand metaphor without adding visual clutter.
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

      <style>{`
        @keyframes yup-trail {
          0% { stroke-dashoffset: 360; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes yup-summit-pulse {
          0%, 100% { transform: scale(1); opacity: 0.45; }
          50% { transform: scale(1.45); opacity: 0.18; }
        }
        @keyframes yup-camp-fade {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        .yup-mountain-trail {
          stroke-dasharray: 360;
          stroke-dashoffset: 360;
          animation: yup-trail 2.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
        }
        .yup-mountain-summit-ring {
          transform-origin: 300px 170px;
          transform-box: fill-box;
          animation: yup-summit-pulse 3.4s ease-in-out infinite;
        }
        .yup-mountain-camp {
          animation: yup-camp-fade 3.4s ease-in-out infinite;
        }
        .yup-mountain-camp.c1 { animation-delay: 0s; }
        .yup-mountain-camp.c2 { animation-delay: 0.6s; }
        @media (prefers-reduced-motion: reduce) {
          .yup-mountain-trail { animation: none; stroke-dashoffset: 0; }
          .yup-mountain-summit-ring,
          .yup-mountain-camp { animation: none; }
        }
      `}</style>

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

      {/* soft glow under the ridge */}
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

      {/* base ridge */}
      <line
        x1="300"
        y1="170"
        x2="90"
        y2="430"
        stroke="#cdff3d"
        strokeOpacity="0.32"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* animated ascent trail (climbs the ridge from base to summit) */}
      <line
        className="yup-mountain-trail"
        x1="90"
        y1="430"
        x2="300"
        y2="170"
        stroke="#cdff3d"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* camp markers along the trail */}
      {/* Camp I — about 33% along the ridge from base */}
      <g className="yup-mountain-camp c1" transform="translate(230, 344)">
        <circle r="4.5" fill="#cdff3d" />
        <circle r="9" fill="none" stroke="#cdff3d" strokeOpacity="0.35" />
      </g>
      {/* Camp II — about 66% along the ridge from base */}
      <g className="yup-mountain-camp c2" transform="translate(160, 405)">
        <circle r="3" fill="#cdff3d" />
        <circle r="7" fill="none" stroke="#cdff3d" strokeOpacity="0.3" />
      </g>

      {/* summit dot */}
      <circle cx="300" cy="170" r="3.5" fill="#cdff3d" />
      <circle
        className="yup-mountain-summit-ring"
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
