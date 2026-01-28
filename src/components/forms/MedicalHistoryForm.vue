<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import type { MedicalHistory } from '@/types/medical.types';
import { ArrowRightIcon, ArrowLeftIcon, SparklesIcon } from '@heroicons/vue/24/outline';

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
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Medical History</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1 text-sm">Share your health background</p>
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

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Allergies -->
      <div class="form-group">
        <label class="form-label">Allergies (medications, food, environmental)</label>
        <textarea
          v-model="formData.allergies"
          rows="2"
          class="form-input resize-y"
          placeholder="e.g., Penicillin, Peanuts, Pollen"
        />
      </div>

      <!-- Chronic Conditions -->
      <div class="form-group">
        <label class="form-label">Chronic Conditions</label>
        <textarea
          v-model="formData.chronicConditions"
          rows="2"
          class="form-input resize-y"
          placeholder="e.g., Diabetes, Hypertension, Asthma"
        />
      </div>

      <!-- Current Medications -->
      <div class="form-group">
        <label class="form-label">Current Medications</label>
        <textarea
          v-model="formData.currentMedications"
          rows="2"
          class="form-input resize-y"
          placeholder="e.g., Lisinopril 10mg daily"
        />
      </div>

      <!-- Previous Surgeries -->
      <div class="form-group">
        <label class="form-label">Previous Surgeries</label>
        <textarea
          v-model="formData.previousSurgeries"
          rows="2"
          class="form-input resize-y"
          placeholder="e.g., Appendectomy 2020"
        />
      </div>

      <!-- Family History -->
      <div class="form-group">
        <label class="form-label">Family Medical History</label>
        <textarea
          v-model="formData.familyHistory"
          rows="2"
          class="form-input resize-y"
          placeholder="e.g., Father - Heart Disease"
        />
      </div>

      <!-- Lifestyle Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="form-group">
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

        <div class="form-group">
          <label class="form-label">Smoking Status *</label>
          <select v-model="formData.smokingStatus" required class="form-input">
            <option value="never">Never</option>
            <option value="former">Former Smoker</option>
            <option value="current">Current Smoker</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Alcohol Consumption *</label>
          <select v-model="formData.alcoholConsumption" required class="form-input">
            <option value="none">None</option>
            <option value="occasional">Occasional</option>
            <option value="moderate">Moderate</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-between pt-4">
        <button type="button" @click="emit('back')" class="btn-secondary group">
          <ArrowLeftIcon class="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back
        </button>
        <button type="submit" class="btn-primary group">
          Continue to Symptoms
          <ArrowRightIcon class="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  </div>
</template>
