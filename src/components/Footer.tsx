"use client";

import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative bg-[color:var(--bg)] text-white border-t border-[color:var(--line)] overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-20">
        <div
          className="display-tight text-[color:var(--lime)] text-glow-lime select-none leading-none"
          style={{ fontSize: "clamp(7rem, 26vw, 22rem)" }}
          aria-hidden
        >
          YUP.
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-12">
        <div className="grid md:grid-cols-12 gap-10 border-t border-[color:var(--line)] pt-10">
          <div className="md:col-span-6">
            <p className="display text-2xl md:text-3xl text-white max-w-xl leading-[1.05]">
              {t("footer.quote")}{" "}
              <span className="text-[color:var(--lime)]">
                {t("footer.quote.accent")}
              </span>
            </p>
            <p className="mt-6 text-white/55 max-w-md text-sm leading-relaxed">
              {t("footer.about")}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-white/40">{t("footer.col1.title")}</div>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li>
                <a href="#how" className="hover:text-[color:var(--lime)] transition-colors">
                  {t("footer.col1.l1")}
                </a>
              </li>
              <li>
                <a href="#domains" className="hover:text-[color:var(--lime)] transition-colors">
                  {t("footer.col1.l2")}
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[color:var(--lime)] transition-colors">
                  {t("footer.col1.l3")}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[color:var(--lime)] transition-colors">
                  {t("footer.col1.l4")}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-white/40">{t("footer.col2.title")}</div>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li>
                <a
                  href="mailto:hi@yup.app"
                  className="hover:text-[color:var(--lime)] transition-colors"
                >
                  hi@yup.app
                </a>
              </li>
              <li>
                <a
                  href="#waitlist"
                  className="hover:text-[color:var(--lime)] transition-colors"
                >
                  {t("footer.col2.l2")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-[color:var(--line)] text-xs text-white/40">
          <span>{t("footer.copyright", { year: new Date().getFullYear() })}</span>
          <span className="tracking-[0.18em] uppercase">{t("footer.tagline")}</span>
        </div>
      </div>
    </footer>
  );
}
