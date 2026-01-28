<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import type { GeneralPractitionerForm } from '@/types/medical.types';
import { ArrowRightIcon, ArrowLeftIcon, SparklesIcon } from '@heroicons/vue/24/outline';

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

const fillWithDefaults = ref(false);

watch(fillWithDefaults, (shouldFill) => {
  if (shouldFill) {
    formData.value = {
      chiefComplaint: 'Persistent fatigue and occasional headaches for the past week',
      symptomDuration: '1-2-weeks',
      fever: true,
      temperature: '99.5°F',
      cough: true,
      fatigue: true,
      bodyAches: false,
      recentTravel: false,
      covidExposure: false,
      additionalSymptoms: ['Headache', 'Sore Throat', 'Congestion']
    };
  }
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
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">General Health Assessment</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1 text-sm">Describe your current health concerns</p>
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

    <form @submit.prevent="emit('submit')" class="space-y-5">
      <!-- Chief Complaint -->
      <div class="form-group">
        <label class="form-label">What is your main reason for this visit? *</label>
        <textarea
          v-model="formData.chiefComplaint"
          rows="3"
          required
          class="form-input resize-y"
          placeholder="Describe your primary concern..."
        />
      </div>

      <!-- Duration -->
      <div class="form-group">
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
      <div class="space-y-3">
        <label class="form-label">Primary Symptoms (check all that apply)</label>

        <label
          class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
          :class="formData.fever
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
        >
          <input v-model="formData.fever" type="checkbox" class="form-checkbox" />
          <span class="font-medium text-neutral-900 dark:text-white">Fever</span>
        </label>

        <Transition
          enter-active-class="transition-all duration-300"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 max-h-0"
          leave-to-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-20"
          leave-from-class="opacity-100 max-h-20"
        >
          <div v-if="formData.fever" class="form-group ml-8">
            <label class="form-label text-sm">Temperature (if measured)</label>
            <input
              v-model="formData.temperature"
              type="text"
              class="form-input"
              placeholder="e.g., 101.5°F or 38.6°C"
            />
          </div>
        </Transition>

        <label
          class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
          :class="formData.cough
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
        >
          <input v-model="formData.cough" type="checkbox" class="form-checkbox" />
          <span class="font-medium text-neutral-900 dark:text-white">Cough</span>
        </label>

        <label
          class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
          :class="formData.fatigue
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
        >
          <input v-model="formData.fatigue" type="checkbox" class="form-checkbox" />
          <span class="font-medium text-neutral-900 dark:text-white">Fatigue or weakness</span>
        </label>

        <label
          class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
          :class="formData.bodyAches
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
        >
          <input v-model="formData.bodyAches" type="checkbox" class="form-checkbox" />
          <span class="font-medium text-neutral-900 dark:text-white">Body aches</span>
        </label>
      </div>

      <!-- Additional Symptoms -->
      <div class="form-group">
        <label class="form-label">Additional Symptoms</label>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
          <button
            v-for="symptom in commonSymptoms"
            :key="symptom"
            type="button"
            @click="toggleSymptom(symptom)"
            class="px-4 py-2.5 rounded-xl border-2 font-medium text-sm transition-all duration-200"
            :class="formData.additionalSymptoms?.includes(symptom)
              ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:border-primary-400 dark:text-primary-300'
              : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-600'"
          >
            {{ symptom }}
          </button>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <label
          class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
          :class="formData.recentTravel
            ? 'border-warning-500 bg-warning-50 dark:bg-warning-900/20 dark:border-warning-400'
            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
        >
          <input v-model="formData.recentTravel" type="checkbox" class="form-checkbox" />
          <span class="font-medium text-neutral-900 dark:text-white">Recent travel (within last 14 days)</span>
        </label>

        <label
          class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
          :class="formData.covidExposure
            ? 'border-warning-500 bg-warning-50 dark:bg-warning-900/20 dark:border-warning-400'
            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
        >
          <input v-model="formData.covidExposure" type="checkbox" class="form-checkbox" />
          <span class="font-medium text-neutral-900 dark:text-white">Possible COVID-19 exposure</span>
        </label>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-between pt-4">
        <button type="button" @click="emit('back')" class="btn-secondary group">
          <ArrowLeftIcon class="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back
        </button>
        <button type="submit" class="btn-primary group">
          Continue to Appointment
          <ArrowRightIcon class="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  </div>
</template>
