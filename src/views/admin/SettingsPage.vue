<script setup lang="ts">
import { ref } from 'vue';
import {
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  CheckIcon,
} from '@heroicons/vue/24/outline';

const isSaving = ref(false);
const successMessage = ref('');

// Clinic Settings
const clinicSettings = ref({
  name: 'MedBook Clinic',
  email: 'contact@medbook.clinic',
  phone: '+1 (555) 123-4567',
  address: '123 Medical Center Drive, Suite 100',
  timezone: 'America/New_York',
});

// Appointment Settings
const appointmentSettings = ref({
  slotDuration: 30,
  bufferTime: 10,
  maxAdvanceBooking: 60,
  minAdvanceBooking: 24,
  allowCancellation: true,
  cancellationDeadline: 24,
});

// Notification Settings
const notificationSettings = ref({
  emailReminders: true,
  smsReminders: false,
  reminderTiming: 24,
  confirmationEmails: true,
  cancellationNotifications: true,
  adminNotifications: true,
});

async function saveSettings() {
  isSaving.value = true;
  successMessage.value = '';

  try {
    // TODO: Save to Supabase
    await new Promise(resolve => setTimeout(resolve, 1000));
    successMessage.value = 'Settings saved successfully';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (e) {
    console.error('Error saving settings:', e);
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <div class="space-y-6 animate-fade-in max-w-4xl">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-white">Settings</h1>
      <p class="text-gray-400 mt-1">
        Configure your clinic and system preferences
      </p>
    </div>

    <!-- Success Message -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="successMessage"
        class="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex items-center gap-3"
      >
        <CheckIcon class="w-5 h-5 text-emerald-400" />
        <p class="text-sm text-emerald-400">{{ successMessage }}</p>
      </div>
    </Transition>

    <!-- Clinic Information -->
    <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div class="flex items-center gap-3 mb-6">
        <div class="p-2 bg-primary-500/20 rounded-lg">
          <BuildingOfficeIcon class="w-5 h-5 text-primary-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white">Clinic Information</h3>
          <p class="text-sm text-gray-400">Basic details about your clinic</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Clinic Name</label>
          <input
            v-model="clinicSettings.name"
            type="text"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
          <input
            v-model="clinicSettings.email"
            type="email"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Phone</label>
          <input
            v-model="clinicSettings.phone"
            type="tel"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Timezone</label>
          <select
            v-model="clinicSettings.timezone"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
          </select>
        </div>
        <div class="sm:col-span-2">
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Address</label>
          <input
            v-model="clinicSettings.address"
            type="text"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>

    <!-- Appointment Settings -->
    <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div class="flex items-center gap-3 mb-6">
        <div class="p-2 bg-blue-500/20 rounded-lg">
          <ClockIcon class="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white">Appointment Settings</h3>
          <p class="text-sm text-gray-400">Configure booking rules and availability</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Slot Duration (minutes)</label>
          <select
            v-model="appointmentSettings.slotDuration"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option :value="15">15 minutes</option>
            <option :value="30">30 minutes</option>
            <option :value="45">45 minutes</option>
            <option :value="60">60 minutes</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Buffer Between Slots (minutes)</label>
          <select
            v-model="appointmentSettings.bufferTime"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option :value="0">No buffer</option>
            <option :value="5">5 minutes</option>
            <option :value="10">10 minutes</option>
            <option :value="15">15 minutes</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Max Advance Booking (days)</label>
          <input
            v-model.number="appointmentSettings.maxAdvanceBooking"
            type="number"
            min="1"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Min Advance Booking (hours)</label>
          <input
            v-model.number="appointmentSettings.minAdvanceBooking"
            type="number"
            min="1"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div class="sm:col-span-2 flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
          <div>
            <p class="font-medium text-white">Allow Cancellations</p>
            <p class="text-sm text-gray-400">Patients can cancel their appointments</p>
          </div>
          <label class="relative cursor-pointer">
            <input
              v-model="appointmentSettings.allowCancellation"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-600 peer-checked:bg-primary-600 rounded-full transition-colors"></div>
            <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>
        <div v-if="appointmentSettings.allowCancellation">
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Cancellation Deadline (hours before)</label>
          <input
            v-model.number="appointmentSettings.cancellationDeadline"
            type="number"
            min="1"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>

    <!-- Notification Settings -->
    <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div class="flex items-center gap-3 mb-6">
        <div class="p-2 bg-purple-500/20 rounded-lg">
          <BellIcon class="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white">Notifications</h3>
          <p class="text-sm text-gray-400">Configure email and SMS notifications</p>
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
          <div>
            <p class="font-medium text-white">Email Reminders</p>
            <p class="text-sm text-gray-400">Send appointment reminders via email</p>
          </div>
          <label class="relative cursor-pointer">
            <input
              v-model="notificationSettings.emailReminders"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-600 peer-checked:bg-primary-600 rounded-full transition-colors"></div>
            <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>

        <div class="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
          <div>
            <p class="font-medium text-white">SMS Reminders</p>
            <p class="text-sm text-gray-400">Send appointment reminders via SMS</p>
          </div>
          <label class="relative cursor-pointer">
            <input
              v-model="notificationSettings.smsReminders"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-600 peer-checked:bg-primary-600 rounded-full transition-colors"></div>
            <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>

        <div v-if="notificationSettings.emailReminders || notificationSettings.smsReminders">
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Reminder Timing (hours before)</label>
          <select
            v-model="notificationSettings.reminderTiming"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option :value="2">2 hours before</option>
            <option :value="6">6 hours before</option>
            <option :value="12">12 hours before</option>
            <option :value="24">24 hours before</option>
            <option :value="48">48 hours before</option>
          </select>
        </div>

        <div class="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
          <div>
            <p class="font-medium text-white">Confirmation Emails</p>
            <p class="text-sm text-gray-400">Send confirmation when appointment is booked</p>
          </div>
          <label class="relative cursor-pointer">
            <input
              v-model="notificationSettings.confirmationEmails"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-600 peer-checked:bg-primary-600 rounded-full transition-colors"></div>
            <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>

        <div class="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
          <div>
            <p class="font-medium text-white">Admin Notifications</p>
            <p class="text-sm text-gray-400">Notify admins of new bookings</p>
          </div>
          <label class="relative cursor-pointer">
            <input
              v-model="notificationSettings.adminNotifications"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-600 peer-checked:bg-primary-600 rounded-full transition-colors"></div>
            <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="flex justify-end">
      <button
        @click="saveSettings"
        :disabled="isSaving"
        class="px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
      >
        <svg
          v-if="isSaving"
          class="animate-spin w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <Cog6ToothIcon v-else class="w-5 h-5" />
        <span>{{ isSaving ? 'Saving...' : 'Save Settings' }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
