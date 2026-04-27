import {
  Languages,
  Activity,
  BookOpen,
  Sparkles,
  HeartPulse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const DOMAINS: {
  icon: LucideIcon;
  title: string;
  body: string;
  tone: "sage" | "sky" | "peach" | "rose" | "moss";
}[] = [
  {
    icon: Languages,
    title: "Язык",
    body: "Английский, испанский, немецкий — без зубрёжки. План чередует слова, разговор и фильмы.",
    tone: "sky",
  },
  {
    icon: Activity,
    title: "Тело",
    body: "Сила, выносливость, гибкость. Тренировки подстраиваются под твою неделю и сон.",
    tone: "sage",
  },
  {
    icon: BookOpen,
    title: "Знания",
    body: "Книги, курсы, статьи — по 20 минут в день. AI отбирает только то, что движет к цели.",
    tone: "peach",
  },
  {
    icon: Sparkles,
    title: "Привычки",
    body: "Маленькие, ежедневные. Без агрессивных стриков. Сорвался — план мягко перестроится.",
    tone: "rose",
  },
  {
    icon: HeartPulse,
    title: "Психология",
    body: "Дыхание, рефлексия, медитация. Не как обязанность — как тёплый момент дня.",
    tone: "moss",
  },
];

const TONE_BG: Record<string, string> = {
  sage: "bg-[color:var(--sage)]/15 text-[color:var(--sage-deep)]",
  sky: "bg-[color:var(--sky)]/25 text-[color:var(--sky-deep)]",
  peach: "bg-[color:var(--peach)]/25 text-[color:var(--peach-deep)]",
  rose: "bg-[#e8c4c4]/30 text-[#a06b6b]",
  moss: "bg-[#c4d6b4]/40 text-[#5d7d52]",
};

export function Domains() {
  return (
    <section id="domains" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--sky-deep)]">
            Сферы роста
          </p>
          <h2 className="serif mt-4 text-4xl md:text-5xl leading-tight text-[color:var(--foreground)]">
            Всё, что ты собирался —
            <br />
            <span className="italic text-[color:var(--peach-deep)]">в одном месте.</span>
          </h2>
          <p className="mt-5 text-lg text-[color:var(--muted)] leading-relaxed">
            YUP не привязывает к одной нише. Можешь идти параллельно по
            нескольким сферам — план учтёт, что у тебя один день и одна голова.
          </p>
        </div>

        <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DOMAINS.map((d) => {
            const Icon = d.icon;
            return (
              <li
                key={d.title}
                className="group relative bg-[color:var(--background-deep)]/40 border border-[color:var(--line)] rounded-2xl p-7 transition-colors hover:bg-[color:var(--background-deep)]"
              >
                <span
                  className={`inline-flex size-11 items-center justify-center rounded-xl ${TONE_BG[d.tone]}`}
                >
                  <Icon className="size-5" strokeWidth={1.6} />
                </span>
                <h3 className="serif mt-5 text-2xl text-[color:var(--foreground)]">
                  {d.title}
                </h3>
                <p className="mt-2 text-[color:var(--muted)] leading-relaxed">
                  {d.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
