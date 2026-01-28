<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import type { DermatologyForm } from '@/types/medical.types';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline';

const bookingStore = useBookingStore();

const formData = ref<Partial<DermatologyForm>>({
  affectedArea: [],
  symptomDuration: '',
  itching: false,
  pain: false,
  bleeding: false,
  skinConditionHistory: [],
  recentSkinProducts: '',
  sunExposure: '',
  previousTreatments: '',
  ...bookingStore.specialtyFormData
});

watch(formData, (newData) => {
  bookingStore.setSpecialtyFormData(newData);
}, { deep: true });

const emit = defineEmits<{
  submit: [];
  back: [];
}>();

const bodyAreas = [
  'Face', 'Scalp', 'Neck', 'Chest', 'Back', 'Arms', 'Hands',
  'Abdomen', 'Legs', 'Feet', 'Other'
];

function toggleArea(area: string) {
  const index = formData.value.affectedArea!.indexOf(area);
  if (index > -1) {
    formData.value.affectedArea!.splice(index, 1);
  } else {
    formData.value.affectedArea!.push(area);
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Dermatology Assessment</h2>
      <p class="text-neutral-600 dark:text-neutral-400 mt-1 text-sm">Tell us about your skin condition</p>
    </div>

    <form @submit.prevent="emit('submit')" class="space-y-6">
      <!-- Affected Areas -->
      <div class="form-group">
        <label class="form-label">Affected Body Areas * (select all that apply)</label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            v-for="area in bodyAreas"
            :key="area"
            type="button"
            @click="toggleArea(area)"
            class="px-4 py-2.5 rounded-xl border-2 font-medium text-sm transition-all duration-200"
            :class="formData.affectedArea?.includes(area)
              ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:border-primary-400 dark:text-primary-300'
              : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-600'"
          >
            {{ area }}
          </button>
        </div>
      </div>

      <!-- Symptoms -->
      <div class="form-group">
        <label class="form-label">Symptoms (check all that apply)</label>
        <div class="space-y-3">
          <label
            class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
            :class="formData.itching
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
              : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
          >
            <input v-model="formData.itching" type="checkbox" class="form-checkbox" />
            <span class="font-medium text-neutral-900 dark:text-white">Itching</span>
          </label>
          <label
            class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
            :class="formData.pain
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
              : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
          >
            <input v-model="formData.pain" type="checkbox" class="form-checkbox" />
            <span class="font-medium text-neutral-900 dark:text-white">Pain or tenderness</span>
          </label>
          <label
            class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200"
            :class="formData.bleeding
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
              : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'"
          >
            <input v-model="formData.bleeding" type="checkbox" class="form-checkbox" />
            <span class="font-medium text-neutral-900 dark:text-white">Bleeding or oozing</span>
          </label>
        </div>
      </div>

      <!-- Duration -->
      <div class="form-group">
        <label class="form-label">How long have you had these symptoms? *</label>
        <select v-model="formData.symptomDuration" required class="form-input">
          <option value="">Select duration</option>
          <option value="less-than-week">Less than a week</option>
          <option value="1-2-weeks">1-2 weeks</option>
          <option value="2-4-weeks">2-4 weeks</option>
          <option value="1-3-months">1-3 months</option>
          <option value="more-than-3-months">More than 3 months</option>
        </select>
      </div>

      <!-- Sun Exposure -->
      <div class="form-group">
        <label class="form-label">Sun Exposure *</label>
        <select v-model="formData.sunExposure" required class="form-input">
          <option value="">Select exposure level</option>
          <option value="minimal">Minimal (mostly indoors)</option>
          <option value="moderate">Moderate (some outdoor activities)</option>
          <option value="high">High (frequent outdoor exposure)</option>
          <option value="very-high">Very High (outdoor occupation)</option>
        </select>
      </div>

      <!-- Recent Products -->
      <div class="form-group">
        <label class="form-label">Recent Skin Care Products or Cosmetics</label>
        <textarea
          v-model="formData.recentSkinProducts"
          rows="2"
          class="form-input resize-y"
          placeholder="List any new products you've used recently..."
        />
      </div>

      <!-- Previous Treatments -->
      <div class="form-group">
        <label class="form-label">Previous Treatments (if any)</label>
        <textarea
          v-model="formData.previousTreatments"
          rows="2"
          class="form-input resize-y"
          placeholder="Describe any treatments you've tried..."
        />
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
