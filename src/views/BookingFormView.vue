<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBookingStore } from '@/stores/booking.store';
import { doctors } from '@/data/doctors';
import { CheckIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline';
import DoctorCard from '@/components/DoctorCard.vue';

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
  'neurologist': GeneralPractitionerForm,
  'gastroenterologist': GeneralPractitionerForm,
  'pediatrician': GeneralPractitionerForm
};

const currentSpecialtyForm = computed(() => {
  if (!doctor.value) return null;
  return specialtyFormComponents[doctor.value.specialty] || GeneralPractitionerForm;
});

const stepTitles: Record<string, string> = {
  'patient-info': 'Personal Information',
  'medical-history': 'Medical History',
  'specialty-form': 'Symptoms & Concerns',
  'appointment-time': 'Appointment Details',
  'confirmation': 'Review & Confirm'
};

const stepDescriptions: Record<string, string> = {
  'patient-info': 'Tell us about yourself',
  'medical-history': 'Share your health background',
  'specialty-form': 'Describe your symptoms',
  'appointment-time': 'Pick your preferred time',
  'confirmation': 'Review and confirm your booking'
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

function goToStep(index: number) {
  if (index <= currentStepIndex.value) {
    bookingStore.goToStep(bookingStore.bookingSteps[index]);
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8 md:py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="!doctor" class="text-center py-32">
        <div class="card p-12 max-w-md mx-auto">
          <div class="spinner w-10 h-10 mx-auto mb-6" />
          <p class="text-lg font-medium text-neutral-700 dark:text-neutral-300">Loading...</p>
        </div>
      </div>

      <div v-else class="space-y-6">
        <!-- Doctor Info Card -->
        <DoctorCard
          :doctor="doctor"
          variant="compact"
          :show-book-button="false"
          :interactive="false"
        />

        <!-- Progress Section -->
        <div class="card p-4 sm:p-6">
          <!-- Step Info -->
          <div class="flex items-center justify-between mb-4">
            <div>
              <div class="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">
                Step {{ currentStepIndex + 1 }} of 5
              </div>
              <h2 class="text-xl font-bold text-neutral-900 dark:text-white">
                {{ stepTitles[currentStep] }}
              </h2>
              <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                {{ stepDescriptions[currentStep] }}
              </p>
            </div>
            <div class="text-right hidden sm:block">
              <div class="text-3xl font-bold text-gradient dark:text-gradient-dark">
                {{ Math.round(((currentStepIndex + 1) / 5) * 100) }}%
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="progress-bar mb-6">
            <div
              class="progress-bar-fill"
              :style="{ width: `${((currentStepIndex + 1) / 5) * 100}%` }"
            />
          </div>

          <!-- Step Indicators -->
          <div class="flex justify-between relative">
            <!-- Connecting Line Background -->
            <div class="absolute top-5 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800" />
            <!-- Connecting Line Progress -->
            <div
              class="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
              :style="{ width: `${(currentStepIndex / 4) * 100}%` }"
            />

            <button
              v-for="(step, index) in bookingStore.bookingSteps"
              :key="step"
              @click="goToStep(index)"
              :disabled="index > currentStepIndex"
              class="relative z-10 flex flex-col items-center group"
              :class="{ 'cursor-pointer': index <= currentStepIndex, 'cursor-not-allowed': index > currentStepIndex }"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-300"
                :class="[
                  currentStepIndex > index
                    ? 'bg-success-500 text-white shadow-glow-success'
                    : currentStepIndex === index
                      ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-glow-primary'
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                ]"
              >
                <CheckIcon v-if="currentStepIndex > index" class="w-5 h-5" />
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span
                class="text-xs font-medium mt-2 hidden md:block transition-colors"
                :class="[
                  currentStepIndex >= index
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-neutral-500 dark:text-neutral-500'
                ]"
              >
                {{ stepTitles[step].split(' ')[0] }}
              </span>
            </button>
          </div>
        </div>

        <!-- Form Content -->
        <div class="card p-6 sm:p-8">
          <Transition
            mode="out-in"
            enter-active-class="transition-all duration-300 ease-smooth"
            leave-active-class="transition-all duration-200 ease-smooth"
            enter-from-class="opacity-0 translate-x-4"
            leave-to-class="opacity-0 -translate-x-4"
          >
            <!-- Patient Info Step -->
            <PatientInfoForm
              v-if="currentStep === 'patient-info'"
              :key="'patient-info'"
              @submit="handleNext"
            />

            <!-- Medical History Step -->
            <MedicalHistoryForm
              v-else-if="currentStep === 'medical-history'"
              :key="'medical-history'"
              @submit="handleNext"
              @back="handleBack"
            />

            <!-- Specialty Form Step -->
            <component
              v-else-if="currentStep === 'specialty-form' && currentSpecialtyForm"
              :is="currentSpecialtyForm"
              :key="'specialty-form'"
              @submit="handleNext"
              @back="handleBack"
            />

            <!-- Appointment Time Step -->
            <AppointmentTimeForm
              v-else-if="currentStep === 'appointment-time'"
              :key="'appointment-time'"
              @submit="handleNext"
              @back="handleBack"
            />

            <!-- Confirmation Step -->
            <div v-else-if="currentStep === 'confirmation'" :key="'confirmation'" class="space-y-6">
              <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  Review Your Appointment
                </h2>
                <p class="text-neutral-600 dark:text-neutral-400">
                  Please verify all information before confirming
                </p>
              </div>

              <!-- Doctor Info -->
              <div class="card p-5 bg-neutral-50 dark:bg-neutral-800/50">
                <h3 class="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
                  Doctor
                </h3>
                <div class="flex items-center gap-4">
                  <img :src="doctor.avatar" :alt="doctor.name" class="w-16 h-16 rounded-xl" />
                  <div>
                    <p class="font-semibold text-lg text-neutral-900 dark:text-white">{{ doctor.name }}</p>
                    <p class="text-primary-600 dark:text-primary-400 font-medium">{{ doctor.specialtyLabel }}</p>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{{ doctor.experience }} years of experience</p>
                  </div>
                </div>
              </div>

              <!-- Appointment Details -->
              <div class="card p-5 bg-neutral-50 dark:bg-neutral-800/50">
                <h3 class="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
                  Appointment
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400">Date</p>
                    <p class="font-medium text-neutral-900 dark:text-white">
                      {{ new Date(bookingStore.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                    </p>
                  </div>
                  <div>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400">Time</p>
                    <p class="font-medium text-neutral-900 dark:text-white">{{ bookingStore.appointmentTime }}</p>
                  </div>
                  <div class="sm:col-span-2">
                    <p class="text-sm text-neutral-500 dark:text-neutral-400">Reason for Visit</p>
                    <p class="font-medium text-neutral-900 dark:text-white">{{ bookingStore.appointmentReason }}</p>
                  </div>
                </div>
              </div>

              <!-- Patient Info -->
              <div class="card p-5 bg-neutral-50 dark:bg-neutral-800/50">
                <h3 class="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
                  Patient
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400">Name</p>
                    <p class="font-medium text-neutral-900 dark:text-white">
                      {{ bookingStore.patientInfo.firstName }} {{ bookingStore.patientInfo.lastName }}
                    </p>
                  </div>
                  <div>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400">Email</p>
                    <p class="font-medium text-neutral-900 dark:text-white">{{ bookingStore.patientInfo.email }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400">Phone</p>
                    <p class="font-medium text-neutral-900 dark:text-white">{{ bookingStore.patientInfo.phone }}</p>
                  </div>
                </div>
              </div>

              <!-- Price Summary -->
              <div class="card p-5 bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-primary-700 dark:text-primary-300">Consultation Fee</p>
                    <p class="text-2xl font-bold text-primary-900 dark:text-primary-100">${{ doctor.consultationFee }}</p>
                  </div>
                  <div class="badge-primary">
                    Pay at Visit
                  </div>
                </div>
              </div>

              <!-- Terms Notice -->
              <div class="alert-info">
                <p class="text-sm leading-relaxed">
                  By confirming this appointment, you agree to our terms of service and privacy policy.
                  You will receive a confirmation email shortly.
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 pt-4">
                <button @click="handleBack" class="btn-secondary flex-1 sm:flex-none group">
                  <ArrowLeftIcon class="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                  Back
                </button>
                <button @click="handleConfirm" class="btn-primary flex-1 group">
                  Confirm Appointment
                  <ArrowRightIcon class="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
