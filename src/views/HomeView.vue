<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  UserGroupIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();

const features = [
  {
    title: 'Wide Selection of Specialists',
    description: 'Choose from cardiologists, dermatologists, orthopedic surgeons, and more.',
    icon: UserGroupIcon
  },
  {
    title: 'Easy Online Booking',
    description: 'Book your appointment in minutes with our simple multi-step form.',
    icon: CalendarDaysIcon
  },
  {
    title: 'Comprehensive Medical Forms',
    description: 'Provide detailed medical history to help doctors prepare for your visit.',
    icon: ClipboardDocumentListIcon
  },
  {
    title: 'Secure & Confidential',
    description: 'Your medical information is protected with industry-standard encryption.',
    icon: ShieldCheckIcon
  }
];

const specialties = [
  { name: 'Cardiology', value: 'cardiologist' },
  { name: 'Dermatology', value: 'dermatologist' },
  { name: 'General Practice', value: 'general-practitioner' },
  { name: 'Orthopedic Surgery', value: 'orthopedic-surgeon' },
  { name: 'Neurology', value: 'neurologist' },
  { name: 'Gastroenterology', value: 'gastroenterologist' },
  { name: 'Pediatrics', value: 'pediatrician' }
];

function goToSpecialty(specialtyValue: string) {
  router.push({ path: '/doctors', query: { specialty: specialtyValue } });
}
</script>

<template>
  <div>
    <!-- Hero Section - Minimalist Design -->
    <section class="bg-white dark:bg-gray-900 py-24 md:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            Book Your Medical Appointment Online
          </h1>
          <p class="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300">
            Connect with qualified healthcare professionals and schedule appointments at your convenience.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="router.push('/doctors')"
              class="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold px-10 py-4 rounded-lg transition-colors duration-200 text-lg"
            >
              Find a Doctor
            </button>
            <button
              class="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold px-10 py-4 rounded-lg transition-colors duration-200 text-lg border border-gray-300 dark:border-gray-600"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section - Clean Cards -->
    <section class="py-20 bg-gray-50 dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Why Choose MedBook?
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Experience modern healthcare booking</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-sky-500 dark:hover:border-sky-500 transition-colors duration-200"
          >
            <div class="w-12 h-12 mb-4 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
              <component :is="feature.icon" class="w-6 h-6 text-sky-600 dark:text-sky-400" />
            </div>
            <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Specialties Section - Simple List -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Available Medical Specialties
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Expert care across all medical fields</p>
        </div>

        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="specialty in specialties"
            :key="specialty.name"
            @click="goToSpecialty(specialty.value)"
            class="px-5 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 font-medium text-gray-900 dark:text-white cursor-pointer"
          >
            {{ specialty.name }}
          </button>
        </div>

        <div class="text-center">
          <button
            @click="router.push('/doctors')"
            class="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold px-10 py-4 rounded-lg transition-colors duration-200 text-lg"
          >
            Browse All Doctors
          </button>
        </div>
      </div>
    </section>

    <!-- How It Works Section - Simple Steps -->
    <section class="py-20 bg-gray-50 dark:bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">How It Works</h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Simple steps to better healthcare</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-5 rounded-full bg-sky-600 dark:bg-sky-500 flex items-center justify-center">
              <span class="text-2xl font-bold text-white">1</span>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Choose Your Doctor</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">Browse our directory of qualified healthcare professionals.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-5 rounded-full bg-sky-600 dark:bg-sky-500 flex items-center justify-center">
              <span class="text-2xl font-bold text-white">2</span>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Fill Out Medical Forms</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">Complete comprehensive medical history and symptom forms.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-5 rounded-full bg-sky-600 dark:bg-sky-500 flex items-center justify-center">
              <span class="text-2xl font-bold text-white">3</span>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Confirm Your Appointment</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">Select your preferred time and receive instant confirmation.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
