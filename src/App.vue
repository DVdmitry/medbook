<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import { SunIcon, MoonIcon, HeartIcon } from '@heroicons/vue/24/outline';

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Theme Toggle Button -->
    <button @click="toggleTheme" class="theme-toggle">
      <SunIcon v-if="isDark" class="w-6 h-6 text-yellow-500" />
      <MoonIcon v-else class="w-6 h-6 text-primary-600" />
    </button>

    <!-- Header - Minimalist Design -->
    <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center space-x-3 group">
            <div class="w-10 h-10 bg-sky-600 dark:bg-sky-500 rounded-lg flex items-center justify-center">
              <HeartIcon class="w-6 h-6 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">MedBook</span>
          </router-link>

          <div class="flex items-center space-x-8">
            <router-link
              to="/"
              class="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium"
            >
              Home
            </router-link>
            <router-link
              to="/doctors"
              class="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium"
            >
              Find Doctors
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Footer - Minimalist Design -->
    <footer class="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex items-center justify-center space-x-3 mb-4">
            <div class="w-8 h-8 bg-sky-600 dark:bg-sky-500 rounded-lg flex items-center justify-center">
              <HeartIcon class="w-5 h-5 text-white" />
            </div>
            <span class="text-lg font-bold text-gray-900 dark:text-white">MedBook</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400">
            2025 MedBook. Professional Medical Appointment Booking Platform.
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Demo Application - Showcasing Modern UI/UX Design Trends</p>
        </div>
      </div>
    </footer>
  </div>
</template>
