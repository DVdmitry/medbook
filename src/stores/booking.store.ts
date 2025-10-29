import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
  Doctor,
  BasePatientInfo,
  MedicalHistory,
  SpecialtyFormData,
  BookingStep,
  AppointmentBooking
} from '@/types/medical.types';

export const useBookingStore = defineStore('booking', () => {
  // State
  const selectedDoctor = ref<Doctor | null>(null);
  const currentStep = ref<BookingStep>('patient-info');
  const patientInfo = ref<Partial<BasePatientInfo>>({});
  const medicalHistory = ref<Partial<MedicalHistory>>({
    allergies: '',
    chronicConditions: '',
    currentMedications: '',
    previousSurgeries: '',
    familyHistory: ''
  });
  const specialtyFormData = ref<Partial<SpecialtyFormData>>({});
  const appointmentDate = ref<string>('');
  const appointmentTime = ref<string>('');
  const appointmentReason = ref<string>('');
  const appointmentNotes = ref<string>('');

  // Computed
  const bookingSteps: BookingStep[] = [
    'patient-info',
    'medical-history',
    'specialty-form',
    'appointment-time',
    'confirmation'
  ];

  const currentStepIndex = computed(() => {
    return bookingSteps.indexOf(currentStep.value);
  });

  const isFirstStep = computed(() => currentStepIndex.value === 0);
  const isLastStep = computed(() => currentStepIndex.value === bookingSteps.length - 1);

  const bookingData = computed<Partial<AppointmentBooking>>(() => ({
    doctorId: selectedDoctor.value?.id,
    patientInfo: patientInfo.value as BasePatientInfo,
    medicalHistory: medicalHistory.value as MedicalHistory,
    specialtyForm: specialtyFormData.value as SpecialtyFormData,
    appointmentDate: appointmentDate.value,
    appointmentTime: appointmentTime.value,
    reason: appointmentReason.value,
    notes: appointmentNotes.value
  }));

  // Actions
  function setDoctor(doctor: Doctor) {
    // If selecting a different doctor, reset all form data
    if (selectedDoctor.value && selectedDoctor.value.id !== doctor.id) {
      currentStep.value = 'patient-info';
      patientInfo.value = {};
      medicalHistory.value = {
        allergies: '',
        chronicConditions: '',
        currentMedications: '',
        previousSurgeries: '',
        familyHistory: ''
      };
      specialtyFormData.value = {};
      appointmentDate.value = '';
      appointmentTime.value = '';
      appointmentReason.value = '';
      appointmentNotes.value = '';
    }
    selectedDoctor.value = doctor;
  }

  function setPatientInfo(data: Partial<BasePatientInfo>) {
    patientInfo.value = { ...patientInfo.value, ...data };
  }

  function setMedicalHistory(data: Partial<MedicalHistory>) {
    medicalHistory.value = { ...medicalHistory.value, ...data };
  }

  function setSpecialtyFormData(data: Partial<SpecialtyFormData>) {
    specialtyFormData.value = { ...specialtyFormData.value, ...data };
  }

  function setAppointmentDateTime(date: string, time: string) {
    appointmentDate.value = date;
    appointmentTime.value = time;
  }

  function setAppointmentDetails(reason: string, notes?: string) {
    appointmentReason.value = reason;
    if (notes) appointmentNotes.value = notes;
  }

  function nextStep() {
    if (!isLastStep.value) {
      currentStep.value = bookingSteps[currentStepIndex.value + 1];
    }
  }

  function previousStep() {
    if (!isFirstStep.value) {
      currentStep.value = bookingSteps[currentStepIndex.value - 1];
    }
  }

  function goToStep(step: BookingStep) {
    currentStep.value = step;
  }

  function resetBooking() {
    selectedDoctor.value = null;
    currentStep.value = 'patient-info';
    patientInfo.value = {};
    medicalHistory.value = {
      allergies: '',
      chronicConditions: '',
      currentMedications: '',
      previousSurgeries: '',
      familyHistory: ''
    };
    specialtyFormData.value = {};
    appointmentDate.value = '';
    appointmentTime.value = '';
    appointmentReason.value = '';
    appointmentNotes.value = '';
  }

  return {
    // State
    selectedDoctor,
    currentStep,
    patientInfo,
    medicalHistory,
    specialtyFormData,
    appointmentDate,
    appointmentTime,
    appointmentReason,
    appointmentNotes,

    // Computed
    currentStepIndex,
    isFirstStep,
    isLastStep,
    bookingData,
    bookingSteps,

    // Actions
    setDoctor,
    setPatientInfo,
    setMedicalHistory,
    setSpecialtyFormData,
    setAppointmentDateTime,
    setAppointmentDetails,
    nextStep,
    previousStep,
    goToStep,
    resetBooking
  };
});
