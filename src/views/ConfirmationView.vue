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
  <div class="py-20 min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="doctor && bookingData.appointmentDate" class="text-center">
        <!-- Success Icon -->
        <div class="mb-10">
          <div class="w-20 h-20 bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircleIcon class="w-12 h-12 text-white" />
          </div>
        </div>

        <!-- Success Message -->
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Appointment Confirmed!
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Your appointment has been successfully booked. You will receive a confirmation email shortly.
        </p>

        <!-- Booking Details -->
        <div class="bg-white dark:bg-gray-900 text-left mb-10 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Appointment Details</h2>

          <!-- Doctor Info -->
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 mb-6 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center space-x-4">
              <img :src="doctor.avatar" :alt="doctor.name" class="w-20 h-20 rounded-lg" />
              <div class="text-left">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ doctor.name }}</h3>
                <p class="text-sky-600 dark:text-sky-400 font-medium">{{ doctor.specialtyLabel }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ doctor.experience }} years of experience</p>
              </div>
            </div>
          </div>

          <!-- Appointment Info Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CalendarDaysIcon class="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div class="text-left flex-1">
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Date & Time</p>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">
                    {{ new Date(bookingData.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                  </p>
                  <p class="font-medium text-sky-600 dark:text-sky-400">{{ bookingData.appointmentTime }}</p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserCircleIcon class="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div class="text-left flex-1">
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Patient</p>
                  <p class="font-medium text-gray-900 dark:text-white">
                    {{ bookingData.patientInfo?.firstName }} {{ bookingData.patientInfo?.lastName }}
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ClipboardDocumentListIcon class="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div class="text-left flex-1">
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Reason for Visit</p>
                  <p class="font-medium text-gray-900 dark:text-white">{{ bookingData.reason }}</p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CurrencyDollarIcon class="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div class="text-left flex-1">
                  <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Consultation Fee</p>
                  <p class="font-bold text-xl text-gray-900 dark:text-white">${{ doctor.consultationFee }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 text-left mb-10 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-5">Next Steps</h3>
          <ul class="space-y-3.5 text-gray-700 dark:text-gray-300">
            <li class="flex items-start space-x-3">
              <span class="flex items-center justify-center w-6 h-6 rounded-full bg-sky-600 dark:bg-sky-500 text-white font-semibold text-xs flex-shrink-0 mt-0.5">1</span>
              <span class="leading-relaxed">Check your email for the confirmation message with appointment details</span>
            </li>
            <li class="flex items-start space-x-3">
              <span class="flex items-center justify-center w-6 h-6 rounded-full bg-sky-600 dark:bg-sky-500 text-white font-semibold text-xs flex-shrink-0 mt-0.5">2</span>
              <span class="leading-relaxed">Arrive 15 minutes early to complete any necessary paperwork</span>
            </li>
            <li class="flex items-start space-x-3">
              <span class="flex items-center justify-center w-6 h-6 rounded-full bg-sky-600 dark:bg-sky-500 text-white font-semibold text-xs flex-shrink-0 mt-0.5">3</span>
              <span class="leading-relaxed">Bring a valid ID and your insurance card if applicable</span>
            </li>
            <li class="flex items-start space-x-3">
              <span class="flex items-center justify-center w-6 h-6 rounded-full bg-sky-600 dark:bg-sky-500 text-white font-semibold text-xs flex-shrink-0 mt-0.5">4</span>
              <span class="leading-relaxed">If you need to cancel or reschedule, please contact us at least 24 hours in advance</span>
            </li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="backToHome" class="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold px-10 py-3 rounded-lg transition-colors duration-200 border border-gray-300 dark:border-gray-600">
            Back to Home
          </button>
          <button @click="startNewBooking" class="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold px-10 py-3 rounded-lg transition-colors duration-200">
            Book Another Appointment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
