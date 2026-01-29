<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';
import { useApi } from '@/composables/useApi';

const router = useRouter();
const { getSpecialtyCounts } = useApi();

const specialtyDefinitions = [
  { name: 'Cardiology', value: 'cardiologist' },
  { name: 'Dermatology', value: 'dermatologist' },
  { name: 'General Practice', value: 'general-practitioner' },
  { name: 'Orthopedics', value: 'orthopedic-surgeon' },
  { name: 'Neurology', value: 'neurologist' },
  { name: 'Gastroenterology', value: 'gastroenterologist' },
  { name: 'Pediatrics', value: 'pediatrician' }
];

const specialtyCounts = ref<Record<string, number>>({});

const specialties = ref(specialtyDefinitions.map(s => ({ ...s, count: 0 })));

onMounted(async () => {
  specialtyCounts.value = await getSpecialtyCounts();
  specialties.value = specialtyDefinitions.map(s => ({
    ...s,
    count: specialtyCounts.value[s.value] || 0
  }));
});

function goToSpecialty(specialtyValue: string) {
  router.push({ path: '/doctors', query: { specialty: specialtyValue } });
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-white dark:bg-neutral-950 min-h-[90vh] flex items-center">
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-mesh-light dark:bg-mesh-dark opacity-40" />
      <div class="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style="animation-delay: 1.5s;" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left Content -->
          <div class="text-center lg:text-left">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-6 animate-fade-in-down">
              <span class="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
              <span class="text-sm font-medium text-primary-700 dark:text-primary-300">Trusted by 10,000+ patients</span>
            </div>

            <!-- Heading -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up leading-tight">
              <span class="text-neutral-900 dark:text-white">Your Health,</span><br />
              <span class="text-gradient dark:text-gradient-dark">Our Priority</span>
            </h1>

            <!-- Subheading -->
            <p class="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style="animation-delay: 100ms;">
              Connect with top healthcare professionals and book appointments in minutes. Quality medical care is just a click away.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style="animation-delay: 200ms;">
              <button
                @click="router.push('/doctors')"
                class="btn-primary btn-lg group"
              >
                Find a Doctor
                <ArrowRightIcon class="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button class="btn-secondary btn-lg">
                How It Works
              </button>
            </div>

            <!-- Trust Indicators -->
            <div class="flex flex-wrap justify-center lg:justify-start gap-6 mt-10 animate-fade-in-up" style="animation-delay: 300ms;">
              <div class="flex items-center gap-2">
                <CheckCircleIcon class="w-5 h-5 text-success-500" />
                <span class="text-sm text-neutral-600 dark:text-neutral-400">Verified Doctors</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircleIcon class="w-5 h-5 text-success-500" />
                <span class="text-sm text-neutral-600 dark:text-neutral-400">Secure Booking</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircleIcon class="w-5 h-5 text-success-500" />
                <span class="text-sm text-neutral-600 dark:text-neutral-400">24/7 Support</span>
              </div>
            </div>
          </div>

          <!-- Right Image -->
          <div class="relative animate-fade-in-up" style="animation-delay: 200ms;">
            <!-- Main Image -->
            <div class="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=700&fit=crop&crop=faces"
                alt="Professional doctor"
                class="w-full max-w-lg mx-auto rounded-3xl shadow-soft-xl object-cover"
                loading="eager"
              />
              <!-- Decorative gradient overlay -->
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary-900/20 to-transparent" />
            </div>

            <!-- Floating Cards -->
            <div class="absolute -left-4 lg:-left-8 top-1/4 z-20 animate-float" style="animation-delay: 0.5s;">
              <div class="glass-card p-4 shadow-soft-lg">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-success-100 dark:bg-success-900/30 flex items-center justify-center">
                    <svg class="w-6 h-6 text-success-600 dark:text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold text-neutral-900 dark:text-white">50+</p>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400">Specialists</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="absolute -right-4 lg:-right-8 bottom-1/4 z-20 animate-float" style="animation-delay: 1s;">
              <div class="glass-card p-4 shadow-soft-lg">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-warning-100 dark:bg-warning-900/30 flex items-center justify-center">
                    <svg class="w-6 h-6 text-warning-600 dark:text-warning-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold text-neutral-900 dark:text-white">4.9/5</p>
                    <p class="text-sm text-neutral-500 dark:text-neutral-400">Rating</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Background decorative elements -->
            <div class="absolute -z-10 top-8 right-8 w-full h-full rounded-3xl bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-900/50 dark:to-accent-900/50" />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Why Choose <span class="text-gradient dark:text-gradient-dark">MedBook</span>?
          </h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Experience healthcare booking designed for the modern patient
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature 1 - Wide Selection -->
          <div class="card-hover p-6 text-center group">
            <div class="w-20 h-20 mx-auto mb-6 relative">
              <svg viewBox="0 0 80 80" class="w-full h-full">
                <!-- Background circle -->
                <circle cx="40" cy="40" r="38" class="fill-primary-100 dark:fill-primary-900/30" />
                <!-- Doctor figures -->
                <g class="transform transition-transform group-hover:scale-105 origin-center">
                  <!-- Person 1 -->
                  <circle cx="28" cy="30" r="8" class="fill-primary-500" />
                  <path d="M20 52 C20 44 36 44 36 52 L36 56 L20 56 Z" class="fill-primary-500" />
                  <!-- Person 2 -->
                  <circle cx="52" cy="30" r="8" class="fill-accent-500" />
                  <path d="M44 52 C44 44 60 44 60 52 L60 56 L44 56 Z" class="fill-accent-500" />
                  <!-- Stethoscope icon -->
                  <circle cx="40" cy="46" r="4" class="fill-none stroke-primary-600 dark:stroke-primary-400" stroke-width="2" />
                  <path d="M40 50 L40 58" class="stroke-primary-600 dark:stroke-primary-400" stroke-width="2" stroke-linecap="round" />
                </g>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Wide Selection</h3>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm">
              Choose from 50+ specialists across all medical fields
            </p>
          </div>

          <!-- Feature 2 - Easy Booking -->
          <div class="card-hover p-6 text-center group">
            <div class="w-20 h-20 mx-auto mb-6 relative">
              <svg viewBox="0 0 80 80" class="w-full h-full">
                <circle cx="40" cy="40" r="38" class="fill-accent-100 dark:fill-accent-900/30" />
                <g class="transform transition-transform group-hover:scale-105 origin-center">
                  <!-- Calendar -->
                  <rect x="18" y="22" width="44" height="38" rx="4" class="fill-white dark:fill-neutral-800 stroke-accent-500" stroke-width="2" />
                  <rect x="18" y="22" width="44" height="12" rx="4" class="fill-accent-500" />
                  <!-- Calendar dots -->
                  <circle cx="28" cy="28" r="2" class="fill-white" />
                  <circle cx="52" cy="28" r="2" class="fill-white" />
                  <!-- Calendar lines -->
                  <line x1="26" y1="42" x2="38" y2="42" class="stroke-neutral-300 dark:stroke-neutral-600" stroke-width="2" stroke-linecap="round" />
                  <line x1="26" y1="50" x2="46" y2="50" class="stroke-neutral-300 dark:stroke-neutral-600" stroke-width="2" stroke-linecap="round" />
                  <!-- Checkmark -->
                  <circle cx="54" cy="48" r="10" class="fill-success-500" />
                  <path d="M50 48 L53 51 L59 45" class="stroke-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                </g>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Easy Booking</h3>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm">
              Book appointments in under 3 minutes with our simple form
            </p>
          </div>

          <!-- Feature 3 - Medical Forms -->
          <div class="card-hover p-6 text-center group">
            <div class="w-20 h-20 mx-auto mb-6 relative">
              <svg viewBox="0 0 80 80" class="w-full h-full">
                <circle cx="40" cy="40" r="38" class="fill-primary-100 dark:fill-primary-900/30" />
                <g class="transform transition-transform group-hover:scale-105 origin-center">
                  <!-- Clipboard -->
                  <rect x="22" y="18" width="36" height="48" rx="3" class="fill-white dark:fill-neutral-800 stroke-primary-500" stroke-width="2" />
                  <rect x="30" y="14" width="20" height="8" rx="2" class="fill-primary-500" />
                  <!-- Lines -->
                  <line x1="28" y1="32" x2="52" y2="32" class="stroke-neutral-300 dark:stroke-neutral-600" stroke-width="2" stroke-linecap="round" />
                  <line x1="28" y1="40" x2="48" y2="40" class="stroke-neutral-300 dark:stroke-neutral-600" stroke-width="2" stroke-linecap="round" />
                  <line x1="28" y1="48" x2="44" y2="48" class="stroke-neutral-300 dark:stroke-neutral-600" stroke-width="2" stroke-linecap="round" />
                  <!-- Medical cross -->
                  <rect x="44" y="52" width="12" height="4" rx="1" class="fill-error-500" />
                  <rect x="48" y="48" width="4" height="12" rx="1" class="fill-error-500" />
                </g>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Smart Forms</h3>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm">
              Specialty-specific forms help doctors prepare for your visit
            </p>
          </div>

          <!-- Feature 4 - Secure -->
          <div class="card-hover p-6 text-center group">
            <div class="w-20 h-20 mx-auto mb-6 relative">
              <svg viewBox="0 0 80 80" class="w-full h-full">
                <circle cx="40" cy="40" r="38" class="fill-accent-100 dark:fill-accent-900/30" />
                <g class="transform transition-transform group-hover:scale-105 origin-center">
                  <!-- Shield -->
                  <path d="M40 16 L56 24 L56 40 C56 52 40 62 40 62 C40 62 24 52 24 40 L24 24 Z" class="fill-accent-500" />
                  <!-- Inner shield -->
                  <path d="M40 22 L52 28 L52 40 C52 48 40 56 40 56 C40 56 28 48 28 40 L28 28 Z" class="fill-white dark:fill-neutral-800" />
                  <!-- Checkmark -->
                  <path d="M34 40 L38 44 L48 34" class="stroke-accent-600 dark:stroke-accent-400" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                </g>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Secure & Private</h3>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm">
              Your health data is protected with enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-20 md:py-28 bg-white dark:bg-neutral-950 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50 to-transparent dark:from-primary-950/20 dark:to-transparent" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400">
            Three simple steps to better healthcare
          </p>
        </div>

        <!-- Steps -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <!-- Step 1 -->
          <div class="relative text-center">
            <div class="w-32 h-32 mx-auto mb-6">
              <svg viewBox="0 0 120 120" class="w-full h-full">
                <!-- Background -->
                <circle cx="60" cy="60" r="58" class="fill-primary-50 dark:fill-primary-900/20" />
                <!-- Search/Browse illustration -->
                <g>
                  <!-- Browser window -->
                  <rect x="25" y="30" width="70" height="55" rx="6" class="fill-white dark:fill-neutral-800 stroke-primary-300 dark:stroke-primary-700" stroke-width="2" />
                  <rect x="25" y="30" width="70" height="14" rx="6" class="fill-primary-100 dark:fill-primary-800" />
                  <circle cx="34" cy="37" r="3" class="fill-error-400" />
                  <circle cx="44" cy="37" r="3" class="fill-warning-400" />
                  <circle cx="54" cy="37" r="3" class="fill-success-400" />
                  <!-- Doctor cards -->
                  <rect x="32" y="52" width="24" height="26" rx="3" class="fill-primary-100 dark:fill-primary-900/50" />
                  <circle cx="44" cy="60" r="6" class="fill-primary-300 dark:fill-primary-700" />
                  <rect x="36" y="70" width="16" height="3" rx="1" class="fill-primary-300 dark:fill-primary-700" />
                  <rect x="64" y="52" width="24" height="26" rx="3" class="fill-accent-100 dark:fill-accent-900/50" />
                  <circle cx="76" cy="60" r="6" class="fill-accent-300 dark:fill-accent-700" />
                  <rect x="68" y="70" width="16" height="3" rx="1" class="fill-accent-300 dark:fill-accent-700" />
                </g>
                <!-- Magnifying glass -->
                <g class="transform translate-x-2 translate-y-2">
                  <circle cx="85" cy="85" r="12" class="fill-none stroke-primary-500" stroke-width="3" />
                  <line x1="93" y1="93" x2="102" y2="102" class="stroke-primary-500" stroke-width="3" stroke-linecap="round" />
                </g>
              </svg>
            </div>
            <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white font-bold mb-4">1</div>
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Choose Your Doctor</h3>
            <p class="text-neutral-600 dark:text-neutral-400">
              Browse our network of verified specialists and find the perfect match for your needs
            </p>
            <!-- Arrow to next -->
            <div class="hidden md:block absolute top-16 -right-6 lg:-right-10">
              <svg class="w-12 h-12 text-primary-300 dark:text-primary-700" viewBox="0 0 48 48">
                <path d="M8 24 L36 24 M28 16 L36 24 L28 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative text-center">
            <div class="w-32 h-32 mx-auto mb-6">
              <svg viewBox="0 0 120 120" class="w-full h-full">
                <circle cx="60" cy="60" r="58" class="fill-accent-50 dark:fill-accent-900/20" />
                <!-- Form illustration -->
                <g>
                  <!-- Clipboard -->
                  <rect x="30" y="20" width="60" height="80" rx="6" class="fill-white dark:fill-neutral-800 stroke-accent-300 dark:stroke-accent-700" stroke-width="2" />
                  <rect x="42" y="14" width="36" height="12" rx="4" class="fill-accent-500" />
                  <!-- Form fields -->
                  <rect x="38" y="36" width="44" height="8" rx="2" class="fill-neutral-100 dark:fill-neutral-700" />
                  <rect x="38" y="50" width="44" height="8" rx="2" class="fill-neutral-100 dark:fill-neutral-700" />
                  <rect x="38" y="64" width="30" height="8" rx="2" class="fill-neutral-100 dark:fill-neutral-700" />
                  <!-- Checkboxes -->
                  <rect x="38" y="78" width="8" height="8" rx="2" class="fill-success-500" />
                  <path d="M40 82 L43 85 L48 79" class="stroke-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                  <rect x="50" y="80" width="24" height="4" rx="1" class="fill-neutral-200 dark:fill-neutral-600" />
                </g>
                <!-- Pen -->
                <g class="transform rotate-45" style="transform-origin: 90px 90px;">
                  <rect x="85" y="70" width="8" height="35" rx="2" class="fill-primary-500" />
                  <polygon points="89,105 85,115 93,115" class="fill-neutral-700" />
                </g>
              </svg>
            </div>
            <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-600 text-white font-bold mb-4">2</div>
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Complete Your Profile</h3>
            <p class="text-neutral-600 dark:text-neutral-400">
              Fill out your medical history and symptoms so your doctor can prepare
            </p>
            <!-- Arrow to next -->
            <div class="hidden md:block absolute top-16 -right-6 lg:-right-10">
              <svg class="w-12 h-12 text-accent-300 dark:text-accent-700" viewBox="0 0 48 48">
                <path d="M8 24 L36 24 M28 16 L36 24 L28 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div class="w-32 h-32 mx-auto mb-6">
              <svg viewBox="0 0 120 120" class="w-full h-full">
                <circle cx="60" cy="60" r="58" class="fill-success-50 dark:fill-success-900/20" />
                <!-- Calendar with checkmark -->
                <g>
                  <!-- Calendar -->
                  <rect x="25" y="28" width="70" height="65" rx="6" class="fill-white dark:fill-neutral-800 stroke-success-300 dark:stroke-success-700" stroke-width="2" />
                  <rect x="25" y="28" width="70" height="18" rx="6" class="fill-success-500" />
                  <!-- Calendar binding -->
                  <rect x="38" y="22" width="6" height="14" rx="2" class="fill-success-600" />
                  <rect x="76" y="22" width="6" height="14" rx="2" class="fill-success-600" />
                  <!-- Calendar grid -->
                  <g class="fill-neutral-300 dark:fill-neutral-600">
                    <circle cx="38" cy="56" r="4" />
                    <circle cx="52" cy="56" r="4" />
                    <circle cx="66" cy="56" r="4" />
                    <circle cx="80" cy="56" r="4" />
                    <circle cx="38" cy="72" r="4" />
                    <circle cx="52" cy="72" r="4" />
                  </g>
                  <!-- Selected date -->
                  <circle cx="66" cy="72" r="8" class="fill-success-500" />
                  <path d="M62 72 L65 75 L71 69" class="stroke-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                </g>
                <!-- Notification bell -->
                <g class="transform translate-x-2">
                  <circle cx="88" cy="30" r="14" class="fill-warning-400" />
                  <path d="M88 24 L88 30 L92 33" class="stroke-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                </g>
              </svg>
            </div>
            <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-success-600 text-white font-bold mb-4">3</div>
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Get Confirmed</h3>
            <p class="text-neutral-600 dark:text-neutral-400">
              Receive instant confirmation and reminders for your appointment
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Specialties Section -->
    <section class="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left - Image -->
          <div class="relative order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=500&fit=crop"
              alt="Medical team"
              class="w-full rounded-3xl shadow-soft-xl"
              loading="lazy"
            />
            <!-- Floating stat card -->
            <div class="absolute -bottom-6 -right-6 lg:right-8 glass-card p-5 shadow-soft-lg animate-float">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-2xl font-bold text-neutral-900 dark:text-white">7+</p>
                  <p class="text-sm text-neutral-500 dark:text-neutral-400">Specialties</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right - Content -->
          <div class="order-1 lg:order-2">
            <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Find the Right Specialist
            </h2>
            <p class="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Our network covers all major medical specialties. Click on any specialty to browse available doctors.
            </p>

            <!-- Specialty Pills -->
            <div class="flex flex-wrap gap-3 mb-8">
              <button
                v-for="specialty in specialties"
                :key="specialty.name"
                @click="goToSpecialty(specialty.value)"
                class="group px-5 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-soft-md transition-all duration-300"
              >
                <div class="flex items-center gap-3">
                  <span class="font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {{ specialty.name }}
                  </span>
                  <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 group-hover:bg-primary-100 group-hover:text-primary-700 dark:group-hover:bg-primary-900/30 dark:group-hover:text-primary-300 transition-colors">
                    {{ specialty.count }}
                  </span>
                </div>
              </button>
            </div>

            <button
              @click="router.push('/doctors')"
              class="btn-primary group"
            >
              View All Doctors
              <ArrowRightIcon class="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 md:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 dark:from-primary-900 dark:via-primary-950 dark:to-accent-900 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full" style="background-image: radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px); background-size: 50px 50px;" />
      </div>

      <!-- Floating elements -->
      <div class="absolute top-10 left-10 w-20 h-20 rounded-full border-2 border-white/20 animate-float" />
      <div class="absolute bottom-10 right-10 w-32 h-32 rounded-full border-2 border-white/10 animate-float" style="animation-delay: 1s;" />

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Take Care of Your Health?
        </h2>
        <p class="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Join thousands of patients who trust MedBook for their healthcare needs. Your journey to better health starts here.
        </p>

        <button
          @click="router.push('/doctors')"
          class="btn btn-lg bg-white text-primary-700 hover:bg-neutral-100 hover:shadow-soft-lg transition-all duration-300 group"
        >
          Book Your Appointment
          <ArrowRightIcon class="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  </div>
</template>
