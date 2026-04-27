"use client";

import { useState } from "react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );

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
    <section id="waitlist" className="relative">
      <div className="mx-auto max-w-3xl px-6 py-28 md:py-36 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--sage-deep)]">
          Запись в первый поход
        </p>
        <h2 className="serif mt-4 text-4xl md:text-6xl leading-tight text-[color:var(--foreground)]">
          Идём вместе?
        </h2>
        <p className="mt-5 text-lg text-[color:var(--muted)] max-w-xl mx-auto leading-relaxed">
          YUP ещё в пути. Оставь почту — позовём первой волной, без спама и
          распродаж. Только письмо, когда тропа будет готова.
        </p>

        {status === "done" ? (
          <div className="mt-10 inline-flex items-center gap-3 px-6 py-4 rounded-full bg-[color:var(--sage)]/15 border border-[color:var(--sage)]/40 text-[color:var(--sage-deep)]">
            <span className="size-2 rounded-full bg-[color:var(--sage-deep)]" />
            Записали. До встречи у базового лагеря.
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-10 flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
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
              className="flex-1 px-5 py-3.5 rounded-full bg-[color:var(--background)] border border-[color:var(--line)] text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] outline-none focus:border-[color:var(--foreground)] transition-colors"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary justify-center disabled:opacity-60"
            >
              {status === "submitting" ? "Записываем…" : "В путь"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-[#a06b6b]">
            Похоже, в адресе опечатка — проверь почту?
          </p>
        )}

        <p className="mt-6 text-xs text-[color:var(--muted)]">
          Ни писем без повода. Ни передачи третьим. Можно отписаться в один клик.
        </p>
      </div>
    </section>
  );
}
