# API Enforcement Plan

## Goal
Update the MedBook API to strictly enforce mandatory fields that are required by the frontend form.

## Problem
Currently, `BookingFormView.vue` and `PatientInfoForm.vue` require the following fields:
- `dateOfBirth`
- `gender`
- `address`
- `emergencyContact`
- `emergencyPhone`

However, `netlify/functions/appointments.ts` treats them as optional/nullable. This creates a risk of incomplete data being saved if the frontend validation is bypassed (e.g., via direct API calls or Typelessity widget misconfiguration).

## Proposed Changes

### 1. API Validation Update
**File:** `netlify/functions/appointments.ts`

- Remove optional `?` modifier from `PatientInfo` interface for mandatory fields.
- Implement `validateSpecialtyFields(specialty: string, data: any): string[]` helper function.
- Update the validation block:

  ```typescript
  // 1. Validate Patient Info
  const missingFields = [];
  if (!patient?.firstName) missingFields.push('patient.firstName');
  if (!patient?.lastName) missingFields.push('patient.lastName');
  if (!patient?.email) missingFields.push('patient.email');
  if (!patient?.phone) missingFields.push('patient.phone');
  if (!patient?.dateOfBirth) missingFields.push('patient.dateOfBirth');
  if (!patient?.gender) missingFields.push('patient.gender');
  if (!patient?.address) missingFields.push('patient.address');
  if (!patient?.emergencyContact) missingFields.push('patient.emergencyContact');
  if (!patient?.emergencyPhone) missingFields.push('patient.emergencyPhone');

  // 2. Validate Medical History
  if (!medicalHistory?.smokingStatus) missingFields.push('medicalHistory.smokingStatus');
  if (!medicalHistory?.alcoholConsumption) missingFields.push('medicalHistory.alcoholConsumption');

  // 3. Validate Specialty Data
  const specialtyErrors = validateSpecialtyFields(specialty, specialtyFormData);
  missingFields.push(...specialtyErrors);

  if (missingFields.length > 0) {
    return errorResponse(`Missing required fields: ${missingFields.join(', ')}`, 'VALIDATION_ERROR', 400);
  }
  ```

#### Specialty Validation Logic
- **Cardiology:** Require `exerciseFrequency`.
- **Dermatology:** Require `symptomDuration`, `sunExposure`.
- **General Practice:** Require `chiefComplaint`, `symptomDuration`.
- **Orthopedics:** Require `injuryLocation`, `painLevel`, `injuryDate`, `injuryMechanism`, `physicalActivityLevel`.

### 2. Typelessity Configuration Update
**File:** `typelessity/.context/examples/medbook-config.md` (Approximate path, need to locate)

- Update `fields` array to include all `required: true` fields.
- Add `conditional-logic` or separate config sections for specialties if Typelessity supports it. *Assumption: Typelessity might only support a flat list of fields for now. We will add all potential fields but document that only some are required based on context, or use the most strict superset.*

## Verification
1. **Manual Test:** Try to book an appointment with missing fields via `curl`. specific 400 error expected.
2. **Manual Test:** Book with all fields for a specific specialty (e.g., Cardiology). Success expected.
3. **Manual Test:** Book with correct fields for one specialty but missing fields for another (should pass if validation is dynamic).

## Verification
1. **Manual Test:** Try to book an appointment with missing fields via `curl`. specific 400 error expected.
2. **Manual Test:** Book with all fields. Success expected.
