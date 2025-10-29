<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBookingStore } from '@/stores/booking.store';
import {
  CheckCircleIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const bookingStore = useBookingStore();

const doctor = computed(() => bookingStore.selectedDoctor);
const bookingData = computed(() => bookingStore.bookingData);

onMounted(() => {
  // If no booking data, redirect to doctors page
  if (!doctor.value || !bookingData.value.appointmentDate) {
    router.push('/doctors');
  }
});

function startNewBooking() {
  bookingStore.resetBooking();
  router.push('/doctors');
}

function backToHome() {
  bookingStore.resetBooking();
  router.push('/');
}
</script>

<template>
  <div class="py-20 min-h-screen">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="doctor && bookingData.appointmentDate" class="text-center animate-fade-in">
        <!-- Success Icon with Animation -->
        <div class="mb-12 animate-scale-in">
          <div class="relative inline-block">
            <div class="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div class="relative w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircleIcon class="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <h1 class="text-5xl md:text-6xl font-bold gradient-text mb-6">
          Appointment Confirmed!
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Your appointment has been successfully booked. You will receive a confirmation email shortly.
        </p>

        <!-- Booking Details Glass Card -->
        <div class="glass-card text-left mb-12 animate-slide-up">
          <h2 class="text-3xl font-bold gradient-text mb-8 text-center">Appointment Details</h2>

          <!-- Doctor Info with Gradient -->
          <div class="backdrop-blur-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 rounded-2xl p-6 mb-6 border border-primary-200/50 dark:border-primary-800/50">
            <div class="flex items-center space-x-4">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl blur-sm"></div>
                <img :src="doctor.avatar" :alt="doctor.name" class="relative w-24 h-24 rounded-2xl border-2 border-white dark:border-gray-800" />
              </div>
              <div class="text-left">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ doctor.name }}</h3>
                <p class="text-primary-600 dark:text-primary-400 font-semibold">{{ doctor.specialtyLabel }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ doctor.experience }} years of experience</p>
              </div>
            </div>
          </div>

          <!-- Appointment Info Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-xl p-5 border border-gray-200/50 dark:border-gray-800/50">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <CalendarDaysIcon class="w-6 h-6 text-white" />
                </div>
                <div class="text-left flex-1">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Date & Time</p>
                  <p class="font-bold text-gray-900 dark:text-gray-100 text-sm">
                    {{ new Date(bookingData.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                  </p>
                  <p class="font-semibold text-primary-600 dark:text-primary-400">{{ bookingData.appointmentTime }}</p>
                </div>
              </div>
            </div>

            <div class="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-xl p-5 border border-gray-200/50 dark:border-gray-800/50">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <UserCircleIcon class="w-6 h-6 text-white" />
                </div>
                <div class="text-left flex-1">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Patient</p>
                  <p class="font-bold text-gray-900 dark:text-gray-100">
                    {{ bookingData.patientInfo?.firstName }} {{ bookingData.patientInfo?.lastName }}
                  </p>
                </div>
              </div>
            </div>

            <div class="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-xl p-5 border border-gray-200/50 dark:border-gray-800/50">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <ClipboardDocumentListIcon class="w-6 h-6 text-white" />
                </div>
                <div class="text-left flex-1">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Reason for Visit</p>
                  <p class="font-bold text-gray-900 dark:text-gray-100">{{ bookingData.reason }}</p>
                </div>
              </div>
            </div>

            <div class="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-xl p-5 border border-gray-200/50 dark:border-gray-800/50">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <CurrencyDollarIcon class="w-6 h-6 text-white" />
                </div>
                <div class="text-left flex-1">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Consultation Fee</p>
                  <p class="font-bold text-2xl gradient-text">${{ doctor.consultationFee }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Steps with Modern Design -->
        <div class="glass-card backdrop-blur-xl bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/30 dark:border-blue-400/30 text-left mb-12 animate-slide-up" style="animation-delay: 0.2s;">
          <h3 class="text-xl font-bold gradient-text mb-6">Next Steps</h3>
          <ul class="space-y-4 text-gray-700 dark:text-gray-300">
            <li class="flex items-start space-x-3">
              <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white font-bold text-sm flex-shrink-0 shadow-lg">1</span>
              <span class="leading-relaxed pt-1">Check your email for the confirmation message with appointment details</span>
            </li>
            <li class="flex items-start space-x-3">
              <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white font-bold text-sm flex-shrink-0 shadow-lg">2</span>
              <span class="leading-relaxed pt-1">Arrive 15 minutes early to complete any necessary paperwork</span>
            </li>
            <li class="flex items-start space-x-3">
              <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white font-bold text-sm flex-shrink-0 shadow-lg">3</span>
              <span class="leading-relaxed pt-1">Bring a valid ID and your insurance card if applicable</span>
            </li>
            <li class="flex items-start space-x-3">
              <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-white font-bold text-sm flex-shrink-0 shadow-lg">4</span>
              <span class="leading-relaxed pt-1">If you need to cancel or reschedule, please contact us at least 24 hours in advance</span>
            </li>
          </ul>
        </div>

        <!-- Action Buttons with Animations -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style="animation-delay: 0.4s;">
          <button @click="backToHome" class="btn-secondary px-10 py-4 text-lg">
            Back to Home
          </button>
          <button @click="startNewBooking" class="btn-primary px-10 py-4 text-lg shadow-2xl">
            Book Another Appointment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
