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
    // TODO: replace with real backend call (Resend / Loops / DB).
    await new Promise((r) => setTimeout(r, 700));
    setStatus("done");
  }

  return (
    <section
      id="waitlist"
      className="relative bg-[color:var(--ink)] text-white scroll-mt-20 overflow-hidden"
    >
      {/* dawn glow accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 80% 30%, rgba(214,96,61,0.25) 0%, rgba(214,96,61,0) 60%), radial-gradient(40% 60% at 10% 90%, rgba(200,156,94,0.18) 0%, rgba(200,156,94,0) 60%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-6 py-32 md:py-40">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <span className="eyebrow text-white/55">
              Запись в первое восхождение
            </span>
            <h2 className="display mt-5 text-5xl md:text-7xl leading-[0.95] tracking-[-0.025em]">
              Готов идти —
              <br />
              <span className="italic text-[color:var(--ember)]">
                оставь почту.
              </span>
            </h2>
          </div>

          <div className="md:col-span-5">
            <p className="text-white/65 text-base leading-relaxed">
              YUP ещё в пути. Зову первой волной — без спама, распродаж и
              серий писем «зачем тебе саморазвитие». Одно письмо, когда
              маршрут будет готов.
            </p>
          </div>
        </div>

        <div className="mt-14 max-w-2xl">
          {status === "done" ? (
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-md bg-[color:var(--ember)]/15 border border-[color:var(--ember)]/40 text-[color:var(--ember)]">
              <span className="size-2 rounded-full bg-[color:var(--ember)]" />
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
                className="flex-1 px-5 py-4 rounded-md bg-white/[0.04] border border-white/15 text-white placeholder:text-white/40 outline-none focus:border-[color:var(--ember)] transition-colors"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-ember justify-center disabled:opacity-60 px-7"
              >
                {status === "submitting" ? "Записываем…" : "Записаться"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-4 text-sm text-[color:var(--ember)]">
              Похоже, в адресе опечатка — проверь почту?
            </p>
          )}

          <p className="mt-6 text-xs text-white/45">
            Без рассылок. Без передачи третьим. Отписаться — в один клик.
          </p>
        </div>
      </div>
    </section>
  );
}
