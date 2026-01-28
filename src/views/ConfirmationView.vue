<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBookingStore } from '@/stores/booking.store';
import {
  CheckIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  ArrowRightIcon,
  HomeIcon
} from '@heroicons/vue/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid';

const router = useRouter();
const bookingStore = useBookingStore();

const doctor = computed(() => bookingStore.selectedDoctor);
const bookingData = computed(() => bookingStore.bookingData);

const showCheckmark = ref(false);
const showContent = ref(false);

onMounted(() => {
  if (!doctor.value || !bookingData.value.appointmentDate) {
    router.push('/doctors');
    return;
  }

  // Animate checkmark first
  setTimeout(() => {
    showCheckmark.value = true;
  }, 100);

  // Then show content
  setTimeout(() => {
    showContent.value = true;
  }, 600);
});

const nextSteps = [
  {
    icon: EnvelopeIcon,
    title: 'Check Your Email',
    description: 'Confirmation details have been sent to your inbox'
  },
  {
    icon: ClockIcon,
    title: 'Arrive 15 Minutes Early',
    description: 'Complete any remaining paperwork before your appointment'
  },
  {
    icon: ClipboardDocumentListIcon,
    title: 'Bring Required Documents',
    description: 'Valid ID and insurance card (if applicable)'
  },
  {
    icon: PhoneIcon,
    title: 'Need to Reschedule?',
    description: 'Contact us at least 24 hours in advance'
  }
];

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
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12 md:py-20">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="doctor && bookingData.appointmentDate">
        <!-- Success Header -->
        <div class="text-center mb-12">
          <!-- Animated Checkmark -->
          <div class="relative inline-flex items-center justify-center mb-8">
            <!-- Outer ring animation -->
            <div
              class="absolute w-28 h-28 rounded-full border-4 border-success-200 dark:border-success-800 transition-all duration-500"
              :class="showCheckmark ? 'scale-100 opacity-100' : 'scale-50 opacity-0'"
            />
            <!-- Inner circle -->
            <div
              class="w-24 h-24 rounded-full bg-gradient-to-br from-success-400 to-success-600 flex items-center justify-center shadow-glow-success transition-all duration-500"
              :class="showCheckmark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
            >
              <CheckIcon
                class="w-12 h-12 text-white transition-all duration-300"
                :class="showCheckmark ? 'scale-100' : 'scale-0'"
              />
            </div>
          </div>

          <!-- Success Message -->
          <Transition
            enter-active-class="transition-all duration-500 ease-smooth"
            enter-from-class="opacity-0 translate-y-4"
          >
            <div v-if="showContent">
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                Appointment <span class="text-gradient dark:text-gradient-dark">Confirmed!</span>
              </h1>
              <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
                Your appointment has been successfully booked. Check your email for confirmation details.
              </p>
            </div>
          </Transition>
        </div>

        <!-- Booking Details Card -->
        <Transition
          enter-active-class="transition-all duration-500 ease-smooth delay-100"
          enter-from-class="opacity-0 translate-y-4"
        >
          <div v-if="showContent" class="card p-6 sm:p-8 mb-8">
            <h2 class="text-xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
              Appointment Details
            </h2>

            <!-- Doctor Info -->
            <div class="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 mb-6">
              <div class="relative">
                <img
                  :src="doctor.avatar"
                  :alt="doctor.name"
                  class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover ring-2 ring-neutral-100 dark:ring-neutral-700"
                />
                <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-success-500 rounded-full border-2 border-white dark:border-neutral-800 flex items-center justify-center">
                  <CheckIcon class="w-3 h-3 text-white" />
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">{{ doctor.name }}</h3>
                <p class="text-primary-600 dark:text-primary-400 font-medium">{{ doctor.specialtyLabel }}</p>
                <div class="flex items-center gap-1.5 mt-1">
                  <StarIconSolid class="w-4 h-4 text-warning-500" />
                  <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ doctor.rating }}</span>
                  <span class="text-sm text-neutral-500">• {{ doctor.experience }} years exp</span>
                </div>
              </div>
            </div>

            <!-- Info Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Date & Time -->
              <div class="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                <div class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <CalendarDaysIcon class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-0.5">Date & Time</p>
                  <p class="font-medium text-neutral-900 dark:text-white text-sm">
                    {{ new Date(bookingData.appointmentDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) }}
                  </p>
                  <p class="font-semibold text-primary-600 dark:text-primary-400">{{ bookingData.appointmentTime }}</p>
                </div>
              </div>

              <!-- Patient -->
              <div class="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                <div class="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center flex-shrink-0">
                  <UserCircleIcon class="w-5 h-5 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-0.5">Patient</p>
                  <p class="font-medium text-neutral-900 dark:text-white">
                    {{ bookingData.patientInfo?.firstName }} {{ bookingData.patientInfo?.lastName }}
                  </p>
                </div>
              </div>

              <!-- Reason -->
              <div class="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                <div class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <ClipboardDocumentListIcon class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-0.5">Reason</p>
                  <p class="font-medium text-neutral-900 dark:text-white">{{ bookingData.reason }}</p>
                </div>
              </div>

              <!-- Fee -->
              <div class="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                <div class="w-10 h-10 rounded-lg bg-success-100 dark:bg-success-900/30 flex items-center justify-center flex-shrink-0">
                  <CurrencyDollarIcon class="w-5 h-5 text-success-600 dark:text-success-400" />
                </div>
                <div>
                  <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-0.5">Consultation Fee</p>
                  <p class="text-xl font-bold text-neutral-900 dark:text-white">${{ doctor.consultationFee }}</p>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Next Steps -->
        <Transition
          enter-active-class="transition-all duration-500 ease-smooth delay-200"
          enter-from-class="opacity-0 translate-y-4"
        >
          <div v-if="showContent" class="card p-6 sm:p-8 mb-8 bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800">
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <span class="w-8 h-8 rounded-lg bg-primary-600 dark:bg-primary-500 flex items-center justify-center">
                <MapPinIcon class="w-4 h-4 text-white" />
              </span>
              What's Next
            </h3>

            <div class="space-y-4">
              <div
                v-for="(step, index) in nextSteps"
                :key="index"
                class="flex items-start gap-4 p-4 rounded-xl bg-white/60 dark:bg-neutral-900/60"
              >
                <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center flex-shrink-0">
                  <component :is="step.icon" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p class="font-medium text-neutral-900 dark:text-white">{{ step.title }}</p>
                  <p class="text-sm text-neutral-600 dark:text-neutral-400">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Action Buttons -->
        <Transition
          enter-active-class="transition-all duration-500 ease-smooth delay-300"
          enter-from-class="opacity-0 translate-y-4"
        >
          <div v-if="showContent" class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="backToHome" class="btn-secondary group">
              <HomeIcon class="w-5 h-5" />
              Back to Home
            </button>
            <button @click="startNewBooking" class="btn-primary group">
              Book Another Appointment
              <ArrowRightIcon class="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
