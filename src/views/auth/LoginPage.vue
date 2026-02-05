<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const email = ref('');
const password = ref('');
const rememberMe = ref(true);
const showPassword = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref('');

const redirectPath = computed(() => (route.query.redirect as string) || '/cabinet');

async function handleSubmit() {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in all fields';
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    await auth.signIn(email.value, password.value, rememberMe.value);

    // Redirect based on role
    if (auth.isAdmin) {
      router.push('/admin/dashboard');
    } else {
      router.push(redirectPath.value);
    }
  } catch (error) {
    errorMessage.value = (error as Error).message || 'Invalid email or password';
  } finally {
    isSubmitting.value = false;
  }
}

// Demo credentials hint
function fillDemoCredentials(type: 'patient' | 'admin') {
  if (type === 'admin') {
    email.value = 'admin@medbook.app';
    password.value = 'admin123';
  } else {
    email.value = 'patient@example.com';
    password.value = 'patient123';
  }
}
</script>

<template>
  <div class="animate-fade-in">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Welcome back
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Sign in to your account to continue
      </p>
    </div>

    <!-- Demo credentials hint -->
    <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20">
      <p class="text-sm text-blue-800 dark:text-blue-300 mb-2 font-medium">Demo Credentials:</p>
      <div class="flex gap-2">
        <button
          type="button"
          @click="fillDemoCredentials('patient')"
          class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-colors"
        >
          Patient
        </button>
        <button
          type="button"
          @click="fillDemoCredentials('admin')"
          class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-colors"
        >
          Admin
        </button>
      </div>
    </div>

    <!-- Error message -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
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

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Password
        </label>
        <div class="relative">
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            required
            class="w-full px-4 py-3 pr-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Enter your password"
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

      <!-- Remember me & Forgot password -->
      <div class="flex items-center justify-between">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="rememberMe"
            type="checkbox"
            class="w-4 h-4 text-primary-500 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
          />
          <span class="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
        </label>
        <RouterLink
          to="/auth/forgot-password"
          class="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Forgot password?
        </RouterLink>
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
        <span>{{ isSubmitting ? 'Signing in...' : 'Sign in' }}</span>
      </button>
    </form>

    <!-- Divider -->
    <div class="relative my-8">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200 dark:border-gray-700" />
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-4 bg-gray-50 dark:bg-gray-900 text-gray-500">or</span>
      </div>
    </div>

    <!-- Sign up link -->
    <p class="text-center text-sm text-gray-600 dark:text-gray-400">
      Don't have an account?
      <RouterLink
        to="/auth/register"
        class="text-primary-600 dark:text-primary-400 font-medium hover:underline"
      >
        Sign up
      </RouterLink>
    </p>
  </div>
</template>
