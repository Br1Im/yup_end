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
