<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBookingStore } from '@/stores/booking.store';

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
  <div class="py-12 bg-gray-50 min-h-screen">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="doctor && bookingData.appointmentDate" class="text-center">
        <!-- Success Icon -->
        <div class="mb-8">
          <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        <!-- Success Message -->
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Appointment Confirmed!
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Your appointment has been successfully booked. You will receive a confirmation email shortly.
        </p>

        <!-- Booking Details Card -->
        <div class="card text-left mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Appointment Details</h2>

          <!-- Doctor Info -->
          <div class="bg-primary-50 rounded-lg p-6 mb-6">
            <div class="flex items-center space-x-4">
              <img :src="doctor.avatar" :alt="doctor.name" class="w-20 h-20 rounded-full" />
              <div class="text-left">
                <h3 class="text-xl font-bold text-gray-900">{{ doctor.name }}</h3>
                <p class="text-primary-700 font-medium">{{ doctor.specialtyLabel }}</p>
                <p class="text-sm text-gray-600">{{ doctor.experience }} years of experience</p>
              </div>
            </div>
          </div>

          <!-- Appointment Info -->
          <div class="space-y-4">
            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div class="text-left">
                <p class="text-sm text-gray-600">Date & Time</p>
                <p class="font-bold text-gray-900">
                  {{ new Date(bookingData.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                  at {{ bookingData.appointmentTime }}
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div class="text-left">
                <p class="text-sm text-gray-600">Patient</p>
                <p class="font-bold text-gray-900">
                  {{ bookingData.patientInfo?.firstName }} {{ bookingData.patientInfo?.lastName }}
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="text-left">
                <p class="text-sm text-gray-600">Reason for Visit</p>
                <p class="font-bold text-gray-900">{{ bookingData.reason }}</p>
              </div>
            </div>

            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="text-left">
                <p class="text-sm text-gray-600">Consultation Fee</p>
                <p class="font-bold text-primary-600 text-xl">${{ doctor.consultationFee }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="card bg-blue-50 border border-blue-200 text-left mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">1.</span>
              <span>Check your email for the confirmation message with appointment details</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">2.</span>
              <span>Arrive 15 minutes early to complete any necessary paperwork</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">3.</span>
              <span>Bring a valid ID and your insurance card if applicable</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">4.</span>
              <span>If you need to cancel or reschedule, please contact us at least 24 hours in advance</span>
            </li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="backToHome" class="btn-secondary px-8 py-3 text-lg">
            Back to Home
          </button>
          <button @click="startNewBooking" class="btn-primary px-8 py-3 text-lg">
            Book Another Appointment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
