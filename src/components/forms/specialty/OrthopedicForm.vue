<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import type { OrthopedicForm } from '@/types/medical.types';

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
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Orthopedic Assessment</h2>
    <p class="text-gray-600 mb-6">Please provide details about your musculoskeletal condition.</p>

    <form @submit.prevent="emit('submit')" class="space-y-6">
      <!-- Injury Location -->
      <div>
        <label class="form-label">Injury/Pain Location *</label>
        <select v-model="formData.injuryLocation" required class="form-input">
          <option value="">Select location</option>
          <option value="shoulder-left">Left Shoulder</option>
          <option value="shoulder-right">Right Shoulder</option>
          <option value="elbow-left">Left Elbow</option>
          <option value="elbow-right">Right Elbow</option>
          <option value="wrist-left">Left Wrist</option>
          <option value="wrist-right">Right Wrist</option>
          <option value="hand-left">Left Hand</option>
          <option value="hand-right">Right Hand</option>
          <option value="hip-left">Left Hip</option>
          <option value="hip-right">Right Hip</option>
          <option value="knee-left">Left Knee</option>
          <option value="knee-right">Right Knee</option>
          <option value="ankle-left">Left Ankle</option>
          <option value="ankle-right">Right Ankle</option>
          <option value="foot-left">Left Foot</option>
          <option value="foot-right">Right Foot</option>
          <option value="back-upper">Upper Back</option>
          <option value="back-lower">Lower Back</option>
          <option value="neck">Neck</option>
        </select>
      </div>

      <!-- Pain Level -->
      <div>
        <label class="form-label">Pain Level (1-10) *</label>
        <div class="space-y-2">
          <input
            v-model.number="formData.painLevel"
            type="range"
            min="1"
            max="10"
            class="w-full"
          />
          <div class="flex justify-between text-sm text-gray-600">
            <span>1 - Mild</span>
            <span class="text-xl font-bold text-primary-600">{{ formData.painLevel }}</span>
            <span>10 - Severe</span>
          </div>
        </div>
      </div>

      <!-- Injury Date -->
      <div>
        <label class="form-label">When did the injury/pain start? *</label>
        <input v-model="formData.injuryDate" type="date" required class="form-input" />
      </div>

      <!-- Injury Mechanism -->
      <div>
        <label class="form-label">How did the injury occur? *</label>
        <textarea
          v-model="formData.injuryMechanism"
          rows="3"
          required
          class="form-input"
          placeholder="e.g., Fell while playing basketball, gradual onset from repetitive motion, etc."
        />
      </div>

      <!-- Symptoms -->
      <div>
        <label class="form-label">Additional Symptoms</label>
        <div class="space-y-2">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input v-model="formData.swelling" type="checkbox" class="w-5 h-5 text-primary-600" />
            <span class="text-gray-900">Swelling present</span>
          </label>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input v-model="formData.limitedMobility" type="checkbox" class="w-5 h-5 text-primary-600" />
            <span class="text-gray-900">Limited mobility or range of motion</span>
          </label>
        </div>
      </div>

      <!-- Previous Injuries -->
      <div>
        <label class="form-label">Previous Injuries to This Area</label>
        <textarea
          v-model="formData.previousInjuries"
          rows="2"
          class="form-input"
          placeholder="Describe any previous injuries or surgeries..."
        />
      </div>

      <!-- Physical Activity Level -->
      <div>
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
