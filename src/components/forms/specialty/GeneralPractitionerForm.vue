<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import type { GeneralPractitionerForm } from '@/types/medical.types';

const bookingStore = useBookingStore();

const formData = ref<Partial<GeneralPractitionerForm>>({
  chiefComplaint: '',
  symptomDuration: '',
  fever: false,
  cough: false,
  fatigue: false,
  bodyAches: false,
  recentTravel: false,
  covidExposure: false,
  additionalSymptoms: [],
  ...bookingStore.specialtyFormData
});

watch(formData, (newData) => {
  bookingStore.setSpecialtyFormData(newData);
}, { deep: true });

const emit = defineEmits<{
  submit: [];
  back: [];
}>();

const commonSymptoms = [
  'Headache', 'Nausea', 'Vomiting', 'Diarrhea', 'Constipation',
  'Dizziness', 'Sore Throat', 'Congestion', 'Rash', 'Difficulty Breathing'
];

function toggleSymptom(symptom: string) {
  const index = formData.value.additionalSymptoms!.indexOf(symptom);
  if (index > -1) {
    formData.value.additionalSymptoms!.splice(index, 1);
  } else {
    formData.value.additionalSymptoms!.push(symptom);
  }
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">General Health Assessment</h2>
    <p class="text-gray-600 mb-6">Please describe your current health concerns.</p>

    <form @submit.prevent="emit('submit')" class="space-y-6">
      <!-- Chief Complaint -->
      <div>
        <label class="form-label">What is your main reason for this visit? *</label>
        <textarea
          v-model="formData.chiefComplaint"
          rows="3"
          required
          class="form-input"
          placeholder="Describe your primary concern..."
        />
      </div>

      <!-- Duration -->
      <div>
        <label class="form-label">How long have you had these symptoms? *</label>
        <select v-model="formData.symptomDuration" required class="form-input">
          <option value="">Select duration</option>
          <option value="less-than-day">Less than 24 hours</option>
          <option value="1-3-days">1-3 days</option>
          <option value="4-7-days">4-7 days</option>
          <option value="1-2-weeks">1-2 weeks</option>
          <option value="more-than-2-weeks">More than 2 weeks</option>
        </select>
      </div>

      <!-- Primary Symptoms -->
      <div>
        <label class="form-label">Primary Symptoms (check all that apply)</label>
        <div class="space-y-2">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input v-model="formData.fever" type="checkbox" class="w-5 h-5 text-primary-600" />
            <span class="text-gray-900">Fever</span>
          </label>

          <div v-if="formData.fever" class="ml-8">
            <label class="form-label text-sm">Temperature (if measured)</label>
            <input
              v-model="formData.temperature"
              type="text"
              class="form-input"
              placeholder="e.g., 101.5°F or 38.6°C"
            />
          </div>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input v-model="formData.cough" type="checkbox" class="w-5 h-5 text-primary-600" />
            <span class="text-gray-900">Cough</span>
          </label>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input v-model="formData.fatigue" type="checkbox" class="w-5 h-5 text-primary-600" />
            <span class="text-gray-900">Fatigue or weakness</span>
          </label>

          <label class="flex items-center space-x-3 cursor-pointer">
            <input v-model="formData.bodyAches" type="checkbox" class="w-5 h-5 text-primary-600" />
            <span class="text-gray-900">Body aches</span>
          </label>
        </div>
      </div>

      <!-- Additional Symptoms -->
      <div>
        <label class="form-label">Additional Symptoms</label>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <button
            v-for="symptom in commonSymptoms"
            :key="symptom"
            type="button"
            @click="toggleSymptom(symptom)"
            :class="[
              'px-3 py-2 rounded-lg border-2 transition-all text-sm',
              formData.additionalSymptoms?.includes(symptom)
                ? 'border-primary-600 bg-primary-50 text-primary-700 font-medium'
                : 'border-gray-300 hover:border-gray-400'
            ]"
          >
            {{ symptom }}
          </button>
        </div>
      </div>

      <!-- Recent Travel -->
      <div>
        <label class="flex items-center space-x-3 cursor-pointer">
          <input v-model="formData.recentTravel" type="checkbox" class="w-5 h-5 text-primary-600" />
          <span class="text-gray-900">Recent travel (within last 14 days)</span>
        </label>
      </div>

      <!-- COVID Exposure -->
      <div>
        <label class="flex items-center space-x-3 cursor-pointer">
          <input v-model="formData.covidExposure" type="checkbox" class="w-5 h-5 text-primary-600" />
          <span class="text-gray-900">Possible COVID-19 exposure</span>
        </label>
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
