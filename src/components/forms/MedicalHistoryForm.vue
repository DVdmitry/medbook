<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import type { MedicalHistory } from '@/types/medical.types';

const bookingStore = useBookingStore();

const formData = ref<Partial<MedicalHistory>>({
  allergies: bookingStore.medicalHistory.allergies || [],
  chronicConditions: bookingStore.medicalHistory.chronicConditions || [],
  currentMedications: bookingStore.medicalHistory.currentMedications || [],
  previousSurgeries: bookingStore.medicalHistory.previousSurgeries || [],
  familyHistory: bookingStore.medicalHistory.familyHistory || [],
  bloodType: bookingStore.medicalHistory.bloodType || '',
  smokingStatus: bookingStore.medicalHistory.smokingStatus || 'never',
  alcoholConsumption: bookingStore.medicalHistory.alcoholConsumption || 'none'
});

const newAllergy = ref('');
const newCondition = ref('');
const newMedication = ref('');
const newSurgery = ref('');
const newFamilyHistory = ref('');

watch(formData, (newData) => {
  bookingStore.setMedicalHistory(newData);
}, { deep: true });

const emit = defineEmits<{
  submit: [];
  back: [];
}>();

function addItem(array: string[], newItem: string, ref: any) {
  if (newItem.trim()) {
    array.push(newItem.trim());
    ref.value = '';
  }
}

function removeItem(array: string[], index: number) {
  array.splice(index, 1);
}

function handleSubmit() {
  emit('submit');
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Medical History</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Allergies -->
      <div>
        <label class="form-label">Allergies (medications, food, environmental)</label>
        <div class="flex gap-2 mb-2">
          <input
            v-model="newAllergy"
            type="text"
            class="form-input flex-1"
            placeholder="e.g., Penicillin, Peanuts, Pollen"
            @keyup.enter.prevent="addItem(formData.allergies!, newAllergy, newAllergy)"
          />
          <button
            type="button"
            @click="addItem(formData.allergies!, newAllergy, newAllergy)"
            class="btn-secondary"
          >
            Add
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(allergy, index) in formData.allergies"
            :key="index"
            class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {{ allergy }}
            <button
              type="button"
              @click="removeItem(formData.allergies!, index)"
              class="text-red-600 hover:text-red-800 font-bold"
            >
              ×
            </button>
          </span>
        </div>
      </div>

      <!-- Chronic Conditions -->
      <div>
        <label class="form-label">Chronic Conditions</label>
        <div class="flex gap-2 mb-2">
          <input
            v-model="newCondition"
            type="text"
            class="form-input flex-1"
            placeholder="e.g., Diabetes, Hypertension, Asthma"
            @keyup.enter.prevent="addItem(formData.chronicConditions!, newCondition, newCondition)"
          />
          <button
            type="button"
            @click="addItem(formData.chronicConditions!, newCondition, newCondition)"
            class="btn-secondary"
          >
            Add
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(condition, index) in formData.chronicConditions"
            :key="index"
            class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {{ condition }}
            <button
              type="button"
              @click="removeItem(formData.chronicConditions!, index)"
              class="text-orange-600 hover:text-orange-800 font-bold"
            >
              ×
            </button>
          </span>
        </div>
      </div>

      <!-- Current Medications -->
      <div>
        <label class="form-label">Current Medications</label>
        <div class="flex gap-2 mb-2">
          <input
            v-model="newMedication"
            type="text"
            class="form-input flex-1"
            placeholder="e.g., Lisinopril 10mg daily"
            @keyup.enter.prevent="addItem(formData.currentMedications!, newMedication, newMedication)"
          />
          <button
            type="button"
            @click="addItem(formData.currentMedications!, newMedication, newMedication)"
            class="btn-secondary"
          >
            Add
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(medication, index) in formData.currentMedications"
            :key="index"
            class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {{ medication }}
            <button
              type="button"
              @click="removeItem(formData.currentMedications!, index)"
              class="text-blue-600 hover:text-blue-800 font-bold"
            >
              ×
            </button>
          </span>
        </div>
      </div>

      <!-- Previous Surgeries -->
      <div>
        <label class="form-label">Previous Surgeries</label>
        <div class="flex gap-2 mb-2">
          <input
            v-model="newSurgery"
            type="text"
            class="form-input flex-1"
            placeholder="e.g., Appendectomy 2020"
            @keyup.enter.prevent="addItem(formData.previousSurgeries!, newSurgery, newSurgery)"
          />
          <button
            type="button"
            @click="addItem(formData.previousSurgeries!, newSurgery, newSurgery)"
            class="btn-secondary"
          >
            Add
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(surgery, index) in formData.previousSurgeries"
            :key="index"
            class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {{ surgery }}
            <button
              type="button"
              @click="removeItem(formData.previousSurgeries!, index)"
              class="text-purple-600 hover:text-purple-800 font-bold"
            >
              ×
            </button>
          </span>
        </div>
      </div>

      <!-- Family History -->
      <div>
        <label class="form-label">Family Medical History</label>
        <div class="flex gap-2 mb-2">
          <input
            v-model="newFamilyHistory"
            type="text"
            class="form-input flex-1"
            placeholder="e.g., Father - Heart Disease"
            @keyup.enter.prevent="addItem(formData.familyHistory!, newFamilyHistory, newFamilyHistory)"
          />
          <button
            type="button"
            @click="addItem(formData.familyHistory!, newFamilyHistory, newFamilyHistory)"
            class="btn-secondary"
          >
            Add
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(history, index) in formData.familyHistory"
            :key="index"
            class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {{ history }}
            <button
              type="button"
              @click="removeItem(formData.familyHistory!, index)"
              class="text-green-600 hover:text-green-800 font-bold"
            >
              ×
            </button>
          </span>
        </div>
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
