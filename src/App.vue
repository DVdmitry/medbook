<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white text-xl font-bold">M</span>
            </div>
            <span class="text-xl font-bold text-gray-900">MedBook</span>
          </router-link>

          <div class="flex items-center space-x-6">
            <router-link
              to="/"
              class="text-gray-600 hover:text-primary-600 transition-colors font-medium"
            >
              Home
            </router-link>
            <router-link
              to="/doctors"
              class="text-gray-600 hover:text-primary-600 transition-colors font-medium"
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

    <footer class="bg-gray-900 text-white py-8 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-gray-400">
            2025 MedBook. Professional Medical Appointment Booking Platform.
          </p>
          <p class="text-sm text-gray-500 mt-2">Demo Application - For Portfolio Purposes</p>
        </div>
      </div>
    </footer>
  </div>
</template>
