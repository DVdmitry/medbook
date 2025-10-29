<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import { SunIcon, MoonIcon, HeartPulseIcon } from '@heroicons/vue/24/outline';

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Theme Toggle Button -->
    <button @click="toggleTheme" class="theme-toggle">
      <SunIcon v-if="isDark" class="w-6 h-6 text-yellow-500" />
      <MoonIcon v-else class="w-6 h-6 text-primary-600" />
    </button>

    <!-- Modern Header with Glassmorphism -->
    <header class="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-40">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center space-x-3 group">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
              <HeartPulseIcon class="w-7 h-7 text-white" />
            </div>
            <span class="text-2xl font-bold gradient-text">MedBook</span>
          </router-link>

          <div class="flex items-center space-x-8">
            <router-link
              to="/"
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all font-semibold relative group"
            >
              Home
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-600 group-hover:w-full transition-all duration-300"></span>
            </router-link>
            <router-link
              to="/doctors"
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all font-semibold relative group"
            >
              Find Doctors
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-accent-600 group-hover:w-full transition-all duration-300"></span>
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Modern Footer with Glassmorphism -->
    <footer class="backdrop-blur-xl bg-gray-900/90 dark:bg-gray-950/90 border-t border-gray-800/50 py-12 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex items-center justify-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <HeartPulseIcon class="w-6 h-6 text-white" />
            </div>
            <span class="text-2xl font-bold text-white">MedBook</span>
          </div>
          <p class="text-gray-400">
            2025 MedBook. Professional Medical Appointment Booking Platform.
          </p>
          <p class="text-sm text-gray-500 mt-2">Demo Application - Showcasing Modern UI/UX Design Trends</p>
        </div>
      </div>
    </footer>
  </div>
</template>
