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

// Generate available dates (next 14 days)
const availableDates = computed(() => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
});

// Time slots
const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
];

watch(fillWithDefaults, (shouldFill) => {
  if (shouldFill && availableDates.value.length > 0) {
    selectedDate.value = availableDates.value[2]; // 3rd available date
    selectedTime.value = '10:00';
    reason.value = 'Annual checkup';
    notes.value = 'Please review my recent lab results.';
  } else if (!shouldFill) {
    selectedDate.value = '';
    selectedTime.value = '';
    reason.value = '';
    notes.value = '';
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
        <select v-model="selectedDate" required class="form-input">
          <option value="">Choose a date</option>
          <option v-for="date in availableDates" :key="date" :value="date">
            {{ new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
          </option>
        </select>
      </div>

      <!-- Time Selection -->
      <div v-if="selectedDate">
        <label class="form-label">Select Time *</label>
        <div class="grid grid-cols-4 md:grid-cols-6 gap-2">
          <button
            v-for="time in timeSlots"
            :key="time"
            type="button"
            @click="selectedTime = time"
            :class="[
              'px-4 py-2 rounded-lg border-2 transition-colors font-medium',
              selectedTime === time
                ? 'border-sky-600 dark:border-sky-500 bg-sky-600 dark:bg-sky-500 text-white'
                : 'border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-sky-500 dark:hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20'
            ]"
          >
            {{ time }}
          </button>
        </div>
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
