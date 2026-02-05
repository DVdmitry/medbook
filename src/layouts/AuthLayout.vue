<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left side - Branding -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/4 translate-y-1/4" />
        <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
        <!-- Logo -->
        <RouterLink to="/" class="mb-8">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span class="text-2xl font-bold">MedBook</span>
          </div>
        </RouterLink>

        <!-- Tagline -->
        <h1 class="text-4xl font-bold text-center mb-4">
          Your Health, Our Priority
        </h1>
        <p class="text-lg text-white/80 text-center max-w-md mb-12">
          Book appointments with top healthcare professionals in minutes. Quality care is just a click away.
        </p>

        <!-- Features -->
        <div class="space-y-4 w-full max-w-sm">
          <div class="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="font-medium">Verified Doctors</p>
              <p class="text-sm text-white/70">All our doctors are board certified</p>
            </div>
          </div>

          <div class="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="font-medium">Easy Scheduling</p>
              <p class="text-sm text-white/70">Book appointments 24/7</p>
            </div>
          </div>

          <div class="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p class="font-medium">Secure & Private</p>
              <p class="text-sm text-white/70">Your data is protected</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side - Auth form -->
    <div class="flex-1 flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Mobile header -->
      <div class="lg:hidden p-4 border-b border-gray-200 dark:border-gray-800">
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span class="font-bold text-gray-900 dark:text-white">MedBook</span>
        </RouterLink>
      </div>

      <!-- Auth content -->
      <div class="flex-1 flex items-center justify-center p-6">
        <div class="w-full max-w-md">
          <RouterView />
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} MedBook. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>
