<script setup lang="ts">
import { ref, watch } from 'vue';
import { useBookingStore } from '@/stores/booking.store';
import type { BasePatientInfo } from '@/types/medical.types';

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
  } else {
    formData.value = {};
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
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
      <label class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
        <input
          v-model="fillWithDefaults"
          type="checkbox"
          class="w-4 h-4 text-sky-600 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded focus:ring-sky-500 focus:ring-2"
        />
        <span>Fill with default data</span>
      </label>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="form-label">First Name *</label>
          <input
            v-model="formData.firstName"
            type="text"
            required
            class="form-input"
            placeholder="John"
          />
        </div>

        <div>
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="form-label">Email *</label>
          <input
            v-model="formData.email"
            type="email"
            required
            class="form-input"
            placeholder="john.doe@example.com"
          />
        </div>

        <div>
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="form-label">Date of Birth *</label>
          <input
            v-model="formData.dateOfBirth"
            type="date"
            required
            class="form-input"
          />
        </div>

        <div>
          <label class="form-label">Gender *</label>
          <select v-model="formData.gender" required class="form-input">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label class="form-label">Address *</label>
        <input
          v-model="formData.address"
          type="text"
          required
          class="form-input"
          placeholder="123 Main St, City, State, ZIP"
        />
      </div>

      <div class="border-t pt-4 mt-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="form-label">Emergency Contact Name *</label>
            <input
              v-model="formData.emergencyContact"
              type="text"
              required
              class="form-input"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label class="form-label">Emergency Contact Phone *</label>
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

      <div class="flex justify-end pt-4">
        <button type="submit" class="btn-primary px-8 py-3">
          Continue to Medical History
        </button>
      </div>
    </form>
  </div>
</template>
