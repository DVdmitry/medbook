<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
    <div class="text-center">
      <p class="text-8xl font-bold text-primary-500 mb-4">404</p>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Page not found
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. Please check the URL or navigate back to the homepage.
      </p>
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </RouterLink>
    </div>
  </div>
</template>
