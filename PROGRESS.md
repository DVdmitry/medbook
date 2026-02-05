# MedBook + Typelessity Integration Progress

## Текущий статус: Реализация завершена, готово к тестированию

---

## Часть 1: MedBook Frontend → Database Integration

### Проблема
Фронтенд использует захардкоженные моки вместо API/базы данных:
- `src/data/doctors.ts` — статический массив врачей
- `DoctorListView.vue` — импортирует моки напрямую
- `BookingFormView.vue` — импортирует моки напрямую
- `HomeView.vue` — захардкоженные счетчики специальностей

### API уже готово
- `netlify/functions/doctors.ts` — GET /api/doctors, GET /api/doctors/:id
- `netlify/functions/slots.ts` — GET /api/doctors/:id/slots
- `database/seed.sql` — 25 врачей в Supabase

### Задачи

| # | Задача | Статус | Файл |
|---|--------|--------|------|
| 1.1 | Создать composable для API вызовов | ✅ DONE | `src/composables/useApi.ts` |
| 1.2 | Переделать DoctorListView на API | ✅ DONE | `src/views/DoctorListView.vue` |
| 1.3 | Переделать BookingFormView на API | ✅ DONE | `src/views/BookingFormView.vue` |
| 1.4 | Динамические счетчики на HomeView | ✅ DONE | `src/views/HomeView.vue` |
| 1.5 | Удалить файл с моками | ✅ DONE | Удалён `src/data/doctors.ts` |
| 1.6 | Вынести specialtyDescriptions в constants | ✅ DONE | `src/constants/specialties.ts` |

---

## Часть 2: Typelessity Enrichment Hooks

### Проблема
Typelessity сейчас: собирает плоские поля → один POST на endpoint клиента.
MedBook требует: зависимые шаги (специальность → врачи → дата → слоты → данные пациента).

### Решение: Enrichments
Промежуточные API-вызовы, которые срабатывают когда определённые поля заполняются. Результаты инжектятся в AI контекст.

### Пример потока MedBook
```
User: "Мне нужен кардиолог"
→ AI извлекает: { specialty: "cardiologist" }
→ Enrichment "search-doctors" срабатывает
→ GET /api/doctors?specialty=cardiologist
→ AI получает список врачей и представляет их
→ User: "Доктор Mitchell"
→ AI извлекает: { selectedDoctorId: "1" }
→ User: "В следующий понедельник"
→ AI извлекает: { preferredDate: "2026-02-02" }
→ Enrichment "check-slots" срабатывает
→ GET /api/doctors/1/slots?date=2026-02-02
→ AI представляет доступные слоты
→ ... собирает данные пациента → POST /api/appointments
```

### Задачи Typelessity (проект: `/typelessity/`)

#### Фаза 1: Shared Types

| # | Задача | Статус | Файл |
|---|--------|--------|------|
| 2.1 | Создать EnrichmentConfig, EnrichmentResult типы | ✅ DONE | `packages/shared/src/types/enrichment.ts` |
| 2.2 | Добавить `enrichments?: EnrichmentConfig[]` в WidgetConfig | ✅ DONE | `packages/shared/src/types/widget-config.ts` |
| 2.3 | Добавить `enrichmentData?: Record<string, EnrichmentResult>` в Session | ✅ DONE | `packages/shared/src/types/session.ts` |
| 2.4 | Экспорт enrichment типов | ✅ DONE | `packages/shared/src/types/index.ts` |

#### Фаза 2: Database Schema

| # | Задача | Статус | Файл |
|---|--------|--------|------|
| 2.5 | Добавить `enrichmentData: jsonb` в sessions | ✅ DONE | `packages/api/src/db/schema.ts` |
| 2.6 | Добавить `enrichments: jsonb` в widgetConfigs | ✅ DONE | `packages/api/src/db/schema.ts` |
| 2.7 | Drizzle migration | ✅ DONE | `drizzle/0004_optimal_human_robot.sql` |

#### Фаза 3: Enrichment Service

| # | Задача | Статус | Файл |
|---|--------|--------|------|
| 2.8 | checkTriggers(), executeEnrichment(), resolveTemplate() | ✅ DONE | `packages/api/src/services/enrichment-service/enrichment.service.ts` |
| 2.9 | generateEnrichedResponse() (интегрировано в message-handler) | ✅ DONE | Интегрировано в Фазу 4 |
| 2.10 | Barrel export | ✅ DONE | `packages/api/src/services/enrichment-service/index.ts` |

#### Фаза 4: Message Handler Integration

| # | Задача | Статус | Файл |
|---|--------|--------|------|
| 2.11 | Интеграция enrichment в extractAndRespond flow | ✅ DONE | `packages/api/src/services/session-service/message-handler.ts` |
| 2.12 | Расширить applyAIExtraction() для enrichmentData | ✅ DONE | `packages/api/src/services/session-helpers.ts` |

#### Фаза 5: AI Prompt с enrichment контекстом

| # | Задача | Статус | Файл |
|---|--------|--------|------|
| 2.13 | buildEnrichmentContext() в system prompt | ✅ DONE | `packages/api/src/services/extraction-prompts/system-prompt.ts` |
| 2.14 | Добавить `enrichmentData?` в ExtractAndRespondOptions | ✅ DONE | `packages/api/src/services/ai-service/ai.service.ts` |
| 2.15 | Передать enrichmentData в buildSystemPrompt() | ✅ DONE | `packages/api/src/services/ai-service/extraction-pipeline.ts` |

#### Фаза 6: Field Mapper

| # | Задача | Статус | Файл |
|---|--------|--------|------|
| 2.16 | setNestedValue() для dot-notation (`patient.firstName`) | ✅ DONE | `packages/api/src/lib/field-mapper.ts` |

#### Фаза 7: Repository

| # | Задача | Статус | Файл |
|---|--------|--------|------|
| 2.17 | Маппинг enrichmentData из/в БД | ✅ DONE | Автоматически через Drizzle JSONB |

#### Фаза 8: MedBook Widget Config

| # | Задача | Статус | Файл |
|---|--------|--------|------|
| 2.18 | Seed WidgetConfig для MedBook в Typelessity DB | ✅ DONE | `packages/api/src/scripts/seed-medbook.ts` |

---

## Ключевые типы

### EnrichmentConfig
```typescript
interface EnrichmentConfig {
  id: string;                    // "search-doctors"
  trigger: {
    field: string;               // "specialty"
    condition?: 'filled' | 'changed'; // default: 'filled'
  };
  apiCall: {
    endpoint: string;            // URL с {fieldId} плейсхолдерами
    method: 'GET' | 'POST';
    body?: string;               // JSON шаблон для POST
    headers?: Record<string, string>;
    timeoutMs?: number;          // default: 10000
  };
  response: {
    aiInstruction: string;       // Как AI должен презентовать результат
    storeAs?: string;            // Ключ в session.enrichmentData
  };
}
```

### MedBook WidgetConfig Enrichments
```typescript
enrichments: [
  {
    id: 'search-doctors',
    trigger: { field: 'specialty' },
    apiCall: {
      endpoint: 'https://medbook-vue.netlify.app/api/doctors?specialty={specialty}',
      method: 'GET'
    },
    response: {
      aiInstruction: 'Present doctors as numbered list: name, rating★, experience, price. Help pick one.',
      storeAs: 'availableDoctors'
    }
  },
  {
    id: 'check-slots',
    trigger: { field: 'preferredDate' },
    apiCall: {
      endpoint: 'https://medbook-vue.netlify.app/api/doctors/{selectedDoctorId}/slots?date={preferredDate}',
      method: 'GET'
    },
    response: {
      aiInstruction: 'Show available times in 12h format. Only "available" status. Help pick a time.',
      storeAs: 'availableSlots'
    }
  }
]
```

---

## Принципы реализации

1. **Enrichment = non-fatal** — если API падает, логируем warning и продолжаем
2. **Два AI-вызова только при trigger** — обычно один вызов, при enrichment — второй для презентации
3. **Данные кешируются в session** — `session.enrichmentData` хранит результаты
4. **Trigger conditions:** `filled` (один раз) vs `changed` (при каждом изменении)
5. **Backward compatible** — configs без enrichments работают как раньше

---

## Обновления

| Дата | Изменение |
|------|-----------|
| 2026-01-29 | Создан план. Обнаружено: фронтенд использует моки вместо API |
| 2026-01-29 | **Часть 1 ЗАВЕРШЕНА:** Фронтенд MedBook теперь загружает данные из API/БД |
| 2026-01-29 | **Часть 2 ЗАВЕРШЕНА:** Typelessity Enrichment Hooks полностью реализованы |

---

## Следующие шаги

1. **Запустить миграцию БД в Typelessity Supabase:**
   ```bash
   cd /typelessity/packages/api
   pnpm run db:migrate
   ```

2. **Создать MedBook конфиг в Typelessity:**
   ```bash
   cd /typelessity/packages/api
   pnpm run seed:medbook
   ```

3. **E2E тест полного флоу:**
   - "I need a cardiologist" → enrichment → список врачей
   - Выбор врача → запрос даты → enrichment → слоты
   - Выбор слота → сбор данных пациента → booking

4. **Интеграция виджета в MedBook фронтенд**
