<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const auth = useAuthStore();

const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

async function handleSubmit() {
  errorMessage.value = '';

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }

  isSubmitting.value = true;

  try {
    await auth.updatePassword(password.value);
    successMessage.value = 'Password updated successfully! Redirecting...';
    setTimeout(() => {
      router.push('/cabinet');
    }, 2000);
  } catch (error) {
    errorMessage.value = (error as Error).message || 'Failed to update password';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="animate-fade-in">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Set new password
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Your new password must be different from previously used passwords
      </p>
    </div>

    <!-- Success message -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div
        v-if="successMessage"
        class="mb-6 p-4 bg-green-50 dark:bg-green-500/10 rounded-xl border border-green-100 dark:border-green-500/20"
      >
        <p class="text-sm text-green-600 dark:text-green-400">{{ successMessage }}</p>
      </div>
    </Transition>

    <!-- Error message -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div
        v-if="errorMessage"
        class="mb-6 p-4 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-100 dark:border-red-500/20"
      >
        <p class="text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>
      </div>
    </Transition>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          New password
        </label>
        <div class="relative">
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            required
            minlength="6"
            class="w-full px-4 py-3 pr-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="At least 6 characters"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <EyeSlashIcon v-if="showPassword" class="w-5 h-5" />
            <EyeIcon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Confirm Password -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          required
          class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="Repeat your password"
        />
      </div>

      <!-- Submit button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <svg
          v-if="isSubmitting"
          class="animate-spin w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>{{ isSubmitting ? 'Updating...' : 'Reset password' }}</span>
      </button>
    </form>

    <!-- Back to login -->
    <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
      <RouterLink
        to="/auth/login"
        class="text-primary-600 dark:text-primary-400 font-medium hover:underline inline-flex items-center gap-1"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to sign in
      </RouterLink>
    </p>
  </div>
</template>
