<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  UserGroupIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  HeartIcon,
  SparklesIcon,
  BoltIcon,
  CheckBadgeIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();

const features = [
  {
    title: 'Wide Selection of Specialists',
    description: 'Choose from cardiologists, dermatologists, orthopedic surgeons, and more.',
    icon: UserGroupIcon,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Easy Online Booking',
    description: 'Book your appointment in minutes with our simple multi-step form.',
    icon: CalendarDaysIcon,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Comprehensive Medical Forms',
    description: 'Provide detailed medical history to help doctors prepare for your visit.',
    icon: ClipboardDocumentListIcon,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Secure & Confidential',
    description: 'Your medical information is protected with industry-standard encryption.',
    icon: ShieldCheckIcon,
    gradient: 'from-orange-500 to-red-500'
  }
];

const specialties = [
  { name: 'Cardiology', icon: HeartIcon },
  { name: 'Dermatology', icon: SparklesIcon },
  { name: 'General Practice', icon: CheckBadgeIcon },
  { name: 'Orthopedic Surgery', icon: BoltIcon },
  { name: 'Neurology', icon: SparklesIcon },
  { name: 'Gastroenterology', icon: HeartIcon },
  { name: 'Pediatrics', icon: UserGroupIcon }
];
</script>

<template>
  <div>
    <!-- Hero Section with Modern Gradient & Glassmorphism -->
    <section class="hero-gradient text-white py-32 relative overflow-hidden">
      <!-- Animated Background Shapes -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-accent-500/30 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-float" style="animation-delay: 1s;"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-4xl mx-auto animate-slide-up">
          <h1 class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Book Your Medical Appointment
            <span class="block mt-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Online & Effortlessly
            </span>
          </h1>
          <p class="text-xl md:text-2xl mb-10 text-gray-100 font-light">
            Connect with qualified healthcare professionals and schedule appointments at your convenience.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="router.push('/doctors')"
              class="btn-primary text-lg px-10 py-4 shadow-2xl"
            >
              Find a Doctor
            </button>
            <button
              class="backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white font-semibold px-10 py-4 rounded-xl border border-white/30 transition-all duration-300 hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section with Glassmorphism Cards -->
    <section class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate-fade-in">
          <h2 class="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Why Choose MedBook?
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Experience modern healthcare booking</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="glass-card-hover p-8 text-center group animate-scale-in"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div :class="['w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br', feature.gradient, 'flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110']">
              <component :is="feature.icon" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Specialties Section with Modern Pills -->
    <section class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Available Medical Specialties
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Expert care across all medical fields</p>
        </div>

        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <div
            v-for="specialty in specialties"
            :key="specialty.name"
            class="glass-card-hover px-6 py-4 flex items-center space-x-3"
          >
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <component :is="specialty.icon" class="w-5 h-5 text-white" />
            </div>
            <span class="font-semibold text-gray-900 dark:text-gray-100">{{ specialty.name }}</span>
          </div>
        </div>

        <div class="text-center">
          <button
            @click="router.push('/doctors')"
            class="btn-primary text-lg px-10 py-4 shadow-2xl"
          >
            Browse All Doctors
          </button>
        </div>
      </div>
    </section>

    <!-- How It Works Section with Modern Design -->
    <section class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold gradient-text mb-4">How It Works</h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Simple steps to better healthcare</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center group animate-slide-up" style="animation-delay: 0.1s;">
            <div class="relative inline-block mb-6">
              <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                <span class="text-4xl font-bold text-white">1</span>
              </div>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-accent-500 rounded-full animate-ping"></div>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Choose Your Doctor</h3>
            <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">Browse our directory of qualified healthcare professionals.</p>
          </div>

          <div class="text-center group animate-slide-up" style="animation-delay: 0.2s;">
            <div class="relative inline-block mb-6">
              <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                <span class="text-4xl font-bold text-white">2</span>
              </div>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-accent-500 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Fill Out Medical Forms</h3>
            <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">Complete comprehensive medical history and symptom forms.</p>
          </div>

          <div class="text-center group animate-slide-up" style="animation-delay: 0.3s;">
            <div class="relative inline-block mb-6">
              <div class="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                <span class="text-4xl font-bold text-white">3</span>
              </div>
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-accent-500 rounded-full animate-ping" style="animation-delay: 1s;"></div>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Confirm Your Appointment</h3>
            <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">Select your preferred time and receive instant confirmation.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
