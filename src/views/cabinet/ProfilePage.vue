<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import {
  UserCircleIcon,
  CameraIcon,
  CheckIcon,
} from '@heroicons/vue/24/outline';

const auth = useAuthStore();

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '' as 'male' | 'female' | 'other' | '',
  address: '',
  emergencyContact: '',
  emergencyPhone: '',
});

const isSaving = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

onMounted(() => {
  loadProfile();
});

watch(() => auth.profile, loadProfile, { deep: true });

function loadProfile() {
  if (auth.profile) {
    form.value = {
      firstName: auth.profile.firstName || '',
      lastName: auth.profile.lastName || '',
      email: auth.profile.email || '',
      phone: auth.profile.phone || '',
      dateOfBirth: auth.profile.dateOfBirth || '',
      gender: auth.profile.gender || '',
      address: auth.profile.address || '',
      emergencyContact: auth.profile.emergencyContact || '',
      emergencyPhone: auth.profile.emergencyPhone || '',
    };
  }
}

const hasChanges = computed(() => {
  if (!auth.profile) return false;
  return (
    form.value.firstName !== (auth.profile.firstName || '') ||
    form.value.lastName !== (auth.profile.lastName || '') ||
    form.value.phone !== (auth.profile.phone || '') ||
    form.value.dateOfBirth !== (auth.profile.dateOfBirth || '') ||
    form.value.gender !== (auth.profile.gender || '') ||
    form.value.address !== (auth.profile.address || '') ||
    form.value.emergencyContact !== (auth.profile.emergencyContact || '') ||
    form.value.emergencyPhone !== (auth.profile.emergencyPhone || '')
  );
});

async function handleSubmit() {
  if (!hasChanges.value) return;

  isSaving.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await auth.updateProfile({
      firstName: form.value.firstName || undefined,
      lastName: form.value.lastName || undefined,
      phone: form.value.phone || undefined,
      dateOfBirth: form.value.dateOfBirth || undefined,
      gender: form.value.gender as 'male' | 'female' | 'other' || undefined,
      address: form.value.address || undefined,
      emergencyContact: form.value.emergencyContact || undefined,
      emergencyPhone: form.value.emergencyPhone || undefined,
    });
    successMessage.value = 'Profile updated successfully';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    errorMessage.value = (error as Error).message || 'Failed to update profile';
  } finally {
    isSaving.value = false;
  }
}

function handleAvatarUpload() {
  // TODO: Implement avatar upload with Supabase Storage
  console.log('Avatar upload not implemented yet');
}
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-6 animate-fade-in">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">
        Manage your personal information
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
        <p class="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{{ successMessage }}</p>
      </div>
    </Transition>

    <!-- Error Message -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div
        v-if="errorMessage"
        class="p-4 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-100 dark:border-red-500/20 flex items-center gap-3"
      >
        <p class="text-sm text-red-600 dark:text-red-400 font-medium">{{ errorMessage }}</p>
      </div>
    </Transition>

    <!-- Avatar Section -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
      <div class="flex items-center gap-6">
        <div class="relative">
          <div
            v-if="auth.profile?.avatarUrl"
            class="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-gray-200 dark:ring-gray-700"
          >
            <img
              :src="auth.profile.avatarUrl"
              :alt="auth.fullName"
              class="w-full h-full object-cover"
            />
          </div>
          <div
            v-else
            class="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center shadow-soft"
          >
            <UserCircleIcon class="w-14 h-14 text-white" />
          </div>
          <button
            @click="handleAvatarUpload"
            class="absolute -bottom-2 -right-2 p-2.5 bg-white dark:bg-gray-700 rounded-xl shadow-soft border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <CameraIcon class="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ auth.fullName }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400">{{ auth.profile?.email }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Member since {{ auth.profile?.createdAt ? new Date(auth.profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Personal Information -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-5">
          Personal Information
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <!-- First Name -->
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              First Name
            </label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="John"
            />
          </div>

          <!-- Last Name -->
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Last Name
            </label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="Doe"
            />
          </div>

          <!-- Email (read-only) -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              readonly
              class="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 cursor-not-allowed"
            />
            <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Contact support to change your email
            </p>
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Phone Number
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <!-- Date of Birth -->
          <div>
            <label for="dateOfBirth" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              v-model="form.dateOfBirth"
              type="date"
              class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Gender -->
          <div>
            <label for="gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Gender
            </label>
            <select
              id="gender"
              v-model="form.gender"
              class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <!-- Address -->
        <div class="mt-5">
          <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Address
          </label>
          <textarea
            id="address"
            v-model="form.address"
            rows="2"
            class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
            placeholder="Your home address"
          ></textarea>
        </div>
      </div>

      <!-- Emergency Contact -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-5">
          Emergency Contact
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <!-- Contact Name -->
          <div>
            <label for="emergencyContact" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Contact Name
            </label>
            <input
              id="emergencyContact"
              v-model="form.emergencyContact"
              type="text"
              class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="Jane Doe"
            />
          </div>

          <!-- Contact Phone -->
          <div>
            <label for="emergencyPhone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Contact Phone
            </label>
            <input
              id="emergencyPhone"
              v-model="form.emergencyPhone"
              type="tel"
              class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end gap-4">
        <button
          type="button"
          @click="loadProfile"
          :disabled="!hasChanges || isSaving"
          class="px-6 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="!hasChanges || isSaving"
          class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <span>{{ isSaving ? 'Saving...' : 'Save Changes' }}</span>
        </button>
      </div>
    </form>
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
