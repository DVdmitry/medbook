<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import type { BasePatientInfo } from '@/types/medical.types';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/vue/24/outline';

const bookingStore = useBookingStore();

const formData = ref<Partial<BasePatientInfo>>({
  ...bookingStore.patientInfo
});

const fillWithDefaults = ref(false);

const defaultData: BasePatientInfo = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@example.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1985-06-15',
  gender: 'male',
  address: '123 Main Street, New York, NY 10001',
  emergencyContact: 'Jane Smith',
  emergencyPhone: '+1 (555) 987-6543'
};

watch(fillWithDefaults, (shouldFill) => {
  if (shouldFill) {
    formData.value = { ...defaultData };
  }
});

watch(formData, (newData) => {
  bookingStore.setPatientInfo(newData);
}, { deep: true });

const emit = defineEmits<{
  submit: [];
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
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">Personal Information</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mt-1 text-sm">Tell us about yourself</p>
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

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Name Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-group">
          <label class="form-label">First Name *</label>
          <input
            v-model="formData.firstName"
            type="text"
            required
            class="form-input"
            placeholder="John"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Last Name *</label>
          <input
            v-model="formData.lastName"
            type="text"
            required
            class="form-input"
            placeholder="Doe"
          />
        </div>
      </div>

      <!-- Contact Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-group">
          <label class="form-label">Email *</label>
          <input
            v-model="formData.email"
            type="email"
            required
            class="form-input"
            placeholder="john.doe@example.com"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Phone Number *</label>
          <input
            v-model="formData.phone"
            type="tel"
            required
            class="form-input"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <!-- Personal Details -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-group">
          <label class="form-label">Date of Birth *</label>
          <input
            v-model="formData.dateOfBirth"
            type="date"
            required
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Gender *</label>
          <select v-model="formData.gender" required class="form-input">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <!-- Address -->
      <div class="form-group">
        <label class="form-label">Address *</label>
        <input
          v-model="formData.address"
          type="text"
          required
          class="form-input"
          placeholder="123 Main St, City, State, ZIP"
        />
      </div>

      <!-- Emergency Contact Section -->
      <div class="pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Emergency Contact</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-group">
            <label class="form-label">Contact Name *</label>
            <input
              v-model="formData.emergencyContact"
              type="text"
              required
              class="form-input"
              placeholder="Jane Doe"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Contact Phone *</label>
            <input
              v-model="formData.emergencyPhone"
              type="tel"
              required
              class="form-input"
              placeholder="+1 (555) 987-6543"
            />
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end pt-4">
        <button type="submit" class="btn-primary group">
          Continue to Medical History
          <ArrowRightIcon class="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  </div>
</template>
