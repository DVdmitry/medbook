<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import type { MedicalHistory } from '@/types/medical.types';

const bookingStore = useBookingStore();

const formData = ref<Partial<MedicalHistory>>({
  allergies: bookingStore.medicalHistory.allergies || '',
  chronicConditions: bookingStore.medicalHistory.chronicConditions || '',
  currentMedications: bookingStore.medicalHistory.currentMedications || '',
  previousSurgeries: bookingStore.medicalHistory.previousSurgeries || '',
  familyHistory: bookingStore.medicalHistory.familyHistory || '',
  bloodType: bookingStore.medicalHistory.bloodType || '',
  smokingStatus: bookingStore.medicalHistory.smokingStatus || 'never',
  alcoholConsumption: bookingStore.medicalHistory.alcoholConsumption || 'none'
});

const fillWithDefaults = ref(false);

const defaultData: MedicalHistory = {
  allergies: 'Penicillin, Peanuts',
  chronicConditions: 'Hypertension',
  currentMedications: 'Lisinopril 10mg daily, Aspirin 81mg daily',
  previousSurgeries: 'Appendectomy (2015)',
  familyHistory: 'Father - Heart Disease, Mother - Diabetes Type 2',
  bloodType: 'A+',
  smokingStatus: 'never',
  alcoholConsumption: 'occasional'
};

watch(fillWithDefaults, (shouldFill) => {
  if (shouldFill) {
    formData.value = { ...defaultData };
  } else {
    formData.value = {
      allergies: '',
      chronicConditions: '',
      currentMedications: '',
      previousSurgeries: '',
      familyHistory: '',
      bloodType: '',
      smokingStatus: 'never',
      alcoholConsumption: 'none'
    };
  }
});

watch(formData, (newData) => {
  bookingStore.setMedicalHistory(newData);
}, { deep: true });

const emit = defineEmits<{
  submit: [];
  back: [];
}>();

function handleSubmit() {
  emit('submit');
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Medical History</h2>
      <label class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
        <input
          v-model="fillWithDefaults"
          type="checkbox"
          class="w-4 h-4 text-sky-600 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded focus:ring-sky-500 focus:ring-2"
        />
        <span>Fill with default data</span>
      </label>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Allergies -->
      <div>
        <label class="form-label">Allergies (medications, food, environmental)</label>
        <textarea
          v-model="formData.allergies"
          rows="2"
          class="form-input"
          placeholder="e.g., Penicillin, Peanuts, Pollen"
        />
      </div>

      <!-- Chronic Conditions -->
      <div>
        <label class="form-label">Chronic Conditions</label>
        <textarea
          v-model="formData.chronicConditions"
          rows="2"
          class="form-input"
          placeholder="e.g., Diabetes, Hypertension, Asthma"
        />
      </div>

      <!-- Current Medications -->
      <div>
        <label class="form-label">Current Medications</label>
        <textarea
          v-model="formData.currentMedications"
          rows="2"
          class="form-input"
          placeholder="e.g., Lisinopril 10mg daily"
        />
      </div>

      <!-- Previous Surgeries -->
      <div>
        <label class="form-label">Previous Surgeries</label>
        <textarea
          v-model="formData.previousSurgeries"
          rows="2"
          class="form-input"
          placeholder="e.g., Appendectomy 2020"
        />
      </div>

      <!-- Family History -->
      <div>
        <label class="form-label">Family Medical History</label>
        <textarea
          v-model="formData.familyHistory"
          rows="2"
          class="form-input"
          placeholder="e.g., Father - Heart Disease"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="form-label">Blood Type</label>
          <select v-model="formData.bloodType" class="form-input">
            <option value="">Unknown</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label class="form-label">Smoking Status *</label>
          <select v-model="formData.smokingStatus" required class="form-input">
            <option value="never">Never</option>
            <option value="former">Former Smoker</option>
            <option value="current">Current Smoker</option>
          </select>
        </div>

        <div>
          <label class="form-label">Alcohol Consumption *</label>
          <select v-model="formData.alcoholConsumption" required class="form-input">
            <option value="none">None</option>
            <option value="occasional">Occasional</option>
            <option value="moderate">Moderate</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>
      </div>

      <div class="flex justify-between pt-4">
        <button type="button" @click="emit('back')" class="btn-secondary px-8 py-3">
          Back
        </button>
        <button type="submit" class="btn-primary px-8 py-3">
          Continue to Symptoms
        </button>
      </div>
    </form>
  </div>
</template>
