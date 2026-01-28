# Typelessity Widget Integration - Progress Tracker

**Дата начала:** 2026-01-28
**Статус:** В процессе

---

## Обзор

Интеграция AI-виджета Typelessity с реалистичным медицинским API по стандарту FHIR (HL7).

**Хостинг (как TransEdge):**
- Frontend + API: **Netlify** (serverless functions)
- Database: **Supabase** (PostgreSQL)

---

## Прогресс выполнения

### Фаза 1: Документация и Setup
- [x] 1.1 Создать BACKEND_SETUP_PROMPT.md (API спецификация) ✅ 2026-01-28
- [ ] 1.2 Настроить Supabase проект (создать БД)
- [ ] 1.3 Создать netlify.toml конфигурацию

### Фаза 2: Netlify Functions (API Endpoints)
- [ ] 2.1 `health.ts` - Health check endpoint
- [ ] 2.2 `doctors.ts` - GET /api/doctors, GET /api/doctors/:id
- [ ] 2.3 `schedules.ts` - GET /api/doctors/:id/schedule
- [ ] 2.4 `slots.ts` - GET /api/doctors/:id/slots
- [ ] 2.5 `booking-fields.ts` - GET /api/doctors/:id/booking-fields
- [ ] 2.6 `appointments.ts` - POST/GET /api/appointments

### Фаза 3: Database (Supabase)
- [ ] 3.1 Создать таблицу `doctors`
- [ ] 3.2 Создать таблицу `schedules`
- [ ] 3.3 Создать таблицу `schedule_breaks`
- [ ] 3.4 Создать таблицу `slots`
- [ ] 3.5 Создать таблицу `appointments`
- [ ] 3.6 Создать таблицу `specialty_fields`
- [ ] 3.7 Seed данные врачей (из существующего doctors.ts)
- [ ] 3.8 Seed расписания врачей
- [ ] 3.9 Seed specialty fields для каждой специальности

### Фаза 4: Deploy
- [ ] 4.1 Подключить GitHub репозиторий к Netlify
- [ ] 4.2 Настроить environment variables (Supabase URL, Key)
- [ ] 4.3 Deploy и проверить /api/health
- [ ] 4.4 Проверить все API endpoints

### Фаза 5: Widget Integration
- [ ] 5.1 Создать конфигурацию в Typelessity admin
- [ ] 5.2 Добавить widget element в index.html
- [ ] 5.3 Настроить event handling в App.vue
- [ ] 5.4 E2E тестирование полного flow

---

## Архитектура API

### Endpoints

| Method | Endpoint | Описание |
|--------|----------|----------|
| GET | /api/health | Health check |
| GET | /api/doctors | Список врачей с фильтрами |
| GET | /api/doctors/:id | Детали врача |
| GET | /api/doctors/:id/schedule | Расписание врача |
| GET | /api/doctors/:id/slots | Доступные слоты на дату |
| GET | /api/doctors/:id/booking-fields | Поля для бронирования |
| POST | /api/appointments | Создание записи |
| GET | /api/appointments/:id | Детали записи |

### Workflow

```
User: "I need a cardiologist"
         ↓
Widget: GET /api/doctors?specialty=cardiologist
         ↓
User: выбирает Dr. Sarah Mitchell
         ↓
Widget: GET /api/doctors/1/slots?date=2026-02-15
         ↓
User: выбирает 09:00
         ↓
Widget: GET /api/doctors/1/booking-fields
         ↓
User: заполняет данные через диалог
         ↓
Widget: POST /api/appointments
         ↓
Response: { appointmentId, confirmationNumber }
```

---

## Структура проекта

```
/medbook/
├── netlify/
│   └── functions/
│       ├── health.ts
│       ├── doctors.ts
│       ├── schedules.ts
│       ├── slots.ts
│       ├── booking-fields.ts
│       └── appointments.ts
├── netlify.toml
├── src/
│   └── ... (existing Vue app)
├── BACKEND_SETUP_PROMPT.md
└── TYPELESSITY_INTEGRATION.md  ← этот файл
```

---

## Environment Variables (Netlify)

```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
```

---

## Тестирование

### API Tests (после deploy)
```bash
# Health
curl https://medbook.netlify.app/api/health

# Doctors
curl https://medbook.netlify.app/api/doctors

# Slots
curl "https://medbook.netlify.app/api/doctors/1/slots?date=2026-02-15"

# Booking fields
curl https://medbook.netlify.app/api/doctors/1/booking-fields

# Create appointment
curl -X POST https://medbook.netlify.app/api/appointments \
  -H "Content-Type: application/json" \
  -d '{"doctorId":"1","slotId":"slot_xxx",...}'
```

---

## Референсы

- [HL7 FHIR Appointment](https://www.hl7.org/fhir/appointment.html)
- `/TransEdge Freight Proto/` - референс реализация
- `/medbook/src/data/doctors.ts` - данные для seed
