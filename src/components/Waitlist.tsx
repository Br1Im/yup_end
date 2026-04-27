"use client";

import { useState } from "react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "done" | "error"
  >("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("done");
  }

  return (
    <section
      id="waitlist"
      className="relative bg-[color:var(--bg)] text-white scroll-mt-20 overflow-hidden"
    >
      {/* lime glow accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 80% 30%, rgba(205,255,61,0.18) 0%, rgba(205,255,61,0) 60%), radial-gradient(50% 70% at 10% 90%, rgba(205,255,61,0.10) 0%, rgba(205,255,61,0) 60%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 slashes opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="flex items-baseline gap-4 mb-10">
          <span className="size-2 rounded-full bg-[color:var(--lime)] shadow-[0_0_18px_rgba(205,255,61,0.7)]" />
          <span className="eyebrow text-white/55">Первая волна</span>
        </div>

        <h2 className="display-tight text-[clamp(3rem,9.5vw,9rem)] leading-[0.86]">
          <span className="block">ХВАТИТ СИДЕТЬ.</span>
          <span className="block text-[color:var(--lime)] text-glow-lime">
            ПОРА ИДТИ.
          </span>
        </h2>

        <div className="mt-12 grid md:grid-cols-12 gap-10">
          <p className="md:col-span-6 text-white/70 leading-relaxed text-base md:text-lg">
            YUP ещё в пути. Зову первой волной — без спама и серий писем
            «зачем тебе саморазвитие». Одно письмо, когда маршрут будет готов.
          </p>
          <div className="md:col-span-6">
            {status === "done" ? (
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-[color:var(--lime)]/10 border border-[color:var(--lime)]/40 text-[color:var(--lime)]">
                <span className="size-2 rounded-full bg-[color:var(--lime)]" />
                Записал. До встречи у базы.
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col sm:flex-row items-stretch gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="ты@почта.ру"
                  aria-label="Email"
                  className="flex-1 px-6 py-4 rounded-full bg-white/[0.03] border border-[color:var(--line-strong)] text-white placeholder:text-white/35 outline-none focus:border-[color:var(--lime)] transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-lime justify-center disabled:opacity-60 px-8"
                >
                  {status === "submitting" ? "Записываем…" : "В первую волну"}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-4 text-sm text-[color:var(--lime)]">
                Похоже, в адресе опечатка — проверь почту?
              </p>
            )}

            <p className="mt-6 text-xs text-white/45">
              Без рассылок. Без передачи третьим. Отписаться — в один клик.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
