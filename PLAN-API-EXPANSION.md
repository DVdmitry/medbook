# План расширения API и Typelessity конфига

## ⚠️ ВАЖНО: Порядок применения миграций

```
1. 001_auth_tables.sql     → Создаёт profiles, patient_appointments (для Admin Panel)
2. 002_expand_appointments.sql → Расширяет appointments (для Widget/API)
```

**Ошибка "patient_appointments does not exist"** возникает если запускать 002 без 001.

---

## Проблема

MedBook frontend собирает **44+ полей**, но:
1. API `/api/appointments` принимает только **9 полей**
2. Typelessity конфиг содержит только **9 полей**
3. Все данные из форм (medical history, specialty symptoms) **не отправляются** в API

### Что собирает Frontend (BookingFormView.vue):

| Шаг | Форма | Поля (обязательные) | Поля (опциональные) |
|-----|-------|---------------------|---------------------|
| 1 | PatientInfoForm | firstName, lastName, email, phone, dateOfBirth, gender, address, emergencyContact, emergencyPhone | — |
| 2 | MedicalHistoryForm | smokingStatus, alcoholConsumption | allergies, chronicConditions, currentMedications, previousSurgeries, familyHistory, bloodType |
| 3 | SpecialtyForms | зависит от специальности (5-10 полей) | conditional fields |
| 4 | AppointmentTimeForm | date, time, reason | notes |

**Итого:** ~44 поля во frontend

### Что принимает API сейчас:

```typescript
// POST /api/appointments (appointments.ts:97)
const { doctorId, slotId, slotDate, slotStartTime, patient, medicalInfo, reason, notes } = body;

// Где patient: { firstName, lastName, email, phone, dateOfBirth }
// medicalInfo: JSON (не используется на фронте!)
```

**Итого:** 9 полей в API

### Что в Typelessity конфиге:

```
specialty, selectedDoctorId, preferredDate, selectedSlotId,
firstName, lastName, email, phone, reason
```

**Итого:** 9 полей в Typelessity

---

## Архитектурное решение

### Проблема с двумя таблицами

Сейчас есть **2 таблицы** для appointments:

1. **`appointments`** (старая, для anonymous bookings через widget)
   - Простая структура
   - Нет medical history
   - Нет emergency contacts

2. **`patient_appointments`** (новая, для authenticated users)
   - Полная структура
   - `medical_history_snapshot` JSONB
   - `specialty_form_data` JSONB

### Решение: Unified API

Объединить обе таблицы в одну `appointments` с полной структурой.

---

## План реализации

### Phase 1: Database Migration (новая миграция)

**Файл:** `supabase/migrations/002_expand_appointments.sql`

```sql
-- Расширить таблицу appointments для поддержки всех полей

-- Patient extended info
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS emergency_contact TEXT;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS emergency_phone TEXT;

-- Medical history (JSONB)
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS medical_history JSONB DEFAULT '{}';

-- Specialty form data (JSONB)
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS specialty_form_data JSONB DEFAULT '{}';

-- Patient ID (nullable, for authenticated users)
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS patient_id UUID REFERENCES profiles(id);
```

### Phase 2: API Expansion

**Файл:** `netlify/functions/appointments.ts`

Расширить body parsing:

```typescript
const {
  doctorId,
  slotId,
  slotDate,
  slotStartTime,
  patient: {
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    gender,           // NEW
    address,          // NEW
    emergencyContact, // NEW
    emergencyPhone,   // NEW
  },
  medicalHistory: {   // NEW structured
    allergies,
    chronicConditions,
    currentMedications,
    previousSurgeries,
    familyHistory,
    bloodType,
    smokingStatus,
    alcoholConsumption,
  },
  specialtyFormData,  // NEW - JSON
  reason,
  notes,
} = body;
```

### Phase 3: Typelessity Config Update

**Файл:** `typelessity/.context/examples/medbook-config.md`

Добавить поля:

```typescript
fields: [
  // ... existing 9 fields ...

  // Patient Extended Info (required)
  { id: 'dateOfBirth', type: 'date', label: 'Date of Birth', required: true },
  { id: 'gender', type: 'select', label: 'Gender', required: true,
    validation: { options: ['male', 'female', 'other'] } },
  { id: 'address', type: 'text', label: 'Address', required: true },
  { id: 'emergencyContact', type: 'text', label: 'Emergency Contact Name', required: true },
  { id: 'emergencyPhone', type: 'phone', label: 'Emergency Contact Phone', required: true },

  // Medical History (optional)
  { id: 'allergies', type: 'text', label: 'Allergies', required: false },
  { id: 'chronicConditions', type: 'text', label: 'Chronic Conditions', required: false },
  { id: 'currentMedications', type: 'text', label: 'Current Medications', required: false },
  { id: 'smokingStatus', type: 'select', label: 'Smoking Status', required: true,
    validation: { options: ['never', 'former', 'current'] } },
  { id: 'alcoholConsumption', type: 'select', label: 'Alcohol Consumption', required: true,
    validation: { options: ['none', 'occasional', 'moderate', 'heavy'] } },

  // Specialty-specific (conditional)
  // TODO: Dynamic fields based on specialty
]
```

### Phase 4: Frontend Integration

Обновить `ConfirmationView.vue` для отправки всех данных:

```typescript
const bookingPayload = {
  doctorId: booking.doctorId,
  slotId: selectedSlot.id,
  slotDate: booking.appointmentDate,
  slotStartTime: booking.appointmentTime,
  patient: {
    firstName: booking.patientInfo.firstName,
    lastName: booking.patientInfo.lastName,
    email: booking.patientInfo.email,
    phone: booking.patientInfo.phone,
    dateOfBirth: booking.patientInfo.dateOfBirth,
    gender: booking.patientInfo.gender,
    address: booking.patientInfo.address,
    emergencyContact: booking.patientInfo.emergencyContact,
    emergencyPhone: booking.patientInfo.emergencyPhone,
  },
  medicalHistory: booking.medicalHistory,
  specialtyFormData: booking.specialtyFormData,
  reason: booking.reason,
  notes: booking.notes,
};
```

---

## Сравнение: До и После

### API Request Body

**До:**
```json
{
  "doctorId": "1",
  "slotId": "slot_1",
  "slotDate": "2026-02-02",
  "patient": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "reason": "Checkup"
}
```

**После:**
```json
{
  "doctorId": "1",
  "slotId": "slot_1",
  "slotDate": "2026-02-02",
  "slotStartTime": "10:00",
  "patient": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com",
    "phone": "+1234567890",
    "dateOfBirth": "1985-06-15",
    "gender": "male",
    "address": "123 Main St, New York, NY 10001",
    "emergencyContact": "Jane Smith",
    "emergencyPhone": "+1987654321"
  },
  "medicalHistory": {
    "allergies": "Penicillin",
    "chronicConditions": "Hypertension",
    "currentMedications": "Lisinopril 10mg",
    "previousSurgeries": "Appendectomy 2015",
    "familyHistory": "Father - Heart Disease",
    "bloodType": "A+",
    "smokingStatus": "never",
    "alcoholConsumption": "occasional"
  },
  "specialtyFormData": {
    "chestPain": true,
    "chestPainDetails": "Occasional tightness",
    "highBloodPressure": true,
    "exerciseFrequency": "1-2-weekly"
  },
  "reason": "Annual heart checkup",
  "notes": "Prefer morning appointments"
}
```

### Typelessity Fields

**До:** 9 полей
**После:** 20+ полей (9 required + 11 optional + specialty-specific)

---

## Порядок выполнения

### Task 0: Base Tables (Admin Panel) ⚠️ REQUIRED FIRST
- [ ] Применить `001_auth_tables.sql` в Supabase Dashboard
  - Создаёт `profiles` и `patient_appointments` таблицы
  - Нужно для Admin Panel и Cabinet
  - ⚠️ Требует настроенной Supabase Auth

### Task 1: Database Migration ✅ DONE
- [x] Создать `002_expand_appointments.sql`
- [ ] Применить миграцию в Supabase (после 001!)
- [ ] Проверить структуру таблицы

### Task 2: API Update ✅ DONE
- [x] Расширить `appointments.ts` для приёма новых полей
- [x] Обновить validation
- [x] Обновить INSERT запрос
- [x] Обновить GET response

### Task 3: Frontend Update ✅ DONE
- [x] Добавить `createAppointment` в `useApi.ts`
- [x] Обновить `BookingFormView.vue` для отправки всех данных
- [x] Добавить loading state и error handling

### Task 4: Typelessity Config ✅ DONE
- [x] Обновить `medbook-config.md` с новыми полями (20 полей)
- [x] Обновить `medbook-questionnaire-filled.md`
- [x] Обновить `fieldMapping` в integration (nested paths)
- [x] Обновить AI instructions
- [ ] Обновить конфиг в Typelessity БД (seed script)

### Task 5: Testing
- [ ] Тест: бронирование через сайт (все поля)
- [ ] Тест: бронирование через Typelessity widget
- [ ] Тест: данные сохраняются в БД
- [ ] Тест: данные отображаются в admin panel

---

## Критические файлы для изменения

| Файл | Проект | Изменения |
|------|--------|-----------|
| `supabase/migrations/002_expand_appointments.sql` | medbook | Новая миграция |
| `netlify/functions/appointments.ts` | medbook | Расширить API |
| `src/views/ConfirmationView.vue` | medbook | Отправлять все данные |
| `.context/examples/medbook-config.md` | typelessity | Добавить поля |
| `.context/examples/medbook-questionnaire-filled.md` | typelessity | Обновить документацию |
| Typelessity DB seed | typelessity | Обновить конфиг в БД |

---

## Временная оценка

| Task | Время |
|------|-------|
| Database Migration | 30 мин |
| API Update | 1 час |
| Frontend Update | 30 мин |
| Typelessity Config | 1 час |
| Testing | 1 час |
| **Итого** | **4 часа** |

---

## Вопросы для обсуждения

1. **Specialty-specific fields** — делать динамическими в Typelessity или оставить как JSON blob?
2. **Обязательность полей** — какие из medical history должны быть required для widget?
3. **Backward compatibility** — старые записи без новых полей будут null, это OK?
