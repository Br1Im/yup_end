export type Locale = "ru" | "en";

export const LOCALES: readonly Locale[] = ["ru", "en"] as const;

export const translations = {
  ru: {
    // Header
    "header.nav.route": "Маршрут",
    "header.nav.spheres": "Сферы",
    "header.nav.ascent": "Восхождение",
    "header.nav.faq": "FAQ",
    "header.cta.signup": "Записаться",
    "header.cta.signup.suffix": "— бесплатно",
    "header.cta.signup.short": "Записаться",

    // Hero
    "hero.title.l1": "Вершина —",
    "hero.title.l2": "это выбор.",
    "hero.intro":
      "YUP — один маршрут на английский, форму, знания и pet-проекты. AI собирает план под твой семестр и твою жизнь. Ты — идёшь. Каждый день. Без распыления, без отмазок.",
    "hero.cta.steps": "Как устроен",
    "hero.cta.steps.suffix": "/ 3 шага",
    "hero.cta.start": "Начать восхождение",
    "hero.stat1.kpi": "10×",
    "hero.stat1.caption":
      "Меньше распыления — один план вместо десятка приложений.",
    "hero.stat2.kpi": "365",
    "hero.stat2.caption": "Дней в году. Каждый — шаг к версии тебя через год.",
    "hero.spheres.lang": "Язык",
    "hero.spheres.body": "Тело",
    "hero.spheres.knowledge": "Знания",
    "hero.spheres.habits": "Привычки",
    "hero.spheres.mind": "Голова",

    // Problem
    "problem.eyebrow": "Почему саморазвитие проваливается",
    "problem.title.l1": "Десять приложений.",
    "problem.title.l2": "Ни одной вершины.",
    "problem.lead":
      "Языки в одном, тренировки во втором, заметки в третьем, медитация в четвёртом. Каждое требует тебя целиком. Каждое тянет в свою сторону. Ни одно не знает, что у тебя 24 часа в сутках и сегодня ты вымотан.",
    "problem.lead2":
      "YUP смотрит на цель, не на трекер. Один маршрут. Один план на день. Один вектор —",
    "problem.lead2.accent": "вверх",
    "problem.card1.t": "Распыление",
    "problem.card1.d":
      "5+ инструментов, ни одной завершённой цели. YUP объединяет всё в один маршрут.",
    "problem.card2.t": "Перегруз",
    "problem.card2.d":
      "План на 3 часа в день. Ты сдаёшься на третий. YUP считает реальную загрузку.",
    "problem.card3.t": "Тишина",
    "problem.card3.d":
      "Никто не замечает, что ты двигаешься. Кроме тебя. YUP видит и подстраивает темп.",

    // HowItWorks
    "how.eyebrow": "Как устроен маршрут",
    "how.title.l1": "Четыре шага.",
    "how.title.l2": "И ты уже идёшь.",
    "how.lead":
      "Никаких опросников на час и абстрактных «персонализаций». Ты называешь цель — система отвечает конкретным маршрутом и первым шагом, который можно сделать прямо сейчас.",
    "how.s1.t": "Назови вершину",
    "how.s1.d":
      "Опиши цель словами — без анкет на час. Английский до B2 за год. Подтянуться 20 раз. Pet-проект до релиза. Не слить сессию. Это и есть вершина.",
    "how.s2.t": "AI прокладывает маршрут",
    "how.s2.d":
      "За пару минут — персональный путь на месяц вперёд. Конкретные шаги, лучшие источники, реалистичный темп. Никакого спама контентом ради контента.",
    "how.s3.t": "Идёшь каждый день",
    "how.s3.d":
      "Утром — список шагов на сегодня. Учитывает сон, ритм, вчерашнее состояние. Пропустил день — план перестраивается, не ломается.",
    "how.s4.t": "Берёшь вершину",
    "how.s4.d":
      "Чёткий ритм. Замеры. Видимый прогресс. И сразу — следующая, выше. YUP не оставляет тебя на плато.",

    // Domains
    "domains.eyebrow": "Сферы роста",
    "domains.title.l1": "Пять сфер.",
    "domains.title.l2": "Один человек.",
    "domains.lead":
      "YUP не привязывает тебя к одной нише. Можно идти параллельно по нескольким сферам — план учтёт, что у тебя один день и одна голова.",
    "domains.lang.t": "Язык",
    "domains.lang.d":
      "Английский, испанский, немецкий. Свободно говорить, а не сидеть в грамматике. Слова, разговор, погружение.",
    "domains.body.t": "Тело",
    "domains.body.d":
      "Сила, выносливость, форма. Тренировки подстраиваются под сон и восстановление. Нагрузка растёт, не ломает.",
    "domains.knowledge.t": "Знания",
    "domains.knowledge.d":
      "Книги, курсы, статьи — отобраны под цель. 20–30 минут в день. Заметки, повторения, реальное применение.",
    "domains.habits.t": "Привычки",
    "domains.habits.d":
      "Маленькие, ежедневные, без агрессивных стриков. Сорвался — план перестраивается, а не разрушается.",
    "domains.mind.t": "Голова",
    "domains.mind.d":
      "Дыхание, рефлексия, медитация. Не ради галочки — как способ снять напряжение и держать фокус на цели.",

    // Journey
    "journey.eyebrow": "Восхождение",
    "journey.title.l1": "От базы —",
    "journey.title.l2": "до вершины.",
    "journey.lead":
      "Восхождение — не марафон выходного дня. Это система, которая держит тебя в движении, когда мотивация заканчивается. А она всегда заканчивается.",
    "journey.c1.label": "База",
    "journey.c1.t": "Старт",
    "journey.c1.when": "День 1–7",
    "journey.c1.d":
      "Цель названа. AI выдаёт первую тропу — на 7 дней. Лёгкий вход, чтобы поверить в темп.",
    "journey.c2.label": "Лагерь",
    "journey.c2.t": "Маршрут",
    "journey.c2.when": "1–3 месяц",
    "journey.c2.d":
      "Ритм каждого дня. План адаптируется под жизнь — пары, дедлайны, сессия, бессонная ночь. Главное — не остановиться.",
    "journey.c3.label": "Лагерь",
    "journey.c3.t": "Плечо",
    "journey.c3.when": "3–6 месяц",
    "journey.c3.d":
      "Привычки стоят. Появляются результаты — слова, форма, ясность. Дальше — последний рывок к гребню.",
    "journey.c4.label": "Вершина",
    "journey.c4.t": "Вершина",
    "journey.c4.when": "Год+",
    "journey.c4.d":
      "Цель взята. Видно, как далеко ушёл. YUP становится напарником в следующем восхождении.",

    // Billboard
    "billboard.l1": "Вершина.",
    "billboard.l2": "Сегодня.",
    "billboard.l3": "Без отмазок.",
    "billboard.cta": "Начать восхождение",
    "billboard.tag": "Слабо дойти?",

    // Waitlist
    "waitlist.eyebrow": "Первая волна",
    "waitlist.title.l1": "Хватит сидеть.",
    "waitlist.title.l2": "Пора идти.",
    "waitlist.lead":
      "YUP ещё в пути. Зову первой волной — без спама и серий писем «зачем тебе саморазвитие». Одно письмо, когда маршрут будет готов.",
    "waitlist.placeholder": "ты@почта.ру",
    "waitlist.submit": "В первую волну",
    "waitlist.submitting": "Записываем…",
    "waitlist.done": "Записал. До встречи у базы.",
    "waitlist.error": "Похоже, в адресе опечатка — проверь почту?",
    "waitlist.privacy":
      "Без рассылок. Без передачи третьим. Отписаться — в один клик.",

    // FAQ
    "faq.eyebrow": "FAQ",
    "faq.title.l1": "Часто",
    "faq.title.l2": "спрашивают.",
    "faq.contact": "Если ответа нет — пиши на почту:",
    "faq.q1.q": "Это очередная подписка на «успех»?",
    "faq.q1.a":
      "Нет. YUP не продаёт мотивацию и не раздаёт значки. Это инструмент дисциплины: чёткий маршрут, ежедневный шаг, видимый прогресс. Хочешь идти — идёшь. Не хочешь — никто не спасёт.",
    "faq.q2.q": "Где берётся контент — вы делаете свои курсы?",
    "faq.q2.a":
      "Нет. AI собирает маршрут из уже существующих лучших ресурсов: книги, курсы, видео, статьи, тренировки. Ты платишь не за контент — за маршрут.",
    "faq.q3.q": "Что если я пропущу день или неделю?",
    "faq.q3.a":
      "План перестраивается. Никаких сожжённых стриков и токсичных уведомлений. Возвращаешься — продолжаешь с точки, где темп тебе по силам сегодня.",
    "faq.q4.q": "Сколько времени в день нужно?",
    "faq.q4.a":
      "Минимум — 20 минут. Можно час, можно три. AI считает твоё реальное расписание. Главное — каждый день, а не один раз героически.",
    "faq.q5.q": "Сколько это будет стоить?",
    "faq.q5.a":
      "Базовый план — бесплатно: одна цель и полный маршрут. Полная версия — недорого, чтобы потянуть со стипендии. Точные цены объявляем первой волне — без скрытых платежей и подписок-ловушек.",
    "faq.q6.q": "Когда будет доступен?",
    "faq.q6.a":
      "Работаем над первой версией. Запись в waitlist выше — позовём первой волной, без рассылок и распродаж.",

    // Footer
    "footer.quote": "«Гора не ждёт.",
    "footer.quote.accent": "Она просто стоит.»",
    "footer.about":
      "YUP — маршрут самореализации для тех, кто решил не пройти свои 18–22 вслепую. Один путь. Один шаг в день. Одна вершина за раз.",
    "footer.col1.title": "Маршрут",
    "footer.col1.l1": "Как устроен",
    "footer.col1.l2": "Сферы",
    "footer.col1.l3": "Восхождение",
    "footer.col1.l4": "FAQ",
    "footer.col2.title": "Связь",
    "footer.col2.l2": "Записаться",
    "footer.copyright": "© {year} YUP. Иди до конца.",
    "footer.tagline": "Сделано для восхождения",

    // LK (Личный кабинет)
    "lk.header.dashboard": "Маршрут",
    "lk.header.plan": "План",
    "lk.header.spheres": "Сферы",
    "lk.header.ascent": "Восхождение",
    "lk.header.logout": "Выйти",
    "lk.header.rebuild": "Пересобрать план",
    "lk.header.rebuild.short": "Пересобрать",
    "lk.header.share.short": "Поделиться",

    // Share plan modal
    "lk.share.eyebrow": "ПОДЕЛИТЬСЯ МАРШРУТОМ",
    "lk.share.title": "Скопируй ссылку",
    "lk.share.lead":
      "Открыв ссылку, друг увидит твою цель и сферы — и сможет одним кликом собрать свой маршрут.",
    "lk.share.url.label": "Ссылка на твой маршрут",
    "lk.share.copy": "Скопировать",
    "lk.share.copied": "Готово",
    "lk.share.close": "Закрыть",
    "lk.share.native.cta": "Поделиться через систему…",
    "lk.share.native.title": "YUP — мой маршрут на 90 дней",
    "lk.share.native.text":
      "Собрал маршрут на 90 дней. Открой и собери свой — без логина.",
    "lk.share.note":
      "В ссылке только формулировка цели и сфер — без журнала и прогресса.",

    "lk.logout.eyebrow": "Сброс маршрута",
    "lk.logout.title": "Точно выйти?",
    "lk.logout.lead":
      "Это сотрёт твой текущий маршрут, историю дней, журналы и заморозки. Связки с базой пока нет — восстановить тоже нечем.",
    "lk.logout.cancel": "Отмена",
    "lk.logout.confirm": "Сбросить и начать заново",
    "lk.rebuild.eyebrow": "Пересборка",
    "lk.rebuild.title": "Пересобрать маршрут?",
    "lk.rebuild.lead":
      "Поля онбординга будут предзаполнены из текущего плана. Доведёшь до финального шага — старый маршрут и история будут заменены.",
    "lk.rebuild.cancel": "Не сейчас",
    "lk.rebuild.confirm": "Перейти к пересборке",
    "start.prefill.notice":
      "Поля предзаполнены из твоего текущего маршрута. Можно откорректировать и собрать заново.",
    "start.shared.notice":
      "Кто-то поделился с тобой маршрутом. Поля предзаполнены — поправь и собери свой.",
    "lk.topbar.eyebrow": "Восхождение",
    "lk.topbar.day": "День {day} / {total}",
    "lk.topbar.camp": "Лагерь I · Маршрут",
    "lk.topbar.greeting": "Доброе утро, альпинист.",
    "lk.hero.title.l1": "Сегодня —",
    "lk.hero.title.l2": "твой шаг.",
    "lk.hero.lead":
      "Пять шагов на сегодня. Не больше, не меньше. План адаптирован под вчерашний сон и сегодняшний график. Идём.",
    "lk.stat.streak.label": "Стрик",
    "lk.stat.streak.suffix": "дней подряд",
    "lk.stat.streak.suffix.one": "день подряд",
    "lk.stat.streak.suffix.few": "дня подряд",
    "lk.stat.streak.suffix.many": "дней подряд",
    "lk.stat.completed.label": "Готово сегодня",
    "lk.stat.completed.value": "{done} / {total}",
    "lk.stat.load.label": "Загрузка дня",
    "lk.stat.load.suffix": "минут",
    "lk.stat.load.suffix.one": "минута",
    "lk.stat.load.suffix.few": "минуты",
    "lk.stat.load.suffix.many": "минут",
    "lk.stat.peakwindow.label": "Окно фокуса",
    "lk.stat.peakwindow.value": "09:00–11:30",
    "lk.steps.eyebrow": "План на сегодня",
    "lk.steps.title.l1": "Пять шагов.",
    "lk.steps.title.l2": "Без отмазок.",
    "lk.steps.done": "Готово",
    "lk.steps.done.state": "Сделано",
    "lk.steps.skip": "Сдвинуть",
    "lk.steps.minutes": "мин",
    "lk.steps.s1.sphere": "Язык",
    "lk.steps.s1.title": "Испанский — 15 карточек",
    "lk.steps.s1.note": "Anki, deck B1·verbs, повторение + новые слова.",
    "lk.steps.s2.sphere": "Тело",
    "lk.steps.s2.title": "Базовая сила: присед + жим",
    "lk.steps.s2.note": "5×5 присед 70% RM, 5×5 жим 70% RM, кор — план B.",
    "lk.steps.s3.sphere": "Знания",
    "lk.steps.s3.title": "Deep Work — глава 4",
    "lk.steps.s3.note": "Кэл Ньюпорт. 25 мин чтения + 3 строки выписки.",
    "lk.steps.s4.sphere": "Привычки",
    "lk.steps.s4.title": "Утро без телефона: 30 мин",
    "lk.steps.s4.note": "После подъёма — вода, окно, дневник. Без ленты.",
    "lk.steps.s5.sphere": "Голова",
    "lk.steps.s5.title": "Вечерняя рефлексия — 3 строки",
    "lk.steps.s5.note": "Что зашло. Что слилось. Что меняем завтра.",
    "lk.spheres.eyebrow": "Сферы — прогресс",
    "lk.spheres.title.l1": "Где ты сейчас.",
    "lk.spheres.title.l2": "По чему идёшь.",
    "lk.spheres.lang.label": "Язык",
    "lk.spheres.lang.metric": "Испанский · B1.4 → B2",
    "lk.spheres.lang.streak": "19 дней",
    "lk.spheres.body.label": "Тело",
    "lk.spheres.body.metric": "Присед 1RM · 80 → 100 кг",
    "lk.spheres.body.streak": "3 тренировки / нед",
    "lk.spheres.knowledge.label": "Знания",
    "lk.spheres.knowledge.metric": "Книги · 4 из 12 в году",
    "lk.spheres.knowledge.streak": "27 мин/день",
    "lk.spheres.habits.label": "Привычки",
    "lk.spheres.habits.metric": "Утро без телефона",
    "lk.spheres.habits.streak": "23 дня",
    "lk.spheres.mind.label": "Голова",
    "lk.spheres.mind.metric": "Рефлексия · 18/30 в месяце",
    "lk.spheres.mind.streak": "60% месяца",
    "lk.ascent.eyebrow": "Восхождение",
    "lk.ascent.title": "Маршрут",
    "lk.ascent.current": "Ты здесь",
    "lk.ascent.c1.label": "База",
    "lk.ascent.c1.t": "Старт",
    "lk.ascent.c1.when": "Дни 1–7",
    "lk.ascent.c2.label": "Лагерь I",
    "lk.ascent.c2.t": "Маршрут",
    "lk.ascent.c2.when": "1–3 мес",
    "lk.ascent.c3.label": "Лагерь II",
    "lk.ascent.c3.t": "Плечо",
    "lk.ascent.c3.when": "3–6 мес",
    "lk.ascent.c4.label": "Вершина III",
    "lk.ascent.c4.t": "Вершина",
    "lk.ascent.c4.when": "Год+",
    "lk.ask.eyebrow": "AI — корректировка плана",
    "lk.ask.title": "Что поменять сегодня?",
    "lk.ask.lead":
      "Не спал — скажи. Прилетел дедлайн — скажи. AI пересоберёт маршрут так, чтобы ты не выпал с темпа.",
    "lk.ask.placeholder": "Например: «Сегодня сессия — сократи тренировку до 15 мин»",
    "lk.ask.cta": "Пересобрать день",
    "lk.ask.examples": "Подсказки:",
    "lk.ask.example1": "Не выспался",
    "lk.ask.example2": "Дедлайн вечером",
    "lk.ask.example3": "Хочу больше языка",
    "lk.ask.saved": "Заметка сохранена — увидишь её вечером",
    "lk.outro.title": "Гора не ждёт.",
    "lk.outro.accent": "Сделай шаг.",

    // Inline edit of daily-template steps
    "lk.editstep.eyebrow": "РЕДАКТИРОВАНИЕ ШАГА",
    "lk.editstep.title": "Подправить шаг",
    "lk.editstep.open": "Редактировать шаг",
    "lk.editstep.cancel": "Отмена",
    "lk.editstep.save": "Сохранить",
    "lk.editstep.title.label": "Заголовок",
    "lk.editstep.note.label": "Что именно делать",
    "lk.editstep.minutes.label": "Минуты в день",
    "lk.editstep.minutes.hint": "5–240, шаг 5",

    // Achievements
    "lk.achv.eyebrow": "ДОСТИЖЕНИЯ",
    "lk.achv.empty": "Пока пусто. Закрой первый шаг — появится «Первый шаг».",
    "lk.achv.first_step.t": "Первый шаг",
    "lk.achv.first_step.s": "Закрыт первый квест дня",
    "lk.achv.first_close.t": "Первый вечер",
    "lk.achv.first_close.s": "Закрыт первый день с журналом",
    "lk.achv.streak3.t": "3 дня подряд",
    "lk.achv.streak3.s": "Стрик длиной от трёх дней",
    "lk.achv.streak7.t": "Неделя",
    "lk.achv.streak7.s": "Семь дней дисциплины подряд",
    "lk.achv.streak30.t": "Месяц",
    "lk.achv.streak30.s": "Тридцать дней — это уже привычка",
    "lk.achv.perfectDay.t": "Чистый день",
    "lk.achv.perfectDay.s": "Все 5 шагов выполнены за один день",
    "lk.achv.campI.t": "Лагерь I",
    "lk.achv.campI.s": "Прошёл базу, держишь маршрут",
    "lk.achv.halfway.t": "Полпути",
    "lk.achv.halfway.s": "Закрыта половина дней маршрута",
    "lk.achv.allSpheres.t": "Все 5 сфер",
    "lk.achv.allSpheres.s": "Хотя бы один шаг закрыт во всех сферах за день",

    // Day notes preview inside CloseDayCard
    "lk.closeday.notes.title": "ЗАМЕТКИ ДНЯ",

    // Identity epigraph
    "lk.identity.prefix": "Я тот, кто",

    // Mountain visualization
    "lk.mountain.eyebrow": "ВОСХОЖДЕНИЕ",
    "lk.mountain.you": "Ты здесь",
    "lk.mountain.altitude": "Высота",
    "lk.mountain.summit": "Вершина",
    "lk.mountain.base": "База",
    "lk.mountain.distance.before": "До вершины",
    "lk.mountain.distance.after": "осталось",
    "lk.mountain.days": "дн.",

    // 14-day history heatmap
    "lk.history.eyebrow": "ПОСЛЕДНИЕ 14 ДНЕЙ",
    "lk.history.legend.empty": "пусто",
    "lk.history.legend.partial": "частично",
    "lk.history.legend.full": "5 / 5",
    "lk.history.legend.closed": "закрыт",
    "lk.history.legend.frozen": "заморозка",
    "lk.history.tooltip.done": "Готово {n} / 5",
    "lk.history.tooltip.closed": "Журнал закрыт",
    "lk.history.tooltip.frozen": "Заморозка стрика",
    "lk.history.empty": "Появится после первого дня.",

    // Close day modal
    "lk.closeday.eyebrow": "ВЕЧЕРНИЙ ЖУРНАЛ",
    "lk.closeday.title": "Закрыть день",
    "lk.closeday.lead": "Три строки. Чтобы AI знал, где ты завтра.",
    "lk.closeday.good.label": "Что зашло",
    "lk.closeday.good.ph": "Что получилось, чем я доволен.",
    "lk.closeday.lost.label": "Что слилось",
    "lk.closeday.lost.ph": "Что не сделал и почему.",
    "lk.closeday.tomorrow.label": "Что меняем завтра",
    "lk.closeday.tomorrow.ph": "Один вывод на завтра — без размазни.",
    "lk.closeday.cta": "Закрыть день",
    "lk.closeday.cta.short": "Закрыть",
    "lk.closeday.cancel": "Отмена",
    "lk.closeday.reopen": "Открыть заново",
    "lk.closeday.closed": "День закрыт",
    "lk.closeday.closed.at": "в {time}",

    // Streak freeze
    "lk.freeze.available": "Заморозка доступна",
    "lk.freeze.used": "Использована",
    "lk.freeze.hint": "1 в неделю — не сжигает стрик",
    "lk.freeze.cta": "Использовать заморозку",
    "lk.freeze.confirm.title": "Поставить заморозку на вчера?",
    "lk.freeze.confirm.lead": "Стрик сохранится, как будто день был закрыт.",
    "lk.freeze.confirm.cta": "Заморозить",

    // LK empty state (no plan yet)
    "lk.empty.eyebrow": "Маршрут не задан",
    "lk.empty.title.l1": "Сначала —",
    "lk.empty.title.l2": "вершина.",
    "lk.empty.lead":
      "У тебя ещё нет маршрута. Собери его — это минута. План адаптирован под твои часы и сферы.",
    "lk.empty.cta": "Собрать маршрут",
    "lk.empty.reset": "Сбросить локальные данные",

    // /start onboarding
    "start.head.eyebrow": "Маршрут на 90 дней",
    "start.head.title.l1": "Назови вершину.",
    "start.head.title.l2": "Соберём маршрут.",
    "start.progress.of": "Шаг {cur} из {total}",
    "start.nav.back": "Назад",
    "start.nav.next": "Дальше",
    "start.nav.generate": "Собрать маршрут",
    "start.nav.go": "Идём",
    "start.nav.refine": "Доработать",

    "start.s1.eyebrow": "Шаг 1 · Вершина",
    "start.s1.title": "Чего хочешь к вершине через 90 дней?",
    "start.s1.lead":
      "Свободным текстом. Опиши себя через 90 дней — кто ты, что умеешь, как живёшь. Ниже — пять опциональных сфер.",
    "start.s1.goal.label": "Главная цель",
    "start.s1.goal.placeholder":
      "Например: к августу свободно говорю на испанском, делаю присед 100 кг, прочитал 6 книг по AI, держу утренний ритуал.",
    "start.s1.identity.eyebrow": "ИДЕНТИЧНОСТЬ",
    "start.s1.identity.label":
      "Закончи фразу — это будет твой якорь на каждое утро.",
    "start.s1.identity.prefix": "Я тот, кто",
    "start.s1.identity.placeholder": "встаёт раньше, чем спорит с собой.",
    "start.s1.identity.hint":
      "Манифест в одну строку. Не результат — а кто ты, когда выбираешь маршрут.",
    "start.s1.spheres.title": "Сферы",
    "start.s1.spheres.optional": "Можно пропустить. Заполни только то, что важно.",
    "start.s1.sphere.from": "Сейчас",
    "start.s1.sphere.to": "Куда",
    "start.s1.sphere.lang.label": "Язык",
    "start.s1.sphere.lang.hint": "Испанский · B1 → B2",
    "start.s1.sphere.body.label": "Тело",
    "start.s1.sphere.body.hint": "Присед 80 → 100 кг",
    "start.s1.sphere.knowledge.label": "Знания",
    "start.s1.sphere.knowledge.hint": "12 книг по AI / 6 эссе",
    "start.s1.sphere.habits.label": "Привычки",
    "start.s1.sphere.habits.hint": "Утро без телефона · 60 дней",
    "start.s1.sphere.mind.label": "Голова",
    "start.s1.sphere.mind.hint": "3 строки рефлексии / день",
    "start.s1.error":
      "Опиши вершину одним-двумя предложениями (или заполни хотя бы одну сферу).",

    "start.s2.eyebrow": "Шаг 2 · Контекст",
    "start.s2.title": "Сколько готов вкладывать?",
    "start.s2.lead":
      "AI учтёт это при сборке плана. Не геройствуй — лучше 30 мин каждый день, чем 3 часа раз в неделю.",
    "start.s2.time.label": "Минут в день",
    "start.s2.time.suffix": "мин",
    "start.s2.window.label": "Окно фокуса",
    "start.s2.window.morning": "Утро · 06–12",
    "start.s2.window.day": "День · 12–18",
    "start.s2.window.evening": "Вечер · 18–22",
    "start.s2.obstacles.label": "Главные блоки",
    "start.s2.obstacles.lead":
      "Что чаще всего срывает темп? Можно выбрать несколько.",
    "start.s2.obs.procrastination": "Прокрастинация",
    "start.s2.obs.rhythm": "Нет режима",
    "start.s2.obs.deadlines": "Слитные дедлайны",
    "start.s2.obs.invisible": "Не вижу прогресса",
    "start.s2.obs.social": "Соц-сети",
    "start.s2.obs.sleep": "Не высыпаюсь",

    "start.s3.eyebrow": "Шаг 3 · Превью",
    "start.s3.title.l1": "Вот твой маршрут.",
    "start.s3.title.l2": "90 дней.",
    "start.s3.lead":
      "AI собрал этапы и дневной шаблон из 5 шагов. Стартуем сегодня — день 1.",
    "start.s3.arc.title": "Маршрут",
    "start.s3.daily.title": "Дневной шаблон",
    "start.s3.daily.subtitle": "{total} мин в день · 5 шагов",
    "start.s3.tip":
      "Это твой первый набросок — план можно пересобрать позже, прямо из ЛК.",

    "lk.spheres.streak.days": "{days} дней подряд",

    "lk.level.title": "Текущий этап",
    "lk.level.day": "День",
    "lk.level.xp": "Прогресс",
    "lk.level.toSummit": "До вершины",
    "lk.level.daysShort": "дн.",
    "lk.quests.eyebrow": "Квесты дня",
    "lk.radar.eyebrow": "Сферы",
    "lk.radar.sphere": "{n} осей",
  },
  en: {
    // Header
    "header.nav.route": "Route",
    "header.nav.spheres": "Spheres",
    "header.nav.ascent": "Ascent",
    "header.nav.faq": "FAQ",
    "header.cta.signup": "Join",
    "header.cta.signup.suffix": "— it's free",
    "header.cta.signup.short": "Join",

    // Hero
    "hero.title.l1": "The summit —",
    "hero.title.l2": "is a choice.",
    "hero.intro":
      "YUP is one route across language, body, knowledge, and side projects. AI builds the plan around your semester and your life. You walk it. Every day. No scatter, no excuses.",
    "hero.cta.steps": "How it works",
    "hero.cta.steps.suffix": "/ 3 steps",
    "hero.cta.start": "Start the climb",
    "hero.stat1.kpi": "10×",
    "hero.stat1.caption":
      "Less scatter — one plan instead of ten apps pulling at you.",
    "hero.stat2.kpi": "365",
    "hero.stat2.caption":
      "Days in a year. Each one — a step toward who you'll be a year from now.",
    "hero.spheres.lang": "Language",
    "hero.spheres.body": "Body",
    "hero.spheres.knowledge": "Knowledge",
    "hero.spheres.habits": "Habits",
    "hero.spheres.mind": "Mind",

    // Problem
    "problem.eyebrow": "Why self-development fails",
    "problem.title.l1": "Ten apps.",
    "problem.title.l2": "Zero summits.",
    "problem.lead":
      "Languages in one, workouts in another, notes in a third, meditation in a fourth. Each demands all of you. Each pulls in its own direction. None of them know you've got 24 hours in a day and you're wrecked tonight.",
    "problem.lead2":
      "YUP looks at the goal, not the tracker. One route. One plan per day. One vector —",
    "problem.lead2.accent": "up",
    "problem.card1.t": "Scatter",
    "problem.card1.d":
      "5+ tools, zero finished goals. YUP merges everything into a single route.",
    "problem.card2.t": "Overload",
    "problem.card2.d":
      "A 3-hour daily plan that you abandon by day three. YUP measures real load.",
    "problem.card3.t": "Silence",
    "problem.card3.d":
      "Nobody notices you're moving. Except yourself. YUP sees it and adjusts the pace.",

    // HowItWorks
    "how.eyebrow": "How the route works",
    "how.title.l1": "Four steps.",
    "how.title.l2": "And you're moving.",
    "how.lead":
      "No hour-long surveys, no abstract \"personalization.\" You name the goal — the system answers with a concrete route and the first step you can take right now.",
    "how.s1.t": "Name the summit",
    "how.s1.d":
      "Describe the goal in plain words. English to B2 in a year. Do 20 pull-ups. Ship a side project. Don't blow your semester. That's the summit.",
    "how.s2.t": "AI maps the route",
    "how.s2.d":
      "In a couple of minutes — a personal path for the month ahead. Concrete steps, the best sources, a realistic pace. No content spam for the sake of content.",
    "how.s3.t": "Walk it every day",
    "how.s3.d":
      "In the morning — today's list of steps. It accounts for sleep, rhythm, yesterday's state. Miss a day — the plan re-routes, it doesn't break.",
    "how.s4.t": "Take the summit",
    "how.s4.d":
      "Clear rhythm. Measurements. Visible progress. Then immediately — the next one, higher. YUP doesn't leave you on the plateau.",

    // Domains
    "domains.eyebrow": "Spheres of growth",
    "domains.title.l1": "Five spheres.",
    "domains.title.l2": "One person.",
    "domains.lead":
      "YUP doesn't lock you into one niche. You can move across several spheres in parallel — the plan accounts for the fact that you've got one day and one head.",
    "domains.lang.t": "Language",
    "domains.lang.d":
      "English, Spanish, German. Speak fluently, don't sit in grammar drills. Vocab, conversation, immersion.",
    "domains.body.t": "Body",
    "domains.body.d":
      "Strength, endurance, shape. Training adapts to sleep and recovery. Load grows, doesn't break you.",
    "domains.knowledge.t": "Knowledge",
    "domains.knowledge.d":
      "Books, courses, articles — picked for the goal. 20–30 minutes a day. Notes, reviews, real application.",
    "domains.habits.t": "Habits",
    "domains.habits.d":
      "Small, daily, no aggressive streaks. Slipped — the plan re-routes, it doesn't collapse.",
    "domains.mind.t": "Mind",
    "domains.mind.d":
      "Breath, reflection, meditation. Not for a checkbox — as a way to release tension and hold focus on the goal.",

    // Journey
    "journey.eyebrow": "Ascent",
    "journey.title.l1": "From base —",
    "journey.title.l2": "to summit.",
    "journey.lead":
      "Ascent is not a weekend marathon. It's a system that keeps you moving when motivation runs out. And it always runs out.",
    "journey.c1.label": "Base",
    "journey.c1.t": "Start",
    "journey.c1.when": "Day 1–7",
    "journey.c1.d":
      "Goal named. AI hands you the first trail — for 7 days. An easy entry to start trusting the pace.",
    "journey.c2.label": "Camp",
    "journey.c2.t": "Route",
    "journey.c2.when": "Month 1–3",
    "journey.c2.d":
      "Daily rhythm. The plan adapts to life — classes, deadlines, finals week, a sleepless night. The point is — don't stop.",
    "journey.c3.label": "Camp",
    "journey.c3.t": "Shoulder",
    "journey.c3.when": "Month 3–6",
    "journey.c3.d":
      "Habits hold. Results show — words, shape, clarity. Now — the final push to the ridge.",
    "journey.c4.label": "Summit",
    "journey.c4.t": "Summit",
    "journey.c4.when": "Year+",
    "journey.c4.d":
      "Goal taken. You see how far you've come. YUP becomes your partner on the next ascent.",

    // Billboard
    "billboard.l1": "The summit.",
    "billboard.l2": "Today.",
    "billboard.l3": "No excuses.",
    "billboard.cta": "Start the climb",
    "billboard.tag": "Think you can?",

    // Waitlist
    "waitlist.eyebrow": "First wave",
    "waitlist.title.l1": "Stop sitting.",
    "waitlist.title.l2": "Time to walk.",
    "waitlist.lead":
      "YUP is still on its way. I'm calling the first wave — no spam, no \"why you need self-development\" email series. One letter when the route is ready.",
    "waitlist.placeholder": "you@email.com",
    "waitlist.submit": "Join the first wave",
    "waitlist.submitting": "Sending…",
    "waitlist.done": "You're in. See you at base.",
    "waitlist.error": "Looks like a typo — check the address?",
    "waitlist.privacy":
      "No newsletters. No third parties. Unsubscribe in one click.",

    // FAQ
    "faq.eyebrow": "FAQ",
    "faq.title.l1": "Frequently",
    "faq.title.l2": "asked.",
    "faq.contact": "No answer here? Email:",
    "faq.q1.q": "Is this another \"success\" subscription?",
    "faq.q1.a":
      "No. YUP doesn't sell motivation and doesn't hand out badges. It's a discipline tool: a clear route, a daily step, visible progress. You want to walk — you walk. You don't — nobody saves you.",
    "faq.q2.q": "Where does the content come from — do you make courses?",
    "faq.q2.a":
      "No. AI assembles the route from the best existing resources: books, courses, videos, articles, workouts. You're not paying for content — you're paying for the route.",
    "faq.q3.q": "What if I miss a day or a week?",
    "faq.q3.a":
      "The plan re-routes. No burned streaks, no toxic notifications. You come back — you continue from a point that fits your pace today.",
    "faq.q4.q": "How much time per day do I need?",
    "faq.q4.a":
      "Minimum — 20 minutes. Could be an hour, could be three. AI reads your real schedule. The point is — every day, not once heroically.",
    "faq.q5.q": "Does this work for both men and women?",
    "faq.q5.a":
      "Yes. YUP isn't about \"successful success\" or soft affirmations. It's about a goal and the path to it — equally for everyone who wants to get there.",
    "faq.q6.q": "When will it be available?",
    "faq.q6.a":
      "We're working on the first version. The waitlist above — we'll call you in the first wave, no newsletters or sales.",

    // Footer
    "footer.quote": "\"The mountain doesn't wait.",
    "footer.quote.accent": "It just stands.\"",
    "footer.about":
      "YUP — a self-realization route for anyone who refuses to walk through their 18–22 blind. One path. One step a day. One summit at a time.",
    "footer.col1.title": "Route",
    "footer.col1.l1": "How it works",
    "footer.col1.l2": "Spheres",
    "footer.col1.l3": "Ascent",
    "footer.col1.l4": "FAQ",
    "footer.col2.title": "Contact",
    "footer.col2.l2": "Join",
    "footer.copyright": "© {year} YUP. Walk to the end.",
    "footer.tagline": "Made for the climb",

    // LK (Dashboard)
    "lk.header.dashboard": "Route",
    "lk.header.plan": "Plan",
    "lk.header.spheres": "Spheres",
    "lk.header.ascent": "Ascent",
    "lk.header.logout": "Sign out",
    "lk.header.rebuild": "Rebuild plan",
    "lk.header.rebuild.short": "Rebuild",
    "lk.header.share.short": "Share",

    // Share plan modal
    "lk.share.eyebrow": "SHARE THE ROUTE",
    "lk.share.title": "Copy the link",
    "lk.share.lead":
      "Open this link and a friend will see your goal and spheres — they can build their own route with one click.",
    "lk.share.url.label": "Link to your route",
    "lk.share.copy": "Copy",
    "lk.share.copied": "Copied",
    "lk.share.close": "Close",
    "lk.share.native.cta": "Share via system…",
    "lk.share.native.title": "YUP — my 90-day route",
    "lk.share.native.text":
      "I built a 90-day route. Open it and build your own — no login.",
    "lk.share.note":
      "The link only carries the goal and sphere descriptions — no journal or progress.",

    "lk.logout.eyebrow": "Reset route",
    "lk.logout.title": "Sign out?",
    "lk.logout.lead":
      "This wipes your current route, day history, journals and freezes. There's no remote backup yet, so this can't be undone.",
    "lk.logout.cancel": "Cancel",
    "lk.logout.confirm": "Reset and start over",
    "lk.rebuild.eyebrow": "Rebuild",
    "lk.rebuild.title": "Rebuild the route?",
    "lk.rebuild.lead":
      "Onboarding fields will be prefilled from your current plan. Once you finish the final step, the old route and history are replaced.",
    "lk.rebuild.cancel": "Not now",
    "lk.rebuild.confirm": "Go to rebuild",
    "start.prefill.notice":
      "Fields are prefilled from your current route. Tweak anything and rebuild.",
    "start.shared.notice":
      "Someone shared a route with you. Tweak the fields and build your own.",
    "lk.topbar.eyebrow": "Ascent",
    "lk.topbar.day": "Day {day} / {total}",
    "lk.topbar.camp": "Camp I · Route",
    "lk.topbar.greeting": "Good morning, climber.",
    "lk.hero.title.l1": "Today —",
    "lk.hero.title.l2": "your step.",
    "lk.hero.lead":
      "Five steps for today. Not more, not less. The plan is tuned to last night's sleep and today's calendar. Walk.",
    "lk.stat.streak.label": "Streak",
    "lk.stat.streak.suffix": "days in a row",
    "lk.stat.streak.suffix.one": "day in a row",
    "lk.stat.streak.suffix.other": "days in a row",
    "lk.stat.completed.label": "Done today",
    "lk.stat.load.suffix.one": "minute",
    "lk.stat.load.suffix.other": "minutes",
    "lk.stat.completed.value": "{done} / {total}",
    "lk.stat.load.label": "Today's load",
    "lk.stat.load.suffix": "minutes",
    "lk.stat.peakwindow.label": "Focus window",
    "lk.stat.peakwindow.value": "09:00–11:30",
    "lk.steps.eyebrow": "Today's plan",
    "lk.steps.title.l1": "Five steps.",
    "lk.steps.title.l2": "No excuses.",
    "lk.steps.done": "Done",
    "lk.steps.done.state": "Done",
    "lk.steps.skip": "Reschedule",
    "lk.steps.minutes": "min",
    "lk.steps.s1.sphere": "Language",
    "lk.steps.s1.title": "Spanish — 15 cards",
    "lk.steps.s1.note": "Anki, deck B1·verbs, review + new words.",
    "lk.steps.s2.sphere": "Body",
    "lk.steps.s2.title": "Base strength: squat + press",
    "lk.steps.s2.note": "5×5 squat at 70% RM, 5×5 press at 70% RM, core — plan B.",
    "lk.steps.s3.sphere": "Knowledge",
    "lk.steps.s3.title": "Deep Work — Chapter 4",
    "lk.steps.s3.note": "Cal Newport. 25 min reading + 3 lines of notes.",
    "lk.steps.s4.sphere": "Habits",
    "lk.steps.s4.title": "Phone-free morning: 30 min",
    "lk.steps.s4.note": "After waking — water, window, journal. No feed.",
    "lk.steps.s5.sphere": "Mind",
    "lk.steps.s5.title": "Evening reflection — 3 lines",
    "lk.steps.s5.note": "What worked. What slipped. What changes tomorrow.",
    "lk.spheres.eyebrow": "Spheres — progress",
    "lk.spheres.title.l1": "Where you are.",
    "lk.spheres.title.l2": "What you're walking.",
    "lk.spheres.lang.label": "Language",
    "lk.spheres.lang.metric": "Spanish · B1.4 → B2",
    "lk.spheres.lang.streak": "19 days",
    "lk.spheres.body.label": "Body",
    "lk.spheres.body.metric": "Squat 1RM · 80 → 100 kg",
    "lk.spheres.body.streak": "3 sessions / week",
    "lk.spheres.knowledge.label": "Knowledge",
    "lk.spheres.knowledge.metric": "Books · 4 of 12 this year",
    "lk.spheres.knowledge.streak": "27 min/day",
    "lk.spheres.habits.label": "Habits",
    "lk.spheres.habits.metric": "Phone-free mornings",
    "lk.spheres.habits.streak": "23 days",
    "lk.spheres.mind.label": "Mind",
    "lk.spheres.mind.metric": "Reflection · 18/30 this month",
    "lk.spheres.mind.streak": "60% of month",
    "lk.ascent.eyebrow": "Ascent",
    "lk.ascent.title": "Route",
    "lk.ascent.current": "You're here",
    "lk.ascent.c1.label": "Base",
    "lk.ascent.c1.t": "Start",
    "lk.ascent.c1.when": "Days 1–7",
    "lk.ascent.c2.label": "Camp I",
    "lk.ascent.c2.t": "Route",
    "lk.ascent.c2.when": "Month 1–3",
    "lk.ascent.c3.label": "Camp II",
    "lk.ascent.c3.t": "Shoulder",
    "lk.ascent.c3.when": "Month 3–6",
    "lk.ascent.c4.label": "Summit III",
    "lk.ascent.c4.t": "Summit",
    "lk.ascent.c4.when": "Year+",
    "lk.ask.eyebrow": "AI — adjust the plan",
    "lk.ask.title": "What to change today?",
    "lk.ask.lead":
      "Didn't sleep — tell it. Got a deadline — tell it. AI rebuilds the route so you don't fall off the pace.",
    "lk.ask.placeholder": "e.g. \"Exam today — cut training to 15 min\"",
    "lk.ask.cta": "Rebuild the day",
    "lk.ask.examples": "Hints:",
    "lk.ask.example1": "Didn't sleep",
    "lk.ask.example2": "Deadline tonight",
    "lk.ask.example3": "More language",
    "lk.ask.saved": "Saved — you'll see it this evening",
    "lk.outro.title": "The mountain doesn't wait.",
    "lk.outro.accent": "Take the step.",

    // Inline edit of daily-template steps
    "lk.editstep.eyebrow": "EDIT STEP",
    "lk.editstep.title": "Tune the step",
    "lk.editstep.open": "Edit step",
    "lk.editstep.cancel": "Cancel",
    "lk.editstep.save": "Save",
    "lk.editstep.title.label": "Title",
    "lk.editstep.note.label": "What exactly to do",
    "lk.editstep.minutes.label": "Minutes per day",
    "lk.editstep.minutes.hint": "5–240, step 5",

    // Achievements
    "lk.achv.eyebrow": "ACHIEVEMENTS",
    "lk.achv.empty": "Nothing yet. Close your first step to unlock \"First step\".",
    "lk.achv.first_step.t": "First step",
    "lk.achv.first_step.s": "You closed your first daily quest",
    "lk.achv.first_close.t": "First evening",
    "lk.achv.first_close.s": "First day closed with a journal entry",
    "lk.achv.streak3.t": "3 days in a row",
    "lk.achv.streak3.s": "Streak of at least three days",
    "lk.achv.streak7.t": "One week",
    "lk.achv.streak7.s": "Seven days of discipline in a row",
    "lk.achv.streak30.t": "One month",
    "lk.achv.streak30.s": "Thirty days — that's a habit now",
    "lk.achv.perfectDay.t": "Clean day",
    "lk.achv.perfectDay.s": "All 5 steps closed in a single day",
    "lk.achv.campI.t": "Camp I",
    "lk.achv.campI.s": "Past base, holding the route",
    "lk.achv.halfway.t": "Halfway",
    "lk.achv.halfway.s": "Half of the route's days are done",
    "lk.achv.allSpheres.t": "All 5 spheres",
    "lk.achv.allSpheres.s": "At least one step in every sphere closed in a day",

    // Day notes preview inside CloseDayCard
    "lk.closeday.notes.title": "DAY NOTES",

    // Identity epigraph
    "lk.identity.prefix": "I am the kind of person who",

    // Mountain visualization
    "lk.mountain.eyebrow": "ASCENT",
    "lk.mountain.you": "You're here",
    "lk.mountain.altitude": "Altitude",
    "lk.mountain.summit": "Summit",
    "lk.mountain.base": "Base",
    "lk.mountain.distance.before": "Summit in",
    "lk.mountain.distance.after": "left",
    "lk.mountain.days": "d.",

    // 14-day history heatmap
    "lk.history.eyebrow": "LAST 14 DAYS",
    "lk.history.legend.empty": "empty",
    "lk.history.legend.partial": "partial",
    "lk.history.legend.full": "5 / 5",
    "lk.history.legend.closed": "closed",
    "lk.history.legend.frozen": "freeze",
    "lk.history.tooltip.done": "Done {n} / 5",
    "lk.history.tooltip.closed": "Journal closed",
    "lk.history.tooltip.frozen": "Streak freeze",
    "lk.history.empty": "Appears after your first day.",

    // Close day modal
    "lk.closeday.eyebrow": "EVENING JOURNAL",
    "lk.closeday.title": "Close the day",
    "lk.closeday.lead": "Three lines. So the AI knows where you are tomorrow.",
    "lk.closeday.good.label": "What worked",
    "lk.closeday.good.ph": "What landed, what I am proud of.",
    "lk.closeday.lost.label": "What slipped",
    "lk.closeday.lost.ph": "What I missed and why.",
    "lk.closeday.tomorrow.label": "What we change tomorrow",
    "lk.closeday.tomorrow.ph": "One conclusion for tomorrow — sharp.",
    "lk.closeday.cta": "Close the day",
    "lk.closeday.cta.short": "Close",
    "lk.closeday.cancel": "Cancel",
    "lk.closeday.reopen": "Reopen",
    "lk.closeday.closed": "Day closed",
    "lk.closeday.closed.at": "at {time}",

    // Streak freeze
    "lk.freeze.available": "Freeze available",
    "lk.freeze.used": "Freeze used",
    "lk.freeze.hint": "1 per week — keeps your streak",
    "lk.freeze.cta": "Use freeze",
    "lk.freeze.confirm.title": "Freeze yesterday?",
    "lk.freeze.confirm.lead": "Your streak stays as if the day was closed.",
    "lk.freeze.confirm.cta": "Freeze",

    // LK empty state (no plan yet)
    "lk.empty.eyebrow": "No route yet",
    "lk.empty.title.l1": "First —",
    "lk.empty.title.l2": "the summit.",
    "lk.empty.lead":
      "You don't have a route yet. Build it — takes a minute. The plan is fitted to your hours and your spheres.",
    "lk.empty.cta": "Build the route",
    "lk.empty.reset": "Reset local data",

    // /start onboarding
    "start.head.eyebrow": "90-day route",
    "start.head.title.l1": "Name the summit.",
    "start.head.title.l2": "We'll build the route.",
    "start.progress.of": "Step {cur} of {total}",
    "start.nav.back": "Back",
    "start.nav.next": "Next",
    "start.nav.generate": "Build the route",
    "start.nav.go": "Let's go",
    "start.nav.refine": "Refine",

    "start.s1.eyebrow": "Step 1 · Summit",
    "start.s1.title": "What do you want 90 days from now?",
    "start.s1.lead":
      "Plain words. Describe yourself in 90 days — who you are, what you can do, how you live. Five optional spheres below.",
    "start.s1.goal.label": "Main goal",
    "start.s1.goal.placeholder":
      "e.g. by August I speak Spanish fluently, squat 100 kg, finished 6 AI books, keep a morning ritual.",
    "start.s1.identity.eyebrow": "IDENTITY",
    "start.s1.identity.label":
      "Finish the line — your anchor for every single morning.",
    "start.s1.identity.prefix": "I am the kind of person who",
    "start.s1.identity.placeholder": "shows up before doubt does.",
    "start.s1.identity.hint":
      "One sentence. Not a result — who you are when you choose the climb.",
    "start.s1.spheres.title": "Spheres",
    "start.s1.spheres.optional":
      "Optional. Fill in only what matters.",
    "start.s1.sphere.from": "Now",
    "start.s1.sphere.to": "To",
    "start.s1.sphere.lang.label": "Language",
    "start.s1.sphere.lang.hint": "Spanish · B1 → B2",
    "start.s1.sphere.body.label": "Body",
    "start.s1.sphere.body.hint": "Squat 80 → 100 kg",
    "start.s1.sphere.knowledge.label": "Knowledge",
    "start.s1.sphere.knowledge.hint": "12 AI books / 6 essays",
    "start.s1.sphere.habits.label": "Habits",
    "start.s1.sphere.habits.hint": "Phone-free morning · 60 days",
    "start.s1.sphere.mind.label": "Mind",
    "start.s1.sphere.mind.hint": "3 lines of reflection per day",
    "start.s1.error":
      "Describe the summit in one or two sentences (or fill at least one sphere).",

    "start.s2.eyebrow": "Step 2 · Context",
    "start.s2.title": "How much can you put in?",
    "start.s2.lead":
      "AI uses this to size the plan. Don't be a hero — 30 min daily beats 3 hours once a week.",
    "start.s2.time.label": "Minutes per day",
    "start.s2.time.suffix": "min",
    "start.s2.window.label": "Focus window",
    "start.s2.window.morning": "Morning · 06–12",
    "start.s2.window.day": "Day · 12–18",
    "start.s2.window.evening": "Evening · 18–22",
    "start.s2.obstacles.label": "Biggest blockers",
    "start.s2.obstacles.lead":
      "What breaks your pace most often? Pick one or several.",
    "start.s2.obs.procrastination": "Procrastination",
    "start.s2.obs.rhythm": "No rhythm",
    "start.s2.obs.deadlines": "Deadlines pile up",
    "start.s2.obs.invisible": "Can't see progress",
    "start.s2.obs.social": "Social feeds",
    "start.s2.obs.sleep": "Not sleeping enough",

    "start.s3.eyebrow": "Step 3 · Preview",
    "start.s3.title.l1": "Here is your route.",
    "start.s3.title.l2": "90 days.",
    "start.s3.lead":
      "AI assembled the stages and a daily template of 5 steps. We start today — day 1.",
    "start.s3.arc.title": "Route",
    "start.s3.daily.title": "Daily template",
    "start.s3.daily.subtitle": "{total} min per day · 5 steps",
    "start.s3.tip":
      "This is your first draft — you can rebuild the plan later from the dashboard.",

    "lk.spheres.streak.days": "{days} days so far",

    "lk.level.title": "Current stage",
    "lk.level.day": "Day",
    "lk.level.xp": "Progress",
    "lk.level.toSummit": "To the summit",
    "lk.level.daysShort": "d.",
    "lk.quests.eyebrow": "Quests of the day",
    "lk.radar.eyebrow": "Spheres",
    "lk.radar.sphere": "{n} axes",
  },
} as const;

export type TranslationKey = keyof typeof translations.ru;

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "ru";
  const lang = (navigator.language || "ru").toLowerCase();
  if (lang.startsWith("ru") || lang.startsWith("uk") || lang.startsWith("be")) {
    return "ru";
  }
  return "en";
}
