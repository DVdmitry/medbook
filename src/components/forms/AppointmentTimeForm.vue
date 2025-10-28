<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';

const bookingStore = useBookingStore();

const selectedDate = ref(bookingStore.appointmentDate || '');
const selectedTime = ref(bookingStore.appointmentTime || '');
const reason = ref(bookingStore.appointmentReason || '');
const notes = ref(bookingStore.appointmentNotes || '');

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
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Select Appointment Time</h2>

    <div v-if="doctor" class="card bg-primary-50 border border-primary-200">
      <div class="flex items-center space-x-4">
        <img :src="doctor.avatar" :alt="doctor.name" class="w-16 h-16 rounded-full" />
        <div>
          <h3 class="text-lg font-bold text-gray-900">{{ doctor.name }}</h3>
          <p class="text-primary-700">{{ doctor.specialtyLabel }}</p>
          <p class="text-sm text-gray-600">Consultation Fee: ${{ doctor.consultationFee }}</p>
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
              'px-4 py-2 rounded-lg border-2 transition-all font-medium',
              selectedTime === time
                ? 'border-primary-600 bg-primary-600 text-white'
                : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50'
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
