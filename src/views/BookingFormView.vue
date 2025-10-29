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
  <div class="py-16 min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="!doctor" class="text-center py-32">
        <div class="glass-card max-w-md mx-auto p-12">
          <div class="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p class="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
      </div>

      <div v-else class="animate-fade-in">
        <!-- Modern Progress Bar with Gradient -->
        <div class="mb-12 glass-card p-6">
          <div class="flex justify-between mb-3">
            <span class="text-sm font-bold text-gray-800 dark:text-gray-200">Step {{ currentStepIndex + 1 }} of 5</span>
            <span class="text-sm font-bold gradient-text">{{ stepTitles[currentStep] }}</span>
          </div>
          <div class="w-full h-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-xl">
            <div
              class="progress-bar"
              :style="{ width: `${((currentStepIndex + 1) / 5) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Modern Step Indicators -->
        <div class="flex justify-between mb-12 relative">
          <!-- Connecting Line -->
          <div class="absolute top-5 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 -z-10"></div>

          <div
            v-for="(step, index) in bookingStore.bookingSteps"
            :key="step"
            class="flex-1 text-center relative"
          >
            <div class="flex flex-col items-center">
              <div
                :class="[
                  'w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-sm font-bold mb-3 transition-all duration-300 relative',
                  currentStepIndex >= index
                    ? 'bg-gradient-to-br from-primary-600 to-accent-600 text-white shadow-lg scale-110'
                    : 'backdrop-blur-xl bg-gray-200/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400'
                ]"
              >
                <span v-if="currentStepIndex > index" class="text-xl">✓</span>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div
                :class="[
                  'text-xs font-semibold hidden md:block',
                  currentStepIndex >= index ? 'gradient-text' : 'text-gray-500 dark:text-gray-500'
                ]"
              >
                {{ stepTitles[step] }}
              </div>
            </div>
          </div>
        </div>

        <!-- Form Content with Glass Card -->
        <div class="glass-card p-8 animate-scale-in">
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

          <!-- Confirmation Step with Modern Design -->
          <div v-else-if="currentStep === 'confirmation'" class="space-y-8">
            <h2 class="text-3xl font-bold gradient-text mb-8">Review Your Appointment</h2>

            <!-- Doctor Info with Gradient Border -->
            <div class="backdrop-blur-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 rounded-2xl p-6 border border-primary-200/50 dark:border-primary-800/50">
              <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Doctor Information</h3>
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl blur-sm"></div>
                  <img :src="doctor.avatar" :alt="doctor.name" class="relative w-24 h-24 rounded-2xl border-2 border-white dark:border-gray-800" />
                </div>
                <div>
                  <p class="font-bold text-xl text-gray-900 dark:text-gray-100">{{ doctor.name }}</p>
                  <p class="text-primary-600 dark:text-primary-400 font-semibold">{{ doctor.specialtyLabel }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ doctor.experience }} years of experience</p>
                </div>
              </div>
            </div>

            <!-- Appointment Details with Icons -->
            <div class="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
              <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Appointment Details</h3>
              <dl class="space-y-4">
                <div class="flex justify-between items-center">
                  <dt class="text-gray-600 dark:text-gray-400 font-medium">Date:</dt>
                  <dd class="font-semibold text-gray-900 dark:text-gray-100">
                    {{ new Date(bookingStore.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                  </dd>
                </div>
                <div class="flex justify-between items-center">
                  <dt class="text-gray-600 dark:text-gray-400 font-medium">Time:</dt>
                  <dd class="font-semibold text-gray-900 dark:text-gray-100">{{ bookingStore.appointmentTime }}</dd>
                </div>
                <div class="flex justify-between items-center">
                  <dt class="text-gray-600 dark:text-gray-400 font-medium">Reason:</dt>
                  <dd class="font-semibold text-gray-900 dark:text-gray-100">{{ bookingStore.appointmentReason }}</dd>
                </div>
                <div class="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <dt class="text-gray-700 dark:text-gray-300 font-semibold">Consultation Fee:</dt>
                  <dd class="font-bold text-2xl gradient-text">${{ doctor.consultationFee }}</dd>
                </div>
              </dl>
            </div>

            <!-- Patient Info -->
            <div class="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50">
              <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Patient Information</h3>
              <dl class="space-y-3">
                <div class="flex justify-between">
                  <dt class="text-gray-600 dark:text-gray-400 font-medium">Name:</dt>
                  <dd class="font-semibold text-gray-900 dark:text-gray-100">{{ bookingStore.patientInfo.firstName }} {{ bookingStore.patientInfo.lastName }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600 dark:text-gray-400 font-medium">Email:</dt>
                  <dd class="font-semibold text-gray-900 dark:text-gray-100">{{ bookingStore.patientInfo.email }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600 dark:text-gray-400 font-medium">Phone:</dt>
                  <dd class="font-semibold text-gray-900 dark:text-gray-100">{{ bookingStore.patientInfo.phone }}</dd>
                </div>
              </dl>
            </div>

            <!-- Terms Notice -->
            <div class="backdrop-blur-xl bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/30 dark:border-blue-400/30 rounded-2xl p-6">
              <p class="text-sm text-blue-900 dark:text-blue-100 leading-relaxed">
                By confirming this appointment, you agree to our terms of service and privacy policy.
                You will receive a confirmation email shortly.
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-between pt-6">
              <button @click="handleBack" class="btn-secondary px-10 py-4 text-lg">
                Back
              </button>
              <button @click="handleConfirm" class="btn-primary px-10 py-4 text-lg shadow-2xl">
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
