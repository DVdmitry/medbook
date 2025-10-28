<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import type { CardiologyForm } from '@/types/medical.types';

const bookingStore = useBookingStore();

const formData = ref<Partial<CardiologyForm>>({
  chestPain: false,
  shortnessOfBreath: false,
  palpitations: false,
  highBloodPressure: false,
  heartDiseaseFamilyHistory: false,
  exerciseFrequency: '',
  ...bookingStore.specialtyFormData
});

watch(formData, (newData) => {
  bookingStore.setSpecialtyFormData(newData);
}, { deep: true });

const emit = defineEmits<{
  submit: [];
  back: [];
}>();
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Cardiology Assessment</h2>
    <p class="text-gray-600 mb-6">Please answer the following questions about your cardiovascular health.</p>

    <form @submit.prevent="emit('submit')" class="space-y-6">
      <!-- Chest Pain -->
      <div class="card bg-gray-50">
        <label class="flex items-center space-x-3 cursor-pointer">
          <input v-model="formData.chestPain" type="checkbox" class="w-5 h-5 text-primary-600" />
          <span class="font-medium text-gray-900">I experience chest pain or discomfort</span>
        </label>

        <div v-if="formData.chestPain" class="mt-4">
          <label class="form-label">Please describe your chest pain (location, severity, triggers)</label>
          <textarea
            v-model="formData.chestPainDetails"
            rows="3"
            class="form-input"
            placeholder="e.g., Sharp pain in left chest when exercising"
          />
        </div>
      </div>

      <!-- Shortness of Breath -->
      <div class="card bg-gray-50">
        <label class="flex items-center space-x-3 cursor-pointer">
          <input v-model="formData.shortnessOfBreath" type="checkbox" class="w-5 h-5 text-primary-600" />
          <span class="font-medium text-gray-900">I experience shortness of breath</span>
        </label>
      </div>

      <!-- Palpitations -->
      <div class="card bg-gray-50">
        <label class="flex items-center space-x-3 cursor-pointer">
          <input v-model="formData.palpitations" type="checkbox" class="w-5 h-5 text-primary-600" />
          <span class="font-medium text-gray-900">I experience heart palpitations or irregular heartbeat</span>
        </label>
      </div>

      <!-- High Blood Pressure -->
      <div class="card bg-gray-50">
        <label class="flex items-center space-x-3 cursor-pointer">
          <input v-model="formData.highBloodPressure" type="checkbox" class="w-5 h-5 text-primary-600" />
          <span class="font-medium text-gray-900">I have high blood pressure</span>
        </label>

        <div v-if="formData.highBloodPressure" class="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label class="form-label">Current Blood Pressure (if known)</label>
            <input
              v-model="formData.currentBloodPressure"
              type="text"
              class="form-input"
              placeholder="e.g., 140/90"
            />
          </div>
          <div>
            <label class="form-label">Cholesterol Level (if known)</label>
            <input
              v-model="formData.cholesterolLevel"
              type="text"
              class="form-input"
              placeholder="e.g., 220 mg/dL"
            />
          </div>
        </div>
      </div>

      <!-- Family History -->
      <div class="card bg-gray-50">
        <label class="flex items-center space-x-3 cursor-pointer">
          <input v-model="formData.heartDiseaseFamilyHistory" type="checkbox" class="w-5 h-5 text-primary-600" />
          <span class="font-medium text-gray-900">Family history of heart disease</span>
        </label>
      </div>

      <!-- Exercise Frequency -->
      <div>
        <label class="form-label">Exercise Frequency *</label>
        <select v-model="formData.exerciseFrequency" required class="form-input">
          <option value="">Select frequency</option>
          <option value="none">No exercise</option>
          <option value="1-2-weekly">1-2 times per week</option>
          <option value="3-4-weekly">3-4 times per week</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      <div class="flex justify-between pt-4">
        <button type="button" @click="emit('back')" class="btn-secondary px-8 py-3">
          Back
        </button>
        <button type="submit" class="btn-primary px-8 py-3">
          Continue to Appointment Time
        </button>
      </div>
    </form>
  </div>
</template>
