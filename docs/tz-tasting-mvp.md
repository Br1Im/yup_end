# YUP — ТЗ: Tasting MVP

**Версия:** v0.1
**Дата:** 2026-04-27
**Авторство:** Br_1_Im
**Целевые сроки:** 3–4 недели до публичного запуска

---

## 1. Цель и scope

### Что мы строим
**«Tasting MVP»** — облегчённая версия YUP, в которой пользователь:
1. Описывает свою цель свободным текстом
2. Отвечает на 2–3 уточняющих вопроса
3. Получает **wow-момент** — красиво оформленный персональный 30-дневный маршрут от AI
4. Видит первый шаг на сегодня
5. Записывается в waitlist полной версии

**Бизнес-цель:** на старте — не делать платный SaaS, а **захватить рано-adopter-аудиторию** через впечатляющий free-experience и собрать waitlist 500–2000 человек.

### Что НЕ делаем в tasting MVP

- ❌ Платный тариф / Telegram Stars / премиум-фичи
- ❌ Ежедневные check-ins (галочка «сделал/не сделал»)
- ❌ Долговременное retention (стрики, уведомления, коучинг)
- ❌ Несколько целей одновременно
- ❌ AI-чат / диалог с ботом
- ❌ Re-routing при пропуске дней
- ❌ Социальные фичи / лидерборды
- ❌ Прогресс-аналитика
- ❌ Native mobile apps

Всё это — **V1 (после tasting)**, когда уже есть waitlist и подтверждение, что продукт нужен.

### Метрики успеха tasting MVP

| Метрика | Цель к концу 30 дней публичного запуска |
|---|---|
| Регистрации в Mini App (`tg_id` в БД) | 500+ |
| % дошёл до экрана плана (wow-момент) | 70%+ |
| % записался в waitlist после плана | 35%+ |
| % вернулся на 2-й день | 40%+ |
| Сред. AI-стоимость / пользователь | $0 (на free-tier) |
| Время от старта до плана | < 90 сек |

Главная метрика: **конверсия «открыл бот → записан в waitlist»**. Цель: 25%+ к концу первого месяца.

---

## 2. User flows

### Flow A — главный (90% пользователей)

```
1. [Маркетинг] TikTok/TG-канал → лендинг yup.app
2. [Лендинг] CTA «Попробовать бесплатно» → t.me/yup_app_bot
3. [TG бот] Сообщение приветствия + кнопка «Открыть YUP» → запускает Mini App
4. [Mini App, экран 1 — Welcome]
   - Заголовок: "Назови вершину"
   - Описание: "AI соберёт твой маршрут на 30 дней. 90 секунд. Бесплатно."
   - Поле ввода: "Я хочу..."
   - Примеры под полем (placeholder rotation): "...выучить английский до B2", "...подтянуться 20 раз", "...запустить pet-проект"
   - Кнопка "Дальше"
5. [Mini App, экран 2 — Уточнение]
   - 3 вопроса (квиз-формат, по одному на экран):
     a. "Сколько у тебя времени в день?"
        Опции: 15-30 мин / 30-60 мин / 1-2 часа / больше
     b. "Какой у тебя сейчас уровень?"
        Опции: с нуля / базовый / средний / продвинутый
     c. "Когда хочешь дойти?"
        Опции: 30 дней / 3 месяца / полгода / год
6. [Mini App, экран 3 — AI генерит]
   - "AI собирает твой маршрут..." (анимация ~5–15 сек)
   - В этот момент — POST /api/route запускается на бэке
7. [Mini App, экран 4 — План] — WOW МОМЕНТ
   - Главный заголовок: "Твой маршрут"
   - 4 фазы с временной шкалой:
     - "База" (день 1–7): 3–5 первых шагов
     - "Лагерь 1" (день 8–14): концентрированные действия
     - "Лагерь 2" (день 15–21): углубление
     - "Вершина" (день 22–30): финальный рывок
   - Под каждой фазой — конкретные шаги с ресурсами (видео, книги, упражнения)
   - Внизу: блок "Сегодня" — конкретный первый шаг + кнопка "Сделал"
8. [Mini App, экран 5 — Waitlist]
   - После взаимодействия с планом ИЛИ через 30 секунд показа
   - Заголовок: "Хочешь идти этот маршрут до конца?"
   - Текст: "Tasting — это превью. Полная версия с ежедневным AI-сопровождением — скоро."
   - Поле email (опционально, prefill из TG если есть)
   - Кнопка "В первую волну"
9. [TG бот] Через 1 минуту после waitlist — push: "Записал тебя. Завтра пришлю день 2 твоего маршрута. Не пропадай."
10. [TG бот] Через 24 часа — день 2 (если активирован follow-up loop)
```

### Flow B — повторное открытие (10% пользователей)

```
1. Пользователь открывает Mini App второй раз
2. [Mini App] Видит главный экран "Твой маршрут" (план уже сохранён в БД)
3. [Mini App] Может просмотреть прошлые шаги, текущий день
4. Возможность: "Создать ещё один маршрут" (лимит — 1 в неделю на free)
5. Обновлённый CTA на waitlist
```

### Flow C — без TG (через лендинг напрямую)

```
1. Пользователь не хочет в Telegram, заходит на лендинг с десктопа
2. CTA "Попробовать в браузере" → /try (web версия Mini App без TG-auth)
3. Email-only auth (magic link через Resend / Loops)
4. Тот же flow A, без push-уведомлений
```

В tasting MVP **flow C опционален** — можно отложить до V1.

---

## 3. Архитектура

### Stack (финальный)

```
┌─────────────────────────────────────────────────┐
│  Лендинг (Next.js + Vercel)                     │
│  yup.app                                        │
│  - Static export                                │
│  - i18n RU/EN                                   │
│  - CTA → t.me/yup_app_bot                       │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Telegram Bot (бот @yup_app_bot)                │
│  - python-telegram-bot                          │
│  - Команды: /start, /help, /plan                │
│  - Кнопка "Открыть YUP" → Mini App              │
│  - Cron-уведомления (день 2, 7, 14)             │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Mini App (Next.js + telegram-web-app SDK)      │
│  app.yup.app                                    │
│  - Static + client-side rendering               │
│  - TG Theme adaptive                            │
│  - Same i18n что и лендинг                      │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Backend API (FastAPI)                          │
│  api.yup.app                                    │
│  - /api/auth (TG initData validation)           │
│  - /api/onboarding/start                        │
│  - /api/onboarding/answer                       │
│  - /api/route/generate                          │
│  - /api/route/today                             │
│  - /api/waitlist/join                           │
│  - /api/admin/stats (dev only)                  │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Postgres (Supabase free tier)                  │
│  - users, sessions, goals, routes,              │
│    daily_steps, waitlist, ai_calls              │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  AI providers (через LiteLLM router)            │
│  Tier 1: Gemini 2.5 Pro (primary, для wow)      │
│  Tier 2: Groq Llama 3.3 70B (fallback)          │
│  Tier 3: GitHub Models GPT-4o (premium fallback)│
│  Cache: Redis-mock через Postgres jsonb         │
└─────────────────────────────────────────────────┘
```

### Хостинг

- **Лендинг:** Vercel (free tier, static export)
- **Mini App:** Vercel (тот же домен или поддомен app.yup.app)
- **Backend API:** Fly.io или Railway (free tier на старте, ~$0–5/мес)
- **Postgres:** Supabase free tier (500MB до миграции)
- **Cron jobs:** Fly Machines или GitHub Actions scheduled

### Окружения

- `local` — разработка локально
- `staging` — staging.yup.app, для тестирования перед релизом
- `production` — yup.app + app.yup.app + api.yup.app

---

## 4. Data models (PostgreSQL)

### `users`
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tg_id BIGINT UNIQUE,                    -- Telegram user ID, NULL если web-only
    tg_username VARCHAR(64),
    tg_first_name VARCHAR(128),
    tg_last_name VARCHAR(128),
    tg_language_code VARCHAR(8),            -- 'ru', 'en', etc
    email VARCHAR(255) UNIQUE,              -- если zarezerkali
    locale VARCHAR(8) DEFAULT 'ru',
    is_waitlist BOOLEAN DEFAULT FALSE,
    waitlist_joined_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_tg_id ON users(tg_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_waitlist ON users(is_waitlist) WHERE is_waitlist = TRUE;
```

### `goals`
```sql
CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    raw_text TEXT NOT NULL,                 -- что юзер вписал «выучить английский до B2 за год»
    parsed_intent JSONB,                    -- результат парсинга AI: {domain, target_level, deadline}
    time_per_day VARCHAR(32),               -- '15-30', '30-60', '60-120', '120+'
    starting_level VARCHAR(32),             -- 'zero', 'basic', 'intermediate', 'advanced'
    target_horizon VARCHAR(32),             -- '30d', '90d', '180d', '365d'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_goals_user_id ON goals(user_id);
```

### `routes`
```sql
CREATE TABLE routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_json JSONB NOT NULL,               -- структурированный план (см. формат ниже)
    plan_md TEXT,                           -- markdown-render для отображения
    ai_model VARCHAR(64) NOT NULL,          -- 'gemini-2.5-pro', 'gpt-4o', etc
    ai_provider VARCHAR(32) NOT NULL,       -- 'google', 'openrouter', 'github'
    ai_tokens_input INT,
    ai_tokens_output INT,
    ai_cost_usd NUMERIC(8,6),
    cache_hit BOOLEAN DEFAULT FALSE,
    cache_key VARCHAR(128),                 -- hash от parsed_intent для дедупликации
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_routes_user_id ON routes(user_id);
CREATE INDEX idx_routes_cache_key ON routes(cache_key);
```

**Формат `plan_json`:**
```json
{
  "summit": "Английский на B2 за год",
  "duration_days": 30,
  "phases": [
    {
      "label": "База",
      "days": "1-7",
      "title": "Старт ритма",
      "description": "Лёгкий вход. Привыкаем к ежедневному формату.",
      "steps": [
        {
          "day": 1,
          "duration_min": 25,
          "title": "Прослушать первый урок BBC Learning English",
          "description": "Открой бесплатный курс «6 Minute English» — посмотри один эпизод с субтитрами.",
          "resources": [
            { "type": "video", "url": "https://...", "title": "BBC 6 Minute English" }
          ]
        }
      ]
    }
  ]
}
```

### `daily_steps`
```sql
CREATE TABLE daily_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    day_number INT NOT NULL,                -- 1, 2, ... 30
    step_json JSONB NOT NULL,               -- { title, description, duration_min, resources[] }
    status VARCHAR(16) DEFAULT 'pending',   -- 'pending', 'done', 'skipped'
    completed_at TIMESTAMPTZ,
    UNIQUE(route_id, day_number)
);

CREATE INDEX idx_daily_steps_route_day ON daily_steps(route_id, day_number);
```

### `waitlist`
```sql
CREATE TABLE waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(255),
    position INT GENERATED BY DEFAULT AS IDENTITY,
    referral_code VARCHAR(16) UNIQUE,
    referred_by UUID REFERENCES users(id),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    notified_at TIMESTAMPTZ
);

CREATE INDEX idx_waitlist_position ON waitlist(position);
```

### `ai_calls` (логирование для аналитики)
```sql
CREATE TABLE ai_calls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    purpose VARCHAR(64) NOT NULL,           -- 'parse_goal', 'generate_route', 'generate_motivation'
    model VARCHAR(64) NOT NULL,
    provider VARCHAR(32) NOT NULL,
    tokens_input INT,
    tokens_output INT,
    cost_usd NUMERIC(8,6),
    latency_ms INT,
    cache_hit BOOLEAN DEFAULT FALSE,
    success BOOLEAN DEFAULT TRUE,
    error TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_calls_created_at ON ai_calls(created_at DESC);
CREATE INDEX idx_ai_calls_purpose ON ai_calls(purpose);
```

### `events` (аналитика)
```sql
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    event_name VARCHAR(64) NOT NULL,        -- 'bot_started', 'goal_described', 'plan_generated', 'waitlist_joined'
    properties JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_event_name ON events(event_name);
CREATE INDEX idx_events_created_at ON events(created_at DESC);
```

---

## 5. API контракты

Все эндпоинты требуют авторизации через TG `initData` (валидация подписи на бэке) кроме `/api/health`.

### `POST /api/auth/init`
**Описание:** валидирует Telegram initData, возвращает session.

**Request:**
```json
{
  "init_data": "query_id=AAH...&user=%7B%22id%22%3A123...&hash=abcd..."
}
```

**Response 200:**
```json
{
  "session_token": "jwt-token-here",
  "user": {
    "id": "uuid",
    "tg_id": 123456789,
    "first_name": "Иван",
    "locale": "ru"
  },
  "has_existing_route": false
}
```

**Errors:** 400 (invalid initData), 500 (TG validation failed)

---

### `POST /api/onboarding/start`
**Описание:** принимает свободный текст цели от пользователя, парсит, возвращает уточняющие вопросы.

**Request:**
```json
{
  "raw_goal": "Хочу выучить английский до B2 чтобы поехать в Лондон через год"
}
```

**Response 200:**
```json
{
  "goal_id": "uuid",
  "parsed_intent": {
    "domain": "language",
    "specific": "english",
    "target_level": "B2",
    "context": "travel_london"
  },
  "questions": [
    {
      "key": "time_per_day",
      "label": "Сколько у тебя времени в день?",
      "options": [
        { "value": "15-30", "label": "15–30 минут" },
        { "value": "30-60", "label": "30–60 минут" },
        { "value": "60-120", "label": "1–2 часа" },
        { "value": "120+", "label": "Больше 2 часов" }
      ]
    },
    { "key": "starting_level", "label": "...", "options": [...] },
    { "key": "target_horizon", "label": "...", "options": [...] }
  ]
}
```

**Backend:** AI Tier 2 (Groq) парсит raw_goal в parsed_intent. Если parsed_intent не извлечён — возвращает дополнительный clarifying question.

---

### `POST /api/onboarding/answer`
**Описание:** принимает ответы пользователя на 3 вопроса. После последнего — триггерит генерацию маршрута.

**Request:**
```json
{
  "goal_id": "uuid",
  "answers": {
    "time_per_day": "30-60",
    "starting_level": "basic",
    "target_horizon": "365d"
  }
}
```

**Response 200:**
```json
{
  "ready_to_generate": true,
  "route_generation_id": "uuid"
}
```

---

### `POST /api/route/generate`
**Описание:** запускает генерацию маршрута через AI Tier 1. Возвращает streaming response (SSE) или polling URL.

**Request:**
```json
{
  "goal_id": "uuid"
}
```

**Response 200 (streaming SSE):**
```
event: progress
data: {"status": "thinking", "progress": 10}

event: progress
data: {"status": "generating_phases", "progress": 40}

event: progress
data: {"status": "generating_steps", "progress": 80}

event: complete
data: {"route_id": "uuid", "plan": {...}}
```

**Backend logic:**
1. Проверь cache по `cache_key = sha256(parsed_intent + answers)`. Если hit — возвращаешь сохранённый plan.
2. Иначе — Gemini 2.5 Pro с промпт-шаблоном (см. раздел 6).
3. Парсишь JSON ответ, валидируешь схемой.
4. Сохраняешь в `routes` + `daily_steps` (распаковываешь шаги по дням).
5. Возвращаешь plan_json.

**Errors:** 503 (AI недоступен — пробуй fallback), 422 (AI вернул невалидный JSON, retry или fallback).

---

### `GET /api/route/today`
**Описание:** возвращает шаг на сегодня + контекст плана.

**Response 200:**
```json
{
  "route_id": "uuid",
  "day_number": 1,
  "total_days": 30,
  "current_phase": {
    "label": "База",
    "title": "Старт ритма"
  },
  "today_step": {
    "title": "Прослушать первый урок BBC Learning English",
    "description": "...",
    "duration_min": 25,
    "resources": [...]
  },
  "next_step_preview": {
    "title": "Завтра — учим первые 20 слов на тему путешествий"
  }
}
```

---

### `POST /api/route/check-in`
**Описание:** пользователь отметил шаг как сделанный. В tasting MVP — только лог-метрика, не меняет план.

**Request:**
```json
{
  "route_id": "uuid",
  "day_number": 1,
  "status": "done"
}
```

**Response 200:**
```json
{ "saved": true, "message": "Класс! День 1 пройден." }
```

---

### `POST /api/waitlist/join`
**Описание:** записывает в waitlist + триггерит TG-уведомление.

**Request:**
```json
{
  "email": "user@example.com",   // optional, fallback to TG
  "referred_by": "code123"        // optional
}
```

**Response 200:**
```json
{
  "joined": true,
  "position": 247,
  "referral_code": "abcdEF",
  "share_url": "https://t.me/yup_app_bot?start=ref_abcdEF"
}
```

---

### `POST /api/events`
**Описание:** клиент шлёт user-events для аналитики. Накапливаются в `events`.

**Request:**
```json
{
  "event_name": "screen_viewed",
  "properties": { "screen": "plan_view", "phase": "base" }
}
```

**Response 200:** `{ "ok": true }`

---

### `GET /api/admin/stats` (only with `x-admin-key` header)
**Описание:** дашборд внутренней аналитики.

**Response:**
```json
{
  "users_total": 1247,
  "users_today": 87,
  "plans_generated": 1098,
  "waitlist_size": 412,
  "conversion_to_waitlist": 0.34,
  "ai_cost_total_usd": 0.67,
  "ai_cost_today_usd": 0.04,
  "active_models": ["gemini-2.5-pro", "groq-llama-3.3-70b"]
}
```

---

## 6. AI промпт-шаблоны (концепции, не финальные)

### Промпт #1 — `parse_goal` (Groq, дёшево/быстро)

**System prompt:**
```
Ты — парсер целей пользователей. Получаешь описание цели на русском или английском.
Возвращаешь structured JSON с полями:
- domain: "language" | "body" | "knowledge" | "habits" | "mind" | "career" | "creative" | "other"
- specific: конкретика (e.g., "english", "running_5km", "python_programming")
- target_metric: измеримая метрика, если есть ("B2", "20_pullups", "10_books")
- context: дополнительный контекст ("travel", "first_job", "exam_prep") или null
- confidence: 0.0–1.0

Если описание неоднозначно — поставь confidence < 0.6.
Отвечай ТОЛЬКО JSON, без обёрток.
```

**User input:** «Хочу выучить английский до B2 чтобы поехать в Лондон через год»

**Expected output:**
```json
{
  "domain": "language",
  "specific": "english",
  "target_metric": "B2",
  "context": "travel_london",
  "confidence": 0.95
}
```

### Промпт #2 — `generate_route` (Gemini 2.5 Pro, для wow)

**System prompt:**
```
Ты — YUP, AI-проводник на маршруте к цели. Создаёшь персональный 30-дневный план с разбивкой на 4 фазы:
- "База" (день 1–7): мягкий вход, привыкание к ритму
- "Лагерь 1" (день 8–14): концентрация на ключевом навыке
- "Лагерь 2" (день 15–21): углубление и закрепление
- "Вершина" (день 22–30): финальный рывок, выход на видимый результат

ВАЖНО:
- Шаги должны быть КОНКРЕТНЫМИ. Не "учи английский 30 минут", а "посмотри урок XYZ + сделай 10 карточек в Anki".
- Учитывай реальные ограничения: время в день, начальный уровень, дедлайн.
- Используй РЕАЛЬНЫЕ ресурсы (BBC Learning English, Stepik, YouTube-каналы, книги).
- Тон — peer-to-peer, не корпоративный. Прямой, без воды.
- Язык вывода — русский.

Отвечай ТОЛЬКО JSON по schema:
{
  "summit": string,
  "duration_days": number,
  "phases": [
    {
      "label": string,
      "days": string ("1-7"),
      "title": string,
      "description": string,
      "steps": [
        {
          "day": number,
          "duration_min": number,
          "title": string,
          "description": string,
          "resources": [{ "type": "video"|"article"|"book"|"app"|"exercise", "url"?: string, "title": string }]
        }
      ]
    }
  ]
}
```

**Few-shot example (один в промпт):**
```
User: { goal: "Английский B2", time: "30-60 мин", level: "basic", horizon: "365d" }
Output: { ... готовый JSON-план... }
```

### Промпт #3 — `generate_motivation` (опционально для motivational hook)

**System prompt:**
```
Ты пишешь короткий мотивирующий хук под начало маршрута пользователя.
Тон — peer-to-peer, прямой, без сахарной воды и без "успешный успех".
Длина — 1–2 предложения, до 200 символов.
Язык — русский.
```

---

## 7. UX-экраны (Mini App, спецификация)

### Общие принципы
- Используем кибер-стиль лендинга (чёрный + неоновый лайм)
- Шрифт: Unbounded для display, Inter для body
- Mobile-first (Mini App почти всегда открывается с телефона)
- Уважаем TG theme — на iOS должен выглядеть нативно

### Экран 1 — Welcome (`/`)
```
┌────────────────────────────────┐
│         YUP ▲                  │
│                                │
│       НАЗОВИ                   │
│       ВЕРШИНУ.                 │  ← display-tight, лайм
│                                │
│  AI соберёт твой маршрут на    │
│  30 дней. 90 секунд. Бесплатно.│
│                                │
│  ┌──────────────────────────┐  │
│  │ Я хочу...                │  │  ← textarea
│  └──────────────────────────┘  │
│                                │
│  Примеры:                      │
│  → выучить английский до B2    │
│  → подтянуться 20 раз          │
│  → запустить pet-проект        │
│                                │
│         [Дальше →]             │  ← btn-lime, full width
└────────────────────────────────┘
```

### Экран 2 — Уточнение (3 шага)
```
┌────────────────────────────────┐
│     Шаг 1 / 3                  │
│  ▰▱▱                           │
│                                │
│  Сколько у тебя времени в день?│
│                                │
│  ┌──────────────────────────┐  │
│  │ ○ 15–30 минут            │  │
│  │ ○ 30–60 минут            │  │
│  │ ● 1–2 часа               │  │
│  │ ○ Больше 2 часов         │  │
│  └──────────────────────────┘  │
│                                │
│         [Продолжить →]         │
└────────────────────────────────┘
```
(аналогично для starting_level и target_horizon)

### Экран 3 — Loading
```
┌────────────────────────────────┐
│                                │
│       ▲                        │
│      ▲▲▲    AI прокладывает    │
│     ▲▲▲▲▲   твой маршрут...    │
│                                │
│  Это занимает ~10–15 секунд.   │
│  AI учитывает твой уровень,    │
│  время, цель.                  │
│                                │
│  ▰▰▰▰▰▰▱▱▱▱  60%               │
└────────────────────────────────┘
```

### Экран 4 — Plan view (главный wow)
```
┌────────────────────────────────┐
│  ◀ Назад              [⋮]      │
│                                │
│  ТВОЙ                          │
│  МАРШРУТ.                      │  ← display-tight, лайм
│                                │
│  Английский до B2 за 30 дней   │
│                                │
│  ─── СЕГОДНЯ ─────────         │
│  ┌──────────────────────────┐  │
│  │ День 1 · 25 минут        │  │
│  │ Прослушать BBC 6 Minute  │  │
│  │ English — первый эпизод. │  │
│  │ + 10 карточек в Anki     │  │
│  │                          │  │
│  │       [Сделал ✓]         │  │
│  └──────────────────────────┘  │
│                                │
│  ─── 4 ФАЗЫ ──────────         │
│  ▼ База  · день 1–7      [→]   │
│  ▼ Лагерь 1 · день 8–14  [→]   │
│  ▼ Лагерь 2 · день 15–21 [→]   │
│  ▼ Вершина · день 22–30  [→]   │
│                                │
│  Каждая фаза раскрывается на   │
│  таб — список всех шагов.      │
└────────────────────────────────┘
```

### Экран 5 — Waitlist CTA
```
┌────────────────────────────────┐
│                                │
│  Хочешь идти этот              │
│  МАРШРУТ                       │
│  до конца?                     │
│                                │
│  Сейчас ты видишь tasting —    │
│  превью YUP. Полная версия:    │
│  ежедневное AI-сопровождение,  │
│  адаптация под твою жизнь,     │
│  закрытое сообщество.          │
│                                │
│  ┌──────────────────────────┐  │
│  │ ты@почта.ру              │  │
│  └──────────────────────────┘  │
│                                │
│  [В первую волну →]            │
│                                │
│  Первые 100 — бесплатный год.  │
└────────────────────────────────┘
```

После записи — confirmation screen + share-CTA с реферальным кодом.

---

## 8. Acceptance criteria по фичам

### F1 — Telegram Bot setup
- [ ] Бот @yup_app_bot создан, описание + аватар
- [ ] Команды: `/start` (приветствие + кнопка), `/help`, `/plan` (если уже сгенерён)
- [ ] Кнопка «Открыть YUP» → запускает Mini App URL `app.yup.app`
- [ ] Webhook настроен на backend
- [ ] При `/start` — записывает пользователя в БД (`tg_id`, `username`)

### F2 — Mini App auth
- [ ] При открытии Mini App: `tgWebApp.initData` отправляется на `/api/auth/init`
- [ ] Backend валидирует подпись через `Telegram-Web-App-Validate` (HMAC SHA-256 с bot token)
- [ ] Возвращает session JWT (TTL 24h)
- [ ] При повторном открытии — session восстанавливается, есть текущий route
- [ ] Если auth fail — показывает экран «Открой через Telegram»

### F3 — Onboarding flow
- [ ] Welcome screen с textarea + 3 примерами целей (rotating placeholder)
- [ ] Валидация: минимум 5 символов в raw_goal
- [ ] POST /api/onboarding/start → парсинг через Groq → возвращает 3 вопроса
- [ ] Quiz screen 1/3 → 2/3 → 3/3 с прогресс-баром
- [ ] Каждый ответ — POST /api/onboarding/answer
- [ ] После 3-го ответа — автоматический переход на loading screen
- [ ] Если parsed_intent.confidence < 0.6 → показываем уточняющий вопрос «Я правильно понял, что ты хочешь...?»

### F4 — Route generation
- [ ] POST /api/route/generate — streaming SSE с прогрессом
- [ ] Cache check по hash(parsed_intent + answers) — если есть, отдаёт мгновенно
- [ ] Gemini 2.5 Pro запрос с шаблоном #2 + few-shot
- [ ] Если 422 (невалидный JSON) — retry 1 раз, потом fallback на GPT-4o (GH Models)
- [ ] Если все провайдеры упали — показывает «Серверы перегружены, попробуй через 2 минуты»
- [ ] Время от старта генерации до результата — < 20 сек p95
- [ ] Saving: `routes` + `daily_steps` (распаковка шагов по дням)

### F5 — Plan view
- [ ] Main view: «Сегодня» блок + 4 collapsible фазы
- [ ] Каждая фаза при раскрытии показывает список шагов с днём + duration + ресурсами
- [ ] Ссылки на ресурсы — кликабельны, открываются in-app браузером (TG WebView)
- [ ] Кнопка «Сделал» на сегодняшнем шаге — POST /api/route/check-in
- [ ] После check-in — небольшая анимация (галочка + лайм-glow), сохраняется состояние
- [ ] Persistent: при возврате в Mini App видишь свой план (route загружается из БД)

### F6 — Waitlist capture
- [ ] CTA «В первую волну» появляется после 30 секунд просмотра плана ИЛИ после первого check-in
- [ ] Email-поле (prefilled из TG email если есть)
- [ ] Submit → POST /api/waitlist/join → записывает + возвращает position + referral_code
- [ ] Confirmation screen: «Записан #247 в очереди» + share-кнопка («Зови друзей — оба получите бонус»)
- [ ] При сабмите — TG-уведомление «Записал. Завтра пришлю день 2»

### F7 — Follow-up TG notifications (опционально для V0.1, обязательно V0.2)
- [ ] Cron job, ежедневно 09:00 МСК
- [ ] Запрашивает users, у которых есть route и сегодня day_number ∈ {2, 7, 14, 30}
- [ ] Отправляет TG-сообщение с описанием шага дня + кнопкой «Открыть»
- [ ] Записывает event `notification_sent`

### F8 — Аналитика
- [ ] PostHog установлен на лендинг + Mini App
- [ ] События трекаются: `bot_started`, `goal_described`, `quiz_answered`, `loading_screen_viewed`, `plan_generated`, `plan_viewed_full`, `check_in_clicked`, `waitlist_cta_shown`, `waitlist_joined`, `referral_shared`
- [ ] Внутренний дашборд `/api/admin/stats` (защита по env-key)
- [ ] Daily summary — автоматическое TG-сообщение в твой личный чат с метриками за день

### F9 — Error handling
- [ ] Все API возвращают consistent error schema: `{ "error": { "code": "...", "message": "..." } }`
- [ ] Frontend показывает понятные сообщения для типичных ошибок (network, AI down, auth fail)
- [ ] Sentry установлен на frontend + backend
- [ ] AI provider fallback chain: Gemini → GitHub Models → Groq → user-facing error

---

## 9. Sprint breakdown (3–4 недели)

### Спринт 0 — фундамент (3–5 дней)

| День | Задача |
|---|---|
| 1 | Купить домен yup.app/yup.bot. Настроить DNS на Vercel. |
| 1 | Создать @yup_app_bot в @BotFather, настроить меню + webapp URL |
| 2 | Backend repo (FastAPI). Структура: app/, api/, models/, services/, prompts/ |
| 2 | Postgres на Supabase, миграции через Alembic. Все таблицы из раздела 4. |
| 3 | Mini App repo (Next.js), TG WebApp SDK подключение, базовый layout |
| 3 | Backend `POST /api/auth/init` с TG initData валидацией |
| 4 | LiteLLM router setup, env-vars для Gemini/Groq/GH-Models |
| 5 | E2E проводка: бот → Mini App → /api/auth/init → видит user_id |

### Спринт 1 — Onboarding + Route generation (5–7 дней)

| День | Задача |
|---|---|
| 6 | Welcome screen UI + textarea (frontend) |
| 7 | Quiz screens с переходами (frontend) |
| 7 | `POST /api/onboarding/start` (бэкенд + Groq для parsing) |
| 8 | `POST /api/onboarding/answer` (сохранение ответов в goals) |
| 9 | Промпт-шаблон для generate_route — итерации в Qwen Chat / Gemini AI Studio |
| 10 | `POST /api/route/generate` с streaming SSE + cache layer |
| 11 | Loading screen UI с прогресс-баром (frontend, через SSE listener) |
| 12 | Plan view UI: phases + today block (frontend) |

### Спринт 2 — Polishing + Waitlist (5–7 дней)

| День | Задача |
|---|---|
| 13 | Polishing: анимации появления плана, transitions между фазами |
| 14 | Check-in кнопка + animation (frontend) |
| 14 | `POST /api/route/check-in` (backend) |
| 15 | Waitlist screen UI (frontend) |
| 15 | `POST /api/waitlist/join` + referral codes (backend) |
| 16 | Confirmation screen + share-кнопка (frontend) |
| 17 | Backend cron-job + TG-notifications setup (день 2/7/14) |
| 18 | Error handling + fallback chain across all AI providers |

### Спринт 3 — Аналитика + soft launch (3–5 дней)

| День | Задача |
|---|---|
| 19 | PostHog установка, события трекаются |
| 19 | Sentry установка, error tracking |
| 20 | Внутренний `/api/admin/stats` + daily TG summary |
| 21 | E2E тестирование: 5 пользователей из круга проходят полный flow |
| 22 | Bug-fix sprint по результатам soft-launch |
| 23 | Deploy production: yup.app + app.yup.app + api.yup.app + бот |

### Контрольные точки

- **К концу спринта 0:** auth-flow работает, у пользователя есть user_id в БД
- **К концу спринта 1:** AI генерит план, viewable в Mini App
- **К концу спринта 2:** Полный flow от старта до waitlist работает E2E
- **К концу спринта 3:** Метрики работают, soft-launch на 5 человек прошёл

---

## 10. Что НЕ в этом ТЗ (V1+)

После tasting MVP — следующие фичи:

- **Платный тариф через Telegram Stars** (Premium 199–299₽/мес)
- **Multi-goal:** до 3 целей одновременно (premium-only)
- **AI-coach диалог:** возможность задать AI вопрос по плану
- **Re-routing:** если пропустил 3+ дней — AI пересобирает план
- **Стрики и retention layer:** мягкие стрики, weekly recap, re-engagement
- **Длинный режим:** план на 90 / 180 / 365 дней
- **Cross-domain insights:** «ты лучше учишь язык в дни тренировок»
- **Voice input:** надиктовать цель / отчёт через TG voice-message
- **Сообщество:** закрытый TG-чат для платящих, weekly Camp Day
- **Analytics dashboards для пользователя:** графики прогресса
- **Native iOS/Android apps**

---

## 11. Технические риски и mitigation

| Риск | Вероятность | Mitigation |
|---|---|---|
| AI генерит generic / невпечатляющие планы | Высокая | Few-shot examples в промпт; выбор Tier 1 модели; итерация в первую неделю |
| Latency > 20 сек на генерацию — пользователь уйдёт | Средняя | Streaming SSE с прогрессом; cache layer; fallback на быстрые модели |
| Telegram изменит API / lockдаунит Mini App | Низкая | Mini App = обычный веб-app, отвязка за неделю |
| Free-tier лимиты у AI провайдеров | Низкая (на старте) | LiteLLM ротация между 3+ провайдерами |
| Невалидный JSON от AI | Средняя | JSON schema валидация + retry 1 раз + fallback model |
| TG-валидация подписи initData неверна | Средняя | Использовать official библиотеку, не писать руками. Юнит-тесты |
| Database → Supabase free tier 500MB заполнится | Низкая | На старте — далеко не упрёшься; миграция на $25/мес тариф когда нужно |

---

## 12. Чек-лист готовности к публичному запуску

Перед тем как пиариться в TikTok / TG-каналах:

- [ ] Полный flow от `/start` до waitlist работает на 100% E2E
- [ ] План генерится за 10–20 сек (p95)
- [ ] План выглядит **wow** — реально хочется попробовать
- [ ] Cache работает: повторный запрос с теми же параметрами → instant
- [ ] AI fallback chain работает: один провайдер падает → автоматический переход
- [ ] Sentry ловит ошибки
- [ ] PostHog трекает все ключевые события
- [ ] Лендинг yup.app в продакшене, CTA ведёт на бот
- [ ] Бот отвечает быстро (< 1 сек на /start)
- [ ] При 100 параллельных запросов — серверы держат
- [ ] Backup БД настроен (хотя бы daily)
- [ ] Privacy policy + Terms of Use на лендинге (минимум, но юридически важно)

---

## 13. Команда / распределение работ

Для соло-фаундера:
- Тебе нужно 3–4 недели полной занятости для полной реализации
- Реалистичный темп: 3–5 часов в день на код + 1 час на промпт-инжиниринг + 30 мин на коммуникацию

Если бюджет позволяет привлечь part-time помощника:
- **Frontend (Mini App + лендинг адаптация)** — 30 часов работ, ~$300–500 за фриланс
- **Backend + AI integration** — 40 часов работ, делаешь сам
- **Promtp engineering + дизайн** — 20 часов, делаешь сам

---

## TL;DR

Tasting MVP — это **полированный демо-продукт** на 3–4 недели разработки:
1. Пользователь описывает цель
2. AI генерит wow-план на 30 дней (Gemini 2.5 Pro)
3. Видит план + первый шаг
4. Записывается в waitlist полной версии

**Цель:** собрать 500–2000 человек в waitlist за первые 30 дней публики.
**Стек:** TG Bot + Mini App (Next.js) + FastAPI + Postgres + LiteLLM-router.
**Стоимость инфры:** $0 на старте.
**Главный риск:** generic AI-планы → mitigation = промпт-инжиниринг с few-shot.
