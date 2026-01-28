<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import { useFillDefaults } from '@/composables/useFillDefaults';
import type { OrthopedicForm } from '@/types/medical.types';
import { ArrowRightIcon, ArrowLeftIcon, SparklesIcon } from '@heroicons/vue/24/outline';

const bookingStore = useBookingStore();

const formData = ref<Partial<OrthopedicForm>>({
  injuryLocation: '',
  painLevel: 5,
  injuryDate: '',
  injuryMechanism: '',
  swelling: false,
  limitedMobility: false,
  previousInjuries: '',
  physicalActivityLevel: '',
  ...bookingStore.specialtyFormData
});

const { fillWithDefaults } = useFillDefaults(formData, {
  injuryLocation: 'knee-right',
  painLevel: 7,
  injuryDate: '2024-01-15',
  injuryMechanism: 'Twisted knee while playing basketball, heard a pop',
  swelling: true,
  limitedMobility: true,
  previousInjuries: 'ACL tear in left knee (2019), fully recovered after surgery',
  physicalActivityLevel: 'moderate'
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
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Orthopedic Assessment</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1 text-sm">Details about your musculoskeletal condition</p>
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
      <!-- Injury Location -->
      <div class="form-group">
        <label class="form-label">Injury/Pain Location *</label>
        <select v-model="formData.injuryLocation" required class="form-input">
          <option value="">Select location</option>
          <option value="shoulder-left">Left Shoulder</option>
          <option value="shoulder-right">Right Shoulder</option>
          <option value="elbow-left">Left Elbow</option>
          <option value="elbow-right">Right Elbow</option>
          <option value="wrist-left">Left Wrist</option>
          <option value="wrist-right">Right Wrist</option>
          <option value="hip-left">Left Hip</option>
          <option value="hip-right">Right Hip</option>
          <option value="knee-left">Left Knee</option>
          <option value="knee-right">Right Knee</option>
          <option value="ankle-left">Left Ankle</option>
          <option value="ankle-right">Right Ankle</option>
          <option value="back-upper">Upper Back</option>
          <option value="back-lower">Lower Back</option>
          <option value="neck">Neck</option>
        </select>
      </div>

      <!-- Pain Level -->
      <div class="form-group">
        <label class="form-label">Pain Level (1-10) *</label>
        <div class="flex items-center gap-4">
          <input
            v-model.number="formData.painLevel"
            type="range"
            min="1"
            max="10"
            class="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700 accent-primary-600"
          />
          <span
            class="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
            :class="formData.painLevel! <= 3 ? 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400' :
                   formData.painLevel! <= 6 ? 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400' :
                   'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400'"
          >
            {{ formData.painLevel }}
          </span>
        </div>
        <div class="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          <span>Mild</span>
          <span>Severe</span>
        </div>
      </div>

      <!-- Injury Date -->
      <div class="form-group">
        <label class="form-label">When did the injury/pain start? *</label>
        <input v-model="formData.injuryDate" type="date" required class="form-input" />
      </div>

      <!-- Injury Mechanism -->
      <div class="form-group">
        <label class="form-label">How did the injury occur? *</label>
        <textarea
          v-model="formData.injuryMechanism"
          rows="3"
          required
          class="form-input resize-y"
          placeholder="e.g., Fell while playing basketball, gradual onset from repetitive motion..."
        />
      </div>

      <!-- Symptoms -->
      <div class="space-y-3">
        <label class="form-label">Additional Symptoms</label>
        <label
          class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
          :class="formData.swelling
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
        >
          <input v-model="formData.swelling" type="checkbox" class="form-checkbox" />
          <span class="font-medium text-neutral-900 dark:text-white">Swelling present</span>
        </label>
        <label
          class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
          :class="formData.limitedMobility
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
        >
          <input v-model="formData.limitedMobility" type="checkbox" class="form-checkbox" />
          <span class="font-medium text-neutral-900 dark:text-white">Limited mobility or range of motion</span>
        </label>
      </div>

      <!-- Previous Injuries -->
      <div class="form-group">
        <label class="form-label">Previous Injuries to This Area</label>
        <textarea
          v-model="formData.previousInjuries"
          rows="2"
          class="form-input resize-y"
          placeholder="Describe any previous injuries or surgeries..."
        />
      </div>

      <!-- Physical Activity Level -->
      <div class="form-group">
        <label class="form-label">Physical Activity Level *</label>
        <select v-model="formData.physicalActivityLevel" required class="form-input">
          <option value="">Select activity level</option>
          <option value="sedentary">Sedentary (little to no exercise)</option>
          <option value="light">Light (1-2 days/week)</option>
          <option value="moderate">Moderate (3-5 days/week)</option>
          <option value="very-active">Very Active (6-7 days/week)</option>
          <option value="athlete">Competitive Athlete</option>
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
