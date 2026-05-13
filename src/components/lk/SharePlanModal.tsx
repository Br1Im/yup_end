"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, Link as LinkIcon, Share2, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { buildShareUrl } from "@/lib/plan/share";
import type { PlanIntake } from "@/lib/plan/types";

type Props = {
  intake: PlanIntake;
  onClose: () => void;
};

/**
 * Modal that shows a shareable URL for the current route's intake.
 * The URL embeds only the intake (goal/spheres/context) — the receiver
 * regenerates the daily plan on their device with their own start date.
 */
export function SharePlanModal({ intake, onClose }: Props) {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const portalReady = typeof document !== "undefined";

  const url = useMemo(() => buildShareUrl(intake) ?? "", [intake]);

  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    // Pre-select the URL for fast keyboard copy.
    const f = requestAnimationFrame(() => inputRef.current?.select());
    return () => {
      cancelAnimationFrame(r);
      cancelAnimationFrame(f);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleCopy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback: keep the input selected so the user can Ctrl/Cmd+C.
      inputRef.current?.select();
    }
  };

  const handleNativeShare = async () => {
    if (!url) return;
    if (typeof navigator === "undefined" || !navigator.share) return;
    try {
      await navigator.share({
        title: t("lk.share.native.title"),
        text: t("lk.share.native.text"),
        url,
      });
    } catch {
      // user cancelled — ignore
    }
  };

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  if (!portalReady) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        style={{
          transition: "opacity 280ms ease-out",
          opacity: mounted ? 1 : 0,
        }}
        onClick={onClose}
        aria-hidden
      />
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--bg-2)] p-6 sm:p-7 shadow-[0_0_60px_rgba(205,255,61,0.18)]"
        style={{
          transition:
            "opacity 320ms ease-out, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          opacity: mounted ? 1 : 0,
          transform: mounted
            ? "scale(1) translateY(0)"
            : "scale(0.94) translateY(12px)",
        }}
      >
        <header className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
              <span className="eyebrow text-white/55 text-[0.6rem]">
                {t("lk.share.eyebrow")}
              </span>
            </div>
            <h2
              id="share-title"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-white"
            >
              {t("lk.share.title")}
            </h2>
            <p className="text-sm text-white/55 mt-1 max-w-md leading-relaxed">
              {t("lk.share.lead")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/45 hover:text-white transition-colors"
            aria-label={t("lk.share.close")}
          >
            <X className="size-5" strokeWidth={1.7} />
          </button>
        </header>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 min-w-0 flex items-center gap-2 rounded-lg border border-[color:var(--line-strong)] bg-[color:var(--bg)] px-3 py-2.5">
            <LinkIcon
              className="size-3.5 text-white/45 shrink-0"
              strokeWidth={1.7}
            />
            <input
              ref={inputRef}
              readOnly
              value={url}
              onFocus={(e) => e.currentTarget.select()}
              className="flex-1 min-w-0 bg-transparent text-xs text-white/75 focus:outline-none truncate"
              aria-label={t("lk.share.url.label")}
            />
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--lime)] text-[color:var(--bg)] font-semibold px-4 py-2.5 text-sm hover:brightness-110 transition shrink-0"
          >
            {copied ? (
              <>
                <Check className="size-4" strokeWidth={2.4} />
                {t("lk.share.copied")}
              </>
            ) : (
              <>
                <Copy className="size-4" strokeWidth={2} />
                {t("lk.share.copy")}
              </>
            )}
          </button>
        </div>

        {canNativeShare ? (
          <button
            type="button"
            onClick={handleNativeShare}
            className="mt-3 inline-flex items-center gap-2 text-xs text-white/55 hover:text-[color:var(--lime)] transition-colors"
          >
            <Share2 className="size-3.5" strokeWidth={1.7} />
            {t("lk.share.native.cta")}
          </button>
        ) : null}

        <p className="mt-4 text-[0.65rem] tracking-[0.16em] uppercase text-white/35 leading-relaxed">
          {t("lk.share.note")}
        </p>
      </div>
    </div>,
    document.body,
  );
}
