-- =============================================
-- MedBook: Expand Appointments Table
-- Add patient extended info, medical history, specialty data
-- =============================================
--
-- PREREQUISITE: Run 001_auth_tables.sql first!
-- This migration only expands the existing 'appointments' table.
-- =============================================

-- =============================================
-- EXPAND appointments TABLE
-- =============================================

-- Patient extended info
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS gender TEXT CHECK (gender IN ('male', 'female', 'other'));
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS emergency_contact TEXT;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS emergency_phone TEXT;

-- Medical history (structured JSONB)
-- Expected structure:
-- {
--   "allergies": "Penicillin, Peanuts",
--   "chronicConditions": "Hypertension",
--   "currentMedications": "Lisinopril 10mg daily",
--   "previousSurgeries": "Appendectomy 2015",
--   "familyHistory": "Father - Heart Disease",
--   "bloodType": "A+",
--   "smokingStatus": "never|former|current",
--   "alcoholConsumption": "none|occasional|moderate|heavy"
-- }
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS medical_history JSONB DEFAULT '{}'::jsonb;

-- Specialty-specific form data (JSONB)
-- Structure varies by specialty (cardiology, dermatology, etc.)
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS specialty_form_data JSONB DEFAULT '{}'::jsonb;

-- Link to authenticated user (nullable for anonymous bookings)
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS patient_id UUID;

-- Specialty of the appointment
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS specialty TEXT;

-- =============================================
-- CREATE INDEXES
-- =============================================

CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_specialty ON appointments(specialty);
CREATE INDEX IF NOT EXISTS idx_appointments_gender ON appointments(gender);

-- =============================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================

COMMENT ON COLUMN appointments.medical_history IS 'JSONB containing allergies, chronicConditions, currentMedications, previousSurgeries, familyHistory, bloodType, smokingStatus, alcoholConsumption';
COMMENT ON COLUMN appointments.specialty_form_data IS 'JSONB containing specialty-specific form data (varies by doctor specialty)';
COMMENT ON COLUMN appointments.patient_id IS 'UUID reference to profiles table for authenticated users, NULL for anonymous bookings';
