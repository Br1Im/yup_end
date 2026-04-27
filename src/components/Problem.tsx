export function Problem() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-5">
            <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--peach-deep)]">
              Почему так трудно
            </p>
            <h2 className="serif mt-4 text-4xl md:text-5xl leading-tight text-[color:var(--foreground)]">
              Десять приложений.
              <br />
              <span className="italic text-[color:var(--sage-deep)]">Ноль</span>{" "}
              ощущения движения.
            </h2>
          </div>

          <div className="md:col-span-7 md:pl-10 space-y-5 text-lg text-[color:var(--muted)] leading-relaxed">
            <p>
              Языки в одном, медитация во втором, спорт в третьем, заметки в
              четвёртом. Каждое тянет в свою сторону, ни одно не учитывает,
              что у тебя ровно 24 часа в сутках и сегодня ты устал.
            </p>
            <p className="text-[color:var(--foreground)]">
              YUP смотрит на тебя целиком — и складывает один спокойный план
              на день, неделю, год.
            </p>
          </div>
        </div>

        <div className="mt-16 divider-dotted" />

        <div className="mt-16 grid sm:grid-cols-3 gap-8">
          <Pain title="Раздробленность" body="5+ приложений, и ничего не доведено до конца." />
          <Pain title="Перегруз" body="План на 3 часа в день — и ты сдаёшься на третий день." />
          <Pain title="Без обратной связи" body="Никто не замечает, что ты прогрессируешь. Кроме тебя." />
        </div>
      </div>
    </section>
  );
}

function Pain({ title, body }: { title: string; body: string }) {
  return (
    <div className="space-y-2">
      <div className="serif text-xl text-[color:var(--foreground)]">{title}</div>
      <p className="text-[color:var(--muted)] leading-relaxed">{body}</p>
    </div>
  );
}
