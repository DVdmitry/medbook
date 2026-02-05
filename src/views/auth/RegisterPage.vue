<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const auth = useAuthStore();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeToTerms = ref(false);
const showPassword = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

async function handleSubmit() {
  errorMessage.value = '';
  successMessage.value = '';

  // Validation
  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    errorMessage.value = 'Please fill in all required fields';
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }

  if (!agreeToTerms.value) {
    errorMessage.value = 'Please agree to the Terms of Service';
    return;
  }

  isSubmitting.value = true;

  try {
    const result = await auth.signUp({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value || undefined,
    });

    if (result.user && !result.session) {
      // Email confirmation required
      successMessage.value = 'Please check your email to confirm your account';
    } else if (result.session) {
      // Signed in automatically
      router.push('/cabinet');
    }
  } catch (error) {
    errorMessage.value = (error as Error).message || 'Registration failed';
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
        Create your account
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Join MedBook to book appointments easily
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
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Name row -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            First name *
          </label>
          <input
            id="firstName"
            v-model="firstName"
            type="text"
            required
            class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="John"
          />
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Last name *
          </label>
          <input
            id="lastName"
            v-model="lastName"
            type="text"
            required
            class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Doe"
          />
        </div>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Email address *
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

      <!-- Phone -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Phone number
        </label>
        <input
          id="phone"
          v-model="phone"
          type="tel"
          class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Password *
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
          Confirm password *
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

      <!-- Terms -->
      <label class="flex items-start gap-3 cursor-pointer">
        <input
          v-model="agreeToTerms"
          type="checkbox"
          class="mt-0.5 w-4 h-4 text-primary-500 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
        />
        <span class="text-sm text-gray-600 dark:text-gray-400">
          I agree to the
          <a href="#" class="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</a>
          and
          <a href="#" class="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</a>
        </span>
      </label>

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
        <span>{{ isSubmitting ? 'Creating account...' : 'Create account' }}</span>
      </button>
    </form>

    <!-- Sign in link -->
    <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
      Already have an account?
      <RouterLink
        to="/auth/login"
        class="text-primary-600 dark:text-primary-400 font-medium hover:underline"
      >
        Sign in
      </RouterLink>
    </p>
  </div>
</template>
