export type Specialty =
  | 'cardiologist'
  | 'dermatologist'
  | 'general-practitioner'
  | 'orthopedic-surgeon'
  | 'neurologist'
  | 'gastroenterologist'
  | 'pediatrician';

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  specialtyLabel: string;
  rating: number;
  reviewCount: number;
  experience: number;
  education: string;
  languages: string[];
  avatar: string;
  imageUrl?: string; // Alias for avatar, used in some components
  location?: string;
  consultationFee: number;
  availableSlots: string[];
}

export interface BasePatientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface MedicalHistory {
  allergies: string;
  chronicConditions: string;
  currentMedications: string;
  previousSurgeries: string;
  familyHistory: string;
  bloodType?: string;
  smokingStatus: 'never' | 'former' | 'current';
  alcoholConsumption: 'none' | 'occasional' | 'moderate' | 'heavy';
}

// Specialty-specific forms
export interface CardiologyForm {
  chestPain: boolean;
  chestPainDetails?: string;
  shortnessOfBreath: boolean;
  palpitations: boolean;
  highBloodPressure: boolean;
  currentBloodPressure?: string;
  cholesterolLevel?: string;
  heartDiseaseFamilyHistory: boolean;
  exerciseFrequency: string;
}

export interface DermatologyForm {
  affectedArea: string[];
  symptomDuration: string;
  itching: boolean;
  pain: boolean;
  bleeding: boolean;
  skinConditionHistory: string[];
  recentSkinProducts: string;
  sunExposure: string;
  previousTreatments: string;
}

export interface OrthopedicForm {
  injuryLocation: string;
  painLevel: number; // 1-10
  injuryDate: string;
  injuryMechanism: string;
  swelling: boolean;
  limitedMobility: boolean;
  previousInjuries: string;
  physicalActivityLevel: string;
}

export interface NeurologyForm {
  headaches: boolean;
  headacheFrequency?: string;
  dizziness: boolean;
  numbness: boolean;
  weaknessLocation?: string;
  memoryIssues: boolean;
  seizures: boolean;
  sleepProblems: boolean;
  symptomDuration: string;
}

export interface GastroenterologyForm {
  abdominalPain: boolean;
  painLocation?: string;
  nausea: boolean;
  vomiting: boolean;
  diarrhea: boolean;
  constipation: boolean;
  bloating: boolean;
  weightChange: string;
  dietaryHabits: string;
  symptomDuration: string;
}

export interface GeneralPractitionerForm {
  chiefComplaint: string;
  symptomDuration: string;
  fever: boolean;
  temperature?: string;
  cough: boolean;
  fatigue: boolean;
  bodyAches: boolean;
  recentTravel: boolean;
  covidExposure: boolean;
  additionalSymptoms: string[];
}

export interface PediatricForm {
  childAge: string;
  vaccinations: string[];
  developmentalMilestones: string;
  chiefComplaint: string;
  symptomDuration: string;
  fever: boolean;
  temperature?: string;
  appetite: 'normal' | 'decreased' | 'increased';
  sleepPattern: string;
  schoolPerformance?: string;
}

export type SpecialtyFormData =
  | CardiologyForm
  | DermatologyForm
  | OrthopedicForm
  | NeurologyForm
  | GastroenterologyForm
  | GeneralPractitionerForm
  | PediatricForm;

export interface AppointmentBooking {
  doctorId: string;
  patientInfo: BasePatientInfo;
  medicalHistory: MedicalHistory;
  specialtyForm: SpecialtyFormData;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  notes?: string;
}

export type BookingStep = 'patient-info' | 'medical-history' | 'specialty-form' | 'appointment-time' | 'confirmation';

// Appointment status for patient cabinet and admin
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  slotId: string | null;
  slotDate: string;
  slotTime: string;
  specialty: string;
  status: AppointmentStatus;
  reason: string | null;
  notes: string | null;
  patientFirstName: string | null;
  patientLastName: string | null;
  patientEmail: string | null;
  patientPhone: string | null;
  medicalHistorySnapshot: Record<string, unknown>;
  specialtyFormData: Record<string, unknown>;
  cancelledAt: string | null;
  cancelledBy: string | null;
  cancellationReason: string | null;
  confirmationNumber: string | null;
  createdAt: string;
  updatedAt: string;
  // Joined data
  doctor?: Doctor;
}

export interface AppointmentFilters {
  status?: AppointmentStatus | null;
  doctorId?: string | null;
  patientId?: string | null;
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
