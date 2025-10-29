<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { doctors, specialtyDescriptions } from '@/data/doctors';
import type { Specialty } from '@/types/medical.types';
import {
  MagnifyingGlassIcon,
  StarIcon,
  AcademicCapIcon,
  LanguageIcon,
  CurrencyDollarIcon,
  CalendarIcon
} from '@heroicons/vue/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid';

const router = useRouter();
const selectedSpecialty = ref<Specialty | 'all'>('all');
const searchQuery = ref('');

const specialties: Array<{ value: Specialty | 'all'; label: string }> = [
  { value: 'all', label: 'All Specialties' },
  { value: 'cardiologist', label: 'Cardiology' },
  { value: 'dermatologist', label: 'Dermatology' },
  { value: 'general-practitioner', label: 'General Practice' },
  { value: 'orthopedic-surgeon', label: 'Orthopedic Surgery' },
  { value: 'neurologist', label: 'Neurology' },
  { value: 'gastroenterologist', label: 'Gastroenterology' },
  { value: 'pediatrician', label: 'Pediatrics' }
];

const filteredDoctors = computed(() => {
  let result = doctors;

  if (selectedSpecialty.value !== 'all') {
    result = result.filter((d) => d.specialty === selectedSpecialty.value);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.specialtyLabel.toLowerCase().includes(query)
    );
  }

  return result;
});

function bookDoctor(doctorId: string) {
  router.push(`/booking/${doctorId}`);
}
</script>

<template>
  <div class="py-16 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header with Gradient Text -->
      <div class="text-center mb-12 animate-slide-up">
        <h1 class="text-5xl md:text-6xl font-bold gradient-text mb-4">Find Your Doctor</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Browse our network of qualified healthcare professionals
        </p>
      </div>

      <!-- Search and Filter with Glassmorphism -->
      <div class="mb-12 space-y-6">
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto animate-fade-in">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by doctor name or specialty..."
              class="form-input text-lg pl-14"
            />
          </div>
        </div>

        <!-- Specialty Filter Pills -->
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="specialty in specialties"
            :key="specialty.value"
            @click="selectedSpecialty = specialty.value"
            :class="[
              'px-6 py-3 rounded-xl font-semibold transition-all duration-300',
              selectedSpecialty === specialty.value
                ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg scale-105'
                : 'backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 text-gray-700 dark:text-gray-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50'
            ]"
          >
            {{ specialty.label }}
          </button>
        </div>
      </div>

      <!-- Results Count with Badge -->
      <div class="text-center mb-8">
        <span class="badge-glass text-lg px-6 py-3">
          Found {{ filteredDoctors.length }} doctor{{ filteredDoctors.length !== 1 ? 's' : '' }}
        </span>
      </div>

      <!-- Doctor Cards Grid with Stagger Animation -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(doctor, index) in filteredDoctors"
          :key="doctor.id"
          class="glass-card-hover p-6 group animate-scale-in"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Doctor Avatar with Gradient Border -->
          <div class="flex items-start space-x-4 mb-6">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <img
                :src="doctor.avatar"
                :alt="doctor.name"
                class="relative w-20 h-20 rounded-2xl object-cover border-2 border-white dark:border-gray-800"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {{ doctor.name }}
              </h3>
              <p class="text-primary-600 dark:text-primary-400 font-semibold">{{ doctor.specialtyLabel }}</p>
              <div class="flex items-center mt-2 space-x-1">
                <StarIconSolid class="w-5 h-5 text-yellow-500" />
                <span class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {{ doctor.rating }}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  ({{ doctor.reviewCount }} reviews)
                </span>
              </div>
            </div>
          </div>

          <!-- Doctor Info with Icons -->
          <div class="space-y-3 mb-6">
            <div class="flex items-center space-x-3 text-sm">
              <div class="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center flex-shrink-0">
                <CalendarIcon class="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span class="text-gray-700 dark:text-gray-300">
                <span class="font-semibold">{{ doctor.experience }}</span> years experience
              </span>
            </div>

            <div class="flex items-center space-x-3 text-sm">
              <div class="w-8 h-8 rounded-lg bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center flex-shrink-0">
                <AcademicCapIcon class="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <span class="text-gray-700 dark:text-gray-300 line-clamp-1">{{ doctor.education }}</span>
            </div>

            <div class="flex items-center space-x-3 text-sm">
              <div class="w-8 h-8 rounded-lg bg-green-500/10 dark:bg-green-400/10 flex items-center justify-center flex-shrink-0">
                <LanguageIcon class="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span class="text-gray-700 dark:text-gray-300">{{ doctor.languages.join(', ') }}</span>
            </div>

            <div class="flex items-center space-x-3 text-sm">
              <div class="w-8 h-8 rounded-lg bg-orange-500/10 dark:bg-orange-400/10 flex items-center justify-center flex-shrink-0">
                <CurrencyDollarIcon class="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <span class="text-gray-700 dark:text-gray-300">
                <span class="font-bold text-primary-600 dark:text-primary-400">${{ doctor.consultationFee }}</span> consultation
              </span>
            </div>
          </div>

          <!-- Specialty Description -->
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {{ specialtyDescriptions[doctor.specialty] }}
          </p>

          <!-- Book Button with Gradient -->
          <button @click="bookDoctor(doctor.id)" class="btn-primary w-full">
            Book Appointment
          </button>
        </div>
      </div>

      <!-- Empty State with Modern Design -->
      <div v-if="filteredDoctors.length === 0" class="text-center py-20 animate-fade-in">
        <div class="glass-card max-w-md mx-auto p-12">
          <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <MagnifyingGlassIcon class="w-12 h-12 text-gray-400 dark:text-gray-600" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">No doctors found</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filters</p>
          <button @click="selectedSpecialty = 'all'; searchQuery = ''" class="btn-secondary">
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
