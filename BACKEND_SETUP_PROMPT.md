# Prompt for AI Agent: MedBook Backend Setup

## Context

You are tasked with creating a backend API for the **MedBook** project. This is a medical appointment booking prototype that currently exists as a frontend-only Vue application. The backend will receive appointment booking requests from an external AI-powered booking widget called **Typelessity**.

### What is Typelessity?

Typelessity is a universal AI booking widget that:
- Collects booking data through natural conversation
- Extracts structured data using GPT
- Sends the final booking to a client's API endpoint via POST request
- Expects a JSON response with booking confirmation

### Current MedBook State

- **Location**: This project folder
- **Tech Stack**: Vue 3.5, TypeScript 5, Vite, Pinia, Tailwind CSS
- **Current State**: Frontend-only, all data is mocked
- **No Backend**: There is NO existing backend or database

### Key Difference from Simple Booking APIs

MedBook implements a **realistic multi-step booking flow** inspired by FHIR healthcare standards:

1. User selects specialty/doctor
2. System shows available time slots
3. System returns specialty-specific fields to collect
4. User fills information through conversation
5. Booking is created with slot reservation

---

## Your Task

Create a functional backend API for MedBook that can:

1. **List doctors** with filtering by specialty
2. **Show available slots** for each doctor on a given date
3. **Provide dynamic booking fields** based on doctor's specialty
4. **Receive appointment bookings** from Typelessity widget
5. **Store appointments** in a database
6. **Return confirmation** with appointment ID
7. **Be hosted publicly** (accessible via HTTPS URL)

---

## Technical Requirements

### 1. Technology Stack

**Netlify + Supabase (Same as TransEdge)**
- Netlify Functions for serverless API
- Supabase PostgreSQL for database
- Deploy via GitHub integration

### 2. API Endpoints Required

#### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-28T10:30:00Z",
  "version": "1.0.0"
}
```

---

#### GET /api/doctors
List doctors with optional filtering.

**Query params:**
- `specialty` - filter by specialty (e.g., "cardiologist")
- `available_date` - only doctors with available slots on this date

**Response:**
```json
{
  "doctors": [
    {
      "id": "1",
      "name": "Dr. Sarah Mitchell",
      "specialty": "cardiologist",
      "specialtyLabel": "Cardiology",
      "rating": 4.9,
      "reviewCount": 127,
      "experience": 15,
      "consultationFee": 250,
      "avatar": "https://randomuser.me/api/portraits/women/1.jpg",
      "nextAvailableSlot": "2026-02-01T09:00:00"
    },
    {
      "id": "2",
      "name": "Dr. James Wilson",
      "specialty": "dermatologist",
      "specialtyLabel": "Dermatology",
      "rating": 4.8,
      "reviewCount": 98,
      "experience": 12,
      "consultationFee": 200,
      "avatar": "https://randomuser.me/api/portraits/men/2.jpg",
      "nextAvailableSlot": "2026-02-01T10:00:00"
    }
  ],
  "total": 7
}
```

---

#### GET /api/doctors/:id
Get single doctor details.

**Response:**
```json
{
  "id": "1",
  "name": "Dr. Sarah Mitchell",
  "specialty": "cardiologist",
  "specialtyLabel": "Cardiology",
  "rating": 4.9,
  "reviewCount": 127,
  "experience": 15,
  "education": "Harvard Medical School",
  "languages": ["English", "Spanish"],
  "consultationFee": 250,
  "avatar": "https://randomuser.me/api/portraits/women/1.jpg",
  "bio": "Board-certified cardiologist with 15 years of experience specializing in preventive cardiology and heart disease management."
}
```

---

#### GET /api/doctors/:id/schedule
Get doctor's working hours.

**Response:**
```json
{
  "doctorId": "1",
  "timezone": "America/New_York",
  "slotDuration": 30,
  "bufferTime": 15,
  "workingHours": {
    "monday": { "start": "09:00", "end": "17:00" },
    "tuesday": { "start": "09:00", "end": "17:00" },
    "wednesday": { "start": "09:00", "end": "13:00" },
    "thursday": { "start": "09:00", "end": "17:00" },
    "friday": { "start": "09:00", "end": "15:00" },
    "saturday": null,
    "sunday": null
  },
  "breaks": [
    { "start": "12:00", "end": "13:00", "label": "Lunch" }
  ]
}
```

---

#### GET /api/doctors/:id/slots
**KEY ENDPOINT** - Get available time slots for a specific date.

**Query params:**
- `date` (required) - date in YYYY-MM-DD format

**Response:**
```json
{
  "doctorId": "1",
  "date": "2026-02-15",
  "slots": [
    {
      "id": "slot_a1b2c3",
      "startTime": "09:00",
      "endTime": "09:30",
      "status": "available"
    },
    {
      "id": "slot_d4e5f6",
      "startTime": "09:30",
      "endTime": "10:00",
      "status": "available"
    },
    {
      "id": "slot_g7h8i9",
      "startTime": "10:00",
      "endTime": "10:30",
      "status": "booked"
    },
    {
      "id": "slot_j1k2l3",
      "startTime": "10:30",
      "endTime": "11:00",
      "status": "available"
    }
  ],
  "availableCount": 12,
  "totalCount": 14
}
```

**Slot Generation Logic:**
1. Get doctor's schedule for the day of week
2. Generate slots based on slotDuration (e.g., 30 min)
3. Exclude breaks
4. Mark booked slots from appointments table

---

#### GET /api/doctors/:id/booking-fields
**KEY ENDPOINT** - Get fields to collect based on doctor's specialty.

This endpoint returns different fields for different specialties:
- Cardiologist → heart-related questions
- Dermatologist → skin-related questions
- General Practitioner → general symptom questions

**Response for Cardiologist (specialty="cardiologist"):**
```json
{
  "doctorId": "1",
  "specialty": "cardiologist",
  "requiredFields": [
    {
      "id": "firstName",
      "type": "text",
      "label": "First Name",
      "required": true,
      "aiHint": "Patient's first/given name"
    },
    {
      "id": "lastName",
      "type": "text",
      "label": "Last Name",
      "required": true,
      "aiHint": "Patient's last/family name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email",
      "required": true,
      "aiHint": "Email address for appointment confirmation"
    },
    {
      "id": "phone",
      "type": "phone",
      "label": "Phone",
      "required": true,
      "aiHint": "Contact phone number"
    },
    {
      "id": "reason",
      "type": "text",
      "label": "Reason for Visit",
      "required": true,
      "aiHint": "Brief description of why the patient needs this appointment"
    }
  ],
  "optionalFields": [
    {
      "id": "chestPain",
      "type": "boolean",
      "label": "Experiencing chest pain?",
      "aiHint": "Does the patient have chest pain or discomfort?"
    },
    {
      "id": "shortnessOfBreath",
      "type": "boolean",
      "label": "Shortness of breath?",
      "aiHint": "Does the patient experience difficulty breathing?"
    },
    {
      "id": "bloodPressure",
      "type": "text",
      "label": "Recent Blood Pressure",
      "aiHint": "Recent blood pressure reading if known (e.g., 120/80)"
    },
    {
      "id": "heartConditionHistory",
      "type": "boolean",
      "label": "Family history of heart disease?",
      "aiHint": "Does the patient have family history of heart conditions?"
    },
    {
      "id": "allergies",
      "type": "textarea",
      "label": "Known Allergies",
      "aiHint": "Any known allergies to medications"
    },
    {
      "id": "currentMedications",
      "type": "textarea",
      "label": "Current Medications",
      "aiHint": "Medications the patient is currently taking"
    }
  ]
}
```

**Response for Dermatologist (specialty="dermatologist"):**
```json
{
  "doctorId": "2",
  "specialty": "dermatologist",
  "requiredFields": [
    // ... same base fields (firstName, lastName, email, phone, reason)
  ],
  "optionalFields": [
    {
      "id": "affectedArea",
      "type": "text",
      "label": "Affected Area",
      "aiHint": "Which part of the body is affected? (e.g., face, arms, back)"
    },
    {
      "id": "symptomDuration",
      "type": "select",
      "label": "How long have you had this condition?",
      "aiHint": "Duration of the skin condition",
      "options": ["Less than 1 week", "1-4 weeks", "1-3 months", "More than 3 months"]
    },
    {
      "id": "itching",
      "type": "boolean",
      "label": "Is there itching?",
      "aiHint": "Does the affected area itch?"
    },
    {
      "id": "previousTreatments",
      "type": "textarea",
      "label": "Previous treatments tried",
      "aiHint": "Any treatments or products already tried for this condition"
    }
  ]
}
```

**Response for General Practitioner (specialty="general-practitioner"):**
```json
{
  "doctorId": "3",
  "specialty": "general-practitioner",
  "requiredFields": [
    // ... same base fields
  ],
  "optionalFields": [
    {
      "id": "chiefComplaint",
      "type": "textarea",
      "label": "Main Health Concern",
      "aiHint": "Primary reason or symptoms for the visit"
    },
    {
      "id": "symptomDuration",
      "type": "select",
      "label": "How long have you had these symptoms?",
      "aiHint": "Duration of symptoms",
      "options": ["Less than 24 hours", "1-3 days", "4-7 days", "1-2 weeks", "More than 2 weeks"]
    },
    {
      "id": "fever",
      "type": "boolean",
      "label": "Do you have a fever?",
      "aiHint": "Is the patient experiencing fever?"
    },
    {
      "id": "allergies",
      "type": "textarea",
      "label": "Known Allergies",
      "aiHint": "Any known allergies"
    },
    {
      "id": "currentMedications",
      "type": "textarea",
      "label": "Current Medications",
      "aiHint": "Medications currently taking"
    }
  ]
}
```

---

#### POST /api/appointments
Create new appointment booking.

**Request from Typelessity:**
```http
POST /api/appointments HTTP/1.1
Content-Type: application/json
X-Request-Id: req_abc123
X-Idempotency-Key: idem_xyz789

{
  "doctorId": "1",
  "slotId": "slot_a1b2c3",
  "patient": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "phone": "+1-555-123-4567",
    "dateOfBirth": "1985-06-15"
  },
  "medicalInfo": {
    "chestPain": true,
    "shortnessOfBreath": false,
    "bloodPressure": "145/92",
    "allergies": "Penicillin",
    "currentMedications": "Lisinopril 10mg daily"
  },
  "reason": "Follow-up consultation for high blood pressure",
  "notes": "Please review my recent ECG results"
}
```

**Expected Response (Success):**
```json
{
  "appointmentId": "APT-20260215-001",
  "confirmationNumber": "CONF-MED-XYZ789",
  "status": "confirmed",
  "message": "Appointment booked successfully",
  "details": {
    "doctor": {
      "id": "1",
      "name": "Dr. Sarah Mitchell",
      "specialty": "Cardiology"
    },
    "dateTime": "2026-02-15T09:00:00",
    "duration": 30,
    "consultationFee": 250
  }
}
```

**Expected Response (Slot Unavailable):**
```json
{
  "error": "This time slot is no longer available",
  "code": "SLOT_UNAVAILABLE",
  "suggestion": "Please select another available time slot"
}
```

**Expected Response (Validation Error):**
```json
{
  "error": "Missing required field: email",
  "code": "VALIDATION_ERROR",
  "details": {
    "field": "patient.email",
    "message": "Email address is required"
  }
}
```

---

#### GET /api/appointments/:id
Get appointment details.

**Response:**
```json
{
  "appointmentId": "APT-20260215-001",
  "confirmationNumber": "CONF-MED-XYZ789",
  "status": "confirmed",
  "doctor": {
    "id": "1",
    "name": "Dr. Sarah Mitchell",
    "specialty": "Cardiology",
    "consultationFee": 250
  },
  "patient": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "phone": "+1-555-123-4567"
  },
  "dateTime": "2026-02-15T09:00:00",
  "duration": 30,
  "reason": "Follow-up consultation for high blood pressure",
  "createdAt": "2026-01-28T10:30:00Z"
}
```

---

### 3. Database Schema (Supabase PostgreSQL)

```sql
-- Doctors table
CREATE TABLE doctors (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  specialty VARCHAR(50) NOT NULL,
  specialty_label VARCHAR(100) NOT NULL,
  rating DECIMAL(2,1),
  review_count INTEGER DEFAULT 0,
  experience INTEGER,
  education VARCHAR(300),
  languages JSONB DEFAULT '[]',
  consultation_fee DECIMAL(10,2),
  avatar VARCHAR(500),
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Doctor schedules (working hours)
CREATE TABLE schedules (
  id SERIAL PRIMARY KEY,
  doctor_id VARCHAR(10) REFERENCES doctors(id),
  day_of_week INTEGER NOT NULL, -- 0=Sunday, 1=Monday, etc.
  start_time VARCHAR(5),        -- "09:00"
  end_time VARCHAR(5),          -- "17:00"
  is_working BOOLEAN DEFAULT true,
  UNIQUE(doctor_id, day_of_week)
);

-- Schedule breaks (lunch, etc.)
CREATE TABLE schedule_breaks (
  id SERIAL PRIMARY KEY,
  doctor_id VARCHAR(10) REFERENCES doctors(id),
  day_of_week INTEGER,          -- NULL means all days
  start_time VARCHAR(5) NOT NULL,
  end_time VARCHAR(5) NOT NULL,
  label VARCHAR(100)
);

-- Slots (dynamically generated or cached)
CREATE TABLE slots (
  id VARCHAR(50) PRIMARY KEY,   -- "slot_a1b2c3"
  doctor_id VARCHAR(10) REFERENCES doctors(id),
  date DATE NOT NULL,
  start_time VARCHAR(5) NOT NULL,
  end_time VARCHAR(5) NOT NULL,
  status VARCHAR(20) DEFAULT 'available', -- available, booked, blocked
  appointment_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Appointments
CREATE TABLE appointments (
  id VARCHAR(50) PRIMARY KEY,   -- "APT-20260215-001"
  confirmation_number VARCHAR(50) UNIQUE NOT NULL,
  doctor_id VARCHAR(10) REFERENCES doctors(id),
  slot_id VARCHAR(50) REFERENCES slots(id),

  -- Patient info
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  date_of_birth DATE,

  -- Medical info (flexible JSON)
  medical_info JSONB DEFAULT '{}',

  -- Appointment details
  reason TEXT NOT NULL,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'confirmed',

  -- Metadata
  idempotency_key VARCHAR(100),
  request_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Specialty-specific fields configuration
CREATE TABLE specialty_fields (
  id SERIAL PRIMARY KEY,
  specialty VARCHAR(50) NOT NULL,
  field_id VARCHAR(50) NOT NULL,
  field_type VARCHAR(20) NOT NULL,
  label VARCHAR(200) NOT NULL,
  is_required BOOLEAN DEFAULT false,
  ai_hint TEXT,
  field_category VARCHAR(20) DEFAULT 'optional', -- required, optional
  options JSONB,                                  -- for select fields
  display_order INTEGER DEFAULT 0,
  UNIQUE(specialty, field_id)
);

-- Indexes
CREATE INDEX idx_slots_doctor_date ON slots(doctor_id, date);
CREATE INDEX idx_slots_status ON slots(status);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_confirmation ON appointments(confirmation_number);
CREATE INDEX idx_appointments_idempotency ON appointments(idempotency_key);
CREATE INDEX idx_specialty_fields_specialty ON specialty_fields(specialty);
```

---

### 4. CORS Configuration

```javascript
// Netlify function headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Request-Id, X-Idempotency-Key',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

// Handle OPTIONS preflight
if (event.httpMethod === 'OPTIONS') {
  return { statusCode: 204, headers };
}
```

---

### 5. Slot Generation Logic

```typescript
function generateSlotsForDate(
  schedule: Schedule,
  breaks: Break[],
  existingBookings: Appointment[],
  date: Date
): Slot[] {
  const dayOfWeek = date.getDay();
  const daySchedule = schedule.workingHours[dayOfWeek];

  if (!daySchedule || !daySchedule.start) {
    return []; // Doctor doesn't work this day
  }

  const slots: Slot[] = [];
  let currentTime = parseTime(daySchedule.start);
  const endTime = parseTime(daySchedule.end);
  const slotDuration = schedule.slotDuration || 30;

  while (currentTime < endTime) {
    const slotStart = formatTime(currentTime);
    const slotEnd = formatTime(currentTime + slotDuration);

    // Check if slot overlaps with break
    const isBreak = breaks.some(b =>
      isOverlapping(slotStart, slotEnd, b.start_time, b.end_time)
    );

    if (!isBreak) {
      const slotId = generateSlotId();
      const isBooked = existingBookings.some(a =>
        a.slot_id === slotId ||
        (a.date === date && a.start_time === slotStart)
      );

      slots.push({
        id: slotId,
        startTime: slotStart,
        endTime: slotEnd,
        status: isBooked ? 'booked' : 'available'
      });
    }

    currentTime += slotDuration;
  }

  return slots;
}
```

---

### 6. ID Generation

```typescript
function generateAppointmentId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
  return `APT-${date}-${seq}`;
}

function generateConfirmationNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'CONF-MED-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateSlotId(): string {
  return `slot_${Math.random().toString(36).substring(2, 8)}`;
}
```

---

### 7. Idempotency Support

```typescript
async function createAppointment(event: APIGatewayEvent) {
  const idempotencyKey = event.headers['x-idempotency-key'];

  // Check for existing appointment with same idempotency key
  if (idempotencyKey) {
    const existing = await supabase
      .from('appointments')
      .select('*')
      .eq('idempotency_key', idempotencyKey)
      .single();

    if (existing.data) {
      return formatAppointmentResponse(existing.data);
    }
  }

  // Verify slot is still available
  const slot = await supabase
    .from('slots')
    .select('*')
    .eq('id', body.slotId)
    .single();

  if (slot.data?.status !== 'available') {
    return {
      statusCode: 409,
      body: JSON.stringify({
        error: 'This time slot is no longer available',
        code: 'SLOT_UNAVAILABLE'
      })
    };
  }

  // Create appointment and mark slot as booked (transaction)
  // ...
}
```

---

## Project Structure

```
/medbook/
├── netlify/
│   └── functions/
│       ├── health.ts
│       ├── doctors.ts
│       ├── doctor-schedule.ts
│       ├── doctor-slots.ts
│       ├── doctor-booking-fields.ts
│       ├── appointments.ts
│       └── _shared/
│           ├── supabase.ts
│           ├── cors.ts
│           └── utils.ts
├── netlify.toml
├── src/                          # Existing Vue app
├── BACKEND_SETUP_PROMPT.md       # This file
└── TYPELESSITY_INTEGRATION.md    # Progress tracker
```

---

## netlify.toml Configuration

```toml
[build]
  publish = "dist"
  command = "npm run build"
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"

# API Redirects
[[redirects]]
  from = "/api/health"
  to = "/.netlify/functions/health"
  status = 200

[[redirects]]
  from = "/api/doctors"
  to = "/.netlify/functions/doctors"
  status = 200

[[redirects]]
  from = "/api/doctors/:id"
  to = "/.netlify/functions/doctors"
  status = 200

[[redirects]]
  from = "/api/doctors/:id/schedule"
  to = "/.netlify/functions/doctor-schedule"
  status = 200

[[redirects]]
  from = "/api/doctors/:id/slots"
  to = "/.netlify/functions/doctor-slots"
  status = 200

[[redirects]]
  from = "/api/doctors/:id/booking-fields"
  to = "/.netlify/functions/doctor-booking-fields"
  status = 200

[[redirects]]
  from = "/api/appointments"
  to = "/.netlify/functions/appointments"
  status = 200

[[redirects]]
  from = "/api/appointments/:id"
  to = "/.netlify/functions/appointments"
  status = 200

# SPA fallback
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Seed Data

Use existing doctor data from `/src/data/doctors.ts` to seed the database:

```typescript
const doctors = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'cardiologist',
    specialtyLabel: 'Cardiology',
    rating: 4.9,
    reviewCount: 127,
    experience: 15,
    education: 'Harvard Medical School',
    languages: ['English', 'Spanish'],
    consultationFee: 250
  },
  // ... more doctors from doctors.ts
];
```

---

## Testing

After deployment, test with curl:

```bash
# Health check
curl https://your-site.netlify.app/api/health

# List all doctors
curl https://your-site.netlify.app/api/doctors

# Filter by specialty
curl "https://your-site.netlify.app/api/doctors?specialty=cardiologist"

# Get doctor details
curl https://your-site.netlify.app/api/doctors/1

# Get doctor schedule
curl https://your-site.netlify.app/api/doctors/1/schedule

# Get available slots
curl "https://your-site.netlify.app/api/doctors/1/slots?date=2026-02-15"

# Get booking fields
curl https://your-site.netlify.app/api/doctors/1/booking-fields

# Create appointment
curl -X POST https://your-site.netlify.app/api/appointments \
  -H "Content-Type: application/json" \
  -H "X-Idempotency-Key: test-$(date +%s)" \
  -d '{
    "doctorId": "1",
    "slotId": "slot_abc123",
    "patient": {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john@example.com",
      "phone": "+1-555-1234"
    },
    "reason": "Annual checkup"
  }'

# Get appointment
curl https://your-site.netlify.app/api/appointments/APT-20260215-001
```

---

## Success Criteria

Your implementation is complete when:

1. [ ] Netlify site is deployed and accessible
2. [ ] Supabase database is configured with all tables
3. [ ] GET /api/health returns status
4. [ ] GET /api/doctors lists all doctors
5. [ ] GET /api/doctors/:id returns doctor details
6. [ ] GET /api/doctors/:id/schedule returns working hours
7. [ ] GET /api/doctors/:id/slots returns available slots for date
8. [ ] GET /api/doctors/:id/booking-fields returns specialty-specific fields
9. [ ] POST /api/appointments creates booking and marks slot as booked
10. [ ] Idempotency is implemented
11. [ ] CORS is properly configured
12. [ ] All doctors and schedules are seeded

---

## Final Deliverable

After completing the backend, provide:

1. **Site URL**: The Netlify site URL
2. **API Base URL**: `https://your-site.netlify.app/api`
3. **Supabase Project**: Project URL and anon key (for env vars)
4. **Test Results**: Curl output showing all endpoints working

This URL will then be configured in Typelessity as the integration endpoint for MedBook appointments.
