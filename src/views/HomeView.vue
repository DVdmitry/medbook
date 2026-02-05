<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import {
  CalendarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ClockIcon,
  ArrowRightIcon,
} from '@heroicons/vue/24/outline';
import { StarIcon as StarSolid } from '@heroicons/vue/24/solid';
import { useApi } from '@/composables/useApi';

const router = useRouter();
const { getSpecialtyCounts } = useApi();

const specialtyDefinitions = [
  { name: 'Cardiology', value: 'cardiologist', icon: '❤️' },
  { name: 'Dermatology', value: 'dermatologist', icon: '✨' },
  { name: 'General', value: 'general-practitioner', icon: '🩺' },
  { name: 'Orthopedics', value: 'orthopedic-surgeon', icon: '🦴' },
  { name: 'Neurology', value: 'neurologist', icon: '🧠' },
  { name: 'Pediatrics', value: 'pediatrician', icon: '👶' },
];

const specialties = ref(specialtyDefinitions.map(s => ({ ...s, count: 0 })));

onMounted(async () => {
  const counts = await getSpecialtyCounts();
  specialties.value = specialtyDefinitions.map(s => ({
    ...s,
    count: counts[s.value] || 0
  }));
});

function goToSpecialty(specialtyValue: string) {
  router.push({ path: '/doctors', query: { specialty: specialtyValue } });
}

const featuredDoctors = [
  {
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    available: true,
  },
  {
    name: 'Dr. James Chen',
    specialty: 'Neurologist',
    rating: 4.8,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    available: true,
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatologist',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
    available: false,
  },
];

const stats = [
  { value: '50+', label: 'Expert Doctors', icon: UserGroupIcon },
  { value: '10k+', label: 'Happy Patients', icon: StarSolid },
  { value: '24/7', label: 'Support Available', icon: ClockIcon },
  { value: '99%', label: 'Satisfaction Rate', icon: ShieldCheckIcon },
];
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-neutral-950">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-mesh-light dark:bg-mesh-dark">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <!-- Left: Content -->
          <div class="relative z-10 animate-fade-in-up">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-8">
              <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              Trusted by 10,000+ patients
            </div>

            <!-- Headline -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white leading-tight mb-6">
              Your wellness
              <span class="relative inline-block">
                <span class="relative z-10 text-primary-600 dark:text-primary-400">journey</span>
                <svg class="absolute -bottom-2 left-0 w-full h-4 text-accent-400" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
                </svg>
              </span>
              <br/>starts here
            </h1>

            <p class="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10 max-w-lg">
              Connect with trusted healthcare professionals who care about your well-being. Book appointments in seconds, not hours.
            </p>

            <!-- CTAs -->
            <div class="flex flex-wrap gap-4 mb-12">
              <RouterLink
                to="/doctors"
                class="btn btn-lg bg-primary-600 text-white hover:bg-primary-700 shadow-soft hover:shadow-glow-primary group"
              >
                Find a Doctor
                <ArrowRightIcon class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </RouterLink>
              <RouterLink
                to="/cabinet"
                class="btn btn-lg border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                My Appointments
              </RouterLink>
            </div>

            <!-- Trust indicators -->
            <div class="flex items-center gap-6">
              <div class="flex -space-x-3">
                <img
                  v-for="i in 4"
                  :key="i"
                  :src="`https://i.pravatar.cc/80?img=${i + 10}`"
                  :alt="`Patient ${i}`"
                  class="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-900 object-cover"
                />
              </div>
              <div>
                <div class="flex items-center gap-1 text-warning-500">
                  <StarSolid class="w-4 h-4" />
                  <StarSolid class="w-4 h-4" />
                  <StarSolid class="w-4 h-4" />
                  <StarSolid class="w-4 h-4" />
                  <StarSolid class="w-4 h-4" />
                </div>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">Rated 4.9/5 by our patients</p>
              </div>
            </div>
          </div>

          <!-- Right: Visual -->
          <div class="relative animate-fade-in" style="animation-delay: 200ms">
            <!-- Main image container -->
            <div class="relative">
              <!-- Background shape -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-900/50 dark:to-accent-900/50 rounded-[3rem] rotate-3 scale-105"></div>

              <!-- Image -->
              <div class="relative rounded-[2.5rem] overflow-hidden shadow-soft-xl">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=700&fit=crop&crop=faces"
                  alt="Healthcare professional"
                  class="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <!-- Overlay gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/30 to-transparent"></div>
              </div>

              <!-- Floating card - Appointment -->
              <div class="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-800 rounded-2xl p-4 shadow-soft-lg border border-neutral-200 dark:border-neutral-700 animate-float">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <CalendarIcon class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-neutral-900 dark:text-white">Next Available</p>
                    <p class="text-xs text-neutral-500 dark:text-neutral-400">Today at 2:30 PM</p>
                  </div>
                </div>
              </div>

              <!-- Floating card - Rating -->
              <div class="absolute -top-4 -right-4 bg-white dark:bg-neutral-800 rounded-2xl p-4 shadow-soft-lg border border-neutral-200 dark:border-neutral-700 animate-float" style="animation-delay: 1s">
                <div class="flex items-center gap-2">
                  <div class="flex text-warning-400">
                    <StarSolid class="w-5 h-5" />
                    <StarSolid class="w-5 h-5" />
                    <StarSolid class="w-5 h-5" />
                    <StarSolid class="w-5 h-5" />
                    <StarSolid class="w-5 h-5" />
                  </div>
                  <span class="text-sm font-bold text-neutral-900 dark:text-white">4.9</span>
                </div>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">10,000+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="relative py-20 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
      <!-- Decorative blobs -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/20 dark:bg-primary-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-400/20 dark:bg-accent-500/10 rounded-full blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="text-center p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-soft">
              <component :is="stat.icon" class="w-6 h-6 text-white" />
            </div>
            <p class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-1">{{ stat.value }}</p>
            <p class="text-neutral-600 dark:text-neutral-400 text-sm font-medium">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Specialties Section -->
    <section class="py-24 relative bg-neutral-50 dark:bg-neutral-900">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center mb-16">
          <p class="text-primary-600 dark:text-primary-400 font-semibold uppercase tracking-wide mb-3">Our Expertise</p>
          <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Find care for every need
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            From routine check-ups to specialized treatments, our network of healthcare professionals covers all your medical needs.
          </p>
        </div>

        <!-- Specialties grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button
            v-for="specialty in specialties"
            :key="specialty.value"
            @click="goToSpecialty(specialty.value)"
            class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 text-center group hover:border-primary-500 hover:shadow-soft-md transition-all duration-300 animate-fade-in-up"
          >
            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {{ specialty.icon }}
            </div>
            <h3 class="font-semibold text-neutral-900 dark:text-white mb-1">{{ specialty.name }}</h3>
            <p class="text-sm text-neutral-500 dark:text-neutral-400">{{ specialty.count }} doctors</p>
          </button>
        </div>

        <div class="text-center mt-12">
          <RouterLink to="/doctors" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20 rounded-xl font-semibold transition-all duration-200 group">
            View All Specialties
            <ArrowRightIcon class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Doctors Section -->
    <section class="py-24 bg-white dark:bg-neutral-950 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <!-- Section header -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <p class="text-accent-600 dark:text-accent-400 font-semibold uppercase tracking-wide mb-3">Top Rated</p>
            <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white">
              Meet our doctors
            </h2>
          </div>
          <RouterLink to="/doctors" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium group inline-flex items-center gap-2">
            Browse All Doctors
            <ArrowRightIcon class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </RouterLink>
        </div>

        <!-- Doctors grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="doctor in featuredDoctors"
            :key="doctor.name"
            class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 hover:shadow-soft-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 animate-fade-in-up"
          >
            <div class="flex items-start gap-4 mb-4">
              <div class="relative">
                <img
                  :src="doctor.image"
                  :alt="doctor.name"
                  class="w-20 h-20 rounded-2xl object-cover"
                />
                <div
                  v-if="doctor.available"
                  class="absolute -bottom-1 -right-1 w-5 h-5 bg-success-500 rounded-full border-2 border-white dark:border-neutral-800"
                ></div>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-neutral-900 dark:text-white mb-1">{{ doctor.name }}</h3>
                <p class="text-primary-600 dark:text-primary-400 text-sm font-medium">{{ doctor.specialty }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <div class="flex text-warning-400">
                    <StarSolid class="w-4 h-4" />
                  </div>
                  <span class="text-sm font-semibold text-neutral-900 dark:text-white">{{ doctor.rating }}</span>
                  <span class="text-sm text-neutral-500 dark:text-neutral-400">({{ doctor.reviews }} reviews)</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div>
                <p class="text-xs text-neutral-500 dark:text-neutral-400">Next Available</p>
                <p class="text-sm font-semibold text-neutral-900 dark:text-white">
                  {{ doctor.available ? 'Today' : 'Tomorrow' }}
                </p>
              </div>
              <RouterLink
                to="/doctors"
                class="btn btn-sm bg-primary-600 text-white hover:bg-primary-700"
              >
                Book Now
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-24 relative bg-neutral-50 dark:bg-neutral-900">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <!-- Section header -->
        <div class="text-center mb-16">
          <p class="text-primary-600 dark:text-primary-400 font-semibold uppercase tracking-wide mb-3">Simple Process</p>
          <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            How it works
          </h2>
          <p class="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Book your appointment in just a few simple steps
          </p>
        </div>

        <!-- Steps -->
        <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
          <!-- Step 1 -->
          <div class="relative text-center animate-fade-in-up">
            <div class="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">Find Your Doctor</h3>
            <p class="text-neutral-600 dark:text-neutral-400">
              Browse our network of qualified healthcare professionals by specialty, location, or availability.
            </p>
            <!-- Connector line -->
            <div class="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-neutral-200 dark:bg-neutral-700"></div>
          </div>

          <!-- Step 2 -->
          <div class="relative text-center animate-fade-in-up" style="animation-delay: 150ms">
            <div class="w-16 h-16 rounded-2xl bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">Choose a Time</h3>
            <p class="text-neutral-600 dark:text-neutral-400">
              Select a convenient time slot that fits your schedule. Same-day appointments available.
            </p>
            <!-- Connector line -->
            <div class="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-neutral-200 dark:bg-neutral-700"></div>
          </div>

          <!-- Step 3 -->
          <div class="text-center animate-fade-in-up" style="animation-delay: 300ms">
            <div class="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-3">Get Care</h3>
            <p class="text-neutral-600 dark:text-neutral-400">
              Receive confirmation and reminders. Show up for your appointment and focus on your health.
            </p>
          </div>
        </div>

        <div class="text-center mt-16">
          <RouterLink to="/doctors" class="btn btn-lg bg-accent-600 text-white hover:bg-accent-700 shadow-soft hover:shadow-glow-accent group">
            Get Started Today
            <ArrowRightIcon class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-neutral-900 dark:bg-neutral-950 relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"></div>
      <div class="absolute inset-0 bg-mesh-dark opacity-50"></div>

      <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <h2 class="text-3xl lg:text-5xl font-bold text-white mb-6">
          Ready to take control of your health?
        </h2>
        <p class="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
          Join thousands of patients who trust MedBook for their healthcare needs. Your wellness journey is just a click away.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <RouterLink to="/doctors" class="btn btn-lg bg-accent-600 text-white hover:bg-accent-700 shadow-soft hover:shadow-glow-accent group">
            Book an Appointment
            <ArrowRightIcon class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </RouterLink>
          <RouterLink to="/cabinet" class="btn btn-lg border-2 border-neutral-600 text-neutral-300 hover:border-primary-500 hover:text-white">
            View My Cabinet
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
