"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** soft = subtler 14px lift instead of 28px */
  variant?: "default" | "soft";
  /** index 1..5 → adds reveal-delay-N for staggered groups */
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  /** custom wrapper tag — defaults to div */
  as?: "div" | "li" | "section";
};

/**
 * Lightweight scroll-reveal: applies .is-in once the element enters the viewport.
 * Uses IntersectionObserver and disconnects after first activation, so it never
 * re-hides on scroll-up.
 */
export function Reveal({
  children,
  className,
  variant = "default",
  delay = 0,
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      // Fire only when the block is meaningfully on screen — its top has
      // passed the bottom 22% of the viewport. Threshold 0 + a generous
      // negative bottom rootMargin keeps tall headlines from animating
      // while their top edge is still below the fold.
      { threshold: 0, rootMargin: "0px 0px -22% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cls = [
    variant === "soft" ? "reveal-soft" : "reveal",
    delay ? `reveal-delay-${delay}` : "",
    visible ? "is-in" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cls}
    >
      {children}
    </Tag>
  );
}
