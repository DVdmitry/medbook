<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const auth = useAuthStore();

const email = ref('');
const isSubmitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

async function handleSubmit() {
  if (!email.value) {
    errorMessage.value = 'Please enter your email address';
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    await auth.resetPassword(email.value);
    successMessage.value = 'Check your email for a password reset link';
  } catch (error) {
    errorMessage.value = (error as Error).message || 'Failed to send reset email';
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
        Forgot your password?
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        No worries, we'll send you reset instructions
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
      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Email address
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          required
          class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="you@example.com"
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
        <span>{{ isSubmitting ? 'Sending...' : 'Send reset link' }}</span>
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
