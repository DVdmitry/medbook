<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const features = [
  {
    title: 'Wide Selection of Specialists',
    description: 'Choose from cardiologists, dermatologists, orthopedic surgeons, and more.',
    icon: '👨‍⚕️'
  },
  {
    title: 'Easy Online Booking',
    description: 'Book your appointment in minutes with our simple multi-step form.',
    icon: '📅'
  },
  {
    title: 'Comprehensive Medical Forms',
    description: 'Provide detailed medical history to help doctors prepare for your visit.',
    icon: '📋'
  },
  {
    title: 'Secure & Confidential',
    description: 'Your medical information is protected with industry-standard encryption.',
    icon: '🔒'
  }
];

const specialties = [
  'Cardiology',
  'Dermatology',
  'General Practice',
  'Orthopedic Surgery',
  'Neurology',
  'Gastroenterology',
  'Pediatrics'
];
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            Book Your Medical Appointment Online
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-primary-100">
            Connect with qualified healthcare professionals and schedule appointments at your convenience.
          </p>
          <button
            @click="router.push('/doctors')"
            class="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Find a Doctor
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose MedBook?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
          >
            <div class="text-5xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Specialties Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
          Available Medical Specialties
        </h2>
        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="specialty in specialties"
            :key="specialty"
            class="bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow text-gray-700 font-medium"
          >
            {{ specialty }}
          </div>
        </div>
        <div class="text-center mt-10">
          <button
            @click="router.push('/doctors')"
            class="btn-primary text-lg px-8 py-3"
          >
            Browse All Doctors
          </button>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-primary-700">1</span>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900">Choose Your Doctor</h3>
            <p class="text-gray-600">Browse our directory of qualified healthcare professionals.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-primary-700">2</span>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900">Fill Out Medical Forms</h3>
            <p class="text-gray-600">Complete comprehensive medical history and symptom forms.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-primary-700">3</span>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900">Confirm Your Appointment</h3>
            <p class="text-gray-600">Select your preferred time and receive instant confirmation.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
