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
  <div class="py-16 min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="!doctor" class="text-center py-32">
        <div class="max-w-md mx-auto bg-white dark:bg-gray-900 p-12 rounded-lg border border-gray-200 dark:border-gray-800">
          <div class="w-12 h-12 border-4 border-gray-200 dark:border-gray-800 border-t-sky-600 dark:border-t-sky-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p class="text-lg font-medium text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
      </div>

      <div v-else>
        <!-- Progress Bar -->
        <div class="mb-10 bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <div class="flex justify-between mb-3">
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Step {{ currentStepIndex + 1 }} of 5</span>
            <span class="text-sm font-semibold text-sky-600 dark:text-sky-400">{{ stepTitles[currentStep] }}</span>
          </div>
          <div class="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              class="h-full bg-sky-600 dark:bg-sky-500 transition-all duration-300"
              :style="{ width: `${((currentStepIndex + 1) / 5) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Step Indicators -->
        <div class="flex justify-between mb-10 relative">
          <!-- Connecting Line -->
          <div class="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-800 -z-10"></div>

          <div
            v-for="(step, index) in bookingStore.bookingSteps"
            :key="step"
            class="flex-1 text-center relative"
          >
            <div class="flex flex-col items-center">
              <div
                :class="[
                  'w-10 h-10 rounded-full mx-auto flex items-center justify-center text-sm font-semibold mb-2 transition-all duration-300 relative',
                  currentStepIndex >= index
                    ? 'bg-sky-600 dark:bg-sky-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                ]"
              >
                <span v-if="currentStepIndex > index" class="text-base">✓</span>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div
                :class="[
                  'text-xs font-medium hidden md:block',
                  currentStepIndex >= index ? 'text-sky-600 dark:text-sky-400' : 'text-gray-500 dark:text-gray-500'
                ]"
              >
                {{ stepTitles[step] }}
              </div>
            </div>
          </div>
        </div>

        <!-- Form Content -->
        <div class="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800">
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
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Review Your Appointment</h2>

            <!-- Doctor Info -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-base font-semibold mb-4 text-gray-900 dark:text-white">Doctor Information</h3>
              <div class="flex items-center space-x-4">
                <img :src="doctor.avatar" :alt="doctor.name" class="w-20 h-20 rounded-lg" />
                <div>
                  <p class="font-semibold text-lg text-gray-900 dark:text-white">{{ doctor.name }}</p>
                  <p class="text-sky-600 dark:text-sky-400 font-medium">{{ doctor.specialtyLabel }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ doctor.experience }} years of experience</p>
                </div>
              </div>
            </div>

            <!-- Appointment Details -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-base font-semibold mb-4 text-gray-900 dark:text-white">Appointment Details</h3>
              <dl class="space-y-3">
                <div class="flex justify-between items-center">
                  <dt class="text-gray-600 dark:text-gray-400">Date:</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">
                    {{ new Date(bookingStore.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                  </dd>
                </div>
                <div class="flex justify-between items-center">
                  <dt class="text-gray-600 dark:text-gray-400">Time:</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{{ bookingStore.appointmentTime }}</dd>
                </div>
                <div class="flex justify-between items-center">
                  <dt class="text-gray-600 dark:text-gray-400">Reason:</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{{ bookingStore.appointmentReason }}</dd>
                </div>
                <div class="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <dt class="text-gray-700 dark:text-gray-300 font-medium">Consultation Fee:</dt>
                  <dd class="font-bold text-xl text-gray-900 dark:text-white">${{ doctor.consultationFee }}</dd>
                </div>
              </dl>
            </div>

            <!-- Patient Info -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-base font-semibold mb-4 text-gray-900 dark:text-white">Patient Information</h3>
              <dl class="space-y-3">
                <div class="flex justify-between">
                  <dt class="text-gray-600 dark:text-gray-400">Name:</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{{ bookingStore.patientInfo.firstName }} {{ bookingStore.patientInfo.lastName }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600 dark:text-gray-400">Email:</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{{ bookingStore.patientInfo.email }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600 dark:text-gray-400">Phone:</dt>
                  <dd class="font-medium text-gray-900 dark:text-white">{{ bookingStore.patientInfo.phone }}</dd>
                </div>
              </dl>
            </div>

            <!-- Terms Notice -->
            <div class="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg p-5">
              <p class="text-sm text-sky-900 dark:text-sky-100 leading-relaxed">
                By confirming this appointment, you agree to our terms of service and privacy policy.
                You will receive a confirmation email shortly.
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-between pt-4">
              <button @click="handleBack" class="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold px-10 py-3 rounded-lg transition-colors duration-200 border border-gray-300 dark:border-gray-600">
                Back
              </button>
              <button @click="handleConfirm" class="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold px-10 py-3 rounded-lg transition-colors duration-200">
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
