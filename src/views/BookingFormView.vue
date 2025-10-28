<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBookingStore } from '@/stores/booking.store';
import { doctors } from '@/data/doctors';

import PatientInfoForm from '@/components/forms/PatientInfoForm.vue';
import MedicalHistoryForm from '@/components/forms/MedicalHistoryForm.vue';
import AppointmentTimeForm from '@/components/forms/AppointmentTimeForm.vue';

// Specialty forms
import CardiologyForm from '@/components/forms/specialty/CardiologyForm.vue';
import DermatologyForm from '@/components/forms/specialty/DermatologyForm.vue';
import OrthopedicForm from '@/components/forms/specialty/OrthopedicForm.vue';
import GeneralPractitionerForm from '@/components/forms/specialty/GeneralPractitionerForm.vue';

const route = useRoute();
const router = useRouter();
const bookingStore = useBookingStore();

const doctor = computed(() => bookingStore.selectedDoctor);
const currentStep = computed(() => bookingStore.currentStep);
const currentStepIndex = computed(() => bookingStore.currentStepIndex);

const specialtyFormComponents: Record<string, any> = {
  'cardiologist': CardiologyForm,
  'dermatologist': DermatologyForm,
  'general-practitioner': GeneralPractitionerForm,
  'orthopedic-surgeon': OrthopedicForm,
  'neurologist': GeneralPractitionerForm, // Using general form as fallback
  'gastroenterologist': GeneralPractitionerForm,
  'pediatrician': GeneralPractitionerForm
};

const currentSpecialtyForm = computed(() => {
  if (!doctor.value) return null;
  return specialtyFormComponents[doctor.value.specialty] || GeneralPractitionerForm;
});

const stepTitles = {
  'patient-info': 'Personal Information',
  'medical-history': 'Medical History',
  'specialty-form': 'Symptoms & Concerns',
  'appointment-time': 'Appointment Details',
  'confirmation': 'Review & Confirm'
};

onMounted(() => {
  const doctorId = route.params.doctorId as string;
  const foundDoctor = doctors.find((d) => d.id === doctorId);

  if (!foundDoctor) {
    router.push('/doctors');
    return;
  }

  bookingStore.setDoctor(foundDoctor);
});

function handleNext() {
  bookingStore.nextStep();
}

function handleBack() {
  bookingStore.previousStep();
}

function handleConfirm() {
  router.push('/confirmation');
}
</script>

<template>
  <div class="py-12 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="!doctor" class="text-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading...</p>
      </div>

      <div v-else>
        <!-- Progress Bar -->
        <div class="mb-8">
          <div class="flex justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">Step {{ currentStepIndex + 1 }} of 5</span>
            <span class="text-sm font-medium text-gray-700">{{ stepTitles[currentStep] }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div
              class="bg-primary-600 h-3 rounded-full transition-all duration-300"
              :style="{ width: `${((currentStepIndex + 1) / 5) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Step Indicators -->
        <div class="flex justify-between mb-8">
          <div
            v-for="(step, index) in bookingStore.bookingSteps"
            :key="step"
            class="flex-1 text-center"
          >
            <div
              :class="[
                'w-10 h-10 rounded-full mx-auto flex items-center justify-center text-sm font-bold mb-2 transition-all',
                currentStepIndex >= index
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-300 text-gray-600'
              ]"
            >
              {{ index + 1 }}
            </div>
            <div
              :class="[
                'text-xs hidden md:block',
                currentStepIndex >= index ? 'text-primary-600 font-medium' : 'text-gray-500'
              ]"
            >
              {{ stepTitles[step] }}
            </div>
          </div>
        </div>

        <!-- Form Content -->
        <div class="card">
          <PatientInfoForm v-if="currentStep === 'patient-info'" @submit="handleNext" />

          <MedicalHistoryForm
            v-else-if="currentStep === 'medical-history'"
            @submit="handleNext"
            @back="handleBack"
          />

          <component
            v-else-if="currentStep === 'specialty-form' && currentSpecialtyForm"
            :is="currentSpecialtyForm"
            @submit="handleNext"
            @back="handleBack"
          />

          <AppointmentTimeForm
            v-else-if="currentStep === 'appointment-time'"
            @submit="handleNext"
            @back="handleBack"
          />

          <!-- Confirmation Step -->
          <div v-else-if="currentStep === 'confirmation'" class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Review Your Appointment</h2>

            <!-- Doctor Info -->
            <div class="card bg-primary-50 border border-primary-200">
              <h3 class="text-lg font-semibold mb-3 text-gray-900">Doctor Information</h3>
              <div class="flex items-center space-x-4">
                <img :src="doctor.avatar" :alt="doctor.name" class="w-20 h-20 rounded-full" />
                <div>
                  <p class="font-bold text-lg">{{ doctor.name }}</p>
                  <p class="text-primary-700">{{ doctor.specialtyLabel }}</p>
                  <p class="text-sm text-gray-600">{{ doctor.experience }} years of experience</p>
                </div>
              </div>
            </div>

            <!-- Appointment Details -->
            <div class="card bg-gray-50">
              <h3 class="text-lg font-semibold mb-3 text-gray-900">Appointment Details</h3>
              <dl class="space-y-2">
                <div class="flex justify-between">
                  <dt class="text-gray-600">Date:</dt>
                  <dd class="font-medium">
                    {{ new Date(bookingStore.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600">Time:</dt>
                  <dd class="font-medium">{{ bookingStore.appointmentTime }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600">Reason:</dt>
                  <dd class="font-medium">{{ bookingStore.appointmentReason }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600">Consultation Fee:</dt>
                  <dd class="font-bold text-primary-600">${{ doctor.consultationFee }}</dd>
                </div>
              </dl>
            </div>

            <!-- Patient Info -->
            <div class="card bg-gray-50">
              <h3 class="text-lg font-semibold mb-3 text-gray-900">Patient Information</h3>
              <dl class="space-y-2">
                <div class="flex justify-between">
                  <dt class="text-gray-600">Name:</dt>
                  <dd class="font-medium">{{ bookingStore.patientInfo.firstName }} {{ bookingStore.patientInfo.lastName }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600">Email:</dt>
                  <dd class="font-medium">{{ bookingStore.patientInfo.email }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600">Phone:</dt>
                  <dd class="font-medium">{{ bookingStore.patientInfo.phone }}</dd>
                </div>
              </dl>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p class="text-sm text-blue-800">
                By confirming this appointment, you agree to our terms of service and privacy policy.
                You will receive a confirmation email shortly.
              </p>
            </div>

            <div class="flex justify-between pt-4">
              <button @click="handleBack" class="btn-secondary px-8 py-3">
                Back
              </button>
              <button @click="handleConfirm" class="btn-primary px-8 py-3">
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
