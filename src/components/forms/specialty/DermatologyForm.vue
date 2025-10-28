<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import type { DermatologyForm } from '@/types/medical.types';

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
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Dermatology Assessment</h2>
    <p class="text-gray-600 mb-6">Please provide details about your skin condition.</p>

    <form @submit.prevent="emit('submit')" class="space-y-6">
      <!-- Affected Areas -->
      <div>
        <label class="form-label">Affected Body Areas * (select all that apply)</label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="area in bodyAreas"
            :key="area"
            type="button"
            @click="toggleArea(area)"
            :class="[
              'px-4 py-2 rounded-lg border-2 transition-all',
              formData.affectedArea?.includes(area)
                ? 'border-primary-600 bg-primary-50 text-primary-700 font-medium'
                : 'border-gray-300 hover:border-gray-400'
            ]"
          >
            {{ area }}
          </button>
        </div>
      </div>

      <!-- Symptoms -->
      <div>
        <label class="form-label">Symptoms (check all that apply)</label>
        <div class="space-y-2">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input v-model="formData.itching" type="checkbox" class="w-5 h-5 text-primary-600" />
            <span class="text-gray-900">Itching</span>
          </label>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input v-model="formData.pain" type="checkbox" class="w-5 h-5 text-primary-600" />
            <span class="text-gray-900">Pain or tenderness</span>
          </label>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input v-model="formData.bleeding" type="checkbox" class="w-5 h-5 text-primary-600" />
            <span class="text-gray-900">Bleeding or oozing</span>
          </label>
        </div>
      </div>

      <!-- Duration -->
      <div>
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
      <div>
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
      <div>
        <label class="form-label">Recent Skin Care Products or Cosmetics</label>
        <textarea
          v-model="formData.recentSkinProducts"
          rows="2"
          class="form-input"
          placeholder="List any new products you've used recently..."
        />
      </div>

      <!-- Previous Treatments -->
      <div>
        <label class="form-label">Previous Treatments (if any)</label>
        <textarea
          v-model="formData.previousTreatments"
          rows="2"
          class="form-input"
          placeholder="Describe any treatments you've tried..."
        />
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
