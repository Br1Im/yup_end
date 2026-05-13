"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LogOut, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function LogoutConfirmModal({ open, onCancel, onConfirm }: Props) {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const r = requestAnimationFrame(() => setMounted(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(r);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onCancel]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
    >
      <button
        type="button"
        aria-label={t("lk.logout.cancel")}
        onClick={onCancel}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 220ms ease-out",
        }}
      />

      <div
        className="relative w-full max-w-md rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--bg-2)] p-6 sm:p-7 text-white"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)",
          transition:
            "opacity 280ms cubic-bezier(0.22, 1, 0.36, 1), transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <header className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="size-1.5 rounded-full bg-[color:var(--lime)]" />
              <span className="eyebrow text-white/55 text-[0.6rem]">
                {t("lk.logout.eyebrow")}
              </span>
            </div>
            <h2
              id="logout-title"
              className="display-tight text-2xl sm:text-3xl leading-tight"
            >
              {t("lk.logout.title")}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label={t("lk.logout.cancel")}
            className="size-8 grid place-items-center rounded-full hover:bg-white/5 text-white/55 hover:text-white transition shrink-0"
          >
            <X className="size-4" strokeWidth={1.8} />
          </button>
        </header>

        <p className="text-sm text-white/70 leading-relaxed">
          {t("lk.logout.lead")}
        </p>

        <footer className="mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2.5 rounded-full border border-[color:var(--line)] hover:border-white/30"
          >
            {t("lk.logout.cancel")}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--lime)] text-[color:var(--bg)] font-semibold px-5 py-2.5 text-sm hover:brightness-110 transition"
          >
            <LogOut className="size-4" strokeWidth={2} />
            {t("lk.logout.confirm")}
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
