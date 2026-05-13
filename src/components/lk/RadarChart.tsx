"use client";

import { useEffect, useId, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";
import type { SphereId } from "@/lib/plan/types";

type RadarPoint = {
  sphere: SphereId;
  /** 0–100. */
  value: number;
};

type Props = {
  points: RadarPoint[];
  /** Inner box (radar) size in viewBox units. */
  size?: number;
  className?: string;
};

const SPHERE_LABEL: Record<SphereId, TranslationKey> = {
  lang: "domains.lang.t",
  body: "domains.body.t",
  knowledge: "domains.knowledge.t",
  habits: "domains.habits.t",
  mind: "domains.mind.t",
};

const RINGS = [0.2, 0.4, 0.6, 0.8, 1];

function polar(cx: number, cy: number, r: number, angleRad: number) {
  return [cx + r * Math.cos(angleRad), cy + r * Math.sin(angleRad)] as const;
}

export function RadarChart({ points, size = 260, className }: Props) {
  const { t } = useI18n();
  const id = useId();

  // Mount-time animation gate.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  // Render-time geometry. Use generous horizontal & vertical margins so labels
  // never push the visual centroid off-center.
  const marginX = 60;
  const marginY = 36;
  const cx = size / 2;
  const cy = size / 2;
  const pad = 32;
  const R = size / 2 - pad;
  const n = points.length;

  const viewBox = `${-marginX} ${-marginY} ${size + 2 * marginX} ${size + 2 * marginY}`;

  const angles = points.map((_, i) => (-Math.PI / 2) + (i * 2 * Math.PI) / n);

  const ringPolygons = RINGS.map((ratio) => {
    const pts = angles
      .map((a) => polar(cx, cy, R * ratio, a).join(","))
      .join(" ");
    return { ratio, pts };
  });

  const dataPts = angles
    .map((a, i) => polar(cx, cy, R * (points[i].value / 100), a).join(","))
    .join(" ");

  // Connecting lines from each data vertex to the axis perimeter
  // (the "mountain spines" leading from the data point outward to its peak).
  const spines = angles.map((a, i) => {
    const [px, py] = polar(cx, cy, R * (points[i].value / 100), a);
    const [tx, ty] = polar(cx, cy, R, a);
    return { px, py, tx, ty };
  });

  return (
    <svg
      viewBox={viewBox}
      width="100%"
      height="100%"
      className={className}
      role="img"
      aria-label="Sphere progress radar"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id={`${id}-fill`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(205,255,61)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="rgb(205,255,61)" stopOpacity="0.12" />
        </radialGradient>
        <filter id={`${id}-peak-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Concentric pentagon grid (staggered fade-in) */}
      {ringPolygons.map(({ ratio, pts }, i) => (
        <polygon
          key={ratio}
          points={pts}
          fill="none"
          stroke="rgba(255,255,255,0.085)"
          strokeWidth={ratio === 1 ? 1 : 0.6}
          style={{
            opacity: mounted ? 1 : 0,
            transition: `opacity 480ms ease-out ${i * 80}ms`,
          }}
        />
      ))}

      {/* Axis lines (fade-in with the rings) */}
      {angles.map((a, i) => {
        const [x, y] = polar(cx, cy, R, a);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={0.6}
            style={{
              opacity: mounted ? 1 : 0,
              transition: `opacity 520ms ease-out ${260 + i * 40}ms`,
            }}
          />
        );
      })}

      {/* Data polygon: scales out from center on mount. */}
      <polygon
        points={dataPts}
        fill={`url(#${id}-fill)`}
        stroke="rgb(205,255,61)"
        strokeWidth={1.6}
        strokeLinejoin="round"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transform: mounted ? "scale(1)" : "scale(0)",
          opacity: mounted ? 1 : 0,
          transition:
            "transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 360ms," +
            "opacity 480ms ease-out 360ms",
          filter: "drop-shadow(0 0 8px rgba(205,255,61,0.25))",
        }}
      />

      {/* Breathing inner pulse: a faint pentagon that scales subtly. */}
      <polygon
        points={dataPts}
        fill="none"
        stroke="rgb(205,255,61)"
        strokeOpacity="0.35"
        strokeWidth={1}
        strokeLinejoin="round"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          animation: mounted ? "yup-radar-breathe 3.6s ease-in-out infinite" : "none",
          opacity: mounted ? 1 : 0,
          transition: "opacity 600ms ease-out 1000ms",
        }}
      />

      {/* Spines: subtle lime lines from data point outward to axis perimeter
          — visual "ascent line" that the mountain caps stand on. */}
      {spines.map((s, i) => (
        <line
          key={`spine-${i}`}
          x1={s.px}
          y1={s.py}
          x2={s.tx}
          y2={s.ty}
          stroke="rgba(205,255,61,0.28)"
          strokeWidth={0.8}
          strokeDasharray="2 3"
          style={{
            opacity: mounted ? 1 : 0,
            transition: `opacity 520ms ease-out ${900 + i * 80}ms`,
          }}
        />
      ))}

      {/* Data points: small circles at each vertex */}
      {spines.map((s, i) => (
        <circle
          key={`pt-${i}`}
          cx={s.px}
          cy={s.py}
          r={3}
          fill="rgb(205,255,61)"
          stroke="rgba(7,8,10,1)"
          strokeWidth={1.2}
          style={{
            transformOrigin: `${s.px}px ${s.py}px`,
            transform: mounted ? "scale(1)" : "scale(0)",
            transition: `transform 480ms cubic-bezier(0.34, 1.56, 0.64, 1) ${1100 + i * 80}ms`,
          }}
        />
      ))}

      {/* Mini mountain peaks at each axis tip — radial brand glyph rising
          outward from the data polygon. Triangle has its base on the axis
          (perpendicular to the radial direction) and its apex pointing
          further outward. */}
      {angles.map((a, i) => {
        const tipDist = R + 6;
        const baseDist = R - 4;
        const halfBaseW = 5;
        const perpAngle = a + Math.PI / 2;

        const [apexX, apexY] = polar(cx, cy, tipDist, a);
        const [baseCenterX, baseCenterY] = polar(cx, cy, baseDist, a);
        const baseLeftX = baseCenterX + halfBaseW * Math.cos(perpAngle);
        const baseLeftY = baseCenterY + halfBaseW * Math.sin(perpAngle);
        const baseRightX = baseCenterX - halfBaseW * Math.cos(perpAngle);
        const baseRightY = baseCenterY - halfBaseW * Math.sin(perpAngle);

        return (
          <g
            key={`peak-${i}`}
            style={{
              transformOrigin: `${baseCenterX}px ${baseCenterY}px`,
              transform: mounted ? "scale(1)" : "scale(0)",
              opacity: mounted ? 1 : 0,
              transition:
                `transform 520ms cubic-bezier(0.34, 1.56, 0.64, 1) ${1300 + i * 90}ms,` +
                `opacity 380ms ease-out ${1300 + i * 90}ms`,
            }}
          >
            <polygon
              points={`${apexX},${apexY} ${baseLeftX},${baseLeftY} ${baseRightX},${baseRightY}`}
              fill="#CDFF3D"
              stroke="#CDFF3D"
              strokeWidth={0.8}
              strokeLinejoin="round"
              filter={`url(#${id}-peak-glow)`}
            />
          </g>
        );
      })}

      {/* Sphere labels around perimeter — placed outside the radar circle */}
      {angles.map((a, i) => {
        const [lx, ly] = polar(cx, cy, R + 26, a);
        const anchor =
          Math.abs(Math.cos(a)) < 0.2
            ? "middle"
            : Math.cos(a) > 0
              ? "start"
              : "end";
        const dy = Math.sin(a) > 0.3 ? 12 : Math.sin(a) < -0.3 ? -4 : 4;
        return (
          <text
            key={`label-${i}`}
            x={lx}
            y={ly + dy}
            textAnchor={anchor}
            fontSize="10"
            fontWeight="600"
            letterSpacing="1.4"
            fill="rgba(255,255,255,0.78)"
            style={{
              textTransform: "uppercase",
              opacity: mounted ? 1 : 0,
              transition: `opacity 520ms ease-out ${1500 + i * 70}ms`,
            }}
          >
            {t(SPHERE_LABEL[points[i].sphere])}
          </text>
        );
      })}

      <style>{`
        @keyframes yup-radar-breathe {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%      { transform: scale(1.04); opacity: 0.18; }
        }
      `}</style>
    </svg>
  );
}
