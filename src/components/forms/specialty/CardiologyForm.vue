<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import type { CardiologyForm } from '@/types/medical.types';
import { ArrowRightIcon, ArrowLeftIcon, SparklesIcon } from '@heroicons/vue/24/outline';

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

const fillWithDefaults = ref(false);

const defaultData: CardiologyForm = {
  chestPain: true,
  chestPainDetails: 'Occasional tightness in chest during physical activity',
  shortnessOfBreath: true,
  palpitations: false,
  highBloodPressure: true,
  currentBloodPressure: '145/92',
  cholesterolLevel: '235 mg/dL',
  heartDiseaseFamilyHistory: true,
  exerciseFrequency: '1-2-weekly'
};

watch(fillWithDefaults, (shouldFill) => {
  if (shouldFill) {
    formData.value = { ...defaultData };
  } else {
    formData.value = {
      chestPain: false,
      shortnessOfBreath: false,
      palpitations: false,
      highBloodPressure: false,
      heartDiseaseFamilyHistory: false,
      exerciseFrequency: ''
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
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Cardiology Assessment</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1 text-sm">Tell us about your cardiovascular health</p>
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

    <form @submit.prevent="emit('submit')" class="space-y-4">
      <!-- Chest Pain -->
      <div
        class="p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer"
        :class="formData.chestPain
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
        @click="formData.chestPain = !formData.chestPain"
      >
        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="formData.chestPain" type="checkbox" class="form-checkbox" @click.stop />
          <span class="font-medium text-neutral-900 dark:text-white">I experience chest pain or discomfort</span>
        </label>

        <Transition
          enter-active-class="transition-all duration-300"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 max-h-0"
          leave-to-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-40"
          leave-from-class="opacity-100 max-h-40"
        >
          <div v-if="formData.chestPain" class="mt-4" @click.stop>
            <label class="form-label">Please describe your chest pain</label>
            <textarea
              v-model="formData.chestPainDetails"
              rows="2"
              class="form-input resize-y"
              placeholder="Location, severity, triggers..."
            />
          </div>
        </Transition>
      </div>

      <!-- Shortness of Breath -->
      <div
        class="p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer"
        :class="formData.shortnessOfBreath
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
        @click="formData.shortnessOfBreath = !formData.shortnessOfBreath"
      >
        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="formData.shortnessOfBreath" type="checkbox" class="form-checkbox" @click.stop />
          <span class="font-medium text-neutral-900 dark:text-white">I experience shortness of breath</span>
        </label>
      </div>

      <!-- Palpitations -->
      <div
        class="p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer"
        :class="formData.palpitations
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
        @click="formData.palpitations = !formData.palpitations"
      >
        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="formData.palpitations" type="checkbox" class="form-checkbox" @click.stop />
          <span class="font-medium text-neutral-900 dark:text-white">I experience heart palpitations or irregular heartbeat</span>
        </label>
      </div>

      <!-- High Blood Pressure -->
      <div
        class="p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer"
        :class="formData.highBloodPressure
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
        @click="formData.highBloodPressure = !formData.highBloodPressure"
      >
        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="formData.highBloodPressure" type="checkbox" class="form-checkbox" @click.stop />
          <span class="font-medium text-neutral-900 dark:text-white">I have high blood pressure</span>
        </label>

        <Transition
          enter-active-class="transition-all duration-300"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 max-h-0"
          leave-to-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-40"
          leave-from-class="opacity-100 max-h-40"
        >
          <div v-if="formData.highBloodPressure" class="mt-4 grid grid-cols-2 gap-4" @click.stop>
            <div class="form-group">
              <label class="form-label">Current Blood Pressure</label>
              <input
                v-model="formData.currentBloodPressure"
                type="text"
                class="form-input"
                placeholder="e.g., 140/90"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Cholesterol Level</label>
              <input
                v-model="formData.cholesterolLevel"
                type="text"
                class="form-input"
                placeholder="e.g., 220 mg/dL"
              />
            </div>
          </div>
        </Transition>
      </div>

      <!-- Family History -->
      <div
        class="p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer"
        :class="formData.heartDiseaseFamilyHistory
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
        @click="formData.heartDiseaseFamilyHistory = !formData.heartDiseaseFamilyHistory"
      >
        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="formData.heartDiseaseFamilyHistory" type="checkbox" class="form-checkbox" @click.stop />
          <span class="font-medium text-neutral-900 dark:text-white">Family history of heart disease</span>
        </label>
      </div>

      <!-- Exercise Frequency -->
      <div class="form-group">
        <label class="form-label">Exercise Frequency *</label>
        <select v-model="formData.exerciseFrequency" required class="form-input">
          <option value="">Select frequency</option>
          <option value="none">No exercise</option>
          <option value="1-2-weekly">1-2 times per week</option>
          <option value="3-4-weekly">3-4 times per week</option>
          <option value="daily">Daily</option>
        </select>
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
