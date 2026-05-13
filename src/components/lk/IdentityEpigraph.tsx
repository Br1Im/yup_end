"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

type Props = {
  identity: string;
};

/**
 * Italicized one-line manifesto rendered as a soft epigraph above the
 * /lk greeting. Empty `identity` collapses the component to nothing.
 */
export function IdentityEpigraph({ identity }: Props) {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const value = identity.trim();
  if (!value) return null;

  return (
    <p
      className="text-[0.95rem] sm:text-base italic leading-relaxed text-white/55 max-w-3xl"
      style={{
        transition:
          "opacity 620ms ease-out, transform 720ms cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(-4px)",
      }}
    >
      <span className="text-[color:var(--lime)] mr-2">«</span>
      <span className="text-white/80 font-medium not-italic">
        {t("lk.identity.prefix")}
      </span>{" "}
      <span className="text-white">{value}</span>
      <span className="text-[color:var(--lime)] ml-1">»</span>
    </p>
  );
}
