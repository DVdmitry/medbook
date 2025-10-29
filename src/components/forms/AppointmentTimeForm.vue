<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';

const bookingStore = useBookingStore();

const selectedDate = ref(bookingStore.appointmentDate || '');
const selectedTime = ref(bookingStore.appointmentTime || '');
const reason = ref(bookingStore.appointmentReason || '');
const notes = ref(bookingStore.appointmentNotes || '');

const fillWithDefaults = ref(false);

const doctor = computed(() => bookingStore.selectedDoctor);

// Minimum date (tomorrow)
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
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Select Appointment Time</h2>
      <label class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
        <input
          v-model="fillWithDefaults"
          type="checkbox"
          class="w-4 h-4 text-sky-600 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded focus:ring-sky-500 focus:ring-2"
        />
        <span>Fill with default data</span>
      </label>
    </div>

    <div v-if="doctor" class="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg p-5">
      <div class="flex items-center space-x-4">
        <img :src="doctor.avatar" :alt="doctor.name" class="w-16 h-16 rounded-lg" />
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ doctor.name }}</h3>
          <p class="text-sky-600 dark:text-sky-400 font-medium">{{ doctor.specialtyLabel }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Consultation Fee: ${{ doctor.consultationFee }}</p>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Date Selection -->
      <div>
        <label class="form-label">Select Date *</label>
        <input
          v-model="selectedDate"
          type="date"
          :min="minDate"
          required
          class="form-input"
        />
      </div>

      <!-- Time Selection -->
      <div>
        <label class="form-label">Select Time *</label>
        <input
          v-model="selectedTime"
          type="time"
          required
          class="form-input"
        />
      </div>

      <!-- Reason -->
      <div>
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
      <div>
        <label class="form-label">Additional Notes (optional)</label>
        <textarea
          v-model="notes"
          rows="3"
          class="form-input"
          placeholder="Any additional information you'd like the doctor to know..."
        />
      </div>

      <div class="flex justify-between pt-4">
        <button type="button" @click="emit('back')" class="btn-secondary px-8 py-3">
          Back
        </button>
        <button type="submit" class="btn-primary px-8 py-3">
          Review & Confirm
        </button>
      </div>
    </form>
  </div>
</template>
