"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";
import type { ArcStage } from "@/lib/plan/types";

type Props = {
  stages: ArcStage[];
  currentStageId: ArcStage["id"];
  currentDay: number;
  totalDays: number;
};

/**
 * Vertical mountain visualization. A stylised dual-ridge silhouette with a
 * lime climbing trail; the user's flag rides the trail at their progress %.
 * The viewBox is 320x420 — we scale via CSS for the actual rendered size.
 *
 * Coordinates are tuned so:
 *  - Base camp marker sits low-right of the foot.
 *  - The trail snakes from base to summit, slightly off-centre.
 *  - Camp pins land on the trail at their respective `endDay` % of the path.
 *  - The flag interpolates along the same Bezier path the trail uses.
 */
export function MountainAscent({
  stages,
  currentStageId,
  currentDay,
  totalDays,
}: Props) {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const pct = Math.min(1, Math.max(0, currentDay / totalDays));

  // Path data — one cubic curve from (60, 380) up to (200, 60) (summit).
  // We use the cubic formula to interpolate along it for the flag + camp pins.
  const path = useMemo(
    () => ({
      // start
      p0: { x: 60, y: 380 },
      // control 1 (pulls right)
      p1: { x: 90, y: 280 },
      // control 2 (swings back left)
      p2: { x: 230, y: 210 },
      // end (summit shoulder)
      p3: { x: 200, y: 60 },
    }),
    [],
  );

  const pointAt = (t: number) => {
    const { p0, p1, p2, p3 } = path;
    const m = 1 - t;
    const x =
      m * m * m * p0.x +
      3 * m * m * t * p1.x +
      3 * m * t * t * p2.x +
      t * t * t * p3.x;
    const y =
      m * m * m * p0.y +
      3 * m * m * t * p1.y +
      3 * m * t * t * p2.y +
      t * t * t * p3.y;
    return { x, y };
  };

  const flagPos = pointAt(mounted ? pct : 0);
  const daysLeft = Math.max(0, totalDays - currentDay);

  // Camp marker progress positions (use endDay normalized).
  const camps = stages.map((s) => {
    const camp_t = Math.min(1, Math.max(0, s.endDay / totalDays));
    const p = pointAt(camp_t);
    return { ...s, x: p.x, y: p.y, t: camp_t };
  });

  return (
    <article
      className="relative overflow-hidden rounded-lg border border-[color:var(--line-strong)] bg-[color:var(--bg-2)] p-4 sm:p-5"
      style={{
        transition:
          "opacity 540ms ease-out, transform 640ms cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(10px)",
      }}
    >
      <header className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
          <h3 className="eyebrow text-white text-[0.65rem]">
            {t("lk.mountain.eyebrow")}
          </h3>
        </div>
        <span className="text-[0.62rem] tracking-[0.22em] uppercase text-white/45 font-semibold">
          {t("lk.mountain.distance.before")}{" "}
          <span className="text-white">{daysLeft}</span> {t("lk.mountain.days")}
        </span>
      </header>

      <div className="relative">
        <svg
          viewBox="0 0 320 420"
          width="100%"
          height="auto"
          role="img"
          aria-label="Mountain ascent visualization"
          className="block"
          style={{ maxHeight: 420 }}
        >
          <defs>
            <linearGradient id="ridge-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>
            <linearGradient id="snow-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
            </linearGradient>
            <linearGradient id="trail-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CDFF3D" stopOpacity="1" />
              <stop offset="100%" stopColor="#CDFF3D" stopOpacity="0.25" />
            </linearGradient>
            <filter id="flag-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background ridge — pushed-back mountain */}
          <path
            d="M 0 400 L 110 220 L 175 280 L 260 140 L 320 230 L 320 420 L 0 420 Z"
            fill="url(#ridge-grad)"
            style={{
              transition: "opacity 900ms ease-out",
              opacity: mounted ? 1 : 0,
            }}
          />

          {/* Foreground main ridge */}
          <path
            d="M 0 420 L 70 340 L 130 360 L 200 60 L 260 320 L 320 290 L 320 420 Z"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            style={{
              transition:
                "opacity 1000ms ease-out 120ms, transform 1100ms cubic-bezier(0.22, 1, 0.36, 1) 120ms",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(8px)",
              transformOrigin: "center bottom",
            }}
          />

          {/* Snow cap on summit */}
          <path
            d="M 184 90 L 200 60 L 218 95 L 210 110 L 196 95 Z"
            fill="url(#snow-grad)"
            style={{
              transition: "opacity 700ms ease-out 600ms",
              opacity: mounted ? 1 : 0,
            }}
          />

          {/* Climbing trail (dashed lime with stroke-dashoffset for "draw" effect) */}
          <path
            d={`M ${path.p0.x} ${path.p0.y} C ${path.p1.x} ${path.p1.y}, ${path.p2.x} ${path.p2.y}, ${path.p3.x} ${path.p3.y}`}
            fill="none"
            stroke="url(#trail-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 6"
            pathLength={1}
            style={{
              strokeDashoffset: mounted ? 0 : 1,
              transition:
                "stroke-dashoffset 1600ms cubic-bezier(0.22, 1, 0.36, 1) 350ms, opacity 600ms ease-out 320ms",
              opacity: mounted ? 0.85 : 0,
            }}
          />

          {/* Camp markers (rings at each stage endDay) */}
          {camps.map((c, i) => {
            const isCurrent = c.id === currentStageId;
            return (
              <g
                key={c.id}
                style={{
                  transition: `opacity 420ms ease-out ${800 + i * 140}ms, transform 520ms cubic-bezier(0.34, 1.56, 0.64, 1) ${800 + i * 140}ms`,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "scale(1)" : "scale(0)",
                  transformOrigin: `${c.x}px ${c.y}px`,
                }}
              >
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={isCurrent ? 7 : 5}
                  fill={isCurrent ? "#CDFF3D" : "rgba(7,8,10,1)"}
                  stroke="#CDFF3D"
                  strokeWidth={isCurrent ? 0 : 1.5}
                  style={
                    isCurrent
                      ? { animation: "yup-camp-pulse 2400ms ease-in-out infinite" }
                      : undefined
                  }
                />
                <text
                  x={c.x + 12}
                  y={c.y + 4}
                  fill="rgba(255,255,255,0.7)"
                  fontSize="9"
                  fontFamily="var(--font-sans, ui-sans-serif)"
                  fontWeight={700}
                  letterSpacing="0.12em"
                  style={{ textTransform: "uppercase" }}
                >
                  {t(c.labelKey as TranslationKey)}
                </text>
              </g>
            );
          })}

          {/* User flag */}
          <g
            filter="url(#flag-glow)"
            style={{
              transition:
                "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1) 900ms, opacity 480ms ease-out 900ms",
              opacity: mounted ? 1 : 0,
              transform: mounted
                ? `translate(${flagPos.x - 60}px, ${flagPos.y - 380}px)`
                : `translate(0px, 0px)`,
            }}
          >
            <line
              x1={60}
              y1={380}
              x2={60}
              y2={358}
              stroke="#CDFF3D"
              strokeWidth={1.6}
            />
            <path
              d="M 60 358 L 76 364 L 60 370 Z"
              fill="#CDFF3D"
              style={{
                animation: "yup-flag-flutter 2800ms ease-in-out infinite",
                transformOrigin: "60px 364px",
              }}
            />
            <circle cx={60} cy={380} r={3} fill="#CDFF3D" />
            <circle
              cx={60}
              cy={380}
              r={7}
              fill="none"
              stroke="#CDFF3D"
              strokeOpacity={0.55}
              style={{
                animation: "yup-flag-halo 2200ms ease-in-out infinite",
                transformOrigin: "60px 380px",
              }}
            />
          </g>
        </svg>

        {/* Bottom strip with key facts */}
        <div className="mt-3 flex items-end justify-between gap-3 text-[0.65rem] tracking-[0.18em] uppercase text-white/45 font-semibold">
          <div>
            <div className="text-white/35">{t("lk.mountain.base")}</div>
            <div className="text-white text-base font-semibold normal-case tracking-normal mt-0.5">
              {t("lk.mountain.altitude")}: {currentDay} / {totalDays}
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/35">{t("lk.mountain.summit")}</div>
            <div className="text-[color:var(--lime)] text-base font-semibold normal-case tracking-normal mt-0.5">
              {Math.round(pct * 100)}%
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes yup-camp-pulse {
          0%,
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 0 rgba(205, 255, 61, 0.6));
          }
          50% {
            transform: scale(1.08);
            filter: drop-shadow(0 0 8px rgba(205, 255, 61, 0.6));
          }
        }
        @keyframes yup-flag-flutter {
          0%,
          100% {
            transform: scaleX(1) translateX(0);
          }
          50% {
            transform: scaleX(0.78) translateX(-1.5px);
          }
        }
        @keyframes yup-flag-halo {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.55;
          }
          50% {
            transform: scale(1.45);
            opacity: 0;
          }
        }
      `}</style>
    </article>
  );
}
