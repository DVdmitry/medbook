<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import {
  BellIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CheckIcon,
  ShieldCheckIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';

const auth = useAuthStore();

const notifications = ref({
  email: true,
  sms: false,
  push: true,
});

const isSaving = ref(false);
const successMessage = ref('');
const showDeleteModal = ref(false);

onMounted(() => {
  loadSettings();
});

watch(() => auth.profile?.notificationPreferences, loadSettings, { deep: true });

function loadSettings() {
  if (auth.profile?.notificationPreferences) {
    notifications.value = {
      email: auth.profile.notificationPreferences.email ?? true,
      sms: auth.profile.notificationPreferences.sms ?? false,
      push: auth.profile.notificationPreferences.push ?? true,
    };
  }
}

const hasChanges = computed(() => {
  if (!auth.profile?.notificationPreferences) return false;
  return (
    notifications.value.email !== auth.profile.notificationPreferences.email ||
    notifications.value.sms !== auth.profile.notificationPreferences.sms ||
    notifications.value.push !== auth.profile.notificationPreferences.push
  );
});

async function saveNotifications() {
  if (!hasChanges.value) return;

  isSaving.value = true;
  successMessage.value = '';

  try {
    await auth.updateProfile({
      notificationPreferences: {
        email: notifications.value.email,
        sms: notifications.value.sms,
        push: notifications.value.push,
      },
    });
    successMessage.value = 'Notification preferences saved';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    console.error('Failed to save notifications:', error);
  } finally {
    isSaving.value = false;
  }
}

function handleDeleteAccount() {
  // TODO: Implement account deletion
  console.log('Delete account not implemented yet');
  showDeleteModal.value = false;
}
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-6 animate-fade-in">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">
        Manage your account preferences
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
        class="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-100 dark:border-emerald-500/20 flex items-center gap-3"
      >
        <CheckIcon class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <p class="text-sm text-emerald-600 dark:text-emerald-400">{{ successMessage }}</p>
      </div>
    </Transition>

    <!-- Notifications -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
      <div class="flex items-center gap-3 mb-6">
        <div class="p-2 bg-primary-100 dark:bg-primary-500/20 rounded-lg">
          <BellIcon class="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Notifications
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Choose how you'd like to be notified
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <!-- Email Notifications -->
        <label class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-white dark:bg-gray-600 rounded-lg">
              <EnvelopeIcon class="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Email</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Appointment reminders and updates
              </p>
            </div>
          </div>
          <div class="relative">
            <input
              v-model="notifications.email"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-checked:bg-primary-600 rounded-full transition-colors"></div>
            <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5"></div>
          </div>
        </label>

        <!-- SMS Notifications -->
        <label class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-white dark:bg-gray-600 rounded-lg">
              <DevicePhoneMobileIcon class="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">SMS</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Text message reminders
              </p>
            </div>
          </div>
          <div class="relative">
            <input
              v-model="notifications.sms"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-checked:bg-primary-600 rounded-full transition-colors"></div>
            <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5"></div>
          </div>
        </label>

        <!-- Push Notifications -->
        <label class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-white dark:bg-gray-600 rounded-lg">
              <ComputerDesktopIcon class="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Push</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Browser notifications
              </p>
            </div>
          </div>
          <div class="relative">
            <input
              v-model="notifications.push"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-checked:bg-primary-600 rounded-full transition-colors"></div>
            <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5"></div>
          </div>
        </label>
      </div>

      <div class="flex justify-end mt-6">
        <button
          @click="saveNotifications"
          :disabled="!hasChanges || isSaving"
          class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center gap-2"
        >
          <svg
            v-if="isSaving"
            class="animate-spin w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>{{ isSaving ? 'Saving...' : 'Save Preferences' }}</span>
        </button>
      </div>
    </div>

    <!-- Security -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
      <div class="flex items-center gap-3 mb-6">
        <div class="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg">
          <ShieldCheckIcon class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Security
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Manage your account security
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <!-- Change Password -->
        <RouterLink
          to="/auth/reset-password"
          class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Change Password</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Update your password regularly for security
            </p>
          </div>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </RouterLink>

        <!-- Sessions (placeholder) -->
        <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Active Sessions</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Manage devices where you're logged in
              </p>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-500">Coming soon</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-red-200 dark:border-red-500/30">
      <div class="flex items-center gap-3 mb-6">
        <div class="p-2 bg-red-100 dark:bg-red-500/20 rounded-lg">
          <TrashIcon class="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Danger Zone
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Irreversible account actions
          </p>
        </div>
      </div>

      <div class="p-4 bg-red-50 dark:bg-red-500/10 rounded-xl">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Delete Account</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Permanently delete your account and all data
            </p>
          </div>
          <button
            @click="showDeleteModal = true"
            class="px-4 py-2 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-500/50 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          @click.self="showDeleteModal = false"
        >
          <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div class="text-center">
              <div class="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrashIcon class="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Delete Account?
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                This action cannot be undone. All your data including appointments, profile information, and history will be permanently deleted.
              </p>
            </div>

            <div class="flex gap-3">
              <button
                @click="showDeleteModal = false"
                class="flex-1 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                @click="handleDeleteAccount"
                class="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
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
