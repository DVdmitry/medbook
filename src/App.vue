<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import {
  SunIcon,
  MoonIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline';

const { isDark, toggleTheme } = useTheme();
const route = useRoute();
const isMobileMenuOpen = ref(false);

// Close mobile menu on route change
watch(() => route.path, () => {
  isMobileMenuOpen.value = false;
});

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Skip to content link for accessibility -->
    <a href="#main-content" class="skip-link">
      Skip to main content
    </a>

    <!-- Theme Toggle Button -->
    <button
      @click="toggleTheme"
      class="theme-toggle"
      aria-label="Toggle dark mode"
    >
      <SunIcon v-if="isDark" class="w-5 h-5 text-warning-500" />
      <MoonIcon v-else class="w-5 h-5 text-primary-600" />
    </button>

    <!-- Header -->
    <header class="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-3 group">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-glow-primary transition-shadow duration-300">
              <HeartIcon class="w-6 h-6 text-white" />
            </div>
            <span class="text-xl font-bold text-neutral-900 dark:text-white">
              Med<span class="text-primary-600 dark:text-primary-400">Book</span>
            </span>
          </router-link>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            <router-link
              to="/"
              class="nav-link"
              :class="{ 'nav-link-active': route.path === '/' }"
            >
              Home
            </router-link>
            <router-link
              to="/doctors"
              class="nav-link"
              :class="{ 'nav-link-active': route.path === '/doctors' || route.path.startsWith('/booking') }"
            >
              Find Doctors
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden btn-icon"
            aria-label="Toggle menu"
            :aria-expanded="isMobileMenuOpen"
          >
            <Bars3Icon v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </nav>

      <!-- Mobile Navigation Drawer -->
      <Transition
        enter-active-class="transition-all duration-300 ease-smooth"
        leave-active-class="transition-all duration-200 ease-smooth"
        enter-from-class="opacity-0 -translate-y-4"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-soft-lg"
        >
          <div class="px-4 py-6 space-y-4">
            <router-link
              to="/"
              @click="closeMobileMenu"
              class="block px-4 py-3 rounded-xl font-medium transition-colors"
              :class="route.path === '/'
                ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'"
            >
              Home
            </router-link>
            <router-link
              to="/doctors"
              @click="closeMobileMenu"
              class="block px-4 py-3 rounded-xl font-medium transition-colors"
              :class="route.path === '/doctors' || route.path.startsWith('/booking')
                ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'"
            >
              Find Doctors
            </router-link>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
        @click="closeMobileMenu"
      />
    </Transition>

    <!-- Main Content -->
    <main id="main-content" class="flex-1">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Brand -->
          <div class="md:col-span-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <HeartIcon class="w-6 h-6 text-white" />
              </div>
              <span class="text-xl font-bold text-neutral-900 dark:text-white">
                Med<span class="text-primary-600 dark:text-primary-400">Book</span>
              </span>
            </div>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              Professional medical appointment booking platform. Connect with qualified healthcare professionals.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-semibold text-neutral-900 dark:text-white mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li>
                <router-link to="/" class="text-sm text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors">
                  Home
                </router-link>
              </li>
              <li>
                <router-link to="/doctors" class="text-sm text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors">
                  Find Doctors
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-semibold text-neutral-900 dark:text-white mb-4">Contact</h4>
            <ul class="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>support@medbook.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-sm text-neutral-500 dark:text-neutral-500">
              2026 MedBook. All rights reserved.
            </p>
            <p class="text-xs text-neutral-400 dark:text-neutral-600">
              Demo Application - Modern Healthcare Booking
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
