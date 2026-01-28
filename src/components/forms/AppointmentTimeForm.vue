<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import { ArrowRightIcon, ArrowLeftIcon, SparklesIcon } from '@heroicons/vue/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid';

const bookingStore = useBookingStore();

const selectedDate = ref(bookingStore.appointmentDate || '');
const selectedTime = ref(bookingStore.appointmentTime || '');
const reason = ref(bookingStore.appointmentReason || '');
const notes = ref(bookingStore.appointmentNotes || '');

const fillWithDefaults = ref(false);

const doctor = computed(() => bookingStore.selectedDoctor);

const minDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
});

watch(fillWithDefaults, (shouldFill) => {
  if (shouldFill) {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);
    selectedDate.value = defaultDate.toISOString().split('T')[0];
    selectedTime.value = '10:00';
    reason.value = 'Annual checkup';
    notes.value = 'Please review my recent lab results.';
  }
});

watch([selectedDate, selectedTime], ([date, time]) => {
  if (date && time) {
    bookingStore.setAppointmentDateTime(date, time);
  }
});

watch([reason, notes], ([r, n]) => {
  bookingStore.setAppointmentDetails(r, n);
});

const emit = defineEmits<{
  submit: [];
  back: [];
}>();

function handleSubmit() {
  if (selectedDate.value && selectedTime.value && reason.value) {
    emit('submit');
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Appointment Details</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1 text-sm">Pick your preferred date and time</p>
      </div>
      <label class="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
        <input
          v-model="fillWithDefaults"
          type="checkbox"
          class="form-checkbox"
        />
        <SparklesIcon class="w-4 h-4 text-primary-600 dark:text-primary-400" />
        <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Demo data</span>
      </label>
    </div>

    <!-- Doctor Card -->
    <div v-if="doctor" class="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
      <div class="flex items-center gap-4">
        <img :src="doctor.avatar" :alt="doctor.name" class="w-14 h-14 rounded-xl object-cover" />
        <div class="flex-1">
          <h3 class="font-semibold text-neutral-900 dark:text-white">{{ doctor.name }}</h3>
          <p class="text-primary-600 dark:text-primary-400 font-medium text-sm">{{ doctor.specialtyLabel }}</p>
          <div class="flex items-center gap-2 mt-1">
            <StarIconSolid class="w-4 h-4 text-warning-500" />
            <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ doctor.rating }}</span>
            <span class="text-sm text-neutral-500">|</span>
            <span class="text-sm font-semibold text-neutral-900 dark:text-white">${{ doctor.consultationFee }}</span>
          </div>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Date & Time Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-group">
          <label class="form-label">Select Date *</label>
          <input
            v-model="selectedDate"
            type="date"
            :min="minDate"
            required
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Select Time *</label>
          <input
            v-model="selectedTime"
            type="time"
            required
            class="form-input"
          />
        </div>
      </div>

      <!-- Reason -->
      <div class="form-group">
        <label class="form-label">Reason for Visit *</label>
        <input
          v-model="reason"
          type="text"
          required
          class="form-input"
          placeholder="e.g., Annual checkup, Follow-up, New symptoms"
        />
      </div>

      <!-- Additional Notes -->
      <div class="form-group">
        <label class="form-label">Additional Notes (optional)</label>
        <textarea
          v-model="notes"
          rows="3"
          class="form-input resize-y"
          placeholder="Any additional information you'd like the doctor to know..."
        />
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-between pt-4">
        <button type="button" @click="emit('back')" class="btn-secondary group">
          <ArrowLeftIcon class="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back
        </button>
        <button type="submit" class="btn-primary group">
          Review & Confirm
          <ArrowRightIcon class="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  </div>
</template>
