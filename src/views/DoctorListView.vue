<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
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
const route = useRoute();
const selectedSpecialty = ref<Specialty | 'all'>('all');
const searchQuery = ref('');

// Check for specialty query parameter on mount
onMounted(() => {
  const specialtyParam = route.query.specialty as string;
  if (specialtyParam && specialtyParam !== 'all') {
    selectedSpecialty.value = specialtyParam as Specialty;
  }
});

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
  <div class="py-16 min-h-screen bg-gray-50 dark:bg-gray-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header - Minimalist -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">Find Your Doctor</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Browse our network of qualified healthcare professionals
        </p>
      </div>

      <!-- Search and Filter -->
      <div class="mb-12 space-y-6">
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by doctor name or specialty..."
              class="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
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
              'px-6 py-3 rounded-lg font-medium transition-colors duration-200',
              selectedSpecialty === specialty.value
                ? 'bg-sky-600 dark:bg-sky-500 text-white'
                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:border-sky-500 dark:hover:border-sky-500'
            ]"
          >
            {{ specialty.label }}
          </button>
        </div>
      </div>

      <!-- Results Count -->
      <div class="text-center mb-8">
        <span class="text-gray-600 dark:text-gray-400 font-medium">
          Found {{ filteredDoctors.length }} doctor{{ filteredDoctors.length !== 1 ? 's' : '' }}
        </span>
      </div>

      <!-- Doctor Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="doctor in filteredDoctors"
          :key="doctor.id"
          class="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-sky-500 dark:hover:border-sky-500 transition-colors duration-200"
        >
          <!-- Doctor Avatar -->
          <div class="flex items-start space-x-4 mb-5">
            <img
              :src="doctor.avatar"
              :alt="doctor.name"
              class="w-16 h-16 rounded-lg object-cover"
            />
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {{ doctor.name }}
              </h3>
              <p class="text-sky-600 dark:text-sky-400 font-medium text-sm">{{ doctor.specialtyLabel }}</p>
              <div class="flex items-center mt-1.5 space-x-1">
                <StarIconSolid class="w-4 h-4 text-yellow-500" />
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ doctor.rating }}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  ({{ doctor.reviewCount }})
                </span>
              </div>
            </div>
          </div>

          <!-- Doctor Info -->
          <div class="space-y-2.5 mb-5">
            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <CalendarIcon class="w-4 h-4 flex-shrink-0" />
              <span>{{ doctor.experience }} years experience</span>
            </div>

            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <AcademicCapIcon class="w-4 h-4 flex-shrink-0" />
              <span class="line-clamp-1">{{ doctor.education }}</span>
            </div>

            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <LanguageIcon class="w-4 h-4 flex-shrink-0" />
              <span>{{ doctor.languages.join(', ') }}</span>
            </div>

            <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <CurrencyDollarIcon class="w-4 h-4 flex-shrink-0" />
              <span>
                <span class="font-semibold text-gray-900 dark:text-white">${{ doctor.consultationFee }}</span> consultation
              </span>
            </div>
          </div>

          <!-- Specialty Description -->
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
            {{ specialtyDescriptions[doctor.specialty] }}
          </p>

          <!-- Book Button -->
          <button @click="bookDoctor(doctor.id)" class="w-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
            Book Appointment
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredDoctors.length === 0" class="text-center py-20">
        <div class="max-w-md mx-auto bg-white dark:bg-gray-900 p-12 rounded-lg border border-gray-200 dark:border-gray-800">
          <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <MagnifyingGlassIcon class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No doctors found</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filters</p>
          <button @click="selectedSpecialty = 'all'; searchQuery = ''" class="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 border border-gray-300 dark:border-gray-600">
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
