"use client";

import { useId } from "react";
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
  /** Diameter in px; defaults to 260. */
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
  const cx = size / 2;
  const cy = size / 2;
  const pad = 54;
  const R = size / 2 - pad;
  const n = points.length;

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

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      className={className}
      style={{ overflow: "visible" }}
      role="img"
      aria-label="Sphere progress radar"
    >
      <defs>
        <radialGradient id={`${id}-fill`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(205,255,61)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="rgb(205,255,61)" stopOpacity="0.12" />
        </radialGradient>
      </defs>

      {/* Concentric pentagon grid */}
      {ringPolygons.map(({ ratio, pts }) => (
        <polygon
          key={ratio}
          points={pts}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={ratio === 1 ? 1 : 0.6}
        />
      ))}

      {/* Axis lines */}
      {angles.map((a, i) => {
        const [x, y] = polar(cx, cy, R, a);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={0.6}
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={dataPts}
        fill={`url(#${id}-fill)`}
        stroke="rgb(205,255,61)"
        strokeWidth={1.4}
        strokeLinejoin="round"
      />

      {/* Data points */}
      {angles.map((a, i) => {
        const [x, y] = polar(cx, cy, R * (points[i].value / 100), a);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={3}
            fill="rgb(205,255,61)"
            stroke="rgba(7,8,10,1)"
            strokeWidth={1.2}
          />
        );
      })}

      {/* Sphere labels around perimeter */}
      {angles.map((a, i) => {
        const [lx, ly] = polar(cx, cy, R + 20, a);
        const anchor =
          Math.abs(Math.cos(a)) < 0.2
            ? "middle"
            : Math.cos(a) > 0
              ? "start"
              : "end";
        const dy = Math.sin(a) > 0.3 ? 8 : Math.sin(a) < -0.3 ? -2 : 4;
        return (
          <text
            key={i}
            x={lx}
            y={ly + dy}
            textAnchor={anchor}
            fontSize="10"
            fontWeight="600"
            letterSpacing="1.6"
            fill="rgba(255,255,255,0.78)"
            style={{ textTransform: "uppercase" }}
          >
            {t(SPHERE_LABEL[points[i].sphere])}
          </text>
        );
      })}
    </svg>
  );
}
